import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    constructor(props){
        super(props);
        this.state = { data: new Date() };
    }
}

export default Button;
