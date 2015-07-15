import Axios from 'axios'
import createActions from 'util/action'

export default createActions({
	login(email, password, transition) {
		return (dispatcher) => {
			Axios.post('auth/login', {
				email,
				password
			}).then((response) => {
				const session = response.data.payload
				Axios.get('me?session=' + session).then((response) => {
					dispatcher({
						session : session,
						me : response.data.payload,
						type : 'authSuccess'
					})
					if(transition)
						transition('/user/' + response.data.payload.id)
				})
			}).catch((...args) => {
				dispatcher({
					type : 'authFailed',
					error : 'Incorrect email or password'
				})
			})
		}
	},
	register(email, password, name, transition) {
		return (dispatch) => {
			Axios.post('auth/register', {
				email,
				password,
				name
			}).then((response) => {
				const me = response.data.payload
				Axios.post('auth/login', {
					email,
					password
				}).then((response) => {
					dispatch({
						me : me,
						session : response.data.payload,
						type : 'authSuccess'
					})
					if(transition)
						transition('/user/' + me.id)
				})
			}).catch((response) => {
				dispatch({
					type : 'authFailed',
					error : response.data.error,
				})
			})
		}
	},
	me() {
		return (dispatcher) => {
			const session = localStorage.getItem("session")
			if(!session && false) {
				dispatcher({
					type : "authFailed"
				})
				return
			}
			Axios.get("me?session=" + session).then((response) => {
				dispatcher({
					me : response.data.payload,
					session : session,
					type : "authSuccess"
				})
				dispatcher({
					type : "refreshUser",
					user : response.data.payload,
				})
			}).catch(() => {
				dispatcher({
					type : "authFailed"
				})
			})
		}
	}
});
