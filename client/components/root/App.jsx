import React from 'react';
import { connect } from 'react-redux';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import '../../scss/style.scss';

export const App = props =>
  (
    <div>
      <Navbar />
      <div className="auth-pages">
        {props.children}
      </div>
      <Footer />
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
