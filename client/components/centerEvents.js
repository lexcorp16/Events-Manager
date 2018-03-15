import React from 'react';
import { connect } from 'react-redux';

const centerEvents = () =>
  (
    <div>
      <h3>WElcome it is working</h3>
    </div>
  );
const mapDispatchToProps = (dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject))
  })
);

const mapStateToProps = (state =>
  ({
    event: state.eventReducer,
    user: state.centerReducer,
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(centerEvents);
