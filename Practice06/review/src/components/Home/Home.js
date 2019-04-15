import React from 'react';
import  "./style.css";
import logo from './UPLOAD.jpg';
import FakeDatabase from "../../fakedatabase/FakeDatabase";

const home = props => (
    <div>
        <img className="image" src={logo} alt={"Home"} />
        <div className="content">
            <h2>Post Count: {FakeDatabase.getLength()}</h2>
        </div>
    </div>
)

export default home