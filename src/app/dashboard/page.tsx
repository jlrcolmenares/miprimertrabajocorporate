"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PaymentButton from "@/components/PaymentButton";
import CourseSidebar from "@/components/CourseSidebar";
import { courseStructure, getTotalModuleCount, getAllModules } from "@/data/courseStructure";

interface User {
  uid: string;
  email: string;
  name: string;
  hasPaid: boolean;
  completedModules?: string[];
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const userStr = localStorage.getItem("user");
      const idToken = localStorage.getItem("idToken");

      if (!userStr || !idToken) {
        router.push("/login");
        return;
      }

      const localUser = JSON.parse(userStr);

      // Check if returning from payment
      const urlParams = new URLSearchParams(window.location.search);
      const paymentStatus = urlParams.get("payment");

      if (paymentStatus === "success") {
        // Only fetch from server after payment to get updated hasPaid status
        try {
          const response = await fetch("/api/auth/get-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Show success message
            alert("¡Pago exitoso! Ahora tienes acceso completo al curso");

            // Clean URL
            window.history.replaceState({}, "", "/dashboard");
          }
        } catch (error) {
          console.error("Error refreshing user data:", error);
          // Fallback to local data if fetch fails
          setUser(localUser);
        }
      } else if (paymentStatus === "cancelled") {
        alert("Pago cancelado. Puedes intentarlo de nuevo cuando quieras.");
        window.history.replaceState({}, "", "/dashboard");
        setUser(localUser);
      } else {
        // Normal page load - use cached data from localStorage (instant!)
        setUser(localUser);
      }

      setLoading(false);
    };

    loadUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("idToken");
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

  // If user has paid, show the course layout with sidebar
  if (user.hasPaid) {
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

  // User hasn't paid - show simple layout with payment prompt
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">
                  Mi Primer Trabajo
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hola, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Cerrar Sesion
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Bienvenido, {user.name}
          </h1>
          <p className="text-xl text-gray-600">
            Estas a un paso de comenzar tu camino al mundo corporativo
          </p>
        </div>

        {/* Course Preview */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
            <h2 className="text-2xl font-bold mb-2">Mi Primer Trabajo Corporate</h2>
            <p className="text-blue-100">
              El curso completo para conseguir tu primer empleo en el mundo corporativo
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{courseStructure.length}</p>
                <p className="text-sm text-gray-600">Secciones</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-blue-600">{totalModules}</p>
                <p className="text-sm text-gray-600">Modulos</p>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              {courseStructure.map((section) => (
                <div key={section.id} className="flex items-center gap-3 text-gray-700">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{section.title}</span>
                </div>
              ))}
            </div>
            <PaymentButton hasPaid={user.hasPaid} />
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <Link
              href="/dashboard/perfil"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Editar perfil
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
