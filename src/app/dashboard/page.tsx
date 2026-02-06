"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const routeUser = async () => {
      const userStr = localStorage.getItem("user");
      const idToken = localStorage.getItem("idToken");

      if (!userStr || !idToken) {
        router.push("/login");
        return;
      }

      const user = JSON.parse(userStr);
      const isAdmin = localStorage.getItem("isAdmin") === "true";

      // Check if returning from payment
      const urlParams = new URLSearchParams(window.location.search);
      const paymentStatus = urlParams.get("payment");

      if (paymentStatus === "success") {
        // Fetch updated user data from server after payment
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
            localStorage.setItem("user", JSON.stringify(data.user));

            // Show success message
            alert("¡Pago exitoso! Ahora tienes acceso completo al curso");

            // Redirect to course (they now have paid access)
            router.push("/dashboard/course");
            return;
          }
        } catch (error) {
          console.error("Error refreshing user data:", error);
        }
      } else if (paymentStatus === "cancelled") {
        alert("Pago cancelado. Puedes intentarlo de nuevo cuando quieras.");
        router.push("/dashboard/preview");
        return;
      }

      // Route based on user type
      if (isAdmin) {
        router.push("/dashboard/admin");
      } else if (user.hasPaid) {
        router.push("/dashboard/course");
      } else {
        router.push("/dashboard/preview");
      }
    };

    routeUser();
    setChecking(false);
  }, [router]);

  // Show loading while checking/routing
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background-brand)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: 'var(--primary)' }}></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return null;
}
