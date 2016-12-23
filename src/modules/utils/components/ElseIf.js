import React from 'react';

export default React.createClass({
  render: function() {
    if (!this.props.test) {
      return this.props.children;
    } else {
      return false;
    }
  }
});
