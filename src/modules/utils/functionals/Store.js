var findLocalUsers = function find_local_users() {
  var users = localStorage.getItem('local_users');
  if (users) {
    return JSON.parse(users);
  } else {
    return {};
  }
}
var setLocalUser = function set_local_user(data) {
  const User_Data = data;
  const User_Details = JSON.parse(User_Data.user_details).data[0];
  var localUsers = findLocalUsers();
  if (localUsers[User_Details.username]) {
    //user already in local

  } else {
    localUsers[User_Details.username] = {
      permissions: User_Data.permissions,
      userDetails: User_Details,
    }
  }
  localStorage.setItem('local_users', JSON.stringify(localUsers));
}


module.exports = {
  findLocalUsers,
  setLocalUser,
}
