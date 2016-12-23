import React from 'react';
export default React.createClass({
	getInitialState(){
		return {
		}
	},
	componentDidUpdate(){
		if(this.input){
			this.input.focus();
		}
	},
	componentDidMount(){
		if(this.input){
			this.input.focus();
		}
	},
	search(){
			this.props.search(this.input.value)
		
	},
  	render() {
    	return (
          <nav>
				    <div className="nav-wrapper">
				      <form>
				        <div className="input-field">
				          <input id="search-input" type="search" onChange={this.search} required ref={(el) => this.input = el} />
				          <label htmlFor="search"><i className="material-icons">search</i></label>
				          <i className="material-icons" id="close" onClick={this.props.close}>close</i>
				        </div>

				      </form>
				    </div>
				  </nav>
     
    )
  }
});