import React, {Component, Fragment} from 'react';
import {InputLabel} from '../sokoForm/formElements';
import validator from 'email-validator';
import './auth.scss';

class SignUpForm extends Component{
	constructor(props) {
		super(props);
		this.state = {
			signUpForm: {
				Username: '',
				Email: '',
				Password: '',
			},
			errors: {},
		};
	}

	onChange = (event) => {
		const {target: {name, value}} = event;
		this.setState(prevState => ({
			...prevState,
			signUpForm: {...prevState.signUpForm, [name]: value},
			errors: {...prevState.errors, [name]: ''}
		}))
	};

	onSetState = (field, customErrorMessage) => (
		this.setState(prevState => ({
			...prevState, errors: { ...prevState.errors, [field]: customErrorMessage}
		}))
	);

	onSubmit = async () => {
		const { signUpForm } = this.state;
		const { addUser } = this.props;
		let submit = true;
		Object.keys(signUpForm).forEach(field => {
			if(!signUpForm[field]){
				submit = false;
				return this.onSetState(field, `${field} is required`)
			}
			if(field === 'Username') {
				const regex = /([a-z])$[0-9]?/;
				if(!regex.test(signUpForm[field])){
					submit = false;
					this.onSetState(field, 'Should contain letters and digits only')
				}
				else if(signUpForm[field].length < 3) {
					submit = false;
					this.onSetState(field, 'Username is too short');
				}else {
					submit = submit !== false
				}
			}
			if(field === 'Email') {
				if(!validator.validate(signUpForm[field])) {
					submit = false;
					this.onSetState(field, 'Please provide a valid email');
				}else {
					// if submit === false then submit = false else submit = true
					submit = submit !== false;
				}
			}
			if(field === 'Password') {
				const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])((?=.*[A-Z]))(?=.{3,})/;
				if(!regex.test(signUpForm[field])) {
					submit = false;
					this.onSetState(field,
						'Password should contain at least a digit, lower and uppercase letter')
				}else {
					submit = submit !== false
				}
			}
		});
		if(submit){
			this.setState(prevState => ({
				...prevState,
				signUpForm: {...prevState.signUpForm, Username: '', Email: '', Password: ''}
			}));
			addUser(signUpForm);
		}
	};

	render() {
		const { errors, signUpForm: {Username, Email, Password} } = this.state;
		const { authState: { error } } = this.props;
		console.log('error during sign up', error);
		return (
			<Fragment>
				<div className='formHeader'>
					<div>Create an account</div>
					<small className={error !== '' ? 'errorMessage': ''}>
						{ error !== '' ? error : ''}
					</small>
				</div>
				{InputLabel('Username', true,
					'Username','text', errors, this.onChange, Username
				)}
				{InputLabel('Email', true,
					'Email', 'text', errors, this.onChange, Email,
				)}
				{InputLabel('Password', true,
					'Password', 'password', errors, this.onChange, Password
				)}
				<div>
					Already have an account ?
					<span><a href="/">Login</a></span>
				</div>
				<div className='buttonCont'>
					<button className='submitButton' onClick={this.onSubmit}>Sign Up</button>
				</div>
			</Fragment>
		);
	}
}
export default SignUpForm;
