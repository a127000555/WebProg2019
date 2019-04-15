import React from 'react'
import classes from './FullPost.module.css'

const FullPost = props => (
	<div className={classes.wrapper}>
	<div className={classes.info}>
		<h3 className={classes.title}>{props.title}</h3>
	</div>
		<p className={classes.content}>{props.content}</p>
		<p className={classes.author}>by {props.author}</p>
	</div>
	
)
export default FullPost