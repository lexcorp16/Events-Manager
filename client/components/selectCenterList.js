import React from 'react';
import PropTypes from 'prop-types';

const centerList = (props =>
  (
    <option value={props.center.id} name={props.center.name}>
      {props.center.name}
    </option>
  )
);

export default centerList;

const propTypes = {
  center: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

centerList.propTypes = propTypes;
