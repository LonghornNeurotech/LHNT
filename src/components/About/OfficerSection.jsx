// Display text and image content of LHNT Officer's card
import ExecutiveOfficers from "./ExecutiveOfficers"
import LeadershipTeam from "./LeadershipTeam"
import "./OfficerSection.css"

const OfficerSection = () => {
  return (
    <div className="officers">
      <ExecutiveOfficers />
      <LeadershipTeam />
    </div>
  );
};

export default OfficerSection;