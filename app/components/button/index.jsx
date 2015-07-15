import 'button/button.css'
import React from 'react'

export default class Button extends React.Component {

	render() {
		return (
			<div onClick={this.props.onClick} className='button'>
			{this.props.children}
			</div>
		)
	}

}