"use client";

import { useEffect } from "react";

interface CelebrationModalProps {
  milestone: number;
  onClose: () => void;
}

const MILESTONE_MESSAGES = {
  25: "¡Buen comienzo! Ya llevas un cuarto del camino",
  50: "¡A mitad de camino! Sigue así",
  75: "¡Casi lo logras! Solo falta un cuarto",
  100: "¡FELICIDADES! Has completado el curso",
};

export default function CelebrationModal({ milestone, onClose }: CelebrationModalProps) {
  const message = MILESTONE_MESSAGES[milestone as keyof typeof MILESTONE_MESSAGES];

  useEffect(() => {
    // Auto-dismiss after 3 seconds
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const confettiColors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-rose-500",
    "bg-amber-500",
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 animate-[celebrate_0.6s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Confetti elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confettiColors.map((color, index) => (
            <div
              key={index}
              className={`absolute w-3 h-3 ${color} rounded-full animate-[confettiPop_1.5s_ease-out]`}
              style={{
                left: `${20 + index * 12}%`,
                top: "50%",
                animationDelay: `${index * 0.1}s`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center relative z-10">
          <div className="text-6xl mb-4">
            {milestone === 100 ? "🎉" : "🎯"}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {milestone}% Completado
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {message}
          </p>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}
