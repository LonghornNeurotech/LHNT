// Module Navbar providing easier user navigation within the onboarding pages
import { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink, useNavigate } from "react-router-dom";
import moduleMap from "../../config/moduleMap";
import CompletionIcon from "../common/CompletionIcon";
import { useProgress } from "../../context/useProgress";

// Developer note: Omit CompletionIcon display from ModuleNavbar component 
// until progress tracking for submodules and modules are correctly implemented!
// import CompletionIcon from "../common/CompletionIcon";  

const ModuleNavbar = ({ onboardingBlock, moduleSubmodule }) => {
  const navigate = useNavigate();
  const moduleMapData = moduleMap[onboardingBlock];
  const { progress, isModuleCompleted } = useProgress();

  // State for onboarding block dropdown
  const [isBlockDropdownOpen, setIsBlockDropdownOpen] = useState(false);

  // Transform groups object to array for rendering and logic
  const groupsArr = useMemo(() => {
    if (!moduleMapData?.groups) return [];
    return Object.entries(moduleMapData.groups).map(([name, submodules]) => ({
      name,
      submodules: Array.isArray(submodules) ? submodules.map(String) : [],
    }));
  }, [moduleMapData]);

  // Inject a synthetic "Module Overview" page at the start of each module group (e.g., 1_0, 2_0, ...)
  const groupsArrWithIntro = useMemo(() => {
    return groupsArr.map((group) => {
      const match = /^Module\s+(\d+)/.exec(group.name);
      const modNum = match?.[1];
      if (!modNum) return group;
      const introId = `${modNum}_0`;
      const rest = group.submodules.filter((id) => id !== introId);
      return { ...group, submodules: [introId, ...rest] };
    });
  }, [groupsArr]);

  const isGroupsValid = Array.isArray(groupsArrWithIntro) && groupsArrWithIntro.length > 0;

  const [openGroupIdx, setOpenGroupIdx] = useState(() => {
    if (!isGroupsValid) return null;
    const submoduleStr = String(moduleSubmodule);
    const groupIdx = groupsArrWithIntro.findIndex(group =>
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
    const groupIdx = groupsArrWithIntro.findIndex(group =>
      Array.isArray(group.submodules) && group.submodules.includes(submoduleStr)
    );
    setOpenGroupIdx(groupIdx === -1 ? null : groupIdx);
  }, [onboardingBlock, moduleSubmodule, isGroupsValid, moduleMapData, groupsArrWithIntro]);

  // Get all onboarding blocks for the dropdown
  const getAllOnboardingBlocks = () => {
    return Object.entries(moduleMap).map(([blockKey, blockData]) => ({
      key: blockKey,
      title: blockData.title
    }));
  };

  // Handle when an onboarding block is selected
  const handleBlockSelection = (blockKey) => {
    // Start at the Module 1 overview page
    navigate(`/onboarding/${blockKey}/1_0`);
    setIsBlockDropdownOpen(false);
  };

  if (!isGroupsValid) return null;

  const allBlocks = getAllOnboardingBlocks();

  return (
    <nav 
      className="h-full bg-prussian-blue flex flex-col overflow-y-auto p-6"
      style={{
        width: "clamp(200px, 22vw, 320px)",
        minWidth: "200px",
        maxWidth: "320px"
      }}
    >
      <div className="flex-1 flex flex-col gap-3">
        {/* Onboarding Block Selector */}
        <div className="mb-1">
          <button
            type="button"
            onClick={() => setIsBlockDropdownOpen(!isBlockDropdownOpen)}
            className="w-full flex items-center gap-x-2 px-2 sm:px-4 py-3 rounded-lg font-semibold justify-start shadow bg-prussian_blue text-white border border-white transition min-h-[56px] text-[1.05rem] sm:text-[1.15rem]"
            style={{ minHeight: "56px", fontSize: "1.15rem" }}
          >
            <span className="flex items-center" style={{ width: 24, height: 24 }}>
              {/* Insert CompletionIcon component here once progress tracking is fully implemented */}
            </span>
            <span className="text-left flex-1 leading-tight whitespace-normal break-words">
              Onboarding {moduleMapData.title}
            </span>
            <span className={`transition-transform duration-200 flex-shrink-0 ${isBlockDropdownOpen ? "rotate-90" : ""}`} style={{ verticalAlign: "middle" }}>▸</span>
          </button>

          {/* Dropdown for Onboarding Blocks */}
          {isBlockDropdownOpen && (
            <div className="flex flex-col gap-y-2 mt-2">
              {allBlocks.map((block) => (
                <button
                  key={block.key}
                  onClick={() => handleBlockSelection(block.key)}
                  className={`flex items-center gap-x-2 px-2 sm:px-4 py-3 rounded-lg font-normal border transition justify-start text-[0.92rem] sm:text-[1rem] min-h-[44px]
                    ${
                      block.key === onboardingBlock
                        ? "bg-silver_lake_blue text-white border-silver_lake_blue"
                        : "bg-bone_white text-prussian_blue border-silver_lake_blue hover:bg-silver_lake_blue hover:text-white"
                    }`}
                  style={{ fontSize: "1rem", minHeight: "52px" }}
                >
                  <span className="flex items-center justify-center" style={{ width: 24, height: 24 }}>
                    {/* Insert CompletionIcon component here once progress tracking is fully implemented */}
                  </span>
                  <span className="ml-3 text-left flex-1 leading-tight whitespace-normal break-words">
                    {block.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Module Groups Navigation */}
        {groupsArrWithIntro.map((group, groupIdx) => (
          <div key={groupIdx} className="mb-1">
            {/* Module Button that's also a dropdown button */}
            <button
              type="button"
              onClick={() => setOpenGroupIdx(openGroupIdx === groupIdx ? null : groupIdx)}
              className={`w-full flex items-center gap-x-2 px-2 sm:px-4 py-3 rounded-lg font-semibold justify-start shadow
                ${
                  openGroupIdx === groupIdx
                    ? "bg-silver_lake_blue text-white"
                    : "bg-bone_white text-prussian_blue border border-silver_lake_blue"
                }
                transition min-h-[56px] text-[1.05rem] sm:text-[1.15rem]`}
              style={{ minHeight: "56px", fontSize: "1.15rem" }}
            >
              <span className="flex items-center" style={{ width: 24, height: 24 }}>
                {(() => {
                  const match = /^Module\s+(\d+)/.exec(group.name);
                  const moduleNumber = match?.[1];
                  const done = moduleNumber
                    ? isModuleCompleted(onboardingBlock, moduleNumber)
                    : false;
                  return <CompletionIcon completed={done} />;
                })()}
              </span>
              <span className="truncate text-left flex-1">{group.name}</span>
              <span className={`transition-transform duration-200 ${openGroupIdx === groupIdx ? "rotate-90" : ""}`} style={{ verticalAlign: "middle" }}>▸</span>
            </button>

            {/* Submodule Navigation Button */}
            {openGroupIdx === groupIdx && (
              <div className="flex flex-col gap-y-2 mt-2">
                {group.submodules.map((subId) => {
                  const isIntro = /_0$/.test(String(subId));
                  const sub = moduleMapData?.modules?.[subId];
                  const fallbackTitle = isIntro
                    ? `Module ${String(subId).split("_")[0]} Overview`
                    : null;
                  if (!sub && !fallbackTitle) return null;
                  const subKey = `${onboardingBlock}_${subId}`;
                  const subCompleted = Boolean(progress.submodules?.[subKey]);
                  return (
                    <NavLink
                      key={subId}
                      to={`/onboarding/${onboardingBlock}/${subId}`}
                      className={({ isActive }) =>
                        `flex items-center gap-x-2 px-2 sm:px-4 py-3 rounded-lg font-normal border transition justify-start text-[0.92rem] sm:text-[1rem] min-h-[44px]
                          ${
                            isActive
                              ? "bg-silver_lake_blue text-white border-silver_lake_blue"
                              : "bg-bone_white text-prussian_blue border-silver_lake_blue hover:bg-silver_lake_blue hover:text-white"
                          }`
                      }
                      style={{ fontSize: "1rem", minHeight: "52px" }}
                    >
                      <span className="flex items-center justify-center" style={{ width: 24, height: 24 }}>
                        {!isIntro && <CompletionIcon completed={subCompleted} />}
                      </span>
                      <span className="ml-3 text-left flex-1">{sub?.title || fallbackTitle}</span>
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