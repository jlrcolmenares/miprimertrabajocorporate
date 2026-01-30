// Course structure with sections and modules

export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "15 min"
  order: number;
}

export interface Section {
  id: string;
  title: string;
  description: string;
  order: number;
  modules: Module[];
}

export const courseStructure: Section[] = [
  {
    id: "section-0",
    title: "Introducción",
    description: "Bienvenida al curso y presentación del taller",
    order: 0,
    modules: [
      {
        id: "module-0-1",
        title: "Presentación",
        description: "Introducción al curso y objetivos",
        duration: "10 min",
        order: 1,
      },
    ],
  },
  {
    id: "section-1",
    title: "Análisis del perfil profesional",
    description: "Identifica tus fortalezas, habilidades y áreas de mejora para construir un perfil profesional sólido",
    order: 1,
    modules: [
      {
        id: "module-1-1",
        title: "Tu historia personal y laboral",
        description: "Documenta todo lo que has hecho y lo que te ha gustado hacer",
        duration: "30 min",
        order: 1,
      },
      {
        id: "module-1-2",
        title: "Hacer match con tus talentos",
        description: "Entiende qué es la empleabilidad y cómo conectar tus habilidades con el mercado",
        duration: "15 min",
        order: 2,
      },
      {
        id: "module-1-3",
        title: "Un abanico de oportunidades",
        description: "Descubre puestos corporativos compatibles con tu perfil usando AI",
        duration: "20 min",
        order: 3,
      },
    ],
  },
  {
    id: "section-2",
    title: "Conócete a ti mismo",
    description: "Identifica tus fortalezas, talentos y motivaciones para construir tu carrera",
    order: 2,
    modules: [
      {
        id: "module-2-1",
        title: "Diseñar tu carrera profesional",
        description: "Tu compromiso y responsabilidad de diseñar tu carrera",
        duration: "15 min",
        order: 1,
      },
      {
        id: "module-2-2",
        title: "Lo que otros ven en ti",
        description: "Descubre tus fortalezas preguntándole a quienes te conocen",
        duration: "15 min",
        order: 2,
      },
      {
        id: "module-2-3",
        title: "El test de Gallup",
        description: "Una herramienta opcional para poner nombre a tus talentos",
        duration: "15 min",
        order: 3,
      },
      {
        id: "module-2-4",
        title: "Tu motivación",
        description: "Identifica qué te mueve y por qué haces lo que haces",
        duration: "15 min",
        order: 4,
      },
    ],
  },
  {
    id: "section-3",
    title: "Análisis del mercado laboral",
    description: "Aprende a leer el mercado, identificar oportunidades y formarte para los puestos que te interesan",
    order: 3,
    modules: [
      {
        id: "module-3-1",
        title: "Empleabilidad en un mundo cambiante",
        description: "Entiende cómo el contexto mundial afecta tu carrera y cómo adaptarte",
        duration: "15 min",
        order: 1,
      },
      {
        id: "module-3-2",
        title: "Conocer los cargos",
        description: "Investiga las posiciones que te interesan y elige las 3 que más encajan contigo",
        duration: "20 min",
        order: 2,
      },
      {
        id: "module-3-3",
        title: "Portales de empleo",
        description: "Busca ofertas reales y descubre qué posiciones tienen demanda en tu zona",
        duration: "20 min",
        order: 3,
      },
      {
        id: "module-3-4",
        title: "Formarte para el cargo",
        description: "Identifica qué necesitas aprender y por qué los idiomas son tu mejor inversión",
        duration: "15 min",
        order: 4,
      },
    ],
  },
  {
    id: "section-4",
    title: "Preparación del CV",
    description: "Construye un currículum que te abra las puertas a la primera entrevista",
    order: 4,
    modules: [
      {
        id: "module-4-1",
        title: "El objetivo del CV",
        description: "Entiende para qué sirve realmente tu currículum",
        duration: "10 min",
        order: 1,
      },
      {
        id: "module-4-2",
        title: "CVs customizados",
        description: "Aprende a adaptar tu CV según la posición que buscas",
        duration: "15 min",
        order: 2,
      },
      {
        id: "module-4-3",
        title: "La línea conductora",
        description: "Encuentra el hilo que conecta tus decisiones profesionales",
        duration: "15 min",
        order: 3,
      },
      {
        id: "module-4-4",
        title: "Estructurar tu historia",
        description: "Usa AI para dar forma a tu historia profesional",
        duration: "20 min",
        order: 4,
      },
      {
        id: "module-4-5",
        title: "Estructura del CV",
        description: "Las partes esenciales de un CV efectivo y cómo organizarlas",
        duration: "15 min",
        order: 5,
      },
    ],
  },
  {
    id: "section-5",
    title: "Preparación de entrevistas",
    description: "Domina las técnicas para destacar en cualquier entrevista de trabajo",
    order: 5,
    modules: [
      {
        id: "module-5-1",
        title: "Qué buscan los reclutadores",
        description: "Entiende qué miden las entrevistas y por qué debes practicarlas",
        duration: "10 min",
        order: 1,
      },
      {
        id: "module-5-2",
        title: "El método STAR",
        description: "La metodología que usan los reclutadores para evaluar competencias",
        duration: "15 min",
        order: 2,
      },
      {
        id: "module-5-3",
        title: "Conocer a la empresa",
        description: "Investiga la empresa antes de la entrevista",
        duration: "10 min",
        order: 3,
      },
      {
        id: "module-5-4",
        title: "Tu guión de entrevista",
        description: "Usa AI para preparar respuestas STAR personalizadas",
        duration: "20 min",
        order: 4,
      },
      {
        id: "module-5-5",
        title: "Perfiles similares",
        description: "Investiga quién trabaja en posiciones como la que buscas",
        duration: "10 min",
        order: 5,
      },
      {
        id: "module-5-6",
        title: "Simular la entrevista",
        description: "Practica con AI antes del día real",
        duration: "20 min",
        order: 6,
      },
    ],
  },
  {
    id: "section-6",
    title: "Hacer ruido en la web",
    description: "Estrategias activas y pasivas para aumentar tu visibilidad profesional",
    order: 6,
    modules: [
      {
        id: "module-6-1",
        title: "Estrategia activa",
        description: "Crea alertas y mantente aplicando mientras practicas",
        duration: "10 min",
        order: 1,
      },
      {
        id: "module-6-2",
        title: "Estrategia pasiva",
        description: "Optimiza tu perfil de LinkedIn para ser encontrado",
        duration: "15 min",
        order: 2,
      },
      {
        id: "module-6-3",
        title: "Ser creativo se premia",
        description: "Destaca con contenido y liderazgo de opinión",
        duration: "10 min",
        order: 3,
      },
      {
        id: "module-6-4",
        title: "Tu portafolio",
        description: "Muestra tu trabajo en la economía de creadores",
        duration: "15 min",
        order: 4,
      },
    ],
  },
  {
    id: "section-7",
    title: "Cierre",
    description: "Reflexiones finales, recursos adicionales y próximos pasos",
    order: 7,
    modules: [
      {
        id: "module-7-1",
        title: "Tu caja de herramientas",
        description: "Reflexión sobre todo lo aprendido y cómo combinarlo",
        duration: "10 min",
        order: 1,
      },
      {
        id: "module-7-2",
        title: "El cambio de mentalidad",
        description: "La transformación interna que requiere este proceso",
        duration: "10 min",
        order: 2,
      },
      {
        id: "module-7-3",
        title: "Entender el sistema",
        description: "Cómo funciona la creación de riqueza y tu rol en ella",
        duration: "10 min",
        order: 3,
      },
      {
        id: "module-7-4",
        title: "Recursos adicionales",
        description: "Influencers y fuentes de información actualizadas",
        duration: "5 min",
        order: 4,
      },
      {
        id: "module-7-5",
        title: "Gracias y próximos pasos",
        description: "Cierre del taller y cómo seguir en contacto",
        duration: "5 min",
        order: 5,
      },
    ],
  },
];

// Helper function to get all modules across all sections
export function getAllModules(): Module[] {
  return courseStructure.flatMap((section) => section.modules);
}

// Helper function to get a specific module by ID
export function getModuleById(moduleId: string): Module | undefined {
  return getAllModules().find((module) => module.id === moduleId);
}

// Helper function to get section by module ID
export function getSectionByModuleId(moduleId: string): Section | undefined {
  return courseStructure.find((section) =>
    section.modules.some((module) => module.id === moduleId)
  );
}

// Helper function to get total module count
export function getTotalModuleCount(): number {
  return getAllModules().length;
}

// Helper function to get next module
export function getNextModule(moduleId: string): Module | undefined {
  const allModules = getAllModules();
  const currentIndex = allModules.findIndex((m) => m.id === moduleId);
  if (currentIndex === -1 || currentIndex === allModules.length - 1) {
    return undefined;
  }
  return allModules[currentIndex + 1];
}

// Helper function to get previous module
export function getPreviousModule(moduleId: string): Module | undefined {
  const allModules = getAllModules();
  const currentIndex = allModules.findIndex((m) => m.id === moduleId);
  if (currentIndex <= 0) {
    return undefined;
  }
  return allModules[currentIndex - 1];
}
