"use client";

import Link from "next/link";
import { useState } from "react";

export default function Curso() {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      // This will call our Stripe checkout API
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al procesar tu solicitud. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

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
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Inicio
              </Link>
              <Link href="/sobre-mi" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Sobre Mí
              </Link>
              <Link href="/curso" className="text-indigo-600 px-3 py-2 text-sm font-medium border-b-2 border-indigo-600">
                El Curso
              </Link>
              <Link href="/login" className="text-indigo-600 hover:text-indigo-800 px-3 py-2 text-sm font-medium">
                Iniciar Sesión
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Mi Primer Trabajo Corporate
          </h1>
          <p className="text-xl text-gray-600">
            Todo lo que necesitas saber para triunfar en el mundo corporativo
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Course Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Qué incluye el curso?
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <span className="text-indigo-600 mr-3 text-2xl">📖</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Contenido Completo</h3>
                  <p className="text-gray-600">Acceso a todo el material del curso organizado por módulos</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-indigo-600 mr-3 text-2xl">♾️</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Acceso de por Vida</h3>
                  <p className="text-gray-600">Una vez que compres el curso, es tuyo para siempre</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-indigo-600 mr-3 text-2xl">📝</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Documentos Descargables</h3>
                  <p className="text-gray-600">Material de apoyo que puedes descargar y consultar</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="text-indigo-600 mr-3 text-2xl">🔄</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Actualizaciones Incluidas</h3>
                  <p className="text-gray-600">Recibe nuevas actualizaciones del contenido sin costo adicional</p>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Módulos del Curso
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Preparación para tu primer día</li>
                <li>• Cultura corporativa y adaptación</li>
                <li>• Comunicación efectiva en el trabajo</li>
                <li>• Gestión del tiempo y productividad</li>
                <li>• Desarrollo de carrera profesional</li>
                <li>• Networking y relaciones laborales</li>
                <li>• Y mucho más...</li>
              </ul>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Inversión en tu Futuro
              </h2>
              <div className="mb-6">
                <span className="text-5xl font-bold text-indigo-600">€99</span>
                <span className="text-gray-600 ml-2">pago único</span>
              </div>
              <p className="text-gray-600">
                Acceso completo y permanente al curso
              </p>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Acceso inmediato al contenido</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Sin suscripciones mensuales</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Actualizaciones gratuitas</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Soporte por email</span>
              </div>
            </div>

            <button
              onClick={handlePurchase}
              disabled={loading}
              className="w-full bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Procesando..." : "Comprar Ahora"}
            </button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Pago seguro procesado por Stripe
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Preguntas Frecuentes
          </h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">¿Cuánto tiempo tengo acceso al curso?</h3>
              <p className="text-gray-600">Tienes acceso de por vida. Una vez que compres el curso, es tuyo para siempre.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-2">¿Puedo descargar el contenido?</h3>
              <p className="text-gray-600">Sí, todos los documentos y materiales del curso están disponibles para descarga.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-2">¿Hay algún costo adicional?</h3>
              <p className="text-gray-600">No, el precio que ves es el precio final. No hay costos ocultos ni suscripciones mensuales.</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 mb-2">¿Qué métodos de pago aceptan?</h3>
              <p className="text-gray-600">Aceptamos todas las tarjetas de crédito y débito principales a través de Stripe.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white mt-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600">
            <p>&copy; 2025 Mi Primer Trabajo Corporate. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
