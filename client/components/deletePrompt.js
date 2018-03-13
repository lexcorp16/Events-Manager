import React, { Component } from 'react';

class DeletePrompt extends Component {
  render () {
    return (
      <div>
        <div className="delete-prompt container">
          <h4 style={{ color: 'white', borderBottom: '2px solid grey'}}>Do you really want to delete this center</h4>
          <div className="row container">
            <div className="col-xs-6">
              <button className="btn btn-default" style={{color: 'black' }}>NO</button>
            </div>
            <div className="col-xs-6">
              <button className="btn btn-default" style={{color: 'black' }}>YES</button>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default DeletePrompt;
