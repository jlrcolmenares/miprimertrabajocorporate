"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PaymentButton from "@/components/PaymentButton";

interface User {
  uid: string;
  email: string;
  name: string;
  hasPaid: boolean;
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
      setUser(localUser);

      // Check if returning from payment
      const urlParams = new URLSearchParams(window.location.search);
      const paymentStatus = urlParams.get("payment");

      if (paymentStatus === "success") {
        // Refresh user data from Firestore after payment
        try {
          const response = await fetch("/api/auth/get-user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${idToken}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.user);
            localStorage.setItem("user", JSON.stringify(data.user));
            
            // Show success message
            alert("¡Pago exitoso! Ahora tienes acceso completo al curso 🎉");
            
            // Clean URL
            window.history.replaceState({}, "", "/dashboard");
          }
        } catch (error) {
          console.error("Error refreshing user data:", error);
        }
      } else if (paymentStatus === "cancelled") {
        alert("Pago cancelado. Puedes intentarlo de nuevo cuando quieras.");
        window.history.replaceState({}, "", "/dashboard");
      }

      setLoading(false);
    };

    loadUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
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

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-indigo-600 cursor-pointer">Mi Primer Trabajo Corporate</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hola, {user.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mi Dashboard
          </h1>
          <p className="text-gray-600">
            Bienvenido a tu panel de control
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <Link
              href="/dashboard/perfil"
              className="block w-full text-center bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              Editar Perfil
            </Link>
          </div>

          {/* Course Status Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Estado del Curso</h3>
            {user.hasPaid ? (
              <div>
                <div className="flex items-center text-green-600 mb-4">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="font-semibold">Acceso Activo</span>
                </div>
                <Link
                  href="/dashboard/contenido"
                  className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Ver Contenido
                </Link>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">
                  Aún no has adquirido el curso
                </p>
                <Link
                  href="/curso"
                  className="block w-full text-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Comprar Curso
                </Link>
              </div>
            )}
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Estadísticas</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Progreso</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {user.hasPaid ? "0%" : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Módulos Completados</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {user.hasPaid ? "0/7" : "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Section */}
        {user.hasPaid ? (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Contenido del Curso
            </h2>
            <div className="space-y-4">
              {[
                "Módulo 1: Preparación para tu primer día",
                "Módulo 2: Cultura corporativa y adaptación",
                "Módulo 3: Comunicación efectiva en el trabajo",
                "Módulo 4: Gestión del tiempo y productividad",
                "Módulo 5: Desarrollo de carrera profesional",
                "Módulo 6: Networking y relaciones laborales",
                "Módulo 7: Recursos adicionales y conclusiones",
              ].map((module, index) => (
                <Link
                  key={index}
                  href={`/dashboard/contenido/${index + 1}`}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-indigo-600 hover:bg-indigo-50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-4">
                        {index + 1}
                      </div>
                      <span className="font-medium text-gray-900">{module}</span>
                    </div>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8">
            <PaymentButton hasPaid={user.hasPaid} />
          </div>
        )}
      </main>
    </div>
  );
}
