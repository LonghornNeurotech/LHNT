// Helper script to help display content of module intro pages
import { MODULE_INTRO_CONTENT } from "./moduleIntroContent";

const isIntroSubmodule = (moduleSubmodule) => /^\d+_0$/.test(String(moduleSubmodule));

const toParagraphText = (value) => {
  if (!value) return "";
  if (Array.isArray(value)) return value.filter(Boolean).join("\n\n");
  return String(value);
};

export function buildModuleIntroData(onboardingBlock, moduleSubmodule) {
  if (!isIntroSubmodule(moduleSubmodule)) return null;

  const modNum = String(moduleSubmodule).split("_")[0]; // Ex: the "1" from "1_0"
  const key = `${onboardingBlock}:${modNum}`;

  const moduleName = `Module ${modNum}`;
  const copy = MODULE_INTRO_CONTENT[key];

  return {
    moduleTitle: `${moduleName} Overview`,
    pageType: "moduleIntro",
    infoSections: [
      {
        type: "text",
        text:
          copy?.concepts
            ? `## Concepts in the module\n${toParagraphText(copy.concepts)}`
            : `## Concepts in the module\nThis overview hasn’t been written yet for ${moduleName}.`,
      },
      {
        type: "text",
        text:
          copy?.applications
            ? `## How are Longhorn Neurotech teams applying these concepts in their current projects\n${toParagraphText(copy.applications)}`
            : `## How are Longhorn Neurotech teams applying these concepts in their current projects\nWe’ll add project examples for ${moduleName} as projects evolve.`,
      },
    ],
    tasks: [],
    extraResources: [],
  };
}

