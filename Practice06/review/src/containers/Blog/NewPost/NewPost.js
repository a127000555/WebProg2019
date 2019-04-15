import React, { Component } from 'react'
import FakeDatabase from '../../../fakedatabase/FakeDatabase'

import classes from './NewPost.module.css'

export default class NewPost extends Component {
	state = { title: '', author: '', content: '' }

	handleChange = (e, field) => {
		const value = e.target.value
		this.setState(prevState => {
			prevState[field] = value
			return prevState
		})
	}

	handleSubmit = e => {
		e.preventDefault()
		FakeDatabase.addPost(this.state)
		this.props.history.push('/posts')
	}

	render() {
		/** SOURCE: https://reactjs.org/docs/forms.html */
		return (
			<form onSubmit={this.handleSubmit} className={classes.form}>
				<label>
					<h1 className={classes.label}>Riddle Title:</h1>
					<input
						className={classes.input}
						type="text"
						name="title"
						value={this.state.title}
						onChange={e => this.handleChange(e, 'title')}
					/>
				</label>
				<label>
					<h1 className={classes.label}>Riddle Answer:</h1>
					<textarea
						className={classes.input}
						type="text"
						name="content"
						value={this.state.content}
						onChange={e => this.handleChange(e, 'content')}
					/>
				</label>
				<label>
					<h1 className={classes.label}>Author:</h1>
					<input
						className={classes.input}
						type="text"
						name="author"
						value={this.state.author}
						onChange={e => this.handleChange(e, 'author')}
					/>
				</label>
				<input className={classes.submit} type="submit" value="Submit" />
			</form>
		)
	}
}
