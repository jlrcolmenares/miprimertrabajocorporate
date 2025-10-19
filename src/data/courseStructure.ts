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
    title: "Fundamentos Corporativos",
    description: "Aprende los conceptos básicos del mundo corporativo",
    order: 1,
    modules: [
      {
        id: "module-1-1",
        title: "Preparación para tu primer día",
        description: "Todo lo que necesitas saber antes de empezar",
        duration: "15 min",
        order: 1,
      },
      {
        id: "module-1-2",
        title: "Cultura corporativa y adaptación",
        description: "Entiende la cultura y valores de tu empresa",
        duration: "20 min",
        order: 2,
      },
    ],
  },
  {
    id: "section-2",
    title: "Habilidades Profesionales",
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
