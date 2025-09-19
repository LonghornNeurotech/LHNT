import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import CompletionIcon from "../common/CompletionIcon";
import moduleMap from "../../config/moduleMap";

const ModuleNavbar = ({ onboardingBlock, moduleSubmodule }) => {
  const moduleMapData = moduleMap[onboardingBlock];

  // Transform groups object to array for rendering and logic
  const groupsArr = moduleMapData && moduleMapData.groups
    ? Object.entries(moduleMapData.groups).map(([name, submodules]) => ({ name, submodules }))
    : [];

  const isGroupsValid = Array.isArray(groupsArr) && groupsArr.length > 0;

  const [openGroupIdx, setOpenGroupIdx] = useState(() => {
    if (!isGroupsValid) return null;
    const submoduleStr = String(moduleSubmodule);
    const groupIdx = groupsArr.findIndex(group =>
      Array.isArray(group.submodules) && group.submodules.includes(submoduleStr)
    );
    return groupIdx === -1 ? null : groupIdx;
  });

  useEffect(() => {
    if (!isGroupsValid) {
      setOpenGroupIdx(null);
      return;
    }
    const submoduleStr = String(moduleSubmodule);
    const groupIdx = groupsArr.findIndex(group =>
      Array.isArray(group.submodules) && group.submodules.includes(submoduleStr)
    );
    setOpenGroupIdx(groupIdx === -1 ? null : groupIdx);
  }, [onboardingBlock, moduleSubmodule, isGroupsValid, moduleMapData]);

  if (!isGroupsValid) return null;

  return (
    <nav className="h-full w-72 bg-prussian-blue flex flex-col overflow-y-auto p-6">
      <h2 className="text-white font-bold text-xl mb-8">{moduleMapData.title}</h2>
      <div className="flex-1 flex flex-col gap-3">
        {groupsArr.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-1">
            <button
              type="button"
              onClick={() => setOpenGroupIdx(openGroupIdx === groupIdx ? null : groupIdx)}
              className={`w-full flex items-center px-5 py-3 rounded-lg font-semibold justify-between shadow
                ${
                  openGroupIdx === groupIdx
                    ? "bg-silver_lake_blue text-white"
                    : "bg-bone_white text-prussian_blue border border-silver_lake_blue"
                }
                transition`}
              style={{ minHeight: "56px", fontSize: "1.15rem" }}
            >
              <span className="flex items-center gap-x-3">
                <span className="flex items-center justify-center w-6 h-6">
                  <CompletionIcon
                    completed={group.submodules.every(id => moduleMapData.modules[id]?.completed)}
                  />
                </span>
                {group.name}
              </span>
              <span className={`transition-transform duration-200 ${openGroupIdx === groupIdx ? "rotate-90" : ""}`}>▸</span>
            </button>

            {openGroupIdx === groupIdx && (
              <div className="flex flex-col gap-y-2 mt-2">
                {group.submodules.map((subId) => {
                  const sub = moduleMapData.modules[subId];
                  if (!sub) return null;
                  return (
                    <NavLink
                      key={subId}
                      to={`/onboarding/${onboardingBlock}/${subId}`}
                      className={({ isActive }) =>
                        `flex items-center px-8 py-3 rounded-lg font-normal border transition justify-start
                          ${
                            isActive
                              ? "bg-silver_lake_blue text-white border-silver_lake_blue"
                              : "bg-bone_white text-prussian_blue border-silver_lake_blue hover:bg-silver_lake_blue hover:text-white"
                          }`
                      }
                      style={{ fontSize: "1rem", minHeight: "52px" }}
                    >
                      <span className="flex items-center justify-center w-6 h-6">
                        <CompletionIcon completed={sub.completed} />
                      </span>
                      <span className="ml-3">{sub.title}</span>
                    </NavLink>

                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

ModuleNavbar.propTypes = {
  onboardingBlock: PropTypes.string.isRequired,
  moduleSubmodule: PropTypes.string.isRequired,
};

export default ModuleNavbar;

// Previous Code; Design of ModuleNavbar doesn't match, IGNORE
// import PropTypes from "prop-types";
// import { useState } from "react";
// import moduleMap from "../../config/moduleMap";

// const ModuleNavbar = ({ onboardingBlock, moduleSubmodule }) => {
//   const moduleMapData = moduleMap[onboardingBlock];

//   const [openModules, setOpenModules] = useState(() => {
//     if (!moduleMapData) return {};

//     const initialOpen = {};
//     Object.keys(moduleMapData).forEach((mod) => {
//       const submodules = Array.isArray(moduleMapData[mod]?.submodules)
//         ? moduleMapData[mod].submodules
//         : [];
//       initialOpen[mod] = submodules.some((sm) => sm.id === moduleSubmodule);
//     });

//     if(!moduleMapData) { 
//       return null;
//     }
    
//     return initialOpen;
//   });

//   const toggleModule = (mod) => {
//     setOpenModules((prev) => ({
//       ...prev,
//       [mod]: !prev[mod],
//     }));
//   };

//   if (!moduleMapData) return null;

//   return (
//     <nav className="min-w-[220px] bg-silver_lake_blue p-4 text-white">
//       <h2 className="font-bold text-lg mb-4">Modules</h2>
//       <ul className="space-y-1">
//         {Object.entries(moduleMapData).map(([mod, modData]) => (
//           <li key={mod}>
//             <button
//               onClick={() => toggleModule(mod)}
//               className={`w-full text-left px-3 py-2 rounded ${
//                 openModules[mod] ? "bg-prussian_blue font-semibold" : "bg-silver_lake_blue"
//               }`}
//             >
//               {modData.title}
//             </button>
//             {openModules[mod] && (
//               <ul className="mt-1 ml-4 space-y-1">
//                 {modData.submodules.map((sub) => (
//                   <li key={sub.id}>
//                     <a
//                       href={`/onboarding/${onboardingBlock}/${sub.id}`}
//                       className={`block px-2 py-1 rounded ${
//                         sub.id === moduleSubmodule
//                           ? "bg-prussian_blue font-bold"
//                           : "hover:bg-bone_white hover:text-prussian_blue"
//                       }`}
//                     >
//                       {sub.title}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// ModuleNavbar.propTypes = {
//   onboardingBlock: PropTypes.string.isRequired,
//   moduleSubmodule: PropTypes.string.isRequired,
// };

// export default ModuleNavbar;


// PREVIOUS VERSION, IGNORE
// import { useState } from "react";
// import CompletionIcon from "../common/CompletionIcon";
// import PropTypes from "prop-types";

// const ModuleNavbar = ({
//   groups,
//   currentModuleId,
//   onSelectModule,
//   defaultOpenGroup = null,
//   completedSubmodules = [],
// }) => {
//   const [openGroups, setOpenGroups] = useState(() =>
//     defaultOpenGroup ? { [defaultOpenGroup]: true } : {}
//   );

//   const toggleGroup = (groupId) => {
//     setOpenGroups((prev) => ({
//       ...prev,
//       [groupId]: !prev[groupId],
//     }));
//   };

//   return (
//     <nav>
//       {groups.map(({ id, label, submodules }) => {
//         const isGroupOpen = openGroups[id];
//         const isCompletedGroup = submodules.every((sub) =>
//           completedSubmodules.includes(sub.moduleId)
//         );
//         const isActive = submodules.some(
//           (sub) => sub.moduleId.toLowerCase() === currentModuleId.toLowerCase()
//         );

//         return (
//           <div key={id}>
//             <div
//               onClick={() => toggleGroup(id)}
//               className={
//                 isActive
//                   ? "bg-silver_lake_blue text-white"
//                   : "bg-bone_white text-prussian_blue"
//               }
//               aria-expanded={isGroupOpen}
//             >
//               {label}
//               {isCompletedGroup && <CompletionIcon />}
//             </div>

//             {isGroupOpen &&
//               submodules.map(({ moduleId, label }) => {
//                 const isActiveSub =
//                   moduleId.toLowerCase() === currentModuleId.toLowerCase();
//                 const isCompleted = completedSubmodules.includes(moduleId);
//                 return (
//                   <div
//                     key={moduleId}
//                     onClick={() => onSelectModule(moduleId)}
//                     className={isActiveSub ? "font-bold text-silver_lake_blue" : ""}
//                   >
//                     {label} {isCompleted && <CompletionIcon />}
//                   </div>
//                 );
//               })}
//           </div>
//         );
//       })}
//     </nav>
//   );
// };

// ModuleNavbar.propTypes = {
//   groups: PropTypes.array.isRequired,
//   currentModuleId: PropTypes.string.isRequired,
//   onSelectModule: PropTypes.func.isRequired,
//   defaultOpenGroup: PropTypes.string,
//   completedSubmodules: PropTypes.array,
// };

// export default ModuleNavbar;

// OLD Version #1, Ignore
// import { useState } from "react";
// import CompletionIcon from "../common/CompletionIcon";
// import PropTypes from "prop-types";

// const ModuleNavbar = ({
//   groups,
//   currentModuleId,
//   onSelectModule,
//   defaultOpenGroup = null,
//   completedSubmodules = [],
// }) => {
//   const [openGroups, setOpenGroups] = useState(() =>
//     defaultOpenGroup ? { [defaultOpenGroup]: true } : {}
//   );

//   const toggleGroup = (groupId) => {
//     setOpenGroups((prev) => ({
//       ...prev,
//       [groupId]: !prev[groupId],
//     }));
//   };

//   return (
//     <nav
//       className="overflow-y-auto pr-1"
//       style={{
//         maxHeight: "calc(100vh - 160px)",
//         paddingRight: "8px",
//         boxSizing: "border-box",
//       }}
//     >
//       {groups.map(({ id, label, submodules }) => {
//         const isGroupOpen = openGroups[id];
//         const isCompletedGroup = submodules.every((sub) =>
//           completedSubmodules.includes(sub.moduleId)
//         );
//         const isActive = submodules.some(
//           (sub) => sub.moduleId.toLowerCase() === currentModuleId.toLowerCase()
//         );

//         return (
//           <div key={id} className="mb-3">
//             <button
//               onClick={() => toggleGroup(id)}
//               className={`
//                 w-full flex justify-between items-center px-4 py-3 rounded-lg font-bold cursor-pointer transition-colors shadow
//                 ${isActive
//                   ? "bg-silver_lake_blue text-white"
//                   : "bg-bone_white text-prussian_blue"}
//               `}
//               aria-expanded={isGroupOpen}
//             >
//               <span className="flex items-center">
//                 <CompletionIcon completed={isCompletedGroup} />
//                 <span className="ml-2">{label}</span>
//               </span>
//               <svg
//                 className={`w-4 h-4 transition-transform ${
//                   isGroupOpen ? "rotate-90" : ""
//                 }`}
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth={2}
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M9 5l7 7-7 7" />
//               </svg>
//             </button>
//             <div
//               className={`overflow-hidden transition-all ${
//                 isGroupOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
//               }`}
//             >
//               {submodules.map(({ moduleId, label }) => {
//                 const isActiveSub =
//                   moduleId.toLowerCase() === currentModuleId.toLowerCase();
//                 const isCompleted = completedSubmodules.includes(moduleId);
//                 return (
//                   <button
//                     key={moduleId}
//                     className={`
//                       w-full flex items-center px-6 py-2 rounded-md my-1 font-semibold cursor-pointer transition-colors
//                       ${
//                         isActiveSub
//                           ? "bg-silver_lake_blue text-white"
//                           : "bg-bone_white text-prussian_blue hover:bg-silver_lake_blue hover:text-white"
//                       }
//                     `}
//                     onClick={() => onSelectModule(moduleId)}
//                   >
//                     <CompletionIcon completed={isCompleted} />
//                     <span className="ml-2">{label}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         );
//       })}
//     </nav>
//   );
// };

// ModuleNavbar.propTypes = {
//   groups: PropTypes.array.isRequired,
//   currentModuleId: PropTypes.string.isRequired,
//   onSelectModule: PropTypes.func.isRequired,
//   defaultOpenGroup: PropTypes.string,
//   completedSubmodules: PropTypes.array,
// };

// export default ModuleNavbar;