// Export all module content

import { module01Content } from "./module-0-1";
import { module11Content } from "./module-1-1";
import { module12Content } from "./module-1-2";
import { module13Content } from "./module-1-3";
import { module21Content } from "./module-2-1";
import { module22Content } from "./module-2-2";
import { module23Content } from "./module-2-3";
import { module24Content } from "./module-2-4";
import { module31Content } from "./module-3-1";
import { module32Content } from "./module-3-2";
import { module33Content } from "./module-3-3";
import { module34Content } from "./module-3-4";
import { module41Content } from "./module-4-1";
import { module42Content } from "./module-4-2";
import { module43Content } from "./module-4-3";
import { module44Content } from "./module-4-4";
import { module45Content } from "./module-4-5";
import { module51Content } from "./module-5-1";
import { module52Content } from "./module-5-2";
import { module53Content } from "./module-5-3";
import { module54Content } from "./module-5-4";
import { module55Content } from "./module-5-5";
import { module56Content } from "./module-5-6";
import { module57Content } from "./module-5-7";
import { module61Content } from "./module-6-1";
import { module62Content } from "./module-6-2";
import { module63Content } from "./module-6-3";
import { module64Content } from "./module-6-4";
import { module71Content } from "./module-7-1";
import { module72Content } from "./module-7-2";
import { module73Content } from "./module-7-3";
import { module74Content } from "./module-7-4";
import { module75Content } from "./module-7-5";

export const moduleContent: Record<string, React.ReactNode> = {
  // Sesión 0: Presentación
  "module-0-1": module01Content,
  // Sesión 1: Tu historia personal
  "module-1-1": module11Content,
  "module-1-2": module12Content,
  "module-1-3": module13Content,
  // Sesión 2: Conócete a ti mismo
  "module-2-1": module21Content,
  "module-2-2": module22Content,
  "module-2-3": module23Content,
  "module-2-4": module24Content,
  // Sesión 3: Análisis del mercado laboral
  "module-3-1": module31Content,
  "module-3-2": module32Content,
  "module-3-3": module33Content,
  "module-3-4": module34Content,
  // Sesión 4: Preparación del CV
  "module-4-1": module41Content,
  "module-4-2": module42Content,
  "module-4-3": module43Content,
  "module-4-4": module44Content,
  "module-4-5": module45Content,
  // Sesión 5: Preparación de entrevistas
  "module-5-1": module51Content,
  "module-5-2": module52Content,
  "module-5-3": module53Content,
  "module-5-4": module54Content,
  "module-5-5": module55Content,
  "module-5-6": module56Content,
  "module-5-7": module57Content,
  // Sesión 6: Hacer ruido en la web
  "module-6-1": module61Content,
  "module-6-2": module62Content,
  "module-6-3": module63Content,
  "module-6-4": module64Content,
  // Sesión 7: Cierre
  "module-7-1": module71Content,
  "module-7-2": module72Content,
  "module-7-3": module73Content,
  "module-7-4": module74Content,
  "module-7-5": module75Content,
};

// Helper function to get module content by ID
export function getModuleContent(moduleId: string): React.ReactNode | null {
  return moduleContent[moduleId] || null;
}
