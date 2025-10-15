// Display info about the organization's executive officers!
import ContactCard from "./ContactCard";
import "./ExecutiveOfficers.css"

const ExecutiveOfficers = () => {
  return (
    <div>
      <div className="margin-top"><br /></div>
      <h2 className="margin-top about-title font-['Antonio']">Executive Officers</h2>
      {/* <hr style="width:270px; margin-bottom: 40px;" class="w3-opacity" /> */}
      <ContactCard name="Raquel Paz Bergia" title="President" img="/OfficerImages/Raquel_Paz_Bergia.jpg" styleClass="pfp taima" linkedin="https://www.linkedin.com/in/raquelpazbergia">
        Raquel is the President of Longhorn Neurotech and a third-year Neuroscience student from Spain. She enjoys traveling, spending time with friends, and learning about health. Raquel joined Longhorn Neurotech because she is passionate about the intersection of medicine and engineering, especially how it can improve the lives of patients with movement disorders. After graduating in Spring 2026, she plans on working in medical technology and later pursuing an MD/PhD.
      </ContactCard>
      <ContactCard name="Sean Omodon" title="Captain" img="/OfficerImages/Sean_C_Omodon.jpg" styleClass="pfp holland" linkedin="https://www.linkedin.com/in/sean-omodon-5ab32a290">
        Sean Omodon is the Captain of Longhorn Neurotech. He is part of the class of 2027 studying Biomedical Engineering with a focus on biomedical imaging and instrumentation. As part of the Santacruz Lab, he researches novel approaches for developing flexible brain implants for brain–computer interfaces. His work aims to refine brain–computer interfaces through innovation and advance them into reliable, accessible medical devices. He plans to pursue a Ph.D. to deepen his understanding of the brain and its interaction with these systems.
      </ContactCard>
    </div>
  );
};
export default ExecutiveOfficers;