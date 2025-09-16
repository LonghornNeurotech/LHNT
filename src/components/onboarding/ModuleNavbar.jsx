import { useState } from "react";
import CompletionIcon from "../common/CompletionIcon";
import PropTypes from "prop-types";

const ModuleNavbar = ({
  groups,
  currentModuleId,
  onSelectModule,
  defaultOpenGroup = null,
  completedSubmodules = [],
}) => {
  const [openGroups, setOpenGroups] = useState(() =>
    defaultOpenGroup ? { [defaultOpenGroup]: true } : {}
  );

  const toggleGroup = (groupId) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <nav
      className="overflow-y-auto pr-1"
      style={{
        maxHeight: "calc(100vh - 160px)", // Limit vertical height with breathing room from viewport
        paddingRight: '8px', // Padding to keep scrollbar separated
        boxSizing: "border-box",
      }}
    >
      {groups.map(({ id, label, submodules }) => {
        const isGroupOpen = openGroups[id];
        const isCompletedGroup = submodules.every((sub) => completedSubmodules.includes(sub.moduleId));
        const isActive = submodules.some(
          (sub) => sub.moduleId.toLowerCase() === currentModuleId.toLowerCase()
        );

        return (
          <div key={id} className="mb-3">
            <button
              onClick={() => toggleGroup(id)}
              className={`
                w-full flex justify-between items-center px-4 py-3 rounded-lg font-bold cursor-pointer transition-colors shadow
                ${isActive ? "bg-silver_lake_blue text-white" : "bg-bone_white text-prussian_blue"}
              `}
              aria-expanded={isGroupOpen}
            >
              <span className="flex items-center">
                <CompletionIcon completed={isCompletedGroup} />
                <span className="ml-2">{label}</span>
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${isGroupOpen ? "rotate-90" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div
              className={`overflow-hidden transition-all ${
                isGroupOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              {submodules.map(({ moduleId, label }) => {
                const isActiveSub = moduleId.toLowerCase() === currentModuleId.toLowerCase();
                const isCompleted = completedSubmodules.includes(moduleId);
                return (
                  <button
                    key={moduleId}
                    className={`
                      w-full flex items-center px-6 py-2 rounded-md my-1 font-semibold cursor-pointer transition-colors
                      ${isActiveSub
                        ? "bg-silver_lake_blue text-white"
                        : "bg-bone_white text-prussian_blue hover:bg-silver_lake_blue hover:text-white"}
                    `}
                    onClick={() => onSelectModule(moduleId)}
                  >
                    <CompletionIcon completed={isCompleted} />
                    <span className="ml-2">{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
};

ModuleNavbar.propTypes = {
  groups: PropTypes.array.isRequired,
  currentModuleId: PropTypes.string.isRequired,
  onSelectModule: PropTypes.func.isRequired,
  defaultOpenGroup: PropTypes.string,
  completedSubmodules: PropTypes.array,
};

export default ModuleNavbar;