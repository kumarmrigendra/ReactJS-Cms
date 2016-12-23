import {default as buildDesign} from './buildDesign';
export default function(data) {
	
	var meta_data={
			"art_type1":"curated",//CREATED
			"art_type2":"BRANDED",// EMPTY
			"ia":data.metaData.extra.ia,
			"app":data.metaData.extra.app,
			"website":data.metaData.extra.website,
			"amp":data.metaData.extra.amp,
			"show_homepage" : "showhomepage",
			"originalSource":data.metaData.feature_image.original_src, 
			"featuredSource":data.metaData.feature_image.src, 
			"mastheadSource":"",
			"art_rep":buildDesign(data.extraData.design),
			"auth_choice":[],
			"do_not_show_ad":(data.metaData.extra.advertisements ? [] : ["do not show ad"]),
			"do_not_show_reco":!data.metaData.extra.recommendations,
			"qtags":data.metaData.qtags,
			"sdk":"",
			"seo_title":"fbbhe",
			"seo_keywords":["sdgsfg","fgg"],
			"seo_description":"dfg",
			"optFImages":data.metaData.feature_image.more || [],
			"bucket_mc":((typeof(data.metaData.bucket)=='string' ) ? data.metaData.bucket : data.metaData.bucket.value)
	};


	var data1={
		"ar_id":data.authorData.author.id || data.authorData.author._id,
		"ar_uname":data.authorData.author.username,
		"co_authors": data.authorData.co_author || [],
		"slug":data.extraData.slug,
		"lang":"en", // ??
		"publication":"scoopwhoop", // ??
		"auth_display":{
			"author_url":data.authorData.author.url || '', 
			"display_name":data.authorData.author.display_name 
		},
		"title":data.contentData.title,// - should only be  in content-data
		"sh_heading":data.metaData.short_heading, 
		"feature_img":data.metaData.feature_image.img || '',
		"meta_data": meta_data,
		"topic_id":[]
	};
	var data2={
		"data":{
			"data":{
				"ver_data":{
					"title":data.contentData.title,
					"feature_img":data.metaData.feature_image.img, //- should only be  in meta-data
					"sh_heading":data.metaData.short_heading, //should only be  in meta-data
					"article_content":data.contentData.content,
					"category": data.metaData.category.list,
					"tags":data.metaData.tags,
					"cat_display":data.metaData.category.display,
					"masthead":""
				},
				"slug":data.extraData.slug, // repeated 2nd time
				"userID":data.uid,
	 		}
		},
	};
	return {
		data1,
		data2
	}
}