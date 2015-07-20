import Axios from 'axios'
import createActions from 'util/action'

export default createActions({

	addCart(item) {
		return {
			item
		}
	},

	removeCart(item) {
		return {
			item
		}
	},

	checkout(items, transition) {
		return (dispatch) => {
			Axios.post("me/checkout", items).then((response) => {
				dispatch({
					orders : response.data.payload
				})
				if(transition)
					transition("/orders")
			})
		}
	},

	purchases() {
		return (dispatch) => {
			Axios.get("me/purchases").then((response) => {
				dispatch({
					orders : response.data.payload
				})
			})
		}
	},

	sales() {
		return (dispatch) => {
			Axios.get("me/sales").then((response) => {
				dispatch({
					orders : response.data.payload
				})
			})
		}
	},

	confirm(item) {
		return (dispatch) => {
			const next = {
				...item,
				order : {
					...item.order,
					confirmed : true
				}
			}
			Axios.post('me/sales/' + item.order.id + '/confirm').then((response) => {
				dispatch({
					item : response.data.payload
				})
			})
			dispatch({
				item : next
			})
		}
	},

	shipped(item) {
		return (dispatch) => {
			const next = {
				...item,
				order : {
					...item.order,
					shipped : true
				}
			}
			Axios.post('me/sales/' + item.order.id + '/ship').then((response) => {
				dispatch({
					item : response.data.payload
				})
			}).catch(() => {
				dispatch({
					item : item
				})
			})
			dispatch({
				item : next
			})
		}
	},

	received(order) {
		return (dispatch) => {
			Axios.post('me/purchases/' + order.id + '/received').then((response) => {
				dispatch({
					order : order
				})
			})
		}
	},

})
