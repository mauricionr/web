export default function createActions(actions) {
	var result = {}
	for (var k in actions) {
		(key => {
			var func = actions[key]
			result[key] = (...args) => {
				const data = func(...args)
				if (typeof data === 'function') {
					return (dispatch) => {
						data((output) => {
							if(output.key)
								key = output.key
							var r = {
								type : key,
								...(output || {})
							}
							console.log(r)
							dispatch(r)
						})
					}
				}
				if(data.key)
					key = output.key
				var r = {
					type : key,
					...(data || {})
				}
				console.log(r)
				return r 
			}
		})(k)
	}

	return result
}