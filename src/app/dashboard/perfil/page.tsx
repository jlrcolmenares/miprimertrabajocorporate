"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  uid: string;
  email: string;
  name: string;
  hasPaid: boolean;
}

export default function Perfil() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }
    const userData = JSON.parse(userStr);
    setUser(userData);
    setFormData({
      name: userData.name,
      email: userData.email,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setLoading(false);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user?.uid,
          name: formData.name,
          email: formData.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local storage
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setMessage("Perfil actualizado exitosamente");
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setMessage(data.error || "Error al actualizar perfil");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Hubo un error. Por favor, intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">Incorporate</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Dashboard
              </Link>
              <span className="text-gray-700">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Volver al Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mi Perfil
          </h1>
          <p className="text-gray-600">
            Actualiza tu información personal
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes("exitosamente") 
                ? "bg-green-50 text-green-800" 
                : "bg-red-50 text-red-800"
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="ml-6">
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre Completo
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
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
              />
            </div>

            {/* Change Password Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cambiar Contraseña
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Deja estos campos vacíos si no deseas cambiar tu contraseña
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Contraseña Actual
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    minLength={6}
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Nueva Contraseña
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    minLength={6}
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
