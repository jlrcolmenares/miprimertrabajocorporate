"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ¡Pago Exitoso!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Gracias por tu compra. Ya tienes acceso al curso completo.
          </p>
        </div>

        <div className="bg-indigo-50 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            ¿Qué sigue?
          </h2>
          <div className="text-left space-y-3">
            <div className="flex items-start">
              <span className="text-indigo-600 mr-3 text-xl">1.</span>
              <p className="text-gray-700">Recibirás un email de confirmación con los detalles de tu compra</p>
            </div>
            <div className="flex items-start">
              <span className="text-indigo-600 mr-3 text-xl">2.</span>
              <p className="text-gray-700">Crea tu cuenta o inicia sesión para acceder al contenido</p>
            </div>
            <div className="flex items-start">
              <span className="text-indigo-600 mr-3 text-xl">3.</span>
              <p className="text-gray-700">Comienza a aprender y avanza a tu propio ritmo</p>
            </div>
          </div>
        </div>

        {sessionId && (
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              ID de Sesión: <span className="font-mono text-xs">{sessionId}</span>
            </p>
          </div>
        )}

        <div className="space-y-4">
          <Link 
            href="/login"
            className="block w-full bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Acceder al Curso
          </Link>
          <Link 
            href="/"
            className="block w-full bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-indigo-600"
          >
            Volver al Inicio
          </Link>
        </div>

        <p className="text-sm text-gray-500 mt-8">
          Si tienes alguna pregunta, no dudes en contactarnos.
        </p>
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
