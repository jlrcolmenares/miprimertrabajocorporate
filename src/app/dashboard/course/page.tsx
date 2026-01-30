"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CourseSidebar from "@/components/CourseSidebar";
import { courseStructure, getTotalModuleCount, getAllModules } from "@/data/courseStructure";

interface User {
  uid: string;
  email: string;
  name: string;
  hasPaid: boolean;
  completedModules?: string[];
}

export default function CourseDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const userStr = localStorage.getItem("user");
      const idToken = localStorage.getItem("idToken");

      if (!userStr || !idToken) {
        router.push("/login");
        return;
      }

      const localUser = JSON.parse(userStr);
      const adminStatus = localStorage.getItem("isAdmin") === "true";

      // Only allow paid users or admins
      if (!localUser.hasPaid && !adminStatus) {
        router.push("/dashboard/preview");
        return;
      }

      setUser(localUser);
      setIsAdmin(adminStatus);
      setLoading(false);
    };

    loadUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("idToken");
    localStorage.removeItem("isAdmin");
    router.push("/");
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

  if (!user) return null;

  // Calculate progress stats
  const completedCount = user.completedModules?.length || 0;
  const totalModules = getTotalModuleCount();
  const progressPercent = Math.round((completedCount / totalModules) * 100);

  // Find next module to continue
  const allModules = getAllModules();
  const nextModule = allModules.find(
    (m) => !user.completedModules?.includes(m.id)
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <CourseSidebar
        completedModules={user.completedModules || []}
        showBackLink={false}
        headerTitle="Mi Primer Trabajo"
      />

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8 pt-16 lg:pt-8">
          {/* Header with user info */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hola, {user.name}
              </h1>
              <p className="text-gray-600">Continua donde lo dejaste</p>
            </div>
            <div className="flex items-center gap-4">
              {isAdmin && (
                <Link
                  href="/dashboard/admin"
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1"
                  title="Panel de administracion"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </Link>
              )}
              <Link
                href="/dashboard/perfil"
                className="text-gray-600 hover:text-gray-900"
                title="Editar perfil"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
                title="Cerrar sesion"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Tu progreso</h2>
              <span className="text-2xl font-bold text-blue-600">{progressPercent}%</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{completedCount} de {totalModules} modulos completados</span>
              {completedCount === totalModules ? (
                <span className="text-green-600 font-medium">¡Curso completado!</span>
              ) : (
                <span>{totalModules - completedCount} restantes</span>
              )}
            </div>
          </div>

          {/* Continue Learning Card */}
          {nextModule && (
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-sm p-6 mb-6 text-white">
              <p className="text-blue-100 text-sm mb-2">Continuar aprendiendo</p>
              <h3 className="text-xl font-semibold mb-3">{nextModule.title}</h3>
              <p className="text-blue-100 text-sm mb-4">{nextModule.description}</p>
              <Link
                href={`/dashboard/contenido/${nextModule.id}`}
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                Continuar
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}

          {/* Course Overview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contenido del curso</h2>
            <div className="space-y-3">
              {courseStructure.map((section) => {
                const sectionCompleted = section.modules.filter((m) =>
                  user.completedModules?.includes(m.id)
                ).length;
                const sectionTotal = section.modules.length;
                const isComplete = sectionCompleted === sectionTotal;

                return (
                  <div
                    key={section.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          isComplete
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {isComplete ? (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          section.order
                        )}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{section.title}</p>
                        <p className="text-sm text-gray-500">{sectionTotal} modulos</p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {sectionCompleted}/{sectionTotal}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
