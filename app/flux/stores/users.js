import createStore from "util/store"

function cache(state, users) {
	let result = {}
	users.forEach((item) => {
		result[item.id] = item
	})

	return {
		...state,
		cache : {
			...state.cache,
			...result
		}
	}
}

export default createStore({
	cache : {},
}, {

	refreshUser(state, action) {
		const cached = cache(state, [action.user])
		return {
			...cached,
		}
	}

});
