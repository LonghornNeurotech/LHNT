/* 
    Profile card for the Alumni page 

    Functionality: 
    - Displays relevant information about an alumni 
        member from Longhorn Neurotech!
*/
const Profile = ({ name, photo, major, graduationYear, cohorts, contacts, bio }) => { // Phone is optional. Maybe implement placeholder in data itself
  return (
    <div className="bg-[#5D89BA] rounded-lg shadow-md p-4 flex flex-col items-center">
      <h3 className="text-xl font-bold text-[#FFF8D6] break-words text-center">{name}</h3>
      {cohorts.map((cohort, index) => (
        <div className="bg-[#bf5801] py-1 w-1/2 text-center  ">
          <p key={index} className="text-sm text-white"> {cohort.role} {cohort.year} - {cohort.year + 1} </p>
        </div>
      ))}
      {photo && (
        <img 
          src={photo}
          alt={`Profile picture of ${name}`}
          className="w-32 h-32 rounded-full object-cover mb-2"
          /* 
            If image fails to load or there are no image for the 
            alumni, then responsively rearrange the other elements
            of an alumni's Profile card as if the image doesn't
            exist for the alumni's Profile card!
          */
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none'
          }}
        />
      )}
      <p className="text-sm text-[#F3E5AB]">{major} - {graduationYear}</p>
      <p className="text-sm text-[#F9F6EE] mt-2">{contacts.email}</p>
      <p className="text-sm text-[#F9F6EE] mt-2">{contacts.phone}</p>
      <a href={contacts.linkedin} target="_blank">
        <i class="fa fa-linkedin fa-4x w3-hover-opacity"></i>
      </a>
      <p className="text-sm text-[#F9F6EE] text-center mt-2">{bio}</p>
    </div>
  );
};

export default Profile;