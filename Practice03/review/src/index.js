import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './App';
import HeaderWrapper from './App';
import Splash from './App';
import Page from './App'; 
import Content from './App'; 
import Post from './App'; 
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Wrapper />, document.getElementById("root"));
serviceWorker.unregister();
