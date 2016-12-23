var add = function add_local(data) {
  var userDetails = data.userDetails
  var localUsers = getAll();
  if (localUsers[userDetails.username]) {
    //user already in local
  } else {
    localUsers[userDetails.username]={
      info:userDetails
    } 
  }
  localStorage.setItem('users', JSON.stringify(localUsers));
}
var setPermissions=function set_permissions(data){
  localStorage.setItem('permissions',JSON.stringify(data.permissions));
}
var getPermissions=function get_permissions(data){
  var permissions = localStorage.getItem('permissions');
  if (permissions) {
    return JSON.parse(permissions);
  } else {
    return null
  }

}

var remove=function remove_user(username){
  var localUsers=getAll();
  if (localUsers[username]) {
    var user=localUsers[username];
    delete localUsers[username];
    localStorage.setItem('users', JSON.stringify(localUsers));
    return user;
  }
  return false;
}
var get = function get_user() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  return getByUsername(token);
}
var set = function set_user(token) {
  localStorage.setItem('token', token);
}

var getAll = function get_all() {
  var users = localStorage.getItem('users');
  if (users) {
    return JSON.parse(users);
  } else {
    return {};
  }
}
var getByUsername = function get_by_username(username) {
  const users = getAll();
  return users[username];
}

module.exports = {
  get,
  set,
  getAll,
  add,
  remove,
  getByUsername,
  setPermissions,
  getPermissions
}
