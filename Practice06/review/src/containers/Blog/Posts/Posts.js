import React, { Component } from "react";

import FullPost from "../../../components/FullPost/FullPost";
import Post from "../../../components/Post/Post";
import FakeDatabase from "../../../fakedatabase/FakeDatabase";
import classes from "./Posts.module.css";

export default class Posts extends Component {
    postremove = () => {
        FakeDatabase.deleteAll();
        window.location.reload(); 
    }

    postSelectedHandler = id => {
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push("/posts/" + id);
    };

    render() {
        const { id } = this.props.match.params;

        console.log(this.props);
        let display = null;
        if (id) {
            const post = FakeDatabase.getPostById(id);
            display = post ? (
                <FullPost
                    title={post.title}
                    author={post.author}
                    content={post.content}
                />
            ) : (
                <h1>Not found.</h1>
            );
        } else {
            display = FakeDatabase.getAll().map((post, id) => (
                <Post
                    key={id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectedHandler(post.id)}
                />
            ));
        }

        return (
            <div className={classes.wrapper}>
                <div className={classes.posts}>{display}</div>
                {id ? null : (
                    <button className={classes.clearbutton}onClick={() => this.postremove()}>
                        Clear Your Post
                    </button>
                )}
            </div>
        );
    }
}
