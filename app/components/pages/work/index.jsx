import "pages/work/work.css"
import React from "react"
import {connect} from "redux/react"
import Works from "actions/works"
import Cart from "actions/cart"
import {Link} from 'react-router'
import Crumbs from 'crumbs'
import Button from 'button'
import WorkEditor from 'work-editor'


@connect(state => {
	return {
		works : state.works,
		auth : state.auth,
		cart : state.cart
	}
})
export default class WorkPage extends React.Component {
	constructor() {
		super()
		this.state = {
			edit : false
		}
	}
	componentWillMount() {
		const {dispatch, params} = this.props
		dispatch(Works.refreshWork(params.id))
	}
	render() {
		const { auth, cart, params, works } = this.props
		const item = works.cache[params.id]
		const inCart = cart.items[params.id]
		if (!item)
			return false
		return (
			<section className="work-page">
				<Crumbs>
					<Link to={`/user/${item.owner.id}`}>{item.owner.name}</Link>
					<Link to={`/work/${item.work.id}`}>{item.work.name}</Link>
				</Crumbs>
				<div className='content'>
					<div className="top">
						<div className="wrap">
							<img src={item.work.image} />
						</div>
						<div className="details">
							<h1>{item.work.name}</h1>
							<h2>by {item.artist.id}</h2>
							{item.work.price ? <h3>${item.work.price}</h3> : false}
							<p>{item.work.description}</p>
							{
								() => {
									if(item.owner.id == auth.me.id)
										return <Button onClick={this.toggleEdit.bind(this)} >Edit</Button>
									if(inCart)
										return <Button onClick={this.removeCart.bind(this)}>Remove From Cart</Button>
									if(true)
										return <Button onClick={this.addCart.bind(this)}>Add To Cart</Button>
								}()
							}
						</div>
					</div>
				</div>
				<WorkEditor onClose={this.toggleEdit.bind(this)} item={item} visible={this.state.edit} />
			</section>
		)
	}
	toggleEdit() {
		this.setState({
			edit : !this.state.edit,
		})
	}
	addCart() {
		const { dispatch, params } = this.props
		dispatch(Cart.addCart(params.id))
	}
	removeCart() {
		const { dispatch, params } = this.props
		dispatch(Cart.removeCart(params.id))
	}
	getItem() {
		const { works, params } = this.props
		const item = works.cache[params.id]
		return item
	}

}
