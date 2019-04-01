import React from "react";
import btn from "./img/x.png"
/*

function TodoItem(props){
    return(
        <li class="todo-app__item">
        <div class = "todo-app__checkbox" >
            <input id = "0"  type="checkbox"></input>
            <label id = "todo-app__checkbox-label"></label>
        </div>
            <h1 class = "todo-app__item-detail">{props.detail}</h1>
            <img src="./img/x.png" class = "todo-app__item-x"></img>
        </li>
    )
}
*/
class TodoItem extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          // TODO
          detail : this.props.detail,
          isComplete:false,
          textDecoration : "none",
          opacity : 1,
          background_color : "grey",
        //  display : "none"
          isDeleted : false

        };
    };

    changeStatus = () =>{
        console.log("click",this.props)
        if (this.state.isComplete){
            this.setState({
                isComplete:false,
                textDecoration : "none",
                opacity : 1,
                background_color : "grey"
            })
        }
        else if (!this.state.isComplete){
            this.setState({
                isComplete:true,
                textDecoration : "line-through",
                opacity : 0.5,
                background_color : "green"
            })
        }
        this.props.handleChange(this.props.id)
    }
    
    deleteItem = () =>{
       
        
        this.setState({
            display : "none",
            isDeleted:true
        });
        console.log(this)
       this.props.handleDelete(this.props.id);
        
        //console.log("this is deleted")
        //return "hey"// <li class="todo-app__item" onClick = {()=> this.onClick} ></li>
    }

    render(){
       
        const exist = {
            display : this.state.display, 
        }
        const text_style = {
            textDecoration : this.state.textDecoration,
            opacity : this.state.opacity,
        };
        const btn_style = {
            backgroundColor: this.state.background_color
        }
       return(
        <li className="todo-app__item"  style={exist}>
        <div className = "todo-app__checkbox" >
            <input id = "0"  type="checkbox" onClick = {this.changeStatus}></input>
            <label id = "todo-app__checkbox-label" onClick = {this.changeStatus} style = {btn_style}></label>
        </div>
            <h1 className = "todo-app__item-detail" style = {text_style} >{this.props.detail}</h1>
            <img src={btn} alt = "the delete button" onClick = {this.deleteItem} className = "todo-app__item-x"></img>
        </li>
       )
    }

}

export default TodoItem
