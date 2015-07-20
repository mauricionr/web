import "root/reset.css"
import "root/form.css"
import "root/root.css"
import React from "react"
import { connect } from 'redux/react'
import Header from "header"
import Auth from 'actions/auth'

@connect(state => {
	return state.auth
})
export default class Root extends React.Component {
	componentWillMount() {
		const { dispatch } = this.props
		dispatch(Auth.me())
	}
	render() {
		if (this.props.me == undefined) {
			return false
		}
		return (
			<section className="root">
				<Header />
				<section className="main">
				{this.props.children}
				</section>
			</section>
		)
	}
}
