import React, { Component } from 'react';

import './App.css';
import TodoItem from "../components/TodoItems"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          // TODO
          todo_list_data : [],
          items_cnt : 0
        };
      }

  handleInput=(event)=>{
      if(event.keyCode === 13 && event.target.value !== ''){
        console.log(this.state.items_cnt);

        const input = document.getElementById('todo-input');
        var temp_list_data = this.state.todo_list_data;
        temp_list_data[this.state.items_cnt]= {node:input.value, isComplete:false}
        this.setState({
        todo_list_data:temp_list_data,
        items_cnt : this.state.items_cnt+1
         });
         input.value="";
      }    
  }
   handleDelete =(id)=> {
       console.log("this is deleted")
       var temp_list_data = this.state.todo_list_data;
       temp_list_data.splice( temp_list_data[id], 1 );
       this.setState({
           items_cnt: this.state.items_cnt-1,
           todo_list_data : temp_list_data
       })
       console.log(this.state.todo_list_data)
   }

   handelChange = (id)=>{
       console.log("this is the handle change fucntion")
       var temp_list_data = this.state.todo_list_data;
       console.log(id,temp_list_data[id])
       temp_list_data[id].isComplete = !temp_list_data[id].isComplete;
       this.setState({
        todo_list_data : temp_list_data
    })
   }

  render() {
    const todoItems = this.state.todo_list_data.map(todo_list_data =>{
        return <TodoItem handleChange = {this.handelChange} handleDelete = {this.handleDelete} detail = {todo_list_data.node} id = {this.state.items_cnt-1}/>
    })

    return (
        <div id = 'root' className="todo-app__root">
            <header className="todo-app__header"></header>
                <div className="todo-app__title">todos</div>
            <section className="todo-app__main">
                <input className="todo-app__input" onKeyUp={this.handleInput} type="text" id="todo-input" placeholder="What needs to be done?"></input>
                <ul className="todo-app__list" id = "todo-list">
                    
                    {todoItems}
                </ul>
            </section>
            <footer className="todo-app__footer" id = "todo-footer">
                <div className="todo-app__total" id = "todo-count">total:{this.state.items_cnt}, 0 left</div>
                <ul className="todo-app__view-buttons">
                    <button >all</button>
                    <button >active</button>
                    <button>completed</button>
                </ul>
                <div  className="todo-app__clean" id = "clear">clear</div> 
            </footer>

        
            </div>
      
    );
  }
}

export default App;
