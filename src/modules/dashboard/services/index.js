import get from './../../utils/functionals/get';
import post from './../../utils/functionals/post';
import { default as API } from './../stub/API';
import { API as GLOBAL_API } from './../../../stub/APPLICATION';
import { INTELLI_API as INTELLI_API } from './../../../stub/APPLICATION';
import {localUser} from './../../utils/functionals';

const queryObj = {
	userid:'567b95ed6e510a2d2d876fba',	 
};

module.exports = {

	lastWorkedOn(query, cb){ 
		query = queryObj;
		var request = {
			payload: JSON.stringify(query),
      		apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['LASTWORKEDON']
    	};
    	get(request, function(err,res){  
	      cb(err,res)
	    });
	},
	published(query, cb){
    	query = queryObj;
    	// query.offset = 0;
		var request = {
			payload: JSON.stringify(query),
      		apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['PUBLISHED']
    	};
    	get(request, function(err,res){ 
	      cb(err,res)
	    });
	},
	draft(query, cb){
		query = queryObj;
		// query.offset = 0;
		var request = {
			payload: JSON.stringify(query),
      		apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['DRAFTS']
    	};
    	get(request, function(err,res){ 
	      cb(err,res)
	    });
	},
	invalidated(query, cb){
		query = queryObj;
		// query.offset = 0;
		var request = {
			payload: JSON.stringify(query),
      		apiUrl: GLOBAL_API.prefix  + GLOBAL_API.suffix + API['INVALIDATED']
    	};
    	get(request, function(err,res){ 
	      cb(err,res)
	    });
	},	
	pastLens(query, cb){ 
		var request = {
			query: query,
      		apiUrl: INTELLI_API.prefix + API['PASTLENS'] 
    	}; 
    	get(request, function(err,res){  
	      cb(err,res)
	    });
    },
    projections(query, cb){
		var request = {
			payload: JSON.stringify(query),
      		apiUrl: INTELLI_API.prefix + API['PROJECTIONS']
    	};
    	get(request, function(err,res){ 
	      cb(err,res)
	    });
    },
    latest(query, cb){
		var request = {
			payload: JSON.stringify(query),
      		apiUrl: INTELLI_API.prefix + API['LATEST']
    	};

    	get(request, function(err,res){
	      cb(err,res)
	    });
    },
    promote(query, cb){
		var request = {
			payload: JSON.stringify(query),
      		apiUrl: INTELLI_API.prefix + API['PROMOTE']
    	};

    	get(request, function(err,res){
	      cb(err,res)
	    });
    },
    scoreCard(query, cb){
		var request = { 
      		apiUrl: INTELLI_API.prefix + API['SCORECARD']
    	};

    	get(request, function(err,res){
	      cb(err,res)
	    });
    },
    youtubeAlert(query, cb){
		var request = { 
      		apiUrl: INTELLI_API.prefix + API['YOUTUBEALERT']
    	};

    	get(request, function(err,res){
	      cb(err,res)
	    });
    },
    twitterAlert(query, cb){
		var request = { 
      		apiUrl: INTELLI_API.prefix + API['TWITTERALERT']
    	};

    	get(request, function(err,res){
	      cb(err,res)
	    });
    },
    quotesAlert(query, cb){
		var request = { 
      		apiUrl: INTELLI_API.prefix + API['QUOTESALERT']
    	};

    	get(request, function(err,res){
	      cb(err,res)
	    });
    },
    getDashboard(query, cb){
    	var user=localUser.get();
	    if(!user || !query || typeof(query)!='object') {
	      cb('error','');
	      return;
	    }
	    query.userid=user.info._id || '';
    	var request = {
    		payload: query,
    		apiUrl: GLOBAL_API.prefix + GLOBAL_API.suffix + API['GETDASHBOARD']
    	}
    	get(request, function(err,res){
	      cb(err,res)
	    });
    },
    createDashboard(query, cb){
    	console.log(query);
    	var user=localUser.get();
	    if(!user || !query || typeof(query)!='object') {
	      cb('error','');
	      return;
	    }
	    query.userid=user.info._id || '';
    	var request = {
    		payload: query,
    		apiUrl: GLOBAL_API.prefix + GLOBAL_API.suffix + API['CREATEDASHBAORD']
    	} 
    	post(request, function(err,res){
	      cb(err,res)
	    });
    },
    editDashboard(query, cb){
    	var user=localUser.get();
	    if(!user || !query || typeof(query)!='object') {
	      cb('error','');
	      return;
	    }
	    query.userid=user.info._id || '';
    	var request = {
    		payload: query,
    		apiUrl: GLOBAL_API.prefix + GLOBAL_API.suffix + API['EDITDASHBAORD']
    	}
    	post(request, function(err,res){
	      cb(err,res)
	    });
    },
    invalidateDashboard(query, cb){
    	var user=localUser.get();
	    if(!user || !query || typeof(query)!='object') {
	      cb('error','');
	      return;
	    }
	    query.userid=user.info._id || '';
    	var request = {
    		payload: query,
    		apiUrl: GLOBAL_API.prefix + GLOBAL_API.suffix + API['INVALIDATEDASHBAORD']
    	}
    	post(request, function(err,res){
	      cb(err,res)
	    });
    }

};

