import Link from "next/link";

export default function SobreMi() {
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
              <Link href="/sobre-mi" className="text-indigo-600 px-3 py-2 text-sm font-medium border-b-2 border-indigo-600">
                Sobre Mí
              </Link>
              <Link href="/curso" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Sobre Mí
          </h1>
          
          {/* Profile Section */}
          <div className="mb-12">
            <div className="w-32 h-32 bg-indigo-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-6">
              TU
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              [Tu Nombre]
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Bienvenido/a a mi curso. Soy [tu nombre] y he creado este contenido basándome en mi 
              experiencia en el mundo corporativo. A lo largo de mi carrera, he aprendido lecciones 
              valiosas que deseo compartir contigo.
            </p>
          </div>

          {/* Experience Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Mi Experiencia
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              [Aquí puedes escribir sobre tu trayectoria profesional, los roles que has desempeñado, 
              las empresas en las que has trabajado, y los desafíos que has superado.]
            </p>
            <p className="text-gray-600 leading-relaxed">
              [Explica qué te motivó a crear este curso y cómo tu experiencia puede ayudar a otros 
              a tener éxito en sus primeros trabajos corporativos.]
            </p>
          </div>

          {/* Why This Course Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Por qué creé este curso?
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              [Comparte tu motivación personal para crear este curso. ¿Qué problemas observaste? 
              ¿Qué información te hubiera gustado tener cuando empezaste?]
            </p>
            <p className="text-gray-600 leading-relaxed">
              [Explica el valor único que aporta tu perspectiva y experiencia.]
            </p>
          </div>

          {/* What You'll Learn Section */}
          <div className="bg-indigo-50 rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Lo que aprenderás en este curso
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Cómo prepararte para tu primer día en una empresa corporativa</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Estrategias para destacar y crecer profesionalmente</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Cómo navegar la cultura corporativa y las relaciones laborales</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Consejos prácticos basados en experiencias reales</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-600 mr-3 text-xl">✓</span>
                <span className="text-gray-700">Y mucho más contenido valioso para tu desarrollo profesional</span>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="text-gray-600 mb-6">
              Accede al curso completo y empieza tu camino hacia el éxito corporativo.
            </p>
            <Link 
              href="/curso"
              className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
            >
              Ver el Curso
            </Link>
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
