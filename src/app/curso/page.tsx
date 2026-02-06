"use client";

import Link from "next/link";
import { useState } from "react";

export default function Curso() {
  const [menuOpen, setMenuOpen] = useState(false);

  const emailSubject = encodeURIComponent("Quiero acceder al curso Incorporate");
  const emailBody = encodeURIComponent(
    "Hola Jose Luis,\n\nEstoy interesado/a en adquirir el curso 'Incorporate'.\n\nMis datos:\n- Nombre: \n- Email: \n\nQuedo atento/a a tu respuesta.\n\nSaludos."
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-brand)' }}>
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-lg sm:text-2xl font-bold cursor-pointer" style={{ color: 'var(--primary)' }}>Incorporate</h1>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 nav-link-hover"
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
              <Link href="/" className="text-gray-700 nav-link-hover px-3 py-2 text-sm font-medium rounded-lg">
                Inicio
              </Link>
              <Link href="/sobre-mi" className="text-gray-700 nav-link-hover px-3 py-2 text-sm font-medium rounded-lg">
                Sobre Mí
              </Link>
              <Link href="/curso" className="px-3 py-2 text-sm font-medium border-b-2" style={{ color: 'var(--primary)', borderColor: 'var(--primary)' }}>
                El Curso
              </Link>
              <Link href="/login" className="px-3 py-2 text-sm font-medium transition-colors" style={{ color: 'var(--primary)' }}>
                Iniciar Sesión
              </Link>
            </div>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-gray-200 py-2">
              <Link
                href="/"
                className="block px-4 py-3 text-base font-medium text-gray-700 nav-link-hover rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link
                href="/sobre-mi"
                className="block px-4 py-3 text-base font-medium text-gray-700 nav-link-hover rounded-lg"
                onClick={() => setMenuOpen(false)}
              >
                Sobre Mí
              </Link>
              <Link
                href="/curso"
                className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-lg"
                style={{ color: 'var(--primary)' }}
                onClick={() => setMenuOpen(false)}
              >
                El Curso
              </Link>
              <Link
                href="/login"
                className="block px-4 py-3 text-base font-medium hover:bg-gray-50 rounded-lg"
                style={{ color: 'var(--primary)' }}
                onClick={() => setMenuOpen(false)}
              >
                Iniciar Sesión
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Incorporate
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Todo lo que necesitas saber para triunfar en el mundo corporativo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Course Details */}
          <div className="bg-white rounded-lg shadow p-5 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              ¿Qué incluye el curso?
            </h2>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="flex items-start">
                <span className="mr-2 sm:mr-3 text-xl sm:text-2xl flex-shrink-0" style={{ color: 'var(--primary)' }}>📚</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">8 Secciones Completas</h3>
                  <p className="text-gray-600 text-sm sm:text-base">33 módulos de contenido estructurado y práctico</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="mr-2 sm:mr-3 text-xl sm:text-2xl flex-shrink-0" style={{ color: 'var(--primary)' }}>♾️</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Acceso de por Vida</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Una vez que compres el curso, es tuyo para siempre</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="mr-2 sm:mr-3 text-xl sm:text-2xl flex-shrink-0" style={{ color: 'var(--primary)' }}>📝</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Material Descargable</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Recursos y plantillas para tu búsqueda de empleo</p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="mr-2 sm:mr-3 text-xl sm:text-2xl flex-shrink-0" style={{ color: 'var(--primary)' }}>🔄</span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Actualizaciones Incluidas</h3>
                  <p className="text-gray-600 text-sm sm:text-base">Contenido nuevo sin costo adicional</p>
                </div>
              </div>
            </div>

            {/* Course Structure */}
            <div className="rounded-xl p-4 sm:p-5 md:p-6" style={{ backgroundColor: 'var(--accent-brand)' }}>
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
                Estructura del Curso
              </h3>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start">
                  <span className="text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--primary)' }}>0</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Introducción</p>
                    <p className="text-gray-500 text-xs sm:text-sm">Bienvenida y visión general del curso</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--primary)' }}>1</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Análisis del perfil profesional</p>
                    <p className="text-gray-500 text-xs sm:text-sm">3 módulos</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--primary)' }}>2</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Conócete a ti mismo</p>
                    <p className="text-gray-500 text-xs sm:text-sm">4 módulos</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--primary)' }}>3</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Análisis del mercado laboral</p>
                    <p className="text-gray-500 text-xs sm:text-sm">4 módulos</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--primary)' }}>4</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Preparación del CV</p>
                    <p className="text-gray-500 text-xs sm:text-sm">5 módulos</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--primary)' }}>5</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Preparación de entrevistas</p>
                    <p className="text-gray-500 text-xs sm:text-sm">6 módulos</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--primary)' }}>6</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Ser un líder de opinión</p>
                    <p className="text-gray-500 text-xs sm:text-sm">4 módulos</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <span className="text-white text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--primary)' }}>7</span>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">Cierre</p>
                    <p className="text-gray-500 text-xs sm:text-sm">5 módulos - Recursos y próximos pasos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-lg shadow p-5 sm:p-6 md:p-8 flex flex-col">
            <div className="text-center mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                Inversión en tu Futuro
              </h2>
              <div className="mb-4 sm:mb-6">
                <span className="text-4xl sm:text-5xl font-bold" style={{ color: 'var(--primary)' }}>€99</span>
                <span className="text-gray-600 ml-2 text-sm sm:text-base">pago único</span>
              </div>
              <p className="text-gray-600 text-sm sm:text-base">
                Acceso completo y permanente al curso
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-grow">
              <div className="flex items-center">
                <span className="text-green-500 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700 text-sm sm:text-base">33 módulos de contenido</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700 text-sm sm:text-base">Acceso inmediato tras confirmación</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700 text-sm sm:text-base">Sin suscripciones mensuales</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700 text-sm sm:text-base">Actualizaciones gratuitas</span>
              </div>
              <div className="flex items-center">
                <span className="text-green-500 mr-2 sm:mr-3 text-lg sm:text-xl flex-shrink-0">✓</span>
                <span className="text-gray-700 text-sm sm:text-base">Soporte directo por email</span>
              </div>
            </div>

            <a
              href={`mailto:jlrcc991@hotmail.com?subject=${emailSubject}&body=${emailBody}`}
              className="w-full text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors shadow-lg hover:shadow-xl text-center block"
              style={{ backgroundColor: 'var(--primary)' }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary-hover)')}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'var(--primary)')}
            >
              Solicitar Acceso
            </a>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 rounded-lg" style={{ backgroundColor: 'var(--background-brand)' }}>
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                Al hacer clic, se abrirá tu correo electrónico para enviarme un mensaje.
                Te responderé con las instrucciones de pago y acceso al curso.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-10 sm:mt-12 md:mt-16 bg-white rounded-lg shadow p-5 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-4 sm:space-y-6 max-w-3xl mx-auto">
            <div>
              <h3 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">¿Cómo funciona el proceso de compra?</h3>
              <p className="text-gray-600 text-sm sm:text-base">Haz clic en &quot;Solicitar Acceso&quot; para enviarme un correo. Te responderé con las instrucciones de pago y, una vez confirmado, te enviaré la invitación para acceder al curso.</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">¿Cuánto tiempo tengo acceso al curso?</h3>
              <p className="text-gray-600 text-sm sm:text-base">Tienes acceso de por vida. Una vez que compres el curso, es tuyo para siempre.</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">¿Puedo descargar el contenido?</h3>
              <p className="text-gray-600 text-sm sm:text-base">Sí, todos los documentos y materiales del curso están disponibles para descarga.</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">¿Hay algún costo adicional?</h3>
              <p className="text-gray-600 text-sm sm:text-base">No, el precio que ves es el precio final. No hay costos ocultos ni suscripciones mensuales.</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-1.5 sm:mb-2 text-sm sm:text-base">¿Qué métodos de pago aceptas?</h3>
              <p className="text-gray-600 text-sm sm:text-base">Te indicaré las opciones de pago disponibles cuando me contactes por correo.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
