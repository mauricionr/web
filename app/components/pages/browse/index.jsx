import "pages/browse/browse.css"
import React from "react"
import {connect} from "redux/react"
import Works from "actions/works"
import Gallery from "gallery"

@connect(state => {
	return state.works
})
export default class Browse extends React.Component {
	componentWillMount() {
		this.props.dispatch(Works.featuredWorks())
	}
	render() {
		return (
			<section className="browse-page">
				<div className="cover">
					<div className="content">
						<h1>Welcome to aopdex</h1>
						<h2>The best place to buy, sell, and invest in artwork</h2>
					</div>
				</div>
				<nav>
					<div className="content">
						<a className="active">New</a>
					</div>
				</nav>
				<div className="content">
					<Gallery items={this.props.featured} limit={100} />
				</div>
			</section>
		)
	}
}