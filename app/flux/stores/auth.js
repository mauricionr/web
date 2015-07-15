import createStore from 'util/store'
import Axios from 'axios'

export default createStore({
	me : false
}, {

	authSuccess(state,action) {
		localStorage.setItem("session", action.session)

		Axios.interceptors.request.use(function(config) {
			config.params = config.query || {}
			config.params.session = action.session
			return config
		})

		return {
			...state,
			error : '',
			me : action.me,
		}
	},
	authFailed(state, action) {
		return {
			...state,
			error : action.error,
			me : false
		}
	}

});
