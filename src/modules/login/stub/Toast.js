export default {

   warning(){
   	return {
   		context:'error',
   		message:'Incorrect username or password'
   	}
   },
    error(){
   	return {
   		context:'error',
   		message:'Something went wrong.'
   	}
   },
   success(){
   	return {
   		context:'success',
   		message:'Logged in successfully'
   	}
   },

}