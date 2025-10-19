"use client";

import { useState } from "react";

interface PaymentButtonProps {
  hasPaid: boolean;
}

export default function PaymentButton({ hasPaid }: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const idToken = localStorage.getItem("idToken");

      if (!idToken) {
        alert("Por favor, inicia sesión de nuevo");
        window.location.href = "/login";
        return;
      }

      // Create checkout session
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${idToken}`,
        },
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert(data.error || "Error al crear sesión de pago");
        setLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Error al procesar el pago. Por favor, intenta de nuevo.");
      setLoading(false);
    }
  };

  if (hasPaid) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          ¡Curso Desbloqueado!
        </h3>
        <p className="text-green-700">
          Tienes acceso completo a todo el contenido del curso
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Desbloquea el Curso Completo
        </h3>
        <p className="text-gray-600 mb-4">
          Accede a todo el contenido y prepárate para tu carrera corporativa
        </p>
        
        <div className="flex items-baseline justify-center gap-2 mb-6">
          <span className="text-5xl font-bold text-indigo-600">
            {(parseInt(process.env.NEXT_PUBLIC_COURSE_PRICE || "9900") / 100).toFixed(2)}
          </span>
          <span className="text-2xl text-gray-600">
            {process.env.NEXT_PUBLIC_CURRENCY || "EUR"}
          </span>
        </div>

        <ul className="text-left max-w-md mx-auto mb-6 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Acceso completo a todos los módulos</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Actualizaciones de contenido incluidas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Certificado de finalización</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-1">✓</span>
            <span className="text-gray-700">Acceso de por vida</span>
          </li>
        </ul>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {loading ? "Procesando..." : "Comprar Ahora 🚀"}
      </button>

      <p className="text-xs text-gray-500 text-center mt-4">
        Pago seguro procesado por Stripe
      </p>
    </div>
  );
}
