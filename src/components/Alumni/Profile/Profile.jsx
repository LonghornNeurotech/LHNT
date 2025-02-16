/* 
    Profile card for the Alumni page 

    Functionality: 
    - Displays relevant information about an alumni 
        member from Longhorn Neurotech!
*/
const Profile = ({ name, photo, major, graduationYear, bio }) => {
  return (
    <div className="bg-[#FFF8D6] rounded-lg shadow-md p-4 flex flex-col items-center">
      {photo && (
        <img 
          src={photo}
          alt={name}
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
      <h3 className="text-xl font-semibold text-prussian-blue break-words text-center">{name}</h3>
      <p className="text-sm text-prussian-blue">{major} - {graduationYear}</p>
      <p className="text-sm text-prussian-blue text-center mt-2">{bio}</p>
    </div>
  );
};

export default Profile;