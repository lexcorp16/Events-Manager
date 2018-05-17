import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllUsers, assignUserRole } from '../../../actions/userActions';
import UsersPage from '../presentational/UsersPage';
import { LargeLoadingIcon, SpinnerProgressBar } from '../../utils/LoaderComponents';
import AccessGrantPageHoc from '../../HOC/AccessGrantPageHoc';
/**
 *
 *
 * @class UsersStatusPage
 * @extends {Component}
 * @returns {object} html dom object
 */
class AllUsersPage extends Component {
/**
 * Creates an instance of AllUsersPage.
 * @param {any} props
 * @memberof AllUsersPage
 */
  constructor(props) {
    super(props);
    this.assignNewRole = this.assignNewRole.bind(this);
  }
  /**
 *
 *
 * @memberof UsersStatusPage
 * @returns {object} a function that dispatches an action.
 */
  componentWillMount() {
    this.props.dispatch(getAllUsers());
  }
  /**
 *
 *
 * @param {any} event
 * @memberof AllUsersPage
 * @returns {function} that dispatches action
 */
  assignNewRole(event) {
    const { id } = event.target;
    this.props.dispatch(assignUserRole(id));
  }
  /**
 *
 *
 * @returns {object} html dom object.
 * @memberof UsersStatusPage
 */
  render() {
    return (
      <div className="all-users-page container">
        <h3 className="text-center" style={{ color: '#F50057' }}>Users</h3>
        {(this.props.user.status.assigning) &&
        <div className="text-center justify-content-end">
          <SpinnerProgressBar />
        </div>}
        {this.props.user.status.fetchingAllUsers && !this.props.user.allusers ?
          <div className="text-center">
            <LargeLoadingIcon />
          </div> :
          <UsersPage
            allUsers={this.props.user.allusers.users}
            changeRole={this.assignNewRole}
          />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
  ({
    dispatch: (actionObject => dispatch(actionObject))
  });

const mapStateToProps = state =>
  ({
    user: state.userReducer,
  });

export default connect(mapStateToProps, mapDispatchToProps)(AccessGrantPageHoc(AllUsersPage));

AllUsersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape({
    status: PropTypes.objectOf(PropTypes.bool),
    allusers: PropTypes.shape({
      users: PropTypes.arrayOf(PropTypes.object)
    })
  }).isRequired,
};
