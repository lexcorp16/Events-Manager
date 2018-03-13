import React from 'react';

import '../public/style.scss';
import logo from '../public/images/coference2.jpg';

const CenterCard = (props =>
  <div className="container">
    <div className="card" style={{ width: "350px", marginTop: "30px" }}>
      <div className="card-body">
        <h4 className="card-title text-center">{props.center.name}</h4>
        <div className="edit-section">
          <div className="row"> 
            <div className="col-xs-4 edit-section1 text-center" data-toggle="tooltip" title="Edit center">
              <button className="btn btn-primary"><i className="fa fa-edit" style={{ fontSize: '1.5em', color: 'skyblue' }} /></button>
            </div>
            <div className="col-xs-4 edit-section2 text-center" data-toggle="tooltip" title="See center Details">
              <button className="btn btn-success"><i className="fa fa-info" style={{ fontSize: '1.5em', color: 'pink' }} /></button>
            </div>
            <div className="col-xs-4 edit-section3 text-center" data-toggle="tooltip" title="Delete center">
              <button className="btn btn-danger" onClick={props.promptDeleteCenter}><i className="fa fa-trash" style={{ fontSize: '1.5em' }} onClick={() => console.log('man')} role="deletePrompt" /></button>
            </div>
          </div>
        </div>
      </div>
      <img className="card-img-top img-fluid" src={logo} alt="Card" style={{ width: "100%" }} />
    </div>
  </div>
);

export default CenterCard;
