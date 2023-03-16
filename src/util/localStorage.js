export const addUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  export const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };
  
  export const getUserFromLocalStorage = () => {
    const result = localStorage.getItem("user");
    const user = result ? JSON.parse(result) : {};
    return user;
  };

  export const getToken = () => {
    const result = localStorage.getItem("user");
    return result ? JSON.parse(result).token : false;
  }

  export const updateAvatar = (avatarName) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if(userData){
      userData.user.avatar = avatarName;
      localStorage.setItem("user", JSON.stringify(userData));
    }
  }
  