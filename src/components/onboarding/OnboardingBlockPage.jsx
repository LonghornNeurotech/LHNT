import PropTypes from "prop-types";
import ModuleNavbar from "./ModuleNavbar";
import ModulePage from "./ModulePage";

const OnboardingBlockPage = ({onboardingBlock, moduleSubmodule, data}) => {

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
        className="w-[300px] min-w-[200px] rounded-xl shadow-lg bg-prussian_blue flex flex-col h-full"
        style={{ marginRight: 30 }}>
        <div className="flex-1 min-h-0" style={{ paddingBottom: 20 }}>
          <ModuleNavbar onboardingBlock={onboardingBlock} moduleSubmodule={moduleSubmodule} />
        </div>
      </aside>
      <main
        className="flex-1 h-full rounded-xl bg-white px-8 py-6 overflow-auto"
        style={{ boxSizing: "border-box" }}
      >
        <ModulePage data={data} />
      </main>
    </div>
  );
};

OnboardingBlockPage.propTypes = {
  onboardingBlock: PropTypes.string.isRequired,
  moduleSubmodule: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default OnboardingBlockPage;