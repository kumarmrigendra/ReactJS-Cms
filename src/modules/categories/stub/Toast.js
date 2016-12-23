export default {

   warning(){
   	return {
   		context:'error',
   		message:'Incorrect username or password'
   	}
   },
    error:{
   		context:'error',
   		message:'Something went wrong.'
   },
   saved:{
   		context:'success',
   		message:'Successfully saved the category.'
   },
   created:{
         context:'success',
         message:'Successfully created the category.'
   },
   invalidatedSlug:{
      context:'error',
      message:'Validate slug before proceeding'
   }

}