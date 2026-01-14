"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithCustomToken, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login with Firebase Auth
        console.log('Attempting login with:', formData.email);
        console.log('Auth object:', auth);
        
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        
        console.log('Login successful:', userCredential.user.uid);

        // Get ID token
        const idToken = await userCredential.user.getIdToken();

        // Fetch user data from Firestore
        let response = await fetch("/api/auth/get-user", {
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
          console.log("User not found in Firestore, syncing...");
          
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
          router.push("/dashboard");
        } else {
          alert(data.error || "Error al obtener datos del usuario");
        }
      } else {
        // Register new user
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          // Sign in with custom token
          await signInWithCustomToken(auth, data.token);
          
          // Get ID token
          const user = auth.currentUser;
          if (user) {
            const idToken = await user.getIdToken();
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("idToken", idToken);
            router.push("/dashboard");
          }
        } else {
          alert(data.error || "Error al crear usuario");
        }
      }
    } catch (error: any) {
      console.error("Full error object:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        alert("Email o contraseña incorrectos");
      } else if (error.code === "auth/email-already-in-use") {
        alert("Este email ya está registrado");
      } else if (error.code === "auth/weak-password") {
        alert("La contraseña es muy débil");
      } else if (error.code === "auth/invalid-email") {
        alert("Email inválido");
      } else if (error.code === "auth/invalid-api-key") {
        alert("Error de configuración: API key inválida. Verifica tu .env.local");
      } else if (error.code === "auth/network-request-failed") {
        alert("Error de red. Verifica tu conexión a internet.");
      } else {
        alert(`Error: ${error.message || "Hubo un error. Por favor, intenta de nuevo."}`);
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
      alert("✅ Correo de restablecimiento enviado. Revisa tu bandeja de entrada.");
      setShowResetPassword(false);
      setResetEmail("");
    } catch (error: any) {
      console.error("Error sending password reset:", error);
      
      if (error.code === "auth/user-not-found") {
        alert("No existe una cuenta con este email");
      } else if (error.code === "auth/invalid-email") {
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
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              Restablecer Contraseña
            </h1>
            <p className="text-gray-600">
              Te enviaremos un enlace para restablecer tu contraseña
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
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
                className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {resetLoading ? "Enviando..." : "Enviar enlace de restablecimiento"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowResetPassword(false)}
                className="text-gray-600 hover:text-gray-900"
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
            <h1 className="text-3xl font-bold text-blue-600 cursor-pointer mb-2">
              Mi Primer Trabajo Corporate
            </h1>
          </Link>
          <p className="text-gray-600">
            {isLogin ? "Inicia sesión para acceder al curso" : "Crea tu cuenta para comenzar"}
          </p>
        </div>

        {/* Login/Register Form */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-md transition-colors ${
                isLogin
                  ? "bg-white text-blue-600 shadow-sm font-semibold"
                  : "text-gray-600"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-md transition-colors ${
                !isLogin
                  ? "bg-white text-blue-600 shadow-sm font-semibold"
                  : "text-gray-600"
              }`}
            >
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  required={!isLogin}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>
            )}

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Contraseña
                </label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(true)}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </div>
              <input
                type="password"
                id="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Procesando..." : isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? (
              <p>
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Regístrate aquí
                </button>
              </p>
            ) : (
              <p>
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Inicia sesión
                </button>
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
