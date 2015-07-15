import createStore from 'util/store'

var initial = JSON.parse(localStorage.getItem('cart')) || { items : [] }

export default createStore(initial, {

	addCart(state, action) {
		const result = {
			...state,
			items : {
				...state.items,
				[action.item] : true
			}
		}
		localStorage.setItem('cart', JSON.stringify(result))
		return result
	},

	removeCart(state, action) {
		const result = {...state}
		delete result.items[action.item]
		localStorage.setItem('cart', JSON.stringify(result))
		return result
	},

})
