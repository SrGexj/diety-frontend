export const ProfileImage = ({ name, image }) => {
  const nameParts = name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";

  return (
    <span className="user-profile-image ">
     { image 
        ? <img src={image} alt="User avatar" /> 
        : <span className="user-profile-image--initials">{firstNameInitial + lastNameInitial}</span>
     }
    </span>
  );
};
