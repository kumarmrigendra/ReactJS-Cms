import { extractDesign } from './';
export default function(data){
  var meta_data=data.meta_data;
  var content_data=data.content_data;
  return {
      metaData:{
          "cur_state":meta_data.cur_state || '',
          'short_heading':meta_data.sh_heading || 'default',
          "qtags": meta_data.meta_data.qtags || 'default',
          "feature_image":{
            img:meta_data.feature_img || '',
            src:meta_data.meta_data.featuredSource || '',
            original_src:meta_data.meta_data.originalSource || '', 
            more:meta_data.meta_data.optFImages || []
          },
          extra:{
            "art_type2":meta_data.meta_data.art_type2 || '',
            "art_type1": meta_data.meta_data.art_type1 || '',
            "recommendations":(meta_data.meta_data.do_not_show_reco && meta_data.meta_data.do_not_show_reco == true) ? false  : true,
            "advertisements":!(meta_data.meta_data.do_not_show_ad && meta_data.meta_data.do_not_show_ad[0]=='do not show ad'),
            "ia":meta_data.meta_data.ia || 0,
            "app":meta_data.meta_data.app || 0,
            "website":meta_data.meta_data.website || 0,
            "amp":meta_data.meta_data.amp || 0,  
          },

          bucket:meta_data.meta_data.bucket_mc,
          tags:content_data.data.data.ver_data.tags || [],
          category:{
            list:content_data.data.data.ver_data.category || [],
            display:content_data.data.data.ver_data.cat_display || []
          }
      },
      contentData: {
        title:content_data.data.data.ver_data.title || '',
        content:content_data.data.data.ver_data.article_content || ''

      },
      authorData:{
        'author':{
          username:meta_data.ar_uname || '',
          id:meta_data.ar_id || '',
          display_name:meta_data.auth_display.display_name || '',
          url:meta_data.auth_display.author_url || ''
        },
        'co_author':meta_data.co_authors || [],
      },
      extraData:{
        state:meta_data.cur_state,
        design:extractDesign(meta_data.meta_data.art_rep),
        slug:content_data.data.data.slug

      }
  }
    
}