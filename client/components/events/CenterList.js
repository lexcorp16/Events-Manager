import React from 'react';
import PropTypes from 'prop-types';

const CenterList = (props =>
  (
    <option value={props.center.id} name={props.center.name}>
      {props.center.name}
    </option>
  )
);

export default CenterList;

const propTypes = {
  center: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

CenterList.propTypes = propTypes;
