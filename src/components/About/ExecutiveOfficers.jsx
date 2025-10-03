// Display info about the organization's executive officers!
import ContactCard from "./ContactCard";
import "./ExecutiveOfficers.css"

const ExecutiveOfficers = () => {
  return (
    <div>
      <div className="margin-top"><br /></div>
      <h2 className="margin-top about-title font-['Antonio']">Executive Officers</h2>
      {/* <hr style="width:270px; margin-bottom: 40px;" class="w3-opacity" /> */}
      <ContactCard name="Taima Crean" title="President" img="/OfficerImages/Taima_Crean.jpg" styleClass="pfp taima" linkedin="https://www.linkedin.com/in/taima00">
        Taima Crean is the President and Co-Founder of Longhorn Neurotech. She is a part of the class of 2025 studying Biomedical Engineering with a focus in computation and double minors in Business and Computer Science. In her work she uses deep learning to optimize radiation treatment for lung cancer patients. She has a passion for innovation and hopes to one day work on machine learning applications in healthcare.
      </ContactCard>
      <ContactCard name="Holland Ernst" title="Captain" img="/OfficerImages/holland1.jpg" styleClass="pfp holland" linkedin="https://www.linkedin.com/in/holland-ernst">
        Holland Ernst is the Captain and Co-Founder of Longhorn Neurotech. He is a apart of the class of 2025 studying biomedical engineering and planning to pursue a Master's BME with a specification in neural engineering. His mission is to bridge the gap between the brain and the vast world around us. Being part of Longhorn Neurotech and collaborating with such remarkably talented and diverse individuals not only excites him but also drives him forward in the pursuit of a career in neural engineering and BCI.
      </ContactCard>
    </div>
  );
};
export default ExecutiveOfficers;