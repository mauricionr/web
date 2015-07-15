import 'header/cart.css'
import React from 'react'
import { Link } from 'react-router'
import { connect } from 'redux/react'

@connect((state) => {
	return {
		cart : state.cart
	}
})
class Cart extends React.Component {
	render () {
		const { items } = this.props.cart
		return (
			<Link to="/cart" className='cart'>
				{Object.keys(items).length}
			</Link>
		)
	}
}

export default Cart;
