// Breadcrumb navigation and Module Title in Module Page
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moduleMap from "../../config/moduleMap";

const OnboardingHeader = ({ onboardingBlock, moduleSubmodule, moduleTitle }) => {
  const blockData = moduleMap?.[onboardingBlock];
  const blockTitle = blockData?.title || onboardingBlock;

  const currentSubId = String(moduleSubmodule);

  return (
    <div className="mb-6">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <nav className="text-sm text-gray-600 flex flex-wrap items-center gap-x-2 gap-y-1">
              <Link to="/member" className="hover:underline">
                Member Home
              </Link>
              <span className="text-gray-400">/</span>
              <Link to="/programs" className="hover:underline">
                Programs & Training
              </Link>
              <span className="text-gray-400">/</span>
              <Link
                to={`/onboarding/${onboardingBlock}/1_1`}
                className="hover:underline"
                title={`Go to ${blockTitle}`}
              >
                {blockTitle}
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-prussian_blue font-semibold truncate">
                {moduleTitle || currentSubId}
              </span>
            </nav>

            <h1 className="mt-2 text-2xl font-bold text-prussian_blue">
              {moduleTitle}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

OnboardingHeader.propTypes = {
  onboardingBlock: PropTypes.string.isRequired,
  moduleSubmodule: PropTypes.string.isRequired,
  moduleTitle: PropTypes.string,
};

export default OnboardingHeader;