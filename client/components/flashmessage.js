import React, { Component } from 'react';

class FlashMessage extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className="alert alert-warning">{this.props.user.error}</div>
    )
  }
}

export default FlashMessage;