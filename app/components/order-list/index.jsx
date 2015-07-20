import 'order-list/order-list.css'
import React from 'react'
import Numeral from 'numeral'
import { Link } from 'react-router'

class OrderList extends React.Component {
	render () {
		const { items, onRemove} = this.props
		return (
			<ul className='order-list'>
			{
				items.map((item) => {
					if(!item)
						return
					return (
						<li>
							{!onRemove ? false : <i onClick={onRemove.bind(this, item)}>×</i>}
							<div className="details">
								<h1>{item.work.name}</h1>
								<h2>{item.artist.id}</h2>
								<h3>{Numeral(item.order ? item.order.price : item.work.price).format('$0,0[.]00')}</h3>
								{this.status(item)}
								</div>
							<Link to={`/work/${item.work.id}`} >
								<img src={item.work.image} />
							</Link>
						</li>
					)
				})

			}
			</ul>
		)

	}
	status(item) {
		if(!item.order)
			return false
		const { buyer, onConfirm, onShipped, onReceived } = this.props
		return (
			<div className='status'>
				{
					() => {
						if(!item.order.confirmed)
							return <span>Pending Confirmation { onConfirm ? <a onClick={onConfirm.bind(this, item)}> - Confirm</a> : false } </span>
						if(!item.order.shipped)
							return <span>Pending Shipment { onShipped ? <a onClick={onShipped.bind(this, item)}> - Mark Shipped </a> : false }</span>
						if(!item.order.received)
							return <span>Shipped { onReceived ? <a onClick={onConfirm.bind(this, item)}> - Mark Received </a> : false } </span>
						return <span>Delivered</span>
					}()
				}
			</div>
		)
	}
}

export default OrderList;
