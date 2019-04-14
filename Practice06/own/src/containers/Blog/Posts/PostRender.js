import React, { Component } from "react";
import "../Blog.css"
import Post from "../../../components/Post/Post";
import { NavLink } from "react-router-dom";

export default class PostRender extends Component {
    render() {
        const postIDs = Array.apply(null, {length: 12}).map(Number.call, Number).map(function (i){return i.toString()});
        const id = this.props.match.params.id;
        return <div>
            { 
                postIDs.includes(id) ? (
                    <Post id={id} />
                ):(
                   <div>
                        <h3>Error: Post #{id} NOT FOUND</h3>
                    </div>
                )
            }
            <div>
            {
                id > 0 ?                    
                <button className="nav_btn">
                    <NavLink to={"/posts/"+(Number(id)-1)}>Next page</NavLink>
                </button> : <noscript></noscript>
            }
            <button className="nav_btn">
                <NavLink to="/">Goto Homepage</NavLink>
            </button>
            {
                id <= 10 ?                    
                <button className="nav_btn">
                    <NavLink to={"/posts/"+(Number(id)+1)}>Next page</NavLink>
                </button> : <noscript></noscript>
            }
            </div>
        </div>
    }
}
