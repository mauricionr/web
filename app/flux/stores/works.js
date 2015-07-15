import createStore from "util/store"

function cache(state, works) {
	let cache = {
		...state.cache
	}
	works.forEach((item) => {
		cache[item.work.id] = item
	})
	return {
		...state,
		cache : cache,
	}
}

export default createStore({
	cache : {},
	featured : [],
	user : {},
}, {

	featuredWorks(state,action) {
		const cached = cache(state, action.works)
		return {
			...cached,
			featured : action.works
		}
	},

	refreshWork(state, action) {
		const cached = cache(state, [action.work])
		return cached
	},

	userWorks(state, action) {
		const cached = cache(state, action.works)
		return {
			...cached,
			user : {
				...cached.user,
				[action.user] : action.works
			}

		}
	},

	modifyWork(state, action) {
		let temp = {
			...state.cache[action.work]
		}
		action.modifier(temp)
		return cache(state, [temp])
	},

});
