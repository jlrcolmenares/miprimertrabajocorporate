// Export all module content

import { module11Content } from "./module-1-1";
import { module12Content } from "./module-1-2";
import { module21Content } from "./module-2-1";
import { module22Content } from "./module-2-2";

export const moduleContent: Record<string, React.ReactNode> = {
  "module-1-1": module11Content,
  "module-1-2": module12Content,
  "module-2-1": module21Content,
  "module-2-2": module22Content,
};

// Helper function to get module content by ID
export function getModuleContent(moduleId: string): React.ReactNode | null {
  return moduleContent[moduleId] || null;
}
