import React from 'react';
import LoginHeader from './LoginHeader';
export default React.createClass({
  render() {
    return ( < div className = "mdl-cell mdl-cell--4-col mdl-cell--4-offset demo-card-square mdl-card mdl-shadow--2dp primary_yellow_background" >

      < LoginHeader title = "Forgot Password" / >
      < div className = "mdl-card__supporting-text text-center" >
      < form action = "#" >
      < div className = "mdl-textfield mdl-js-textfield block-element login-input" >
      < input className = "mdl-textfield__input"
      type = "text"
      id = "sample3" / >
      < label className = "mdl-textfield__label"
      for = "sample3" > Username < /label> < /div>

      < button className = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" >
      Send Reset Link < /button> < /form> < /div> < div className = "mdl-card__actions mdl-card--border" >
      < a className = "mdl-button mdl-button mdl-js-button mdl-js-ripple-effect" >
      Sign in with a different account < /a> < /div> < /div>
    )
  }
})
