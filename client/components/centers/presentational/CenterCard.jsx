import React from 'react';
import PropTypes from 'prop-types';

import isAdmin from '../../../helpers/isAdmin';
import placeholderImage from '../../../public/images/default-placeholder.png';

const CenterCard = props =>
  (
    <div className="acenter col-lg-4 col-sm-12 col-xs-12 col-md-6 center-card">
      <div className="card all-centers-card" style={{ marginTop: '30px' }} id={props.center.id}>
        <img className="card-img-top img-fluid" src={props.center.imageUrl !== null ? props.center.imageUrl : placeholderImage} alt="Card" style={{ width: '100%', height: '240px' }} />
        <div className="card-body">
          <h4 className="card-title">{props.center.name}</h4>
          <p className="card-text date-of-event"># <b>{props.center.rentalCost}</b> per day</p>
          <div className="card-menu action-buttons">
            <div className="btn-group d-flex justify-content-end">
              {(isAdmin()) &&
              <button className="btn modify-btn center-btn" onClick={props.promptModifyCenter} id={props.center.id}>EDIT</button>
              }
              <button className="btn edit-btn center-btn" onClick={props.promptSeeCenter} id={props.center.id}>DETAILS</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

const propTypes = {
  center: PropTypes.shape({
    name: PropTypes.string.isRequired,
    facilities: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.string,
    rentalCost: PropTypes.string,
    imageUrl: PropTypes.string,
  }).isRequired,
  promptModifyCenter: PropTypes.func.isRequired,
  promptSeeCenter: PropTypes.func.isRequired,
};

CenterCard.propTypes = propTypes;
export default CenterCard;
