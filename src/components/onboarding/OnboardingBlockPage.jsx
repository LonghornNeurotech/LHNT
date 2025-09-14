import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModuleNavbar from './ModuleNavbar';
import ModulePage from './ModulePage';
import ProgressTracker from './ProgressTracker';

const OnboardingBlockPage = ({ blockData }) => {
  const [currentModule, setCurrentModule] = useState(blockData.modules[0].module);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);

  const currentModuleData = blockData.modules.find((m) => m.module === currentModule);

  useEffect(() => {
    // Update module completed if all tasks done
    const newCompletedModules = blockData.modules
      .filter((mod) => {
        const modTasks = mod.tasks.map((t) => t.id);
        return modTasks.every((taskId) => completedTasks.includes(taskId));
      })
      .map((m) => m.module);
    setCompletedModules(newCompletedModules);
  }, [completedTasks, blockData.modules]);

  const handleTaskComplete = (taskId) => {
    setCompletedTasks((prev) => (prev.includes(taskId) ? prev : [...prev, taskId]));
  };

  return (
    <div>
      <ModuleNavbar
        modules={blockData.modules}
        currentModuleId={currentModule}
        onSelectModule={setCurrentModule}
        completedModules={completedModules}
      />
      <ProgressTracker
        completedCount={completedTasks.length}
        total={blockData.modules.reduce((acc, mod) => acc + mod.tasks.length, 0)}
      />
      <ModulePage
        moduleData={currentModuleData}
        completedTasks={completedTasks}
        onTaskComplete={handleTaskComplete}
      />
    </div>
  );
};

OnboardingBlockPage.propTypes = {
  blockData: PropTypes.shape({
    modules: PropTypes.array.isRequired,
  }).isRequired,
};

export default OnboardingBlockPage;