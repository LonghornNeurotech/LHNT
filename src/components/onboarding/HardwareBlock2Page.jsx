import OnboardingBlock from './OnboardingBlock';

import module1_1 from '../../data/tasks/hardwareB2Module1_1.json';
import module1_2 from '../../data/tasks/hardwareB2Module1_2.json';
import module1_3 from '../../data/tasks/hardwareB2Module1_3.json';
import module2_1 from '../../data/tasks/hardwareB2Module2_1.json';
import module2_2 from '../../data/tasks/hardwareB2Module2_2.json';
import module3_1 from '../../data/tasks/hardwareB2Module3_1.json';
import module3_2 from '../../data/tasks/hardwareB2Module3_2.json';
import module3_3 from '../../data/tasks/hardwareB2Module3_3.json';
import module3_4 from '../../data/tasks/hardwareB2Module3_4.json';

const HardwareBlock2Page = () => {
  const blockData = {
    modules: [
      module1_1,
      module1_2,
      module1_3,
      module2_1,
      module2_2,
      module3_1,
      module3_2,
      module3_3,
      module3_4,
    ],
  };

  return <OnboardingBlock blockData={blockData} />;
};

export default HardwareBlock2Page;