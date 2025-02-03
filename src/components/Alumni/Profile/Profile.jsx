/* 
    Profile card for the Alumni page 

    Functionality: 
    - Displays relevant information about an alumni 
        member from Longhorn Neurotech!
*/
const Profile = (name) => {
    return (
      // Temp class for testing. TODO: Replace with profile class
      <div className="contact-card">
        <div>
          <h2 className="margin-top">Placeholder</h2>
          <h2 className="w3-xlarge margin-top"><b>{name}</b></h2>
        </div>
      </div>
    );
};

export default Profile;