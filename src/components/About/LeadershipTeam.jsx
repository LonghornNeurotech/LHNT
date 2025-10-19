// Display info about the organization's leadership team member!
import ContactCard from "./ContactCard";
import "./LeadershipTeam.css"

const LeadershipTeam = () => {
  return (
    <div className>
      <h2 className="margin-top about-title font-['Antonio']">Leadership Team</h2>
      <div className="container">
        {/* Left Side */}
        <div className="column">
          <ContactCard name="Saisha Singh" title="VP of Marketing" img="/OfficerImages/Saisha_Singh.jpeg" linkedin="https://www.linkedin.com/in/saishasingh03">
            Saisha Singh is the Vice President of Marketing at Longhorn Neurotech, where she manages branding, public image, and industry events. She is studying Developmental Psychology and researching the environments effect on cognitive development in children. She hopes to make BCI innovation and research more accessible to students here at UT.
          </ContactCard>
          <ContactCard name="Neha Palsikar" title="VP of Finance" img="/OfficerImages/Neha_Palsikar.jpeg" linkedin="https://www.linkedin.com/in/neha-palsikar-529510204">
            Neha Palsikar is the VP of Finance of Longhorn Neurotech and a part of the class of 2027 studying Biomedical Engineering. She is currently pursuing a certificate in Computational Science and Engineering. In her work, she develops biophysical models of tumor growth to better understand cancer biology and design forecasting methods that guide personalized treatment. In her free time, she enjoys reading, playing tennis, and exploring Austin.
          </ContactCard>
          <ContactCard name="Sofiya Borodina" title="VP of Outreach" img="/OfficerImages/Sofiya_Borodina.jpg">
            Sofiya Borodina is the VP of Outreach of Longhorn Neurotech. She is a sophomore in the class of 2028, majoring in Neuroscience with an academic focus on signal processing. She is currently conducting research in the Lu Lab, where she works on the development of HD-EMG systems and electrodes. Sofiya's goal is to expand public engagement with neurotech and create more opportunities for others to explore the field.
          </ContactCard>
          <ContactCard name="Netta Blinchevsky" title="Education Lead" img="/OfficerImages/Netta_Blinchevsky.jpg" styleClass="pfp tarun" linkedin="https://www.linkedin.com/in/netta-blinchevsky">
            Netta Blinchevsky is a senior Neuroscience major with a Certificate in Spanish for Medical Professions. Currently, she serves as the Education Lead for Longhorn Neurotech. She plans to attend medical school in Fall 2026 and is passionate about bridging neuroscience, medicine, and technology to improve patient outcomes. In the future, she hopes to pursue a career that integrates clinical care with neurotechnology research.
          </ContactCard>
          <ContactCard name="Alicia Richards" title="Membership Lead" img="/OfficerImages/Alicia_N_Richard.jpeg" styleClass="pfp jay">
            Alicia is the Membership Lead of Longhorn Neurotech. She's a second year Neuroscience major with minors in CSE and Data Science. She is interested in neural computation for the purpose of advancing BCI research.
          </ContactCard>
        </div>

        {/* Right Side */}
        <div className="column">
          <ContactCard name="Victor Moran" title="Hardware Director" img="/OfficerImages/Victor_Robert_W_Moran.jpg" linkedin="https://www.linkedin.com/in/vic%7Emoran?trk=people-guest_people_search-card">
            Victor Moran is the Director of Hardware for Longhorn Neurotech. He's apart of the class of 2028 studying Mechanical Engineering. Victor is a lover of novel experience and all things engineering from Aviation and Energy to Neurotech. Ultimately, he aims to keep L-I-V-I-N!
          </ContactCard>
          <ContactCard name="Alex Johnson" title="Software Director" img="/OfficerImages/Alex_Dev_Johnson.jpg" linkedin="https://www.linkedin.com/in/nathan-feldt-1b6573229">
            Alex is a member of the class of 2026 studying electrical and computer engineering and biology. He is on the pre-medical track and hopes to work in clinical research. He’s passionate about machine learning and embedded systems, hoping to combine these to deploy AI applications to medical devices.
          </ContactCard>
          <ContactCard name="Aryan Kia Roghani" title="Research & Development Director" img="/OfficerImages/Aryan_K_Roghani.jpg" linkedin="https://www.linkedin.com/in/aryan-roghani-200774243">
            Aryan Kia Roghani is the Director of Research & Development at Longhorn Neurotech. He is a part of the class of 2028 studying Biomedical Engineering with a focus in neuro-instrumentation and a minor in Entrepreneurship. In his work he uses targeted neuro-nanomedicine delivery systems to target the brain and cross the blood-brain barrier in treating neurodegenerative diseases. He has a passion for innovation and hopes to one day work on reshaping drug delivery in medicine.
          </ContactCard>
          <ContactCard name="Vivek Beeram" title="Technical Advisor" img="/OfficerImages/Tanai_Sai_Prathapam.jpeg" linkedin="https://www.linkedin.com/in/tanai-prathapam">
            Tanai is currently a Technical Advisor at LHNT, previously subsystem lead for EEG Hardware Integration. He is currently majoring in Electrical and Computer Engineering with a focus on Signal Processing and Communication and also pursuing a Business minor. In the future, he hope to use his electrical engineering background in embedded hardware and/or signal processing to help drive innovation in meidcal technology and patient care. Also, he is in the process of creating a tech startup and have a separate business on the side running a swim education school.
          </ContactCard>
        </div>
      </div>
    </div>
  );
};

export default LeadershipTeam;