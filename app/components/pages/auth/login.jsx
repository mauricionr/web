import 'pages/auth/auth.css'
import React from 'react'
import Button from 'button'
import Auth from 'actions/auth'
import { connect } from 'redux/react'

@connect((state) => {
	return {
		auth : state.auth
	}
})
export default class Login extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}
	render () {
		return (
			<section className='login auth-page'>
				<div className='content'>
					<h1>Login</h1>
					<form>
						<label>Email</label>
						<input ref='email'></input>
						<label>Password</label>
						<input type='password' ref='password'></input>
						<h2>{this.props.auth.error}</h2>
						<Button onClick={this.login}>Login</Button>
					</form>
				</div>
			</section>
		)
	}
	login = () => {
		const { dispatch } = this.props
		const email = this.refs.email.getDOMNode().value
		const password = this.refs.password.getDOMNode().value
		dispatch(Auth.login(email, password, this.context.router.transitionTo))
	}
}
