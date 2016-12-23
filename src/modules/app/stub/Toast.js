var toast={
  LOGIN:{
    'error':'',
     success(data) {

      return {
        message: 'Welcome ' + data.display_name
      }
    },
    unauthorized(){
      return {
        message:'Wrong username or password'
      };
    }
  },
  USER:{
    'removedFromLocal'(data){
      return {
        message:'Removed user : ' + data.display_name +' from local'
      };
    },
    logout(){
      message:'logged out successfully'
    }
  }
}
module.exports =function(event) {
  if(!event || !event.context ){
    return false;
  }
  event.data=event.data || {};
  return toast[event.context.toUpperCase()][event.case](event.data)
}
