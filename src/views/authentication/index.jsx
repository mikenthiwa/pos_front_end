import React, {Component} from 'react';
import { connect } from 'react-redux';
import AuthImage from '../../assets/images/svg/authentication.svg';
import SignUpForm from "../../components/auth/signUp";
import {addUser} from "../../redux/actions/authAction";
import './authentication.scss';

class Authentication extends Component {

	renderImageSection = () => (
		<div className='imageSection'>
			<div className='imageSectionHeader'>
				<div className='logoContainer'>Soko</div>
			</div>
			<div className='imageContainer'>
				<div className='appDescriptionCont'>
					Soko is a web application that allows user to
					add, remove and edit products that they add in the
					application.
				</div>
				<img src={AuthImage} alt='authImage' className='authImage'/>
			</div>
		</div>
	);

	renderFormSection = () => {
		const { authState, addUser} = this.props;

		return (
			<div className='authFormContainer'>
				<div className='formContainer'>
					<SignUpForm
						authState={authState}
						addUser={addUser}
					/>
				</div>
			</div>
		)
	};

	render() {
		return (
			<div className='authenticationPage'>
				<div className='authenticationCont'>
					{this.renderImageSection()}
					{this.renderFormSection()}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({authReducer}) => ({
	authState: authReducer
});

const mapDispatchToProps = () => ({
	addUser,
});

export default connect(mapStateToProps, mapDispatchToProps())(Authentication);
