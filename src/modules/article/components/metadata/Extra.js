import React from 'react';
import { Link } from  'react-router';

export default React.createClass({
	getInitialState(){
		return {
     data:this.props.data
		}
	},
  componentWillReceiveProps(props){
    this.setState({
      data:props.data
    })
  },
  permissionChanged(event,key){
      var that=this;
      var data=that.state.data;
      data[key]=event.target.id;
      this.props.passBack('extra',data);
    },
  articleTypeChecked(event,key){
          var that=this;
          var data=JSON.parse(JSON.stringify(that.state.data));
          data[key]=(event.target.checked) ? 1 : 0; 
          this.props.passBack('extra',data);
  },
  switchItem(event,key){
          var that=this;
          var data=JSON.parse(JSON.stringify(that.state.data));
          data[key]=(event.target.checked) ? true : false; 
          this.props.passBack('extra',data);
  },
  selectType1(type){
    var data=JSON.parse(JSON.stringify(this.state.data));
    data['art_type1']=(data['art_type1']==type) ? '' : type;
     this.props.passBack('extra',data);
 
  },
  toggleType2(){
    var data=JSON.parse(JSON.stringify(this.state.data));
    data['art_type2']=(data['art_type2']=='branded') ? '' : 'branded';
    this.props.passBack('extra',data);
  },
  render() {
    var component=this;
    return (
      <div>
        <div className="switch margin-bottom">
          <label>
              Advertisements
              <input type="checkbox" checked={component.state.data.advertisements == true} onChange={(event)=> component.switchItem(event,'advertisements')} />
              <span className="lever"></span>
          </label>
        </div>

        <div className="switch margin-bottom">
          <label>
             Recommendations
            <input type="checkbox" checked={component.state.data.recommendations == true} onChange={(event)=> component.switchItem(event,'recommendations')} />
            <span className="lever"></span>
          </label>
        </div>

        <div className="article-type margin-bottom">
          <label className="block-element">Article Type</label>
          <div className={(component.state.data.art_type2 === "branded") ? 'chip selected' : 'chip'}  onClick={()=>this.toggleType2('branded')}>
            Branded
          </div>
          <div className={(component.state.data.art_type1 === "created") ? 'chip selected' : 'chip'} onClick={()=>this.selectType1('created')}>
            Created
          </div>
          <div className={(component.state.data.art_type1 === "curated") ? 'chip selected' : 'chip'} onClick={()=>this.selectType1('curated')}>
            Curated
          </div>
        </div>
            
        <div className="articleType">
          <label className="block-element">Also publish to</label>
          <span className="categoryCheck">
            <input className="filled-in" type="checkbox" id="ia" checked={component.state.data.ia == 1} onChange={(event)=> component.articleTypeChecked(event,'ia')} />
            <label htmlFor="ia">IA</label>
          </span>
          <span className="categoryCheck">
            <input className="filled-in" type="checkbox" id="aPP" checked={component.state.data.app == 1} onChange={(event)=> component.articleTypeChecked(event,'app')} />
            <label htmlFor="aPP">App</label>
          </span>
          <span className="categoryCheck">
            <input className="filled-in" type="checkbox" id="website" checked={component.state.data.website == 1} onChange={(event)=> component.articleTypeChecked(event,'website')} />
            <label htmlFor="website">Website</label>
          </span>

          <span className="categoryCheck">
            <input className="filled-in" type="checkbox" id="amp" checked={component.state.data.amp == 1} onChange={(event)=> component.articleTypeChecked(event,'amp')} />
            <label htmlFor="amp">AMP</label>
          </span>
        </div>
      </div>
    )
  }
});



