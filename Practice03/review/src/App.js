import React, { Component } from 'react';

class Wrapper extends Component {
  render() {
    return(
      <div id="wrapper">
        <HeaderWrapper name="茶包"/>
        <Splash />
        <Page />
      </div>
    );
  }
}

class HeaderWrapper extends Component {
  render() {
    return(
      <div id="header-wrapper">
        <div id="header">
          <div id="logo">
            <h1><a href="#">{this.props.name}</a></h1>
          </div>
        </div>
      </div>
    ) ;
  }
}

class Splash extends Component {
  render() {
    return(
      <div id="splash">
        <img src="dog.png" style={ {width: 259, height: 224} } />
      </div>
    ) ;
  }
}

class Page extends Component {
  render() {
    return(
      <div id="page">
        <Content />
        <SideBar />
        <div style={{clear: "both"}}>&nbsp;</div>
      </div>
    ) ;
  }
}

class Content extends Component {
  render() {
    return(
      <div id="content">
        <div className="contentbg">
          <Post head="歡迎來看茶包" paragraph="我叫茶包，是隻法鬥"/>
          <Post head="關於法鬥" paragraph="法鬥是最可愛的品種"/>
          <Post head="茶包的夢想" paragraph="當爐石選手"/>
        </div>
        <div style={{clear: "both"}}>&nbsp;</div>
      </div>
    ) ;
  }
}

class SideBar extends Component {
  render() {
    return(
      <div id="sidebar-bg">
        <div id="sidebar">
          <ul>
           <li>
              <h2>茶包的清單</h2>
              <p>茶包的.....</p>
           </li>
           <li>
              <h2>狗的種類</h2>
              <ul>
                <li><a href="#">可愛的法鬥</a></li>            
                <li><a href="#">帥氣的法鬥</a></li>
                <li><a href="#">優秀的法鬥</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    ) ;
  }
}

class Post extends Component {
  render() {
    return(
      <div className="post">
        <h2 className="title"><a href="#">{this.props.head}</a></h2>
        <div className="entry">
            <p>{this.props.paragraph}</p>
        </div>
      </div>
    ) ;
  }
}
export default Wrapper;
