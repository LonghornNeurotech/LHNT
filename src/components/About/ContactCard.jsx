// Longhorn Neurotech Team Leaders's Info Card
import "./ContactCard.css"

const ContactCard = ({ name, title, img, styleClass, linkedin, children }) => {
  return (
    <div className="contact-card">
      <div className="pfp-circle margin-right w3-left">
        <img src={img} alt={`${img}`} className={styleClass} />
      </div>
      <div>
        <h2 className="margin-top">{title}:</h2>
        <h2 className="w3-xlarge margin-top"><b>{name}</b></h2>
        <div className="margin-bottom2">{children}</div>
      </div>
      <div class="text">
        <a href={linkedin} target="_blank">
          <i class="fa fa-linkedin fa-4x w3-hover-opacity"></i>
        </a>
      </div> 
    </div>
  );
};

export default ContactCard;