"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import {
  getModuleById,
  getSectionByModuleId,
  getNextModule,
  getPreviousModule,
} from "@/data/courseStructure";
import { getModuleContent } from "@/data/moduleContent";

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

  const module = getModuleById(moduleId);
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
    
    if (!userData.hasPaid) {
      router.push("/dashboard");
      return;
    }

    setUser(userData);
    setIsCompleted(userData.completedModules?.includes(moduleId) || false);
    setLoading(false);
  }, [router, moduleId]);

  const handleToggleCompletion = async () => {
    const idToken = localStorage.getItem("idToken");
    
    if (!idToken) {
      alert("Sesión expirada. Por favor, inicia sesión de nuevo.");
      router.push("/login");
      return;
    }

    setToggleLoading(true);

    try {
      const response = await fetch("/api/modules/toggle-completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({ moduleId, completed: !isCompleted }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsCompleted(!isCompleted);
        
        // Update localStorage
        if (user) {
          const updatedUser = {
            ...user,
            completedModules: data.completedModules,
          };
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
        }
      } else {
        alert("Error al actualizar el módulo");
      }
    } catch (error) {
      console.error("Error toggling module:", error);
      alert("Error al actualizar el módulo");
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

  if (!module || !content) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Módulo no encontrado</h1>
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
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              href="/dashboard"
              className="flex items-center text-blue-600 hover:text-blue-700 font-semibold"
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
              Volver al dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Module Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {section && (
                <p className="text-sm text-blue-600 font-semibold mb-2">
                  {section.title}
                </p>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {module.title}
              </h1>
              <p className="text-gray-600 mb-4">{module.description}</p>
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
                  {module.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Module Content */}
        <div className="bg-white rounded-lg shadow p-8 module-content">
          {content}
        </div>

        {/* Navigation Footer */}
        <div className="mt-6 flex justify-between items-center gap-4">
          {/* Previous Button */}
          {previousModule ? (
            <Link
              href={`/dashboard/contenido/${previousModule.id}`}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
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

          {/* Dashboard Button */}
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-3 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors"
            title="Volver al dashboard"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </Link>

          {/* Next Button */}
          {nextModule ? (
            <Link
              href={`/dashboard/contenido/${nextModule.id}`}
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-blue-600 rounded-lg shadow-md text-white hover:bg-blue-700 transition-colors"
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
              className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-green-600 rounded-lg shadow-md text-white hover:bg-green-700 transition-colors"
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
      </main>
    </div>
  );
}
