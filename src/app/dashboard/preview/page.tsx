"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { courseStructure, getTotalModuleCount } from "@/data/courseStructure";

interface User {
  uid: string;
  email: string;
  name: string;
  hasPaid: boolean;
}

export default function PreviewDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const totalModules = getTotalModuleCount();

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

      // If user has paid or is admin, redirect to course
      if (localUser.hasPaid || adminStatus) {
        router.push("/dashboard/course");
        return;
      }

      setUser(localUser);
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

  const handleRequestAccess = () => {
    const subject = encodeURIComponent("Solicitud de acceso - Incorporate");
    const body = encodeURIComponent(
`Hola,

Me gustaria solicitar acceso al curso "Incorporate".

Mis datos:
- Nombre: ${user?.name || ""}
- Email: ${user?.email || ""}

Quedo a la espera de instrucciones para completar el pago.

Saludos`
    );

    window.open(`mailto:jlrcc991@hotmail.com?subject=${subject}&body=${body}`, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background-brand)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: 'var(--primary)' }}></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-brand)' }}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold cursor-pointer" style={{ color: 'var(--primary)' }}>
                  Incorporate
                </h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Hola, {user.name}</span>
              <Link
                href="/dashboard/perfil"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 px-3 py-2 text-sm font-medium nav-link-hover rounded-lg"
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
          <div className="p-8 text-white" style={{ background: 'linear-gradient(to right, var(--primary), var(--primary-hover))' }}>
            <h2 className="text-2xl font-bold mb-2">Incorporate</h2>
            <p style={{ color: 'var(--primary-100)' }}>
              El curso completo para conseguir tu primer empleo en el mundo corporativo
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--background-brand)' }}>
                <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{courseStructure.length}</p>
                <p className="text-sm text-gray-600">Secciones</p>
              </div>
              <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--background-brand)' }}>
                <p className="text-3xl font-bold" style={{ color: 'var(--primary)' }}>{totalModules}</p>
                <p className="text-sm text-gray-600">Modulos</p>
              </div>
            </div>

            {/* Section titles only - no links */}
            <div className="space-y-2 mb-6">
              {courseStructure.map((section) => (
                <div key={section.id} className="flex items-center gap-3 text-gray-700 p-2">
                  <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold" style={{ backgroundColor: 'var(--accent-brand)', color: 'var(--primary)' }}>
                    {section.order}
                  </span>
                  <span className="font-medium">{section.title}</span>
                  <span className="text-sm text-gray-500 ml-auto">
                    {section.modules.length} modulos
                  </span>
                </div>
              ))}
            </div>

            {/* Request Access Button */}
            <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--accent-brand)', border: '1px solid var(--primary-100)' }}>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Solicita Acceso al Curso
                </h3>
                <p className="text-gray-600 mb-6">
                  Contacta con nosotros para obtener acceso completo a todo el contenido
                </p>
                <button
                  onClick={handleRequestAccess}
                  className="w-full sm:w-auto text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow hover:shadow-md"
                  style={{ backgroundColor: 'var(--primary)' }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
                >
                  Solicitar Acceso
                </button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Se abrira tu cliente de correo para enviar la solicitud
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: 'var(--primary)' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <Link
              href="/dashboard/perfil"
              className="font-medium transition-colors"
              style={{ color: 'var(--primary)' }}
            >
              Editar perfil
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
