import Axios from 'axios'
import createActions from 'util/action'
import Router from 'react-router'

export default createActions({
	featuredWorks(message) {
		return (dispatcher) => {
			Axios.get("work").then((response) => {
				dispatcher({ works : response.data.payload})
			}).catch((...args) => {
				console.log(args)
			})
		}
	},
	refreshWork(id) {
		return (dispatcher) => {
			Axios.get("work/" + id).then((response) => {
				dispatcher({
					work : response.data.payload
				})
			})
		}
	},
	userWorks(id) {
		return (dispatcher) => {
			Axios.get('user/' + id + "/work").then((response) => {
				dispatcher({
					user : id,
					works : response.data.payload
				})
			}).catch((...args) => {
				console.log(args)
			})
		}
	},
	modifyWork(id, cb) {
		return {
			modifier : cb,
			work : id,
		}
	},

	saveWork(item, transition) {
		return (dispatcher) => {
			Axios.post("work", item).then((response) => {
				var { payload } = response.data
				dispatcher({
					type : "refreshWork",
					work : payload,
				})
				if(transition) {
					transition('/work/' + payload.work.id)
				}
			})
		}
	},

	deleteWork(item, transition) {
		return (dispatcher) => {
			Axios.post('work/' + item.work.id + "/delete").then((response) => {
				dispatcher({
					work : item
				})
				if(transition)
					transition('/user/' + item.owner.id)
			})
		}
	}
});