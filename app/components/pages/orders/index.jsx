import 'pages/orders/orders.css'
import React from 'react'
import OrderList from 'order-list'
import Cart from 'actions/cart'
import Crumbs from 'crumbs'
import { Link } from 'react-router'
import { connect } from 'redux/react'

@connect((state) => {
	return {
		cart : state.cart
	}
})
class Orders extends React.Component {
	componentWillMount() {
		const { dispatch } = this.props
		dispatch(Cart.purchases())
		dispatch(Cart.sales())
	}
	render () {
		const { purchases, sales } = this.props.cart
		const pa = []
		const sa = []
		for(var key in purchases) {
			pa.push(purchases[key])
		}
		for(var key in sales) {
			sa.push(sales[key])
		}

		return (
			<section className='orders-page'>
				<Crumbs>
					<Link to='/orders'>Orders</Link>
				</Crumbs>
				<div className='content'>
					<h1>Purchases</h1>
					<OrderList items={pa} />
					<h1>Sales</h1>
					<OrderList items={sa} onShipped={this.shipped.bind(this)} onConfirm={this.confirm.bind(this)} />
				</div>
			</section>
		)
	}
	confirm(order) {
		const { dispatch } = this.props
		dispatch(Cart.confirm(order))
	}
	shipped(order) {
		const { dispatch } = this.props
		dispatch(Cart.shipped(order))
	}
}

export default Orders;
