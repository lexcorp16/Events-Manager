import React, { Component } from 'react';

class centerList extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
        <option value={this.props.center.id} name={this.props.center.name}>{this.props.center.name}</option>
    );
  }
}

export default centerList;
