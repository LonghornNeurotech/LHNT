// Controls which onboarding block pages to display for the user
import { useParams } from "react-router-dom";
import OnboardingBlockPage from "./OnboardingBlockPage";
import tasksData from "../../data/tasks/index.js";

const OnboardingRouter = () => {
  const { onboardingBlock, moduleSubmodule } = useParams();

  const dataKey = `${onboardingBlock}Module${moduleSubmodule}`;
  const data = tasksData[dataKey];

  if (!data) {
    return <div className="text-red-600 p-4">Data not found for key: {dataKey}</div>;
  }

  return (
    <OnboardingBlockPage
      onboardingBlock={onboardingBlock}
      moduleSubmodule={moduleSubmodule}
      data={data}
    />
  );
};

export default OnboardingRouter;