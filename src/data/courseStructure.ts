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
    id: "section-1",
    title: "Conectar tu esencia con tu potencial",
    description: "Repasaremos algunos conceptos y mitos que debes romper para lograr entra al mundo corporativo y haremos algunos ejercicio para identificar tu potencial",
    order: 1,
    modules: [
      {
        id: "module-1-1",
        title: "Lo que eres dentro en el mundo",
        description: "placeholder",
        duration: "20 min",
        order: 1,
      },
      {
        id: "module-1-2",
        title: "El tiempo es el recurso más valioso",
        description: "placeholder",
        duration: "20 min",
        order: 2,
      },
      {
        id: "module-1-3",
        title: "Tus fortalezas, historia de vida ",
        description: "placeholder",
        duration: "20 min",
        order: 3,
      },
      {
        id: "module-1-4",
        title: "Lo que sabes de ti, lo que otros saben de ti ",
        description: "placeholder",
        duration: "20 min",
        order: 4,
      },
      {
        id: "module-1-5",
        title: "Planteate una industria o empresa que te interese",
        description: "placeholder",
        duration: "20 min",
        order: 5,
      },
      {
        id: "module-1-6",
        title: "Ejercicios de autoconocimiento",
        description: "placeholder",
        duration: "20 min",
        order: 6,
      },
    ],
  },
  {
    id: "section-2",
    title: "Aplicando lo que sabes de ti para empezar a aplicar",
    description: "Desarrolla las habilidades clave para el éxito",
    order: 2,
    modules: [
      {
        id: "module-2-1",
        title: "Comunicación efectiva en el trabajo",
        description: "Aprende a comunicarte profesionalmente",
        duration: "25 min",
        order: 1,
      },
      {
        id: "module-2-2",
        title: "Gestión del tiempo y productividad",
        description: "Optimiza tu tiempo y aumenta tu productividad",
        duration: "20 min",
        order: 2,
      },
    ],
  },
  {
    id: "section-3",
    title: "Preparándote para la entrevista",
    description: "Desarrolla las habilidades clave para el éxito",
    order: 2,
    modules: [
      {
        id: "module-3-1",
        title: "Preparar tu perfil ",
        description: "Aprende a comunicarte profesionalmente",
        duration: "25 min",
        order: 1,
      },
      {
        id: "module-3-2",
        title: "Practicar antes de la entrevista",
        description: "Optimiza tu tiempo y aumenta tu productividad",
        duration: "20 min",
        order: 2,
      },
    ],
  },
  {
    id: "section-4",
    title: "Consejos y Recursos adicionales",
    description: "Gran parte del proceso en tener paciencia",
    order: 2,
    modules: [
      {
        id: "module-4-1",
        title: "Consejos adicionales",
        description: "",
        duration: "25 min",
        order: 1,
      },
      {
        id: "module-4-2",
        title: "Recursos adicionales",
        description: "",
        duration: "20 min",
        order: 2,
      },
      {
        id: "module-4-3",
        title: "Agradecimientos y cierre adicionales",
        description: "",
        duration: "20 min",
        order: 3,
      },
      {
        id: "module-4-4",
        title: "Certificado de completado",
        description: "Tendra que compartir tu experiencia",
        duration: "15 min",
        order: 4,
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
