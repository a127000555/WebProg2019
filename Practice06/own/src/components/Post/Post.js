import React from "react";

export default ({ id }) => {
    return (
        
        <article style={{
            "color" : "white",
            "textShadow" : "0 0 5px #2b002b, 0 0 20px #c0c, 0 0 10px #f0f",
            "height" : "100%"
            }}>
            <h1>Post #{id}</h1>
            <p>This is the {id}-th post</p>
        </article>
    );
};
