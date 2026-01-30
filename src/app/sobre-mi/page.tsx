"use client";

import Link from "next/link";
import { useState } from "react";

export default function SobreMi() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-lg sm:text-2xl font-bold text-blue-600 cursor-pointer">Mi Primer Trabajo Corporate</h1>
              </Link>
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
              <Link href="/sobre-mi" className="text-blue-600 px-3 py-2 text-sm font-medium border-b-2 border-blue-600">
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
                className="block px-4 py-3 text-base font-medium text-blue-600 hover:bg-gray-50"
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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="bg-white rounded-lg shadow p-5 sm:p-8 md:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">
            Sobre Mí
          </h1>

          {/* Profile Section */}
          <div className="mb-8 sm:mb-12">
            <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              JL
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Jose Luis Colmenares
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4 sm:mb-6">
              Bienvenido a mi curso. Soy Jose Luis Colmenares y he creado este contenido basándome en mi
              experiencia en el mundo corporativo. A lo largo de mi carrera, he aprendido lecciones
              valiosas que deseo compartir contigo.
            </p>
          </div>

          {/* Experience Section */}
          <div className="mb-8 sm:mb-12">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Mi Experiencia
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
              [Aquí puedes escribir sobre tu trayectoria profesional, los roles que has desempeñado,
              las empresas en las que has trabajado, y los desafíos que has superado.]
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              [Explica qué te motivó a crear este curso y cómo tu experiencia puede ayudar a otros
              a tener éxito en sus primeros trabajos corporativos.]
            </p>
          </div>

          {/* Why This Course Section */}
          <div className="mb-8 sm:mb-12">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              ¿Por qué creé este curso?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
              [Comparte tu motivación personal para crear este curso. ¿Qué problemas observaste?
              ¿Qué información te hubiera gustado tener cuando empezaste?]
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              [Explica el valor único que aporta tu perspectiva y experiencia.]
            </p>
          </div>

          {/* What You'll Learn Section */}
          <div className="bg-blue-50 rounded-xl p-5 sm:p-6 md:p-8 mb-8 sm:mb-12">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Lo que aprenderás en este curso
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base text-gray-700">Cómo prepararte para tu primer día en una empresa corporativa</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base text-gray-700">Estrategias para destacar y crecer profesionalmente</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base text-gray-700">Cómo navegar la cultura corporativa y las relaciones laborales</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base text-gray-700">Consejos prácticos basados en experiencias reales</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                <span className="text-sm sm:text-base text-gray-700">Y mucho más contenido valioso para tu desarrollo profesional</span>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Accede al curso completo y empieza tu camino hacia el éxito corporativo.
            </p>
            <Link
              href="/curso"
              className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              Ver el Curso
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
