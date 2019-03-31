import React, { Component } from 'react';
import './styles.css';

// const template_item_dom = document.getElementById("item0").cloneNode(true);
class list_node{

    constructor( todo_string, index ){
        this.todo_string = todo_string;
        this.index = index;
        this.is_checked = false;
        this.is_exist = true;
        this.template_innerHTML = function template_innerHTML( todo_string, index, checkbox_checked, todo_string_style ){
            return <ul className="todo-app__list" id="todo-list" key={`${index}`} >
                <li className="todo-app__item" id="item0" >
                    <div className="todo-app__checkbox" >
                        <input type="checkbox" id={`${index}`} checked={checkbox_checked}/>
                        <label htmlFor={`${index}`}  />
                    </div>
    
                    <h1 className="todo-app__item-detail" style={todo_string_style}>
                        {todo_string}
                    </h1>
                    <img src="img/x.png" className="todo-app__item-x" id={`${index}` } />
                </li>
                <li>
                    <div className="blank" />
                </li>
            </ul>;
        }
    
        this.InnerHTML = this.template_innerHTML(todo_string, index, 0  ,{});
        
    }   
    set_checked(){
        this.is_checked = true;
        this.InnerHTML =  this.template_innerHTML(this.todo_string, this.index, 1 , {opacity: 0.5, textDecoration: "line-through"});
    }
    set_unchecked(){
        this.is_checked = false;
        this.InnerHTML =  this.template_innerHTML(this.todo_string, this.index, 0 , {});
    }
    // sub_item.children[1].style["opacity"] = checked ? 0.5: 1 ;
	// sub_item.children[1].style["textDecoration"] = checked ? "line-through" : "" ;		

}
class Mainlist extends Component {
    
    constructor(){
        super();        
        this.state = { 
            mode : 'All',
            now_item_top: 1, 
            all_item: [new list_node("Try to add one TODO!" ,0)]
        };

    }
    componentDidMount() {
        document.addEventListener("keydown", (e) => {
            // Catch enter signal, and trim the todo-string.
            if(e.keyCode === 13 && e.target.value.trim() !== ''){
                this.state.all_item.push(new list_node( e.target.value.trim(),this.state.now_item_top++ ));
                if(!this.state.all_item[0].is_checked){
                    this.state.all_item[0].set_checked();
                    // update_item_style(now_exist_items[0]);
                    // update_left();
                }
                e.target.value = ''
                this.setState(this.state);
                document.getElementById('left').innerHTML = this.state.all_item.filter(node => !node.is_checked && node.is_exist).length + " left";
            }
        }, false);

        document.addEventListener("click", (e) => {
            console.log('click' , e);

            // //	click the img-x.
            // if( e.target.className == 'todo-app__item-x' )
            // delete_item(parseInt(e.target.id));
            
            //  click the checkbox
            if( e.target.type === 'checkbox' ){
                if (this.state.all_item[e.target.id].is_checked){
                    this.state.all_item[e.target.id].set_unchecked();
                }else{
                    this.state.all_item[e.target.id].set_checked();
                }
                console.log(this.state.all_item[e.target.id].is_checked , e.target.id);
            }
            if( e.target.type === 'submit' ){
                let submit_string = e.target.textContent.trim();
                if(submit_string === 'All' || submit_string === 'Active' || submit_string === 'Completed'){
                    this.state.mode = submit_string;
                }
                if(submit_string === 'Clear completed'){
                    this.state.all_item.filter( node => node.is_checked).map(
                        node => {node.is_exist = false;}
                    )
                    console.log('clear');
                }
            }
            if( e.target.className === 'todo-app__item-x' ){
                this.state.all_item[e.target.id].is_exist = false;
            }
    
            // update_left();
            document.getElementById('left').innerHTML = this.state.all_item.filter(node => !node.is_checked && node.is_exist).length + " left";
            this.setState(this.state);
        }, false);


    }
    
    render() {
        
        
    return (
       <div>
           {this.state.all_item.filter(
               this.state.mode === 'All' ?  node => node.is_exist : 
               this.state.mode === 'Active' ?  node => node.is_exist && !node.is_checked : 
               node => node.is_exist && node.is_checked).map( node => node.InnerHTML)}
       </div>
    
    );
  }
}

export default Mainlist;
