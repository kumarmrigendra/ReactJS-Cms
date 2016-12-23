import React from 'react';
import { Link, browserHistory } from 'react-router';
import { postTrendingData } from './../services';
import { If } from './../../utils/components';
import { toast } from './../../utils/functionals';
import { default as Toast } from './../stub/Toast';
import AddTrendingData from './submodules/AddTrendingData';
import OrderTrendingData from './submodules/OrderTrendingData';
export default React.createClass({
  getInitialState(){
    return {
      data:this.props.trending,
      addTag:false,
      reorder:false
    };
  },
  componentWillReceiveProps(props){
      this.setState({
        data: props.trending
      })
  },
  create(tag){
    var data=this.state.data.slice();

    tag['position']=JSON.stringify(data.length+1)
    data=data.concat([tag])
    this.setState({
      data:data.slice()
    });
    this.doneCreate();
  },
  doneCreate(){
    this.setState({
      addTag:false
    })
  },
  toggleAddTag(){
    this.setState({
      addTag:!this.state.addTag
    })
  },
  toggleReorder(){
    this.setState({
      reorder:!this.state.reorder
    })
  },
  save(data){ 
    this.setState({
      data:data.slice()
    });
    this.toggleReorder();
  },
  submitTags(){
    var self=this
    var data=self.state.data
    self.setState({
       data
    })
    postTrendingData({ tdata:data }, (err, res) => {
      if(res.status==0 || err){
        toast.show(Toast.error);
      }
      if (res.status==1){
        toast.show(Toast.updated); 
      }
    })
  },
  render(){
    var component=this;
      return (
        <div>
          <div className="card ">
            <div className="card-action">
              <button className="btn" onClick={this.toggleAddTag}>Add new Tag</button>
              <button className="btn" onClick={this.toggleReorder}>Reorder</button>
            </div>
          </div>
          <If test={this.state.addTag}>
           <AddTrendingData create={this.create} done={this.doneCreate} />
          </If>
          <OrderTrendingData up={this.up} down={this.down} data={this.state.data} reorder={this.state.reorder} toggleReorder={this.toggleReorder} save={this.save} done={this.doneCreate} toggleAddTag={this.toggleAddTag} />
          <button className="btn" onClick={this.submitTags}>Submit Tags</button>
        </div>
      )
  }
});

