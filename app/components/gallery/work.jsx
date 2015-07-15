import 'gallery/work.css'
import { Link } from 'react-router'
import React from 'react'

export default class Work extends React.Component{
	render() {
		const { item } = this.props;
		return (
			<Link to={`/work/${item.work.id}`}  className="work">
				<img src={item.work.image || "http://www.webresourcesfree.com/wp-content/uploads/2015/04/Low-Poly-Polygonal-Texture.jpg" } />
				<div className="overlay">
					<div className="circle">
					</div>
					<div className="details">
						<h1>{item.work.name || "Untitled"}</h1>
						<h2>{item.artist.id || "Unknown"}</h2>
					</div>
				</div>
			</Link>
		)
	}
}