import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export default class Posts extends Component {
    render() {
        const postIDs = Array.apply(null, {length: 12}).map(Number.call, Number);
        const lists = postIDs.map((i, index) => (
            <div key={index} style={{margin: "15px"}}>
                <NavLink  to={"/posts/" + i}>
                    <span style={{
                        "color":"white",
                        "text-shadow" : "0 0 5px #00002b, 0 0 20px #00c, 0 0 10px #00f",
                        "font-weight" : "bold"
                        }}>
                        Posts #{i}
                    </span>    
                </NavLink>
            </div>
        ));
        return (
            <div>
                <h2 style={{
                    "color" : "white",
                    "text-shadow" : "0 0 5px #2b002b, 0 0 20px #c0c, 0 0 10px #f0f"
                    }}>Let's view my posts!</h2>
                {lists}
            </div>
        );
    }
}
