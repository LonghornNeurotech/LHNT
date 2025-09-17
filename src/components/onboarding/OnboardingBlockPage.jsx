import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { moduleMap } from "../../config/moduleMap";
import ModuleNavbar from "./ModuleNavbar";
import ModulePage from "./ModulePage";
import PropTypes from "prop-types";

const OnboardingBlockPage = ({ blockData }) => {
  const { blockId, moduleId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = original; };
  }, []);

  const [completedTasks, setCompletedTasks] = useState([]);
  const blockInfo = moduleMap[blockId.toLowerCase()] || {};
  const { title: blockTitle = blockId, groups = [] } = blockInfo;

  const getGroupId = (id) => id?.split("_")?.[0];
  const defaultOpenGroup = getGroupId(moduleId) || (groups[0] && groups[0].id);

  if (!blockData || !blockData.tasks) {
    return <div>Module data is missing or could not be loaded.</div>;
  }

  const handleCompleteTask = (taskId) =>
    setCompletedTasks((prev) => (prev.includes(taskId) ? prev : [...prev, taskId]));

  const handleModuleChange = (id) => navigate(`/onboarding/${blockId}/${id}`);

  return (
    <div
      className="flex w-full h-[calc(100vh-80px)] bg-prussian_blue"
      style={{
        padding: "24px 32px 32px 32px",
        boxSizing: "border-box",
        height: "calc(100vh - 80px)",
        minHeight: 0,
      }}>
      <aside
        className="w-[300px] min-w-[220px] rounded-xl shadow-lg bg-prussian_blue flex flex-col h-full"
        style={{ marginRight: 30 }}>
        {/* Sidebar title */}
        <div className="text-center text-white font-bold text-xl py-4 mb-2">
          {blockTitle}
        </div>
        <div className="flex-1 min-h-0" style={{ paddingBottom: 20 }}>
          <ModuleNavbar
            groups={groups}
            currentModuleId={moduleId}
            onSelectModule={handleModuleChange}
            defaultOpenGroup={defaultOpenGroup}
            completedSubmodules={[]}
          />
        </div>
      </aside>
      <main
        className="flex-1 h-full rounded-xl bg-white px-8 py-6 overflow-auto"
        style={{ boxSizing: "border-box" }}
      >
        <ModulePage
          moduleData={blockData}
          completedTasks={completedTasks}
          onCompleteTask={handleCompleteTask}
        />
      </main>
    </div>
  );
};

OnboardingBlockPage.propTypes = {
  blockData: PropTypes.shape({
    module: PropTypes.string.isRequired,
    moduleTitle: PropTypes.string,
    info: PropTypes.array,
    tasks: PropTypes.array.isRequired,
  }).isRequired,
};

export default OnboardingBlockPage;

// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import ModuleNavbar from './ModuleNavbar';
// import ModulePage from './ModulePage';
// import ProgressTracker from './ProgressTracker';

// const OnboardingBlockPage = ({ blockData }) => {
//   const [currentModule, setCurrentModule] = useState(blockData.modules[0].module);
//   const [completedTasks, setCompletedTasks] = useState([]);
//   const [completedModules, setCompletedModules] = useState([]);

//   const currentModuleData = blockData.modules.find((m) => m.module === currentModule);

//   useEffect(() => {
//     // Update module completed if all tasks done
//     const newCompletedModules = blockData.modules
//       .filter((mod) => {
//         const modTasks = mod.tasks.map((t) => t.id);
//         return modTasks.every((taskId) => completedTasks.includes(taskId));
//       })
//       .map((m) => m.module);
//     setCompletedModules(newCompletedModules);
//   }, [completedTasks, blockData.modules]);

//   const handleTaskComplete = (taskId) => {
//     setCompletedTasks((prev) => (prev.includes(taskId) ? prev : [...prev, taskId]));
//   };

//   return (
//     <div>
//       <ModuleNavbar
//         modules={blockData.modules}
//         currentModuleId={currentModule}
//         onSelectModule={setCurrentModule}
//         completedModules={completedModules}
//       />
//       <ProgressTracker
//         completedCount={completedTasks.length}
//         total={blockData.modules.reduce((acc, mod) => acc + mod.tasks.length, 0)}
//       />
//       <ModulePage
//         moduleData={currentModuleData}
//         completedTasks={completedTasks}
//         onTaskComplete={handleTaskComplete}
//       />
//     </div>
//   );
// };

// OnboardingBlockPage.propTypes = {
//   blockData: PropTypes.shape({
//     modules: PropTypes.array.isRequired,
//   }).isRequired,
// };

// export default OnboardingBlockPage;