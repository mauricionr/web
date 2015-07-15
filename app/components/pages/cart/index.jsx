import 'pages/cart/cart.css'
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'redux/react'
import Crumbs from 'crumbs'
import Works from 'actions/works'
import Cart from 'actions/cart'

@connect((state) => {
	return {
		cart : state.cart,
		works : state.works,
	}
})
export default class CartPage extends React.Component {
	componentWillMount() {
		const { cart, dispatch } = this.props
		Object.keys(cart.items).forEach((key) => {
			dispatch(Works.refreshWork(key))
		})
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
					<ul className='items'>
					{
						items.map(item => {
							if(!item)
								return
							return (
								<li>
									<i onClick={this.removeCart.bind(this, item.work.id)}>×</i>
									<div className="details">
										<h1>{item.work.name}</h1>
										<h2>{item.artist.id}</h2>
										<h3>${item.work.price}</h3>
									</div>
									<Link to={`/work/${item.work.id}`} >
										<img src={item.work.image} />
									</Link>
								</li>
							)
						})
					}
					</ul>
					<div className="summary">
						<span>Total: ${cost}</span>
					</div>
				</div>

			</section>
		)
	}
	removeCart(id) {
		const { dispatch } = this.props
		dispatch(Cart.removeCart(id))
	}
}
