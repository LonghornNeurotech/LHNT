import PropTypes from 'prop-types';
import CompletionIcon from '../common/CompletionIcon';

const OnboardingBlockMenu = ({ blocks, completedBlocks, onSelectBlock }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
      {blocks.map((block) => {
        const completed = completedBlocks.includes(block.id);
        return (
          <button
            key={block.id}
            onClick={() => onSelectBlock(block.id)}
            className="relative rounded shadow p-6 border border-silver_lake_blue bg-bone_white text-prussian_blue font-semibold hover:bg-prussian_blue hover:text-bone_white transition"
          >
            {block.name}
            <span className="absolute top-3 right-3">
              <CompletionIcon completed={completed} />
            </span>
          </button>
        );
      })}
    </div>
  );
};

OnboardingBlockMenu.propTypes = {
  blocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  completedBlocks: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelectBlock: PropTypes.func.isRequired,
};

export default OnboardingBlockMenu;