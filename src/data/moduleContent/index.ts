// Export all module content

import { module01Content } from "./module-0-1";
import { module11Content } from "./module-1-1";
import { module12Content } from "./module-1-2";
import { module13Content } from "./module-1-3";
import { module21Content } from "./module-2-1";
import { module22Content } from "./module-2-2";
import { module23Content } from "./module-2-3";
import { module31Content } from "./module-3-1";
import { module32Content } from "./module-3-2";
import { module33Content } from "./module-3-3";
import { module41Content } from "./module-4-1";
import { module42Content } from "./module-4-2";
import { module43Content } from "./module-4-3";
import { module51Content } from "./module-5-1";
import { module52Content } from "./module-5-2";
import { module53Content } from "./module-5-3";

export const moduleContent: Record<string, React.ReactNode> = {
  // Sesión 0: Presentación
  "module-0-1": module01Content,
  // Sesión 1: Análisis del perfil profesional
  "module-1-1": module11Content,
  "module-1-2": module12Content,
  "module-1-3": module13Content,
  // Sesión 2: Análisis del mercado laboral y oportunidades
  "module-2-1": module21Content,
  "module-2-2": module22Content,
  "module-2-3": module23Content,
  // Sesión 3: Optimización del CV y posicionamiento
  "module-3-1": module31Content,
  "module-3-2": module32Content,
  "module-3-3": module33Content,
  // Sesión 4: Preparación de entrevistas
  "module-4-1": module41Content,
  "module-4-2": module42Content,
  "module-4-3": module43Content,
  // Sesión 5: Iteración y visibilidad profesional
  "module-5-1": module51Content,
  "module-5-2": module52Content,
  "module-5-3": module53Content,
};

// Helper function to get module content by ID
export function getModuleContent(moduleId: string): React.ReactNode | null {
  return moduleContent[moduleId] || null;
}
