import React ,{ Component } from 'react';
import { connect } from 'react-redux';

/**
 * Represents a component
 * @constructor
 */
class centerEvents extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => ({
  event: state.eventReducer,
  user: state.centerReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(centerEvents);
