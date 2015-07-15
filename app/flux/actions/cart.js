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
	}

})
