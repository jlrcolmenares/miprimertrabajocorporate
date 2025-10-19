"use client";

import { Section } from "@/data/courseStructure";
import ModuleCard from "@/components/ModuleCard";

interface CourseSectionProps {
  section: Section;
  completedModules: string[];
  onModuleToggle: (moduleId: string, completed: boolean) => Promise<void>;
}

export default function CourseSection({
  section,
  completedModules,
  onModuleToggle,
}: CourseSectionProps) {
  const completedCount = section.modules.filter((module) =>
    completedModules.includes(module.id)
  ).length;
  const totalCount = section.modules.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      {/* Section Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
          <span className="text-sm text-gray-600">
            {completedCount}/{totalCount} completados
          </span>
        </div>
        <p className="text-gray-600 mb-4">{section.description}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-4">
        {section.modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            isCompleted={completedModules.includes(module.id)}
            onToggle={onModuleToggle}
          />
        ))}
      </div>
    </div>
  );
}
