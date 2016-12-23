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
   		message:'Successfully saved the topic.'
   },
   created:{
         context:'success',
         message:'Successfully created the topic.'
   },
   invalidatedSlug:{
      context:'error',
      message:'Validate slug before proceeding'
   },
   articleFeatured:{
       context:'success',
      message:'Successfully featured the article'
   }

}