import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../utils/Navbar';
import '../../public/style.scss';

const App = props =>
  (
    <div>
      <Navbar />
      <div className="auth-pages">
        {props.children}
      </div>
    </div>
  );

const mapDispatchToProps = dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject))
  });

const mapStateToProps = state =>
  ({
    user: state.userReducer,
  });

export default connect(mapStateToProps, mapDispatchToProps)(App);

const propTypes = {
  children: (props, propName) => { const prop = props[propName]}, /* eslint-disable-line */
};

App.propTypes = propTypes;
