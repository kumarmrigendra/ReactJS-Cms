import React from 'react';
import { Link, withRouter } from 'react-router';
import { If, ElseIf, Alert, Spinner } from './../../utils/components';
import { toast } from './../../utils/functionals';
import { searchData, updateEditorPick } from './../services';
import Toast from './../stub/Toast';
export default React.createClass({
	getInitialState:function(){
		return{
      reorder:false,
			data:this.props.data,
      editIndex:[],
      saving:false,
      submit:true,
      cancel:true,
		}
	},
	componentWillReceiveProps(props){
		this.setState({
			data:props.data,
      reorder:false
		})
	},
  toggleReorder(){
    this.setState({
      reorder:!this.state.reorder,
      submit:false,
      cancel:false
    })
  },
  toggleCancel(){
    var that =this;
    this.setState({
      data: that.props.data,
      reorder:false,
      submit:true,
      cancel:true,
      editIndex:[]
    })
  },
	up(index){
    console.log(index);
    var data=this.state.data.slice().slice(),temp;
    var editIndex = this.state.editIndex.slice();
    if(index>0){
      if(editIndex.indexOf(index) >= 0 && editIndex.indexOf(index-1) >= 0){
        console.log('welcome sw');
      }
      else if(editIndex.indexOf(index) >= 0){
        editIndex.splice(editIndex.indexOf(index),1,index-1);
      }
      else if(editIndex.indexOf(index-1) >= 0){
        editIndex.splice(editIndex.indexOf(index-1),1,index);
      }
      temp=data[index-1];
      data[index-1]=data[index];
      data[index]=temp
    }
    this.setState({
          data,
          editIndex
        })
  },
  down(index){

     var data=this.state.data.slice(),temp;
     var editIndex = this.state.editIndex.slice();
        if(index<data.length-1){
          if(editIndex.indexOf(index) >= 0 && editIndex.indexOf(index+1) >= 0){
            console.log('welcome');
          }
          else if(editIndex.indexOf(index) >= 0){
            editIndex.splice(editIndex.indexOf(index),1,index+1);
          }
          else if(editIndex.indexOf(index+1) >= 0){
            editIndex.splice(editIndex.indexOf(index+1),1,index);
          }
          temp=data[index+1];
          data[index+1]=data[index];
          data[index]=temp
        }
        this.setState({
          data,
          editIndex
        })
  },
 
search(index){
    var self=this;
    self.setState({
        reorder:false        
      })
    this.props.search({
      articles:{
        titleClick(article){
          self.loadArticle(article,index);
        },
        closeAfterTitleClick:true
      }
    })

  },
  loadArticle(article,index){
    var that =this;
    console.log(article);
    if (this.state.editIndex.indexOf(index) === -1) {
      var idata=this.state.editIndex.slice();
      idata.push(index);
      that.setState({
        editIndex: idata,
        submit:false,
        cancel:false
      })
    }  
    var data=this.state.data.slice();
    data.splice(index,1,article);
    this.setState({
      data
    })
  },
   updateEditorPick(){
    this.setState({
          editIndex:[],
          saving:true,
          cancel:true,
          submit:true,
          reorder:false,          
        })
    var data=this.state.data;
    console.log(this.state.data);
    // var postData=["why-your-body-jerks-while-falling-asleep","inothernews/powerful-photos-world","Watch-Spectacular-Aerial-Footage-Shows-Vishakhapatnam-In-4K-HD","HD-cctv-Delhi"];
    var postData=[];
    this.state.data.map((item,index) =>{
      postData.push(item.slug);
    })
  

    updateEditorPick({data:postData, category:"home"}, (err, res) => {
          if(err || res.status==0){
            toast.show(Toast.error);
            return;
          }
          toast.show(Toast.saved);

            
      }) 
  },
	render : function(){
    console.log('editIndex', this.state.editIndex);
	var that=this;
		var list=[];
		if(this.state.data && this.state.data.length>0){
			list=this.state.data.map((item,index) => 
				<li className="collection-item" key={index}>
				    <div>
                  
                	  <span>{index+1}. </span>
                    <If test={!(this.state.editIndex.indexOf(index) >=0)} >
                  	   <Link className=""  to={item.slug}>{item.title}</Link>
                    </If>
                    <If test={(this.state.editIndex.indexOf(index) >=0)} >
                        <Link className="red-text"  to={item.slug}>{item.title}</Link>
                    </If>
  	                  <a href="#!" className="secondary-content"  onClick={()=>this.search(index)}>
  	                   <i className="material-icons" >edit</i>
  	                  </a>
                  <If test={this.state.reorder && index!=0}>
                    <a href="#!" className="secondary-content" onClick={()=>this.up(index)}>
                     <i className="material-icons">arrow_upward</i>
                    </a>
                  </If>
                     <If test={this.state.reorder &&  index!=this.state.data.length-1}>
                       <a href="#!" className="secondary-content" onClick={()=>this.down(index)}>
                       <i className="material-icons">arrow_downward</i>
                      </a>
                     </If >
            </div>
				</li>
				)
		}
		return(
      <div className="card ">
          <div className="card-action">
            <button className="btn"  onClick={this.toggleReorder}>Reorder</button>
            <button className="btn" disabled={this.state.submit} onClick={this.updateEditorPick}>Submit</button>
            <button className="btn" disabled={this.state.cancel}onClick={this.toggleCancel}>cancel</button>
          </div>
          <Spinner show={this.state.saving} />
			    <ul className="collection">
          		{list}
          </ul>
      </div>
			)
	}
});