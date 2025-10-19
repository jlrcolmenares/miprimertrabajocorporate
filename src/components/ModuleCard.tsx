"use client";

import { useState } from "react";
import Link from "next/link";
import { Module } from "@/data/courseStructure";

interface ModuleCardProps {
  module: Module;
  isCompleted: boolean;
  onToggle: (moduleId: string, completed: boolean) => Promise<void>;
}

export default function ModuleCard({
  module,
  isCompleted,
  onToggle,
}: ModuleCardProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await onToggle(module.id, e.target.checked);
    } catch (error) {
      console.error("Error toggling module:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 transition-all ${
        isCompleted
          ? "border-green-300 bg-green-50"
          : "border-gray-200 hover:border-indigo-600 hover:bg-indigo-50"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Completion Checkbox */}
        <div className="flex-shrink-0 pt-1">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleCheckboxChange}
            disabled={loading}
            className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer disabled:opacity-50"
          />
        </div>

        {/* Module Content */}
        <Link
          href={`/dashboard/contenido/${module.id}`}
          className="flex-1 block"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3
                className={`font-semibold text-lg mb-1 ${
                  isCompleted ? "text-green-900" : "text-gray-900"
                }`}
              >
                {module.title}
                {isCompleted && (
                  <span className="ml-2 text-green-600">✓</span>
                )}
              </h3>
              <p className="text-sm text-gray-600 mb-2">
                {module.description}
              </p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {module.duration}
                </span>
              </div>
            </div>

            {/* Arrow Icon */}
            <svg
              className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </Link>
      </div>
    </div>
  );
}
