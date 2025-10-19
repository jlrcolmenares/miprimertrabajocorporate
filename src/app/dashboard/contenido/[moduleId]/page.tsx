"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getModuleById, getSectionByModuleId } from "@/data/courseStructure";
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!module || !content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Módulo no encontrado</h1>
          <Link
            href="/dashboard"
            className="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            ← Volver al dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link
              href="/dashboard"
              className="flex items-center text-indigo-600 hover:text-indigo-700 font-semibold"
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
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {section && (
                <p className="text-sm text-indigo-600 font-semibold mb-2">
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

          {/* Completion Toggle */}
          <button
            onClick={handleToggleCompletion}
            disabled={toggleLoading}
            className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
              isCompleted
                ? "bg-green-100 text-green-800 hover:bg-green-200"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {toggleLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                Actualizando...
              </>
            ) : isCompleted ? (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Módulo completado
              </>
            ) : (
              <>
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Marcar como completado
              </>
            )}
          </button>
        </div>

        {/* Module Content */}
        <div className="bg-white rounded-xl shadow-md p-8">
          {content}
        </div>

        {/* Navigation Footer */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-white rounded-lg shadow-md text-gray-700 hover:bg-gray-50 transition-colors"
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
            Volver a todos los módulos
          </Link>
        </div>
      </main>
    </div>
  );
}
