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
    title: "Optimización del CV y posicionamiento",
    description: "Crea un currículum impactante y posiciónate como el candidato ideal",
    order: 3,
    modules: [
      {
        id: "module-3-1",
        title: "Estructura de un CV efectivo",
        description: "Aprende la estructura ideal para tu currículum",
        duration: "25 min",
        order: 1,
      },
      {
        id: "module-3-2",
        title: "Palabras clave y ATS",
        description: "Optimiza tu CV para sistemas de seguimiento",
        duration: "20 min",
        order: 2,
      },
      {
        id: "module-3-3",
        title: "LinkedIn y marca personal",
        description: "Construye tu presencia profesional online",
        duration: "20 min",
        order: 3,
      },
    ],
  },
  {
    id: "section-4",
    title: "Preparación de entrevistas",
    description: "Domina las técnicas para destacar en cualquier entrevista de trabajo",
    order: 4,
    modules: [
      {
        id: "module-4-1",
        title: "Tipos de entrevistas",
        description: "Conoce los diferentes formatos de entrevista",
        duration: "20 min",
        order: 1,
      },
      {
        id: "module-4-2",
        title: "Preguntas frecuentes y respuestas",
        description: "Prepárate para las preguntas más comunes",
        duration: "25 min",
        order: 2,
      },
      {
        id: "module-4-3",
        title: "Comunicación no verbal",
        description: "Domina el lenguaje corporal en entrevistas",
        duration: "15 min",
        order: 3,
      },
    ],
  },
  {
    id: "section-5",
    title: "Iteración y visibilidad profesional",
    description: "Mantén tu perfil actualizado y aumenta tu visibilidad en el mercado",
    order: 5,
    modules: [
      {
        id: "module-5-1",
        title: "Networking efectivo",
        description: "Construye y mantén una red de contactos profesionales",
        duration: "20 min",
        order: 1,
      },
      {
        id: "module-5-2",
        title: "Mejora continua del perfil",
        description: "Itera y mejora constantemente tu marca personal",
        duration: "15 min",
        order: 2,
      },
      {
        id: "module-5-3",
        title: "Próximos pasos y cierre",
        description: "Plan de acción y recursos adicionales",
        duration: "15 min",
        order: 3,
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
