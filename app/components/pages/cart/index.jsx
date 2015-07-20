import 'pages/cart/cart.css'
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'redux/react'
import Crumbs from 'crumbs'
import Works from 'actions/works'
import Cart from 'actions/cart'
import Numeral from 'numeral'
import Button from 'button'
import OrderList from 'order-list'

@connect((state) => {
	return {
		cart : state.cart,
		works : state.works,
		auth : state.auth,
	}
})
export default class CartPage extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}
	componentWillMount() {
		const { cart, dispatch } = this.props
		Object.keys(cart.items).forEach((key) => {
			console.log(cart)
			dispatch(Works.refreshWork(key))
		})
		this.handler = StripeCheckout.configure({
			key: 'pk_test_E1xIkZYoNbvirdAfoWnsbd4n',
		   	token: (token) => {
				dispatch(Cart.checkout(
					Object.keys(this.props.cart.items),
					this.context.router.transitionTo
				))
			}
 		});
	}
	componentWillReceiveProps() {

	}
	render () {
		const { cart, works} = this.props
		const items = Object.keys(cart.items).map(key => {
			return works.cache[key]
		})
		const cost = items.reduce((a,b) => {
			if(!b)
				return a
			return a + b.work.price
		}, 0)
		return (
			<section className='cart-page'>
				<Crumbs>
					<Link to='/cart'>Cart</Link>
				</Crumbs>
				<div className='content'>
					<OrderList items={items} onRemove={this.removeCart.bind(this)} />
					<div className="summary">
						<span>Total: {Numeral(cost).format('$0,0[.]00')}</span>
					</div>
					<Button onClick={this.checkout.bind(this, cost)}>Checkout</Button>
				</div>

			</section>
		)
	}
	removeCart(item) {
		const { dispatch } = this.props
		dispatch(Cart.removeCart(item.work.id))
	}
	checkout(cost) {
		const {dispatch, cart, auth} = this.props
		const {router} = this.context
		if(!auth.me) {
			router.transitionTo("/login")
			return
		}
	    this.handler.open({
			name: 'Checkout',
			email : auth.me.email,
  			amount: cost * 100
	    });

	}
}
