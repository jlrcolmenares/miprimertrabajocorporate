"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

interface User {
  uid: string;
  email: string;
  name: string;
  hasPaid: boolean;
  stripeCustomerId?: string;
  stripeSessionId?: string;
  createdAt: string;
  updatedAt: string;
}

interface AdminStats {
  users: User[];
  total: number;
  paidUsers: number;
}

export default function AdminPanel() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPaid, setFilterPaid] = useState<"all" | "paid" | "unpaid">("all");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Validate admin status via server-side API
          const idToken = await user.getIdToken();
          const response = await fetch("/api/admin/validate", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${idToken}`,
            },
          });

          if (response.ok) {
            setIsAuthenticated(true);
            fetchUsers();
          } else {
            alert("No tienes permisos de administrador");
            router.push("/login");
          }
        } catch (error) {
          console.error("Error validating admin:", error);
          alert("Error al verificar permisos de administrador");
          router.push("/login");
        }
      } else {
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const fetchUsers = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const idToken = await user.getIdToken();
      
      const response = await fetch("/api/admin/users", {
        headers: {
          "Authorization": `Bearer ${idToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
        setUsers(data.users);
      } else {
        console.error("Error fetching users");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleUserPayment = async (uid: string) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const idToken = await user.getIdToken();
      
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          uid,
          action: "togglePayment",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        fetchUsers(); // Refresh the list
      } else {
        const error = await response.json();
        alert(error.error || "Error al actualizar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al actualizar usuario");
    }
  };

  const deleteUser = async (uid: string, email: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar al usuario ${email}?`)) {
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) return;

      const idToken = await user.getIdToken();
      
      const response = await fetch(`/api/admin/users?uid=${uid}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${idToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        fetchUsers(); // Refresh the list
      } else {
        const error = await response.json();
        alert(error.error || "Error al eliminar usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar usuario");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterPaid === "all" ||
                         (filterPaid === "paid" && user.hasPaid) ||
                         (filterPaid === "unpaid" && !user.hasPaid);

    return matchesSearch && matchesFilter;
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      localStorage.removeItem("idToken");
      localStorage.removeItem("isAdmin");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const sendInvitation = () => {
    if (!inviteEmail) {
      alert("Introduce un email");
      return;
    }

    const baseUrl = window.location.origin;
    const registroUrl = `${baseUrl}/register`;

    const subject = encodeURIComponent("Invitacion al curso Mi Primer Trabajo Corporate");
    const body = encodeURIComponent(
`Hola,

Has sido invitado al curso "Mi Primer Trabajo Corporate".

Para crear tu cuenta, haz clic en el siguiente enlace:
${registroUrl}

Una vez registrado, tu acceso sera activado y podras comenzar el curso.

Saludos,
Jose Luis Colmenares`
    );

    window.open(`mailto:${inviteEmail}?subject=${subject}&body=${body}`, "_blank");
    setInviteEmail("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-4">
              <Link href="/">
                <h1 className="text-xl font-bold text-blue-600 cursor-pointer">
                  Mi Primer Trabajo
                </h1>
              </Link>
              <span className="hidden sm:inline-block px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded">
                ADMIN
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Cerrar Sesion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administracion</h1>
          <p className="mt-2 text-gray-600">Gestiona usuarios y pagos del curso</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Usuarios Pagados</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.paidUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Tasa de Conversión</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.total > 0 ? Math.round((stats.paidUsers / stats.total) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invite User */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Invitar Usuario</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Email del usuario a invitar..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendInvitation()}
                />
              </div>
              <button
                onClick={sendInvitation}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Enviar Invitacion
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Se abrira tu cliente de correo con un mensaje pre-llenado.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Buscar por email o nombre..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <select
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterPaid}
                  onChange={(e) => setFilterPaid(e.target.value as "all" | "paid" | "unpaid")}
                >
                  <option value="all">Todos los usuarios</option>
                  <option value="paid">Solo pagados</option>
                  <option value="unpaid">Solo no pagados</option>
                </select>
              </div>
              <button
                onClick={fetchUsers}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado de Pago
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Registro
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.uid} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                        <div className="text-xs text-gray-400">ID: {user.uid}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.hasPaid 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.hasPaid ? 'Pagado' : 'No Pagado'}
                      </span>
                      {user.stripeCustomerId && (
                        <div className="text-xs text-gray-500 mt-1">
                          Stripe: {user.stripeCustomerId}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('es-ES')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => toggleUserPayment(user.uid)}
                        className={`px-3 py-1 rounded text-xs font-medium ${
                          user.hasPaid
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {user.hasPaid ? 'Marcar No Pagado' : 'Marcar Pagado'}
                      </button>
                      <button
                        onClick={() => deleteUser(user.uid, user.email)}
                        className="px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-xs font-medium"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay usuarios</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || filterPaid !== "all" 
                  ? "No se encontraron usuarios con los filtros aplicados." 
                  : "Aún no hay usuarios registrados."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
