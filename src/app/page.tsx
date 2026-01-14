import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">Mi Primer Trabajo Corporate</h1>
            </div>
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
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
            Tu Primer Trabajo Corporate
            <span className="block text-blue-600 mt-2">Comienza Aquí</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Descubre todo lo que necesitas saber para triunfar en el mundo corporativo. 
            Información valiosa, práctica y directa al punto.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/curso"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
            >
              Acceder al Curso
            </Link>
            <Link 
              href="/sobre-mi"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors border-2 border-blue-600"
            >
              Conoce Más
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Contenido Completo</h3>
            <p className="text-gray-600">
              Información detallada y organizada sobre todo lo que necesitas saber para tu primer trabajo corporativo.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">💼</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Experiencia Real</h3>
            <p className="text-gray-600">
              Basado en experiencias reales y situaciones prácticas del mundo corporativo actual.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-blue-600 text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Acceso Inmediato</h3>
            <p className="text-gray-600">
              Una vez que adquieras el curso, tendrás acceso inmediato y permanente a todo el contenido.
            </p>
          </div>
        </div>

        {/* Testimonial/Value Proposition */}
        <div className="mt-24 bg-white rounded-lg shadow p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            ¿Por qué este curso?
          </h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            He recopilado y organizado toda la información esencial que desearía haber conocido 
            antes de empezar mi carrera corporativa. Este curso es el resultado de años de experiencia 
            y aprendizaje en el mundo empresarial.
          </p>
          <Link 
            href="/curso"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Comienza Ahora
          </Link>
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
