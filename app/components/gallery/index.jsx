import "gallery/gallery.css"
import React from "react"
import {connect} from 'redux/react'
import Grid from "grid"
import Work from "gallery/work"

@connect(state => {
	return state.works
})
export default class Gallery {
	render() {
		var items = this.props.items || []
		var limit = this.props.limit || 0
		return (
			<Grid name="gallery" >
			{
				items.map((item) => {
					var cached = this.props.cache[item.work.id]
					return <Work height={cached.work.height} key={cached.work.id} item={cached} />
				})
			}
			</Grid>
		)
	}
}