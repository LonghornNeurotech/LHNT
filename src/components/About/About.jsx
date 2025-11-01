/* About page */
import AboutInfo from "./AboutInfo"
import OfficerSection from "./OfficerSection"
import SponsorsWidget from "../SponsorWidget";

const About = () => {
  return (
    <div style={{ backgroundColor: '#213C58' }}>
      <AboutInfo />
      <OfficerSection />
      <SponsorsWidget />
    </div>
  );
};

export default About;
