import React from 'react';
import { Link } from  'react-router';
import { getData } from './../../../categories/services';
export default React.createClass({
	getInitialState(){
    return {
		  categories:[],
      data:this.props.data || {
        list:[],
        display:[]
      },
		}
	},
  componentWillMount(){
    var self=this;
    getData({},function(err,res){
      if(!err && res.status==1){
        self.setState({
          categories:res.data
        })
      }
    })
  },
  componentWillReceiveProps(props){
    console.log('category props new');
    this.setState({
      data:props.data
    })
  },
  clicked(e){
    console.log(e.target.value,e.target.checked)
  },
  toggleChange(event,category){
    if(event.target.checked){
      this.addCategory(category);
    }else{
       this.removeCategory(category);
    }
   
  },
  addCategory(category){
   // {"category_display":"Sports","category_slug":"sports"}
    
    var that=this;
    var data=JSON.parse(JSON.stringify(this.state.data));
    data.list.push(category.category_slug);
    data.display.push({
      category_display:category.category_display,
      category_slug:category.category_slug
    });
    that.props.passBack('category',data);
  },
   removeCategory(category){
    var that=this;
    var data=JSON.parse(JSON.stringify(this.state.data));
    data.list.push(category.category_slug);
    data.display.push({
      category_display:category.category_display,
      category_slug:category.category_slug
    });
    that.props.passBack('category',data);
  },
  render() {
    console.log('render category');
    var self=this;
    var List= this.state.categories.map(function(item, i){
      var selected=(self.state.data.list.indexOf(item.category_slug)>-1);
      return (
        <span className="input-field categoryCheck" key={i}>
          <input type="checkbox" name="categories" onChange={self.clicked} className="filled-in" id={item.category_slug} value={item.category_slug} checked={selected} onChange={(event)=> self.toggleChange(event,item)}/>
          <label htmlFor={item.category_slug}>{item.category_display}</label>
        </span>
      )           
    });
    return (
      <div id="category-panel" className="margin-bottom">
        <label className="block-element">Category</label>
       { List }
     </div>
    )
  }
});
