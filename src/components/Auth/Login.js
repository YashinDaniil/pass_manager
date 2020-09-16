import React from 'react';
import Logo from '../../img/LightLogo.svg'
import Figure from '../../img/LoginFigure.svg'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';

import {login, register} from "../../redux/actions/auth";
import '../../styles/login.scss'

class Login extends React.Component {
	state = {
		username: '',
		email: '',
		password: '',
		master: '',
		isReg: true
	};

	onChange = (e) => this.setState({[e.target.name]: e.target.value});

	onSubmit = (e) => {
		e.preventDefault();
		const {username, email, password, master} = this.state;
		if (this.state.isReg) {
			this.props.register({
				username: username,
				email: email,
				password: password,
				master_password: master
			});
		} else {
			this.props.login({
				username: username,
				password: password,
			});
		}
	};

	onDemo = () => {
		this.props.login({
				username: 'test',
				password: 'Test!2345-',
			});
	};

	render() {
		if (this.props.isAuthenticated === true) {
			return <Redirect push to="/dashboard"/>
		}
		return (
			<div className='row'>
				<div className='col'>
					<img className='login-logo' src={Logo} alt=""/>
					<div className='login-figure-text'>assword</div>
					<img className='login-figure' src={Figure} alt=""/>
				</div>
				<div className='col-5 login-form'>
					<form onSubmit={this.onSubmit}>
						{(this.state.isReg) ?
							<div className='text--30-medium login-label'>Create an account</div> :
							<div className='text--30-medium login-label'>Login</div>
						}

						{(this.state.isReg) ?
							<div className='login-block-input'>
								<div className='text--16-bold login-block-label'>Email</div>
								<input name='email' className='input-filed inner-shadows' type="text" onChange={this.onChange} value={this.state.email}/>
							</div> : ''
						}

						<div className='login-block-input'>
							<div className='text--16-bold login-block-label'>Username</div>
							<input name='username' className='input-filed inner-shadows' type="text" onChange={this.onChange} value={this.state.username}/>
						</div>

						<div className='login-block-input'>
							<div className='text--16-bold login-block-label'>Password</div>
							<input name='password' className='input-filed inner-shadows' type="password" onChange={this.onChange} value={this.state.password}/>
						</div>

						{(this.state.isReg) ?
							<div className='login-block-input'>
								<div className='text--16-bold login-block-label'>Master Password</div>
								<input name='master' className='input-filed inner-shadows' type="password" onChange={this.onChange} value={this.state.master}/>
							</div> : ''
						}

						{(this.state.isReg) ?
							<button className='button login shadows' type='submit'>Create</button> :
							<button className='button login shadows' type='submit'>Login</button>
						}

					</form>
					<hr className='login-hr'/>
					{(this.state.isReg) ?
						<div className='text--16-regular'>Have an account? <span className='text-change' onClick={() => this.setState({isReg: false, email: '', password: '', master: ''})}
						                                                         href="">Login</span></div> :
						<div className='text--16-regular'>New user? <span className='text-change' onClick={() => this.setState({isReg: true, email: '', password: '', master: ''})}
						                                                  href="">Register</span></div>
					}
					<div className='text--16-regular'>Use <span className='text-change' onClick={this.onDemo}>Demo</span> account</div>
				</div>

			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {login, register})(Login)