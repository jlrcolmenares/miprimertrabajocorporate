"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Login with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Get ID token
      const idToken = await userCredential.user.getIdToken();

      // Fetch user data from Firestore
      const response = await fetch("/api/auth/get-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({ uid: userCredential.user.uid }),
      });

      let data = await response.json();

      // If user not found in Firestore, sync from Firebase Auth
      if (response.status === 404) {
        const syncResponse = await fetch("/api/auth/sync-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`,
          },
        });

        const syncData = await syncResponse.json();

        if (syncResponse.ok) {
          data = syncData;
        } else {
          alert("Error al sincronizar usuario. Por favor, intenta de nuevo.");
          return;
        }
      }

      if (response.ok || data.user) {
        // Store user data
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("idToken", idToken);

        // Check if user is admin
        try {
          const adminResponse = await fetch("/api/admin/validate", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${idToken}`,
            },
          });

          if (adminResponse.ok) {
            const adminData = await adminResponse.json();
            if (adminData.isAdmin) {
              localStorage.setItem("isAdmin", "true");
            } else {
              localStorage.setItem("isAdmin", "false");
            }
          } else {
            localStorage.setItem("isAdmin", "false");
          }
        } catch {
          // Not admin or error checking - continue to dashboard
          localStorage.setItem("isAdmin", "false");
        }

        // Always redirect to /dashboard - the router will handle the rest
        router.push("/dashboard");
      } else {
        alert(data.error || "Error al obtener datos del usuario");
      }
    } catch (error: unknown) {
      const firebaseError = error as { code?: string; message?: string };

      if (firebaseError.code === "auth/wrong-password" || firebaseError.code === "auth/user-not-found" || firebaseError.code === "auth/invalid-credential") {
        alert("Email o contraseña incorrectos");
      } else if (firebaseError.code === "auth/invalid-email") {
        alert("Email inválido");
      } else if (firebaseError.code === "auth/too-many-requests") {
        alert("Demasiados intentos fallidos. Intenta más tarde o restablece tu contraseña.");
      } else if (firebaseError.code === "auth/network-request-failed") {
        alert("Error de red. Verifica tu conexión a internet.");
      } else {
        alert(`Error: ${firebaseError.message || "Hubo un error. Por favor, intenta de nuevo."}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      alert("Correo de restablecimiento enviado. Revisa tu bandeja de entrada.");
      setShowResetPassword(false);
      setResetEmail("");
    } catch (error: unknown) {
      const firebaseError = error as { code?: string };

      if (firebaseError.code === "auth/user-not-found") {
        alert("No existe una cuenta con este email");
      } else if (firebaseError.code === "auth/invalid-email") {
        alert("Email inválido");
      } else {
        alert("Error al enviar el correo. Intenta de nuevo.");
      }
    } finally {
      setResetLoading(false);
    }
  };

  // Password reset modal
  if (showResetPassword) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-2">
              Restablecer Contraseña
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 sm:p-8">
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="reset-email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>

              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetLoading ? "Enviando..." : "Enviar enlace"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowResetPassword(false)}
                className="text-gray-600 hover:text-gray-900 text-sm sm:text-base"
              >
                ← Volver al inicio de sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600 cursor-pointer mb-2">
              Mi Primer Trabajo Corporate
            </h1>
          </Link>
          <p className="text-sm sm:text-base text-gray-600">
            Inicia sesión para acceder al curso
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow p-6 sm:p-8">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6 text-center">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => setShowResetPassword(true)}
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <input
                type="password"
                id="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              ¿No tienes cuenta? Contacta con nosotros a través de la página del curso para solicitar acceso.
            </p>
            <div className="mt-3 text-center">
              <Link
                href="/curso"
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Ver información del curso →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900 text-sm sm:text-base">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
