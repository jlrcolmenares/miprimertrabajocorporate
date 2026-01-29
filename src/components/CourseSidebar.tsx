"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { courseStructure, Section } from "@/data/courseStructure";

interface CourseSidebarProps {
  completedModules?: string[];
  showBackLink?: boolean;
  headerTitle?: string;
}

export default function CourseSidebar({
  completedModules = [],
  showBackLink = true,
  headerTitle = "Dashboard"
}: CourseSidebarProps) {
  const pathname = usePathname();
  const currentModuleId = pathname?.split("/").pop() || "";

  // Track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  // Mobile menu state
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Auto-expand section containing current module
  useEffect(() => {
    const currentSection = courseStructure.find((section) =>
      section.modules.some((module) => module.id === currentModuleId)
    );
    if (currentSection) {
      setExpandedSections((prev) => new Set(prev).add(currentSection.id));
    }
  }, [currentModuleId]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const getCompletedCount = (section: Section) => {
    return section.modules.filter((m) => completedModules.includes(m.id)).length;
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-72 bg-white border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0
          fixed lg:sticky top-0 z-40
          transform transition-transform duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          {showBackLink ? (
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">{headerTitle}</span>
            </Link>
          ) : (
            <div className="flex items-center gap-2 text-gray-900">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span className="font-semibold">{headerTitle}</span>
            </div>
          )}
        </div>

      {/* Course Navigation */}
      <nav className="p-2">
        {courseStructure.map((section) => {
          const isExpanded = expandedSections.has(section.id);
          const completedCount = getCompletedCount(section);
          const totalModules = section.modules.length;
          const hasCurrentModule = section.modules.some((m) => m.id === currentModuleId);

          return (
            <div key={section.id} className="mb-1">
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-colors ${
                  hasCurrentModule
                    ? "bg-blue-50 text-blue-900"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Section number */}
                  <span
                    className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center ${
                      hasCurrentModule
                        ? "bg-blue-600 text-white"
                        : completedCount === totalModules
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {section.order}
                  </span>
                  <span className="font-medium text-sm truncate">{section.title}</span>
                </div>

                {/* Expand/Collapse Icon */}
                <svg
                  className={`w-4 h-4 flex-shrink-0 text-gray-400 transition-transform ${
                    isExpanded ? "rotate-90" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Module List */}
              {isExpanded && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {section.modules.map((module) => {
                    const isActive = module.id === currentModuleId;
                    const isCompleted = completedModules.includes(module.id);

                    return (
                      <Link
                        key={module.id}
                        href={`/dashboard/contenido/${module.id}`}
                        className={`flex items-center gap-2 p-2 pl-5 rounded-md text-sm transition-colors ${
                          isActive
                            ? "bg-blue-100 text-blue-900 font-medium"
                            : isCompleted
                            ? "text-green-700 hover:bg-green-50"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {/* Status indicator */}
                        {isCompleted ? (
                          <svg className="w-4 h-4 flex-shrink-0 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <span
                            className={`w-4 h-4 flex-shrink-0 rounded-full border-2 ${
                              isActive ? "border-blue-600" : "border-gray-300"
                            }`}
                          />
                        )}
                        <span className="truncate">{module.title}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Progress Footer */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="text-xs text-gray-500 mb-2">Progreso del curso</div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{
                width: `${(completedModules.length / courseStructure.flatMap((s) => s.modules).length) * 100}%`,
              }}
            />
          </div>
          <span className="text-xs font-medium text-gray-600">
            {completedModules.length}/{courseStructure.flatMap((s) => s.modules).length}
          </span>
        </div>
      </div>
      </aside>
    </>
  );
}
