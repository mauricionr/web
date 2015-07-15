import "grid/grid.css"
import React from "react/addons"

export default class Grid extends React.Component {
	constructor() {
		super()
		this.state = {
			heights : {}
		}

	}
	componentWillMount() {
		this.setState({
			children :  this.props.children
		});
	}
	render() {
		const columns = [[],[],[]]
		this.props.children
			.sort((a,b) => {
				var av = a.props.height || 0
				var bv = b.props.height || 0
				return av - bv	;
			})
			.forEach((item,i) => {
				columns[i%3].push(
					{item}
				)
			})
		return (
			<ul className={this.props.name + " grid"}>
			{
				columns.map((col,i) => {
					return (
						<li key={i}>
						{col}
						</li>
					)
				})

			}
			</ul>
		)
	}
}