import React from "react"
import {Route, Redirect} from 'react-router';

import Root from "root"
import Browse from "pages/browse"
import Work from "pages/work"
import User from "pages/user"
import Cart from 'pages/cart'
import Orders from 'pages/orders'
import Login from 'pages/auth/login'
import Register from 'pages/auth/register'

export default (
	<Route component={Root}>
		<Route path="browse" component={Browse} />
		<Route path="user/:id" component={User} />
		<Route path="work/:id" component={Work} />
		<Route path="cart" component={Cart} />
		<Route path='login' component={Login} />
		<Route path='register' component={Register} />
		<Route path='orders' component={Orders} />
		<Redirect from="/" to ="/browse" />
	</Route>
)
