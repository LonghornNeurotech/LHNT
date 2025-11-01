// Display info about the organization's executive officers!
import PropTypes from "prop-types";
import ContactCard from "./ContactCard";
import "./ExecutiveOfficers.css"

const ExecutiveOfficers = ({ onOpenOrgChart }) => {
  return (
    <div>
      <div className="margin-top"><br /></div>
      <div className="officers-header-container">
        <h2 className="margin-top about-title font-['Antonio']">Executive Officers</h2>
        <button 
          className="org-chart-btn" 
          onClick={onOpenOrgChart}
          title="View Organization Chart"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
            <line x1="10" y1="6.5" x2="14" y2="6.5"></line>
            <line x1="10" y1="17.5" x2="14" y2="17.5"></line>
            <line x1="6.5" y1="10" x2="6.5" y2="14"></line>
            <line x1="17.5" y1="10" x2="17.5" y2="14"></line>
          </svg>
        </button>
      </div>
      {/* <hr style="width:270px; margin-bottom: 40px;" class="w3-opacity" /> */}
      <ContactCard name="Raquel Paz Bergia" title="President" img="/OfficerImages/Raquel_Paz_Bergia.jpg" styleClass="pfp taima" linkedin="https://www.linkedin.com/in/raquelpazbergia">
        Raquel is the President of Longhorn Neurotech and a third-year Neuroscience student from Spain. She enjoys traveling, spending time with friends, and learning about health. Raquel joined Longhorn Neurotech because she is passionate about the intersection of medicine and engineering, especially how it can improve the lives of patients with movement disorders. After graduating in Spring 2026, she plans on working in medical technology and later pursuing an MD/PhD.
      </ContactCard>
      <ContactCard name="Sean Omodon" title="Captain" img="/OfficerImages/Sean_C_Omodon.jpg" styleClass="pfp holland" linkedin="https://www.linkedin.com/in/sean-omodon-5ab32a290">
        Sean Omodon is the Captain of Longhorn Neurotech. He is part of the class of 2027 studying Biomedical Engineering with a focus on biomedical imaging and instrumentation. As part of the Santacruz Lab, he researches novel approaches for developing flexible brain implants for brain–computer interfaces. His work aims to refine brain–computer interfaces through innovation and advance them into reliable, accessible medical devices. He plans to pursue a Ph.D. to deepen his understanding of the brain and its interaction with these systems.
      </ContactCard>
      <ContactCard name="Zarqa Fathima" title="VP of Operations" img="/OfficerImages/Zarqa_Fathima.jpg" styleClass="pfp tarun" linkedin="https://www.linkedin.com/in/zarqa-fathima">
        Zarqa Fathima is the VP of Operations at Longhorn Neurotech and a part of the class of 2027 studying Biomedical Engineering. She led the UX/UI Interface Team as a Subsystem Lead during the 2024-2025 year to successfully update the appearance of the Longhorn Neurotech website. She currently applies her powerful voice and past leadership experience to deliver timely communication for every member and ensured this organization's continual, smooth operation. You'll always have a good time in any conversation with her because she is really fun to talk too.
      </ContactCard>
      <ContactCard name="Netta Blinchevsky" title="VP of Education" img="/OfficerImages/Netta_Blinchevsky.jpg" styleClass="pfp tarun" linkedin="https://www.linkedin.com/in/netta-blinchevsky">
        Netta Blinchevsky is a senior Neuroscience major with a Certificate in Spanish for Medical Professions. Currently, she serves as the VP of Education for Longhorn Neurotech. She plans to attend medical school in Fall 2026 and is passionate about bridging neuroscience, medicine, and technology to improve patient outcomes. In the future, she hopes to pursue a career that integrates clinical care with neurotechnology research.
      </ContactCard>
      <ContactCard name="Saisha Singh" title="VP of Marketing" img="/OfficerImages/Saisha_Singh.jpeg" linkedin="https://www.linkedin.com/in/saishasingh03">
        Saisha Singh is the Vice President of Marketing at Longhorn Neurotech, where she manages branding, public image, and industry events. She is studying Developmental Psychology and researching the environments effect on cognitive development in children. She hopes to make BCI innovation and research more accessible to students here at UT.
      </ContactCard>
      <ContactCard name="Neha Palsikar" title="VP of Finance" img="/OfficerImages/Neha_Palsikar.jpeg" linkedin="https://www.linkedin.com/in/neha-palsikar-529510204">
        Neha Palsikar is the VP of Finance of Longhorn Neurotech and a part of the class of 2027 studying Biomedical Engineering. She is currently pursuing a certificate in Computational Science and Engineering. In her work, she develops biophysical models of tumor growth to better understand cancer biology and design forecasting methods that guide personalized treatment. In her free time, she enjoys reading, playing tennis, and exploring Austin.
      </ContactCard>
      <ContactCard name="Sofiya Borodina" title="VP of Outreach" img="/OfficerImages/Sofiya_Borodina.jpg">
        Sofiya Borodina is the VP of Outreach of Longhorn Neurotech. She is a sophomore in the class of 2028, majoring in Neuroscience with an academic focus on signal processing. She is currently conducting research in the Lu Lab, where she works on the development of HD-EMG systems and electrodes. Sofiya's goal is to expand public engagement with neurotech and create more opportunities for others to explore the field.
      </ContactCard>
      <ContactCard name="Victor Moran" title="Hardware Director" img="/OfficerImages/Victor_Moran.jpg" linkedin="https://www.linkedin.com/in/vic%7Emoran?trk=people-guest_people_search-card">
        Victor Moran is the Director of Hardware for Longhorn Neurotech. He's apart of the class of 2028 studying Mechanical Engineering. Victor is a lover of novel experience and all things engineering from Aviation and Energy to Neurotech. Ultimately, he aims to keep L-I-V-I-N!
      </ContactCard>
      <ContactCard name="Alex Johnson" title="Software Director" img="/OfficerImages/Alex_Dev_Johnson.jpg" linkedin="https://www.linkedin.com/in/nathan-feldt-1b6573229">
        Alex is a member of the class of 2026 studying electrical and computer engineering and biology. He is on the pre-medical track and hopes to work in clinical research. He's passionate about machine learning and embedded systems, hoping to combine these to deploy AI applications to medical devices.
      </ContactCard>
      <ContactCard name="Aryan Kia Roghani" title="Research & Development Director" img="/OfficerImages/Aryan_K_Roghani.jpg" linkedin="https://www.linkedin.com/in/aryan-roghani-200774243">
        Aryan Kia Roghani is the Director of Research & Development at Longhorn Neurotech. He is a part of the class of 2028 studying Biomedical Engineering with a focus in neuro-instrumentation and a minor in Entrepreneurship. In his work he uses targeted neuro-nanomedicine delivery systems to target the brain and cross the blood-brain barrier in treating neurodegenerative diseases. He has a passion for innovation and hopes to one day work on reshaping drug delivery in medicine.
      </ContactCard>
    </div>
  );
};

ExecutiveOfficers.propTypes = {
  onOpenOrgChart: PropTypes.function
};

export default ExecutiveOfficers;
