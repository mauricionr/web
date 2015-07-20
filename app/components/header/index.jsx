import "header/header.css"
import React from "react"
import { connect } from 'redux/react';
import AutoExample from "actions/auto-example"
import { Link } from "react-router"
import Cart from 'header/cart'

@connect(state => {
	return state.auth
})
export default class Header extends React.Component {
	componentWillMount() {
	}
	render() {
		const { me } = this.props
		if(me === undefined)
			return false
		return (
			<header>
				<div className="content">
					<nav>
						<Link to="/browse">Browse</Link>
						{!me ? <Link to='/login'>Login</Link> : false}
						{!me ? <Link to='/register'>Register</Link> : false}
						{me ? <Link to={`/user/${me.id}`}>{me.name}</Link> : false}
						{me ? <Link to='/orders'>Orders</Link> : false}
						{me ? <a onClick={this.logout} href="#">Logout</a> : false}
						<Cart />
					</nav>
				</div>
			</header>
		);
	}
	logout = () => {
		localStorage.setItem('session', '')
		location.reload()
	}
}
