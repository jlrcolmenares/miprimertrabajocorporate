"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  getModuleById,
  getSectionByModuleId,
  getNextModule,
  getPreviousModule,
  getTotalModuleCount,
} from "@/data/courseStructure";
import { getModuleContent } from "@/data/moduleContent";
import CourseSidebar from "@/components/CourseSidebar";
import CelebrationModal from "@/components/CelebrationModal";

interface User {
  uid: string;
  email: string;
  name: string;
  hasPaid: boolean;
  completedModules?: string[];
}

export default function ModulePage() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params.moduleId as string;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [toggleLoading, setToggleLoading] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [milestone, setMilestone] = useState<number | null>(null);

  const currentModule = getModuleById(moduleId);
  const section = getSectionByModuleId(moduleId);
  const content = getModuleContent(moduleId);
  const nextModule = getNextModule(moduleId);
  const previousModule = getPreviousModule(moduleId);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }

    const userData = JSON.parse(userStr);
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    // Only allow paid users or admins
    if (!userData.hasPaid && !isAdmin) {
      router.push("/dashboard/preview");
      return;
    }

    setUser(userData);
    setIsCompleted(userData.completedModules?.includes(moduleId) || false);
    setLoading(false);
  }, [router, moduleId]);

  const handleToggleCompletion = async () => {
    const idToken = localStorage.getItem("idToken");

    if (!idToken) {
      alert("Sesion expirada. Por favor, inicia sesion de nuevo.");
      router.push("/login");
      return;
    }

    setToggleLoading(true);

    try {
      const response = await fetch("/api/modules/toggle-completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({ moduleId, completed: !isCompleted }),
      });

      if (response.ok) {
        const data = await response.json();
        const newCompletedState = !isCompleted;
        setIsCompleted(newCompletedState);

        // Update localStorage
        if (user) {
          const updatedUser = {
            ...user,
            completedModules: data.completedModules,
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));

          // Check for milestones (only when completing, not uncompleting)
          if (newCompletedState) {
            const totalModules = getTotalModuleCount();
            const completedCount = data.completedModules.length;
            const percentage = Math.round((completedCount / totalModules) * 100);

            // Check if we hit a milestone
            if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
              setMilestone(percentage);
              setShowCelebration(true);
            }
          }
        }
      } else {
        alert("Error al actualizar el modulo");
      }
    } catch (error) {
      console.error("Error toggling module:", error);
      alert("Error al actualizar el modulo");
    } finally {
      setToggleLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!currentModule || !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Modulo no encontrado
          </h1>
          <Link
            href="/dashboard"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            ← Volver al dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <CourseSidebar completedModules={user?.completedModules || []} />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8 pt-16 lg:pt-8">
          {/* Module Header */}
          <div className="mb-8">
            {section && (
              <p className={`text-sm font-semibold mb-2 ${
                section.color === "blue-600" ? "text-blue-600" :
                section.color === "emerald-600" ? "text-emerald-600" :
                section.color === "purple-600" ? "text-purple-600" :
                section.color === "orange-600" ? "text-orange-600" :
                section.color === "rose-600" ? "text-rose-600" :
                section.color === "indigo-600" ? "text-indigo-600" :
                section.color === "teal-600" ? "text-teal-600" :
                section.color === "amber-600" ? "text-amber-600" :
                "text-blue-600"
              }`}>
                {section.title}
              </p>
            )}
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              {currentModule.title}
            </h1>
            <p className="text-gray-600 mb-4">{currentModule.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {currentModule.duration}
              </span>
              {/* Completion toggle */}
              <button
                onClick={handleToggleCompletion}
                disabled={toggleLoading}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  isCompleted
                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {toggleLoading ? (
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : isCompleted ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {isCompleted ? "Completado" : "Marcar como completado"}
              </button>
            </div>
          </div>

          {/* Module Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 module-content">
            {content}
          </div>

          {/* Navigation Footer */}
          <div className="mt-8 flex justify-between items-center gap-4">
            {/* Previous Button */}
            {previousModule ? (
              <Link
                href={`/dashboard/contenido/${previousModule.id}`}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="hidden sm:inline">Anterior:</span>
                <span className="ml-1 truncate max-w-[150px]">
                  {previousModule.title}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {/* Next Button */}
            {nextModule ? (
              <Link
                href={`/dashboard/contenido/${nextModule.id}`}
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
              >
                <span className="hidden sm:inline">Siguiente:</span>
                <span className="ml-1 truncate max-w-[150px]">
                  {nextModule.title}
                </span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ) : (
              <Link
                href="/dashboard"
                className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors"
              >
                <span>Curso completado</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Celebration Modal */}
      {showCelebration && milestone && (
        <CelebrationModal
          milestone={milestone}
          onClose={() => {
            setShowCelebration(false);
            setMilestone(null);
          }}
        />
      )}
    </div>
  );
}
