"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  name: string;
  hasPaid: boolean;
}

const modules = [
  {
    id: 1,
    title: "Preparación para tu primer día",
    description: "Todo lo que necesitas saber antes de empezar",
    content: `
# Preparación para tu primer día

## Introducción
Tu primer día en una empresa corporativa puede ser emocionante y abrumador al mismo tiempo. Esta guía te ayudará a prepararte adecuadamente.

## Antes del primer día

### Documentación
- Asegúrate de tener todos los documentos necesarios
- Revisa el email de bienvenida
- Confirma la hora y lugar de llegada

### Vestimenta
- Investiga el código de vestimenta de la empresa
- Prepara tu ropa con anticipación
- Cuando tengas dudas, es mejor ir más formal

### Mentalidad
- Descansa bien la noche anterior
- Llega temprano (15-20 minutos antes)
- Mantén una actitud positiva y abierta

## Durante el primer día

### Primeras impresiones
- Saluda a todos con una sonrisa
- Presenta tu nombre claramente
- Muestra interés genuino en conocer a tus compañeros

### Toma notas
- Lleva una libreta contigo
- Anota nombres, procesos y tareas
- No tengas miedo de hacer preguntas

### Observa y aprende
- Presta atención a la cultura de la empresa
- Observa cómo se comunican los demás
- Identifica a las personas clave en tu equipo

## Consejos adicionales

1. **Sé puntual**: La puntualidad es fundamental en el ambiente corporativo
2. **Sé proactivo**: Ofrece ayuda cuando sea apropiado
3. **Sé paciente**: No esperes entender todo el primer día
4. **Sé auténtico**: Muestra tu verdadera personalidad profesional

## Tareas para completar

- [ ] Revisar el organigrama de la empresa
- [ ] Configurar tu estación de trabajo
- [ ] Conocer a tu equipo inmediato
- [ ] Entender tus primeras responsabilidades
- [ ] Programar reuniones 1-on-1 con tu supervisor

---

**Recuerda**: Todos han tenido un primer día. Es normal sentirse nervioso, pero con la preparación adecuada, tendrás éxito.
    `,
  },
  {
    id: 2,
    title: "Cultura corporativa y adaptación",
    description: "Cómo integrarte exitosamente en tu nueva empresa",
    content: `
# Cultura corporativa y adaptación

## ¿Qué es la cultura corporativa?

La cultura corporativa son los valores, creencias, comportamientos y prácticas que caracterizan a una organización.

## Elementos clave

### Valores de la empresa
- Identifica los valores fundamentales
- Observa cómo se manifiestan en el día a día
- Alinea tus acciones con estos valores

### Comunicación
- Aprende el estilo de comunicación preferido
- Entiende la jerarquía y protocolos
- Adapta tu forma de comunicarte

### Horarios y expectativas
- Comprende las expectativas de horario
- Observa los patrones de trabajo del equipo
- Encuentra el equilibrio entre vida personal y laboral

## Proceso de adaptación

1. **Primeras semanas**: Observa y aprende
2. **Primer mes**: Comienza a contribuir activamente
3. **Primeros tres meses**: Establece tu ritmo y estilo

---

[Aquí puedes agregar tu contenido específico sobre cultura corporativa]
    `,
  },
  // Add more modules as needed
];

export default function ModuleContent() {
  const router = useRouter();
  const params = useParams();
  const moduleId = parseInt(params.moduleId as string);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/login");
      return;
    }
    const userData = JSON.parse(userStr);
    setUser(userData);

    if (!userData.hasPaid) {
      router.push("/curso");
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const module = modules.find((m) => m.id === moduleId);

  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Módulo no encontrado</h1>
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800">
            Volver al Dashboard
          </Link>
        </div>
      </div>
    );
  }

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
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium">
                Dashboard
              </Link>
              <span className="text-gray-700">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/dashboard" className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block">
            ← Volver al Dashboard
          </Link>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl mr-4">
              {moduleId}
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {module.title}
              </h1>
              <p className="text-gray-600 mt-1">
                {module.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {module.content}
            </div>
          </div>
        </div>

        {/* Navigation between modules */}
        <div className="flex justify-between items-center">
          {moduleId > 1 ? (
            <Link
              href={`/dashboard/contenido/${moduleId - 1}`}
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Módulo Anterior
            </Link>
          ) : (
            <div></div>
          )}

          {moduleId < 7 ? (
            <Link
              href={`/dashboard/contenido/${moduleId + 1}`}
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Siguiente Módulo
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </main>
    </div>
  );
}
