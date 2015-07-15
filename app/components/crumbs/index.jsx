import "crumbs/crumbs.css"
import React from 'react'
import { Link } from 'react-router'

export default class Crumbs extends React.Component {

	render() {
		const { children } = this.props
		return (
			<nav className="crumbs">
				<div className="content">
				{
					[<Link to='/browse'>Browse</Link>].concat(children).map((item, index, col) => {
						return (
							<span className="crumb">
								{item}
								{index+1  == col.length ? "" : "/"}
							</span>
						)
					})
				}
				</div>
			</nav>
		)
	}

}