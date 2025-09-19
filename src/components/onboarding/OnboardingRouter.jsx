// Controls which onboarding block pages to display for the user
import { useParams } from "react-router-dom";
import OnboardingBlockPage from "./OnboardingBlockPage";
import tasksData from "../../data/tasks/index.js";

const OnboardingRouter = () => {
  const { onboardingBlock, moduleSubmodule } = useParams();
  console.log("Params:", onboardingBlock, moduleSubmodule);

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


// OLD Version #1, Just Ignore
// import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import OnboardingBlockPage from './OnboardingBlockPage';

// const OnboardingRouter = () => {
//   const { blockId, moduleId } = useParams(); // expect params like 'hardwareB2', '1_1'
//   const [blockData, setBlockData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setBlockData(null);
//     setError(null);
//     async function loadModule() {
//       try {
//         const module = await import(`../../data/tasks/${blockId}Module${moduleId}.json`);
//         setBlockData(module.default);
//       } catch (error) {
//         setError('Module not found or loading error');
//         console.error(error);
//       }
//     }
//     loadModule();
//   }, [blockId, moduleId]);

//   if (error) return <div>{error}</div>;
//   if (!blockData) return <div>Loading...</div>;

//   return <OnboardingBlockPage blockData={blockData} />;
// };

// export default OnboardingRouter;