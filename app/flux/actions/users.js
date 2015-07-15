import createActions from 'util/action'
import Axios from 'axios'

export default createActions({
	refreshUser(id) {
		return (dispatcher) => {
			Axios.get('user/' + id).then((response) => {
				dispatcher({
					user : response.data.payload
				})
			})
		}
	}
})
