import React from 'react';
import { Link } from  'react-router';

export default React.createClass({
	getInitialState(){
    return {
      data:this.props.data || {}
    }
  },
  componentWillReceiveProps(props){
    this.setState({
      data:props.data
    })
  },
  addMoreFeatureImage(){
    var data=JSON.parse(JSON.stringify(this.state.data));
    data.more.push('f');
    this.setState({
      data
    });
  },
  input(e,key,i){
    var data=JSON.parse(JSON.stringify(this.state.data));
    if(key=='more'){
      data.more[i]=e.target.value;
    }else{
      data[key]=e.target.value;
    }
    this.props.passBack('feature_image',data);
  },
  render() {
    var self=this;
    return (
 			<div>
      		<div className="i">
            <label htmlFor="feature-image" className="block-element">Feature Image</label>
    		    <input id="feature-image" placeholder="Enter Url and press enter" type="text" onChange={(e) => this.input(e,'img')} value={this.state.data.img} />
      		</div>
           <div className="">
            <label htmlFor="original-image-source" className="block-element">Original Source</label>
            <input id="original-image-source" onChange={(e) => this.input(e,'original_src')} placeholder="Enter Original Source Url" type="text" value={this.state.data.original_src}/>
          </div>

          <div className="">
            <label htmlFor="image-source" className="block-element">Feature Image Source</label>
            <input id="image-source" placeholder="Enter Feature Image Source Url" onChange={(e) => this.input(e,'src')} value={this.state.data.src} type="text" />
           
          </div>
            <button className="btn" type="submit" onClick={this.addMoreFeatureImage}>Add Optional feature Image</button>
                 <ul> 
                        {
                          this.state.data.more.map(function(item,i){
                            return(
                              <li key={i}><input placeholder="Feature Image" type="text" value={item} onChange={(e) => self.input(e,'more',i)} /></li>
                            )
                          })
                        }
                    </ul>
         
        </div>
     
    )
  }
});




