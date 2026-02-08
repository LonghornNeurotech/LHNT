// Longhorn Neurotech Team Leaders's Info Card
import "./ContactCard.css"

const ContactCard = ({ name, title, img, styleClass, linkedin, children }) => {
  return (
    <div className="contact-card">
      <div className="pfp-circle margin-right w3-left">
        <img src={img} alt={`${img}`} className={styleClass} />
      </div>
      <div>
        <h2 className="margin-top text-2xl font-bold text-prussian_blue">{title}:</h2>
        <h2 className="margin-top text-2xl font-medium mb-3 text-prussian_blue opacity-80">{name}</h2>
        <div className="margin-bottom2 text-lg">{children}</div>
      </div>
      {linkedin && (
        <div className="text">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-linkedin fa-4x w3-hover-opacity"></i>
          </a>
        </div> 
      )}
    </div>
  );
};

export default ContactCard;