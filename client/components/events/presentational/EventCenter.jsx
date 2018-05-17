import React from 'react';
// import PropTypes from 'prop-types';
import { LoadingProgressbar } from '../../utils/LoaderComponents';

const EventCenterDetails = () =>
  (
    <div className="modal fade" id="myModal">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title text-center"> Details</h4>
          </div>
          <div className="modal-body">
            <div className="text-center">
              <LoadingProgressbar />
            </div>
            <div className="no-center">
              <p className="text-center">This event does not have a center,<br />Please go to the modification page to add a center</p>
            </div>
            <div>
              <p><span className="detail-key">date</span>:</p>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  );

export default EventCenterDetails;

// const propTypes = {
//   event: PropTypes.objectOf(PropTypes.string).isRequired,
//   center: PropTypes.objectOf(PropTypes.string).isRequired,
//   centerStatus: PropTypes.objectOf(PropTypes.bool).isRequired,
// };

// EventCenterDetails.propTypes = propTypes;
