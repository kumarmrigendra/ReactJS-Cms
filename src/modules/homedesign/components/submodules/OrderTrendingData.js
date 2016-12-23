import React from 'react';
import { Link } from 'react-router';
import { If } from './../../../utils/components';
export default React.createClass({
  getInitialState(){
    return {
      data:this.props.data,
      reorder:this.props.reorder,
      edit:false,
      item:'',
      index:''
    };
  },
  
  componentWillReceiveProps(props){
    this.setState({
      data:props.data,
      reorder:props.reorder
    })
  },
  toggleReorder(){
    this.setState({
      reorder:!this.state.reorder
    })
  },
  cancelReorder(){
    this.props.toggleReorder();
  },
  up(e,index){
    e.preventDefault();
    var data=this.state.data.slice(),temp;
    console.log(index,data);
    console.log(index,data[index],data[index-1])
    if(index>0){
      temp=data[index-1];
      data[index-1]=data[index];
      data[index]=temp
    }
    this.setState({
      data
    })
  },
  down(e,index){
    e.preventDefault();
    var data=this.state.data.slice(),temp;
    console.log(index,data);
    if(index<data.length-1){
      temp=data[index+1];
      data[index+1]=data[index];
      data[index]=temp
    }
    this.setState({
      data
    })
  },
  saveReorder(){
    var data=this.state.data
   this.setState({
       data
   })
   this.props.save(data);
   console.log(data);
  },
  editTrending(event,item,index){
    event.preventDefault();
    console.log(item);
    this.setState({
      edit:true,
      item:item,
      index:index
    })
  },
  input(event,key){
    var data1=this.state.data[this.state.index];
    console.log(data1);
    var item=this.state.item;
    item[key]=event.target.value;
    this.setState({
      data1:item
    })
  },
  saveTrending(){
      this.setState({
      edit:false
    })
  },
  render() {
    var Trending=null;
    if(this.state.data && this.state.data.length>0){
      Trending = this.state.data.map((item,index) =>     
      <li className="collection-item" key={index}>
         <div>
            
              <a href="#">{item.tag}</a>
              <a href="#!" className="secondary-content" id ={index} onClick={(event) => this.editTrending(event,item,index)}>
                <i className="material-icons">edit</i>
              </a>
            <If test={this.state.reorder && index!=0}>
              <a href="#!" className="secondary-content" onClick={(e)=>this.up(e,index)}>
                <i className="material-icons">arrow_upward</i>
              </a>
            </If>
            <If test={this.state.reorder &&  index!=this.state.data.length-1}>
              <a href="#!" className="secondary-content" onClick={(e)=>this.down(e,index)}>
                <i className="material-icons">arrow_downward</i>
              </a>
            </If >
         </div>
       </li>
      );
    }
    return (
      <ul className="collection">
      <If test={this.state.edit}>
              <div className="row">
                <div className="col l2">
                  <label>Tag</label>
                  <input type="text" value={this.state.item.tag} onChange={(event) => this.input(event,'tag')} / >
                </div>
                <div className="col l6">
                  <label>Slug</label>
                  <input type="text" value={this.state.item.slug} onChange={(event) => this.input(event,'slug')} / >
                </div>
                <button className="btn col l2" onClick={this.saveTrending}>Save</button>
                <button className="btn col l2" onClick={this.saveTrending}>Cancel</button>
              </div>

        </If>
        {Trending}
        <If test={this.state.reorder}>
          <li className="teal collection-item">
            <button className="btn" onClick={this.saveReorder}>Update</button>
            <button className="btn" onClick={this.cancelReorder}>Cancel</button>
          </li>
        </If>
      </ul>
    );
  }
});
