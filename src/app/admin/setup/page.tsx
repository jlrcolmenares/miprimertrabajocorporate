"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSetup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const setupAdmin = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/setup", {
        method: "POST",
      });

      const data = await response.json();
      setResult(data);

      if (response.ok) {
        setTimeout(() => {
          router.push("/admin/login");
        }, 3000);
      }
    } catch (error) {
      console.error("Error setting up admin:", error);
      setResult({ error: "Error setting up admin user" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Configuración de Administrador
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Configura el usuario administrador desde las variables de entorno
          </p>
        </div>

        {!result && (
          <div className="mt-8 space-y-6">
            <button
              onClick={setupAdmin}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Configurando..." : "Configurar Administrador"}
            </button>
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6">
            {result.error ? (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Error</h3>
                    <p className="mt-1 text-sm text-red-700">{result.error}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">¡Éxito!</h3>
                    <p className="mt-1 text-sm text-green-700">{result.message}</p>
                    {result.credentials && (
                      <div className="mt-3 p-3 bg-white rounded border">
                        <p className="text-sm font-medium text-gray-900">Credenciales de Administrador:</p>
                        <p className="text-sm text-gray-600">Email: {result.credentials.email}</p>
                        <p className="text-sm text-gray-600">Contraseña: {result.credentials.password}</p>
                      </div>
                    )}
                    <p className="mt-2 text-xs text-green-600">
                      Redirigiendo al login en 3 segundos...
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              <button
                onClick={() => router.push("/admin/login")}
                className="text-blue-600 hover:text-blue-500 text-sm"
              >
                Ir al Login de Administrador
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
