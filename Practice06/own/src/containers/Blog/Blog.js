import React, { Component } from "react";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";

import Posts from "./Posts/Posts";
import PostRender from "./Posts/PostRender";
import Authors from "./Authors/Authors.js";
import Home from "./Home/Home.js";
import './Blog.css';

export default class Blog extends Component {
    render() {
        return (
            <div>
                <div className="nav_bar">
                    <button className="nav_btn">
                        <NavLink to="/home">Home</NavLink>
                    </button>
                    <button className="nav_btn">
                        <NavLink to="/posts">Posts</NavLink>
                    </button>
                    <button className="nav_btn">
                        <NavLink to="/authors">Authors</NavLink>
                    </button>
                </div>
                <hr/>
                <div className="context">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/posts" component={Posts} />
                    <Route path="/posts/:id?" component={PostRender} />
                    <Route path="/authors" component={Authors} />
                    <Redirect from="/home" to="/" />
                </Switch>
                </div>
            </div>
        );
    }
}
