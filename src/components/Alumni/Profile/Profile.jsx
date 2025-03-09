import {useState} from "react"; 
/* 
    Profile card for the Alumni page 

    Functionality: 
    - Displays relevant information about an alumni 
        member from Longhorn Neurotech!
*/
const Profile = ({ name, photo, major, graduationYear, cohorts, contacts, bio }) => { // Phone is optional. Maybe implement placeholder in data itself

  const [imageError, setImageError] = useState(false); 

  return (
    <div
      className={`bg-[#5D89BA] rounded-lg shadow-md p-4`}
    >
      {/* Name, Role, and Year */}
      <div className="flex flex-col items-center w-full mb-4">
        <h3 className="text-4xl font-bold text-[#FFF8D6] break-words text-center mb-2">{name}</h3>
        {cohorts.map((cohort, index) => (
          <div key={index} className="bg-[#bf5801] py-1 w-[12em] text-center">
            <p className="text-[1.3em] text-white mx-1 tracking-wide">
              {cohort.role} {cohort.year} - {cohort.year + 1}
            </p>
          </div>
        ))}
      </div>

      <div className={`flex ${imageError ? "flex-col items-center" : "flex-row items-start"}`}>

        {/* Image Section */}
        {!imageError && photo && (
          <img
            src={photo}
            alt={`Profile picture of ${name}`}
            className="w-[50%] h-[18em] rounded-xl object-cover mb-2 md:mr-4"
            onError={(e) => {
              setImageError(true); // Update state if image fails to load
              e.target.onerror = null;
              e.target.style.display = "none";
            }}
          />
        )}

        {/* Content Section */}
        <div
          className={`flex flex-col ${
            imageError ? "items-center" : "items-start"
          } w-full md:w-1/2`}
        >
          <p className="text-xl text-[#F3E5AB] tracking-[0.06em]">{major} - {graduationYear}</p>
          <p className="text-lg text-[#F9F6EE] mt-2 tracking-wider">{contacts.email}</p>
          {contacts.phone && (
            <p className="text-lg text-[#F9F6EE] mt-2 tracking-wider">{contacts.phone}</p>
          )}
          {contacts.linkedin && (
            <a href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
              <i className="fa fa-linkedin fa-4x w3-hover-opacity mt-2"></i>
            </a>
          )}
          <p className="text-lg text-[#F9F6EE] text-center mt-2 tracking-wide">{bio}</p>
        </div>
      </div>
      
    </div>


    // <div className="bg-[#5D89BA] rounded-lg shadow-md p-4 flex flex-col items-center">
    //   <h3 className="text-xl font-bold text-[#FFF8D6] break-words text-center">{name}</h3>
    //   {cohorts.map((cohort, index) => (
    //     <div className="bg-[#bf5801] py-1 w-1/2 text-center">
    //       <p key={index} className="text-sm text-white"> {cohort.role} {cohort.year} - {cohort.year + 1} </p>
    //     </div>
    //   ))}
    //   {photo && (
    //     <img 
    //       src={photo}
    //       alt={`Profile picture of ${name}`}
    //       className="w-32 h-32 rounded-full object-cover mb-2"
    //       /* 
    //         If image fails to load or there are no image for the 
    //         alumni, then responsively rearrange the other elements
    //         of an alumni's Profile card as if the image doesn't
    //         exist for the alumni's Profile card!
    //       */
    //       onError={(e) => {
    //         e.target.onerror = null;
    //         e.target.style.display = 'none'
    //       }}
    //     />
    //   )}
    //   <p className="text-sm text-[#F3E5AB]">{major} - {graduationYear}</p>
    //   <p className="text-sm text-[#F9F6EE] mt-2">{contacts.email}</p>
    //   <p className="text-sm text-[#F9F6EE] mt-2">{contacts.phone}</p>
    //   <a href={contacts.linkedin} target="_blank">
    //     <i className="fa fa-linkedin fa-4x w3-hover-opacity"></i>
    //   </a>
    //   <p className="text-sm text-[#F9F6EE] text-center mt-2">{bio}</p>
    // </div>
  );
};

export default Profile;