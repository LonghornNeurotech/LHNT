import PropTypes from 'prop-types';
import CompletionIcon from '../common/CompletionIcon';

const ModuleNavbar = ({ modules, currentModuleId, onSelectModule, completedModules }) => {
  return (
    <nav className="flex space-x-4 border-b border-silver_lake_blue p-4 overflow-x-auto">
      {modules.map((module) => {
        const isActive = module.module === currentModuleId;
        const completed = completedModules.includes(module.module);

        return (
          <button
            key={module.module}
            onClick={() => onSelectModule(module.module)}
            className={`relative px-4 py-2 rounded font-semibold whitespace-nowrap ${
              isActive ? 'bg-prussian_blue text-white' : 'text-prussian_blue hover:bg-bone_white'
            }`}
          >
            {module.moduleTitle || `Module ${module.module}`}
            <span className="absolute top-1 right-1">
              <CompletionIcon completed={completed} />
            </span>
          </button>
        );
      })}
    </nav>
  );
};

ModuleNavbar.propTypes = {
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      module: PropTypes.string.isRequired,
      moduleTitle: PropTypes.string,
    })
  ).isRequired,
  currentModuleId: PropTypes.string.isRequired,
  onSelectModule: PropTypes.func.isRequired,
  completedModules: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ModuleNavbar;