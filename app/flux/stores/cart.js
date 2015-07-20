import createStore from 'util/store'

const initial = {
	items : JSON.parse(localStorage.getItem('cart')) || [],
	purchases : {},
	sales : {},
}

export default createStore(initial, {

	addCart(state, action) {
		const result = {
			...state,
			items : {
				...state.items,
				[action.item] : true
			}
		}
		localStorage.setItem('cart', JSON.stringify(result.items))
		return result
	},

	removeCart(state, action) {
		const result = {...state}
		delete result.items[action.item]
		localStorage.setItem('cart', JSON.stringify(result.items))
		return result
	},

	checkout(state,action) {
		localStorage.setItem('cart', "[]")
		const result = {
			...state,
			//purchases : [...state.purchases, ...action.orders],
			items : [],
		}
		return result
	},

	purchases(state, action) {
		const result = {
			...state,
			purchases : action.orders.reduce((map, obj) => {
				map[obj.order.id] = obj
				return map
			}, {})
		}
		return result
	},

	sales(state, action) {
		const result = {
			...state,
			sales : action.orders.reduce((map, obj) => {
				map[obj.order.id] = obj
				return map
			}, {})
		}
		return result
	},

	confirm(state, action) {
		const result = {
			...state,
			sales : {
				...state.purchases,
				[action.item.order.id] : action.item,
			}
		}
		return result
	},

	shipped(state, action) {
		const result = {
			...state,
			sales : {
				...state.purchases,
				[action.item.order.id] : action.item,
			}
		}
		return result
	}


})
