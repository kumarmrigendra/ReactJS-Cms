var localUser = require('./localUser');
var login = function login_user(data) {
  const User_Data = data;
  const User_Details = JSON.parse(User_Data.user_details).data[0];
  const Permissions = User_Data.permission
  
  localUser.set(User_Details.username);
  localUser.add({
    userDetails: User_Details
  });
  localUser.setPermissions({permissions:Permissions});
}

module.exports = {
  login,
  loggedIn(){
  	return localUser.get() || false;
  }
}
