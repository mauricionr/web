import 'work-editor/work-editor.css'
import React from 'react'
import Works from 'actions/works'
import { connect } from 'redux/react'
import Button from 'button'
import Imgur from 'util/imgur'

const styles = {
	false : {
		transform: 'translate3d(100%, 0, 0)'
	},
	true : {
		transform: 'initial'
	}
}

@connect(state => {
	return state
})
export default class WorksEditor extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object
	}
	render() {
		const { item, dispatch, visible } = this.props
		return (
			<section style={styles[this.props.visible]} className="work-editor">
				<i onClick={this.props.onClose} >×</i>
				<h1>Edit</h1>
				<form>
					<label>Name</label>
					<input type="text" onChange={this.easyModify.bind(this, "name")} value={item.work.name} />

					<label>Artist</label>
					<input type="text" value={item.artist.name} onChange={this.modify.bind(this, (value, x) => x.artist.name = value )} />

					<label>Price</label>
					<input type="text" value={item.work.price} onChange={this.modify.bind(this, (value, x) => {
						const num = parseFloat(value)
						if(isNaN(num))
							return
						x.work.price = num
					})} />

					<label>On Sale</label>
					<select onChange={this.modify.bind(this, (value, x) => {
							x.work.sale = value == 'true'
						})} value={item.work.sale}>
						<option value={true}>Yes</option>
						<option value={false}>No</option>
					</select>


					<label>Description</label>
					<textarea onChange={this.easyModify.bind(this, "description")}
						rows="5" value={item.work.description}  />

					<label>Link Image</label>
					<textarea onChange={this.easyModify.bind(this, "image")}
						rows="5" value={item.work.image} />

					<label>Image</label>
					<div onChange={this.uploadImage.bind(this)} className='wrap'>
						<img src={item.work.image} />
						<input ref="upload" type="file" />
					</div>

					<div className="toolbar">
						<Button onClick={this.delete.bind(this)}>Delete</Button>
						<Button onClick={this.save.bind(this)}>Save</Button>
					</div>
				</form>
			</section>
		)
	}

	easyModify(field, e) {
		const { item, dispatch } = this.props
		const value = e.target.value;

		dispatch(Works.modifyWork(item.work.id, (x) => {
			x.work[field] = value
		}))
	}

	modify(cb, e) {
		const { item, dispatch } = this.props
		const value = e.target.value;

		dispatch(Works.modifyWork(item.work.id, (x) => {
			cb(value,x)
		}))

	}

	save() {
		const { item, dispatch, onClose } = this.props
		dispatch(Works.saveWork(item))
		onClose()
	}

	delete() {
		const { item, dispatch, onClose } = this.props
		dispatch(Works.deleteWork(item,this.context.router.transitionTo))
		onClose()
	}

	uploadImage() {
		const file = this.refs.upload.getDOMNode().files[0]
		if(!file.type.includes('image'))
			return
		const { item, dispatch } = this.props
		Imgur(file, link => {
			dispatch(Works.modifyWork(item.work.id, (x) => {
				x.work.image = link
			}))
		})
	}

}
