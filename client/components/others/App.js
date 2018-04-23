import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Navbar from './Navbar';
import '../../public/style.scss';

const app = props =>
  (
    <div>
      <Navbar />
      <div className="auth-pages">
        {props.children}
      </div>
    </div>
  );

const mapDispatchToProps = (dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject))
  })
);

const mapStateToProps = (state =>
  ({
    user: state.userReducer
  })
);

export default connect(mapStateToProps, mapDispatchToProps)(app);

const propTypes = {
  children: PropTypes.objectOf(PropTypes.symbol).isRequired,
};

app.propTypes = propTypes;
