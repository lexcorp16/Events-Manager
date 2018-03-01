import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import '../public/signin.scss';
import { userSignup, clearError } from '../actions/userActions';
import FlashMessage from './flashmessage';

/**
* @Center, class containing all methods that
* handle center related api endpoint
*/
class SignupBody extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: undefined,
			firstname: undefined,
			lastname: undefined,
			password: undefined,
			confirmpassword: undefined,
		};
	}

	getSignUpDetails = (e) => {
				this.setState({[e.target.name]: e.target.value});
		}

	Signup = (e) => {
		e.preventDefault();
		const {
			email, password, firstname, lastname, confirmpassword,
		} = this.state;
		this.props.dispatch(userSignup({
			firstname,
			lastname,
			email,
			password,
			confirmpassword,
		}));
	}

	componentWillUnmount() {
		this.props.dispatch(clearError());
	}

	render() {
		return (
			<div>
				<div className="signup-padder container">
					<div className="sign-in-container" style={{height: `${540}px` }}>
						<div className="form-header" style={{paddingBottom: `${20}px` }}>
							<p className="text-center header-form" style={{ fontSize: `${1.4}em`, marginTop:`${10}%`, fontFamily: 'verdana', paddingTop:`${20}px`, }}>SIGN UP</p>
						</div>
              { (this.props.user.error) &&
              <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{marginTop: `${4}%`, height: `${50}px`, paddingBottom: `${5}px`, background: 'none' , border: 'none' }}>
                <div className="text-center"><strong className="text-center">{this.props.user.error}</strong></div>
              </div>}
						<form className="form form-group signup form-container">
							<div>
                <label>firstname</label>
								<input onChange={this.getSignUpDetails} type="text" name="firstname" placeholder="firstname" className="form-control first-name" />
                <label>lastname</label>
								<input onChange={this.getSignUpDetails} type="text" name="lastname" placeholder="lastname" className="form-control" />
                <label>email</label>
								<input onChange={this.getSignUpDetails} type="text" name="email" placeholder="email" className="form-control" />
                <label>password</label>
                <input onChange={this.getSignUpDetails} type="password" name="password" placeholder="password" className="form-control" />
                <label>retype password</label>
								<input onChange={this.getSignUpDetails} type="password" name="confirmpassword" placeholder="retype password" className="form-control" />
								<br />
								<div className="button-container">
									<button className="btn btn-submit btn-default" type="submit" onClick={this.Signup}><span className="text-center">Sign Up</span></button>
								</div>
								<div>
									<p className="text-center">Have an account already? sign in <span className="switchform" style={{ color: 'skyblue' }}><Link to="/signin"> here</Link></span></p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	dispatch: (actionObject) => dispatch(actionObject)
});

const mapStateToProps = (state) => ({
	user: state.userReducer.status
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupBody);
