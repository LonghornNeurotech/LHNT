// Display text and image content of LHNT Officer's card
import { useState } from 'react';
import ExecutiveOfficers from "./ExecutiveOfficers"
import Modal from "./Modal"
// import LeadershipTeam from "./LeadershipTeam"
import "./OfficerSection.css"

const OfficerSection = () => {
  const [isOrgChartOpen, setIsOrgChartOpen] = useState(false);

  const openOrgChart = () => {
    setIsOrgChartOpen(true);
  };

  const closeOrgChart = () => {
    setIsOrgChartOpen(false);
  };

  return (
    <div className="officers">
      <ExecutiveOfficers onOpenOrgChart={openOrgChart} />
      {/* <LeadershipTeam /> */}
      
      <Modal isOpen={isOrgChartOpen} onClose={closeOrgChart}>
        <img 
          src="./organization/organization-graph.png" 
          alt="Longhorn Neurotech Organization Chart"
        />
      </Modal>
    </div>
  );
};

export default OfficerSection;