import React from 'react'
import classes from './Post.module.css'

const post = props => (
	<article className={classes.Post} onClick={props.clicked}>
		<h3 className={classes.title}>{props.title}</h3>
		<div className={classes.Author}>{props.author}</div>
	</article>
)

export default post
