import './user.css'
import React from 'react'
import Router, { Link, Navigation } from 'react-router'
import {connect} from 'redux/react'
import Works from 'actions/works'
import Users from 'actions/users'
import Gallery from 'gallery'
import Crumbs from 'crumbs'
import Button from 'button'
import WorkEditor from 'work-editor'

const bare = {
	work : {
		name : 'New Work',
		image : 'http://www.webresourcesfree.com/wp-content/uploads/2015/04/Low-Poly-Polygonal-Texture.jpg',
		price : 0,
	},
	artist : {
		id : 'unknown'
	}
}

@connect(state => {
	return {
		works : state.works,
		users : state.users,
		auth  : state.auth
	}
})
class User extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}
	constructor(props, context) {
		super(props, context)
	}
	componentWillMount() {
		const { dispatch, params } = this.props
		dispatch(Works.userWorks(params.id))
		dispatch(Users.refreshUser(params.id))
	}
	componentWillReceiveProps(old, next) {
	}
	render() {
		const { works, params, users, auth } = this.props
		const items = works.user[params.id]
		const user = users.cache[params.id]
		if(!user)
			return false
		const me = user.id == auth.me.id
		return (
			<section className="user-page">
				<Crumbs>
					<Link to={`/user/${user.id}`}>{user.name}</Link>
				</Crumbs>
				<div className="content">
					<div className="toolbar">
						{me ? <Button onClick={this.createWork.bind(this)}>Add</Button> : false}
					</div>
					<Gallery items={items} limit={100} />
				</div>
			</section>
		)
	}
	createWork() {
		var item = {
			...bare
		}
		this.props.dispatch(Works.saveWork(item, this.context.router.transitionTo))
	}
}

export default User
