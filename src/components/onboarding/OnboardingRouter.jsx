// Controls which onboarding block pages to display for the user
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import OnboardingBlockPage from './OnboardingBlockPage';

const OnboardingRouter = () => {
  const { blockId, moduleId } = useParams(); // expect params like 'hardwareB2', '1_1'
  const [blockData, setBlockData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBlockData(null);
    setError(null);
    async function loadModule() {
      try {
        const module = await import(`../../data/tasks/${blockId}Module${moduleId}.json`);
        setBlockData(module.default);
      } catch (error) {
        setError('Module not found or loading error');
        console.error(error);
      }
    }
    loadModule();
  }, [blockId, moduleId]);

  if (error) return <div>{error}</div>;
  if (!blockData) return <div>Loading...</div>;

  return <OnboardingBlockPage blockData={blockData} />;
};

export default OnboardingRouter;