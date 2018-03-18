import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import '../public/style.scss';
import logo from '../public/images/coference2.jpg';

const CenterCard = (props =>
  (
    <div className="container col">
      <div className="card" style={{ width: '270px', marginTop: '30px' }}>
        <img className="card-img-top img-fluid" src={logo} alt="Card" />
        <div className="card-body">
          <h4 className="card-title">{props.center.name}</h4>
          <p className="card-text">Some example text some example text. John Doe is an architect and engineer</p>
          <Link to="/center"><button className="btn btn-block btn-outline-info">See More Info</button></Link>
          <Link to="/modifycenter"><button className="btn btn-block btn-outline-secondary">Modify</button></Link>
        </div>
      </div>
    </div>
  )
);

const propTypes = {
  center: PropTypes.shape({
    name: PropTypes.string.isRequired,
    facilities: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired
};

CenterCard.propTypes = propTypes;
export default CenterCard;
