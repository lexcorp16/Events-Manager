import React from 'react';
import PropTypes from 'prop-types';

import '../../public/style.scss';
import logo from '../../public/images/coference2.jpg';

const CenterCard = (props =>
  (
    <div className="col-lg-4 col-sm-6 col-xs-12 center-card">
      <div className="card" style={{ width: '270px', marginTop: '30px' }}>
        <img className="card-img-top img-fluid" src={logo} alt="Card" />
        <div className="card-body">
          <h4 className="card-title text-center">{props.center.name}</h4>
          <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
          <button className="btn btn-block btn-info" onClick={props.promptSeeCenter} id={props.center.id}>See More Info</button>
          <button className="btn btn-block btn-secondary" onClick={props.promptModifyCenter} id={props.center.id}>Modify</button>
        </div>
      </div>
    </div>
  )
);

const propTypes = {
  center: PropTypes.shape({
    name: PropTypes.string.isRequired,
    facilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string,
  }).isRequired,
  promptModifyCenter: PropTypes.func.isRequired,
  promptSeeCenter: PropTypes.func.isRequired,
};

CenterCard.propTypes = propTypes;
export default CenterCard;
