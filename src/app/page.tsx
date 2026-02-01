"use client";

import Link from "next/link";
import { useState } from "react";
import { useInView } from "@/hooks/useInView";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresRef, featuresInView] = useInView({ threshold: 0.2 });
  const [valueRef, valueInView] = useInView({ threshold: 0.2 });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-lg sm:text-2xl font-bold text-blue-600">Mi Primer Trabajo Corporate</h1>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Inicio
              </Link>
              <Link href="/sobre-mi" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Sobre Mí
              </Link>
              <Link href="/curso" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                El Curso
              </Link>
              <Link href="/login" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                Iniciar Sesión
              </Link>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-200 py-2">
              <Link
                href="/"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/sobre-mi"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                Sobre Mí
              </Link>
              <Link
                href="/curso"
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                El Curso
              </Link>
              <Link
                href="/login"
                className="block px-4 py-3 text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-gray-50"
                onClick={() => setMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight animate-[fadeInUp_0.6s_ease-out]">
            Tu Primer Trabajo Corporate
            <span className="block text-blue-600 mt-1 sm:mt-2">Comienza Aquí</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed animate-[fadeInUp_0.6s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
            Descubre todo lo que necesitas saber para triunfar en el mundo corporativo.
            Información valiosa, práctica y directa al punto.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-[fadeInUp_0.6s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
            <Link
              href="/curso"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
            >
              Acceder al Curso
            </Link>
            <Link
              href="/sobre-mi"
              className="w-full sm:w-auto bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-blue-600"
            >
              Conoce Más
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div ref={featuresRef} className="mt-12 sm:mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <div className={`bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${
            featuresInView ? "animate-[fadeInScale_0.6s_ease-out]" : "opacity-0"
          }`}>
            <div className="text-blue-600 text-3xl sm:text-4xl mb-3 sm:mb-4">📚</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Contenido Completo</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Información detallada y organizada sobre todo lo que necesitas saber para tu primer trabajo corporativo.
            </p>
          </div>

          <div className={`bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${
            featuresInView ? "animate-[fadeInScale_0.6s_ease-out_0.15s] [animation-fill-mode:forwards]" : "opacity-0"
          }`}>
            <div className="text-blue-600 text-3xl sm:text-4xl mb-3 sm:mb-4">💼</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Experiencia Real</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Basado en experiencias reales y situaciones prácticas del mundo corporativo actual.
            </p>
          </div>

          <div className={`bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ${
            featuresInView ? "animate-[fadeInScale_0.6s_ease-out_0.3s] [animation-fill-mode:forwards]" : "opacity-0"
          }`}>
            <div className="text-blue-600 text-3xl sm:text-4xl mb-3 sm:mb-4">🎯</div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">Acceso Inmediato</h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Una vez que adquieras el curso, tendrás acceso inmediato y permanente a todo el contenido.
            </p>
          </div>
        </div>

        {/* Testimonial/Value Proposition */}
        <div ref={valueRef} className={`mt-12 sm:mt-16 md:mt-24 bg-white rounded-xl shadow-md p-6 sm:p-8 md:p-12 text-center transition-all duration-300 ${
          valueInView ? "animate-[fadeInScale_0.6s_ease-out]" : "opacity-0"
        }`}>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            ¿Por qué este curso?
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            He recopilado y organizado toda la información esencial que desearía haber conocido
            antes de empezar mi carrera corporativa. Este curso es el resultado de años de experiencia
            y aprendizaje en el mundo empresarial.
          </p>
          <Link
            href="/curso"
            className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Comienza Ahora
          </Link>
        </div>
      </main>
    </div>
  );
}
