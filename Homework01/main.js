// get global item information & make copy
const template_item_dom = document.getElementById("item0").cloneNode(true);
template_item_dom.children[0].children[0].checked = 0;
document.getElementById("item0").children[0].children[0].checked = 0;
var now_item_top = 1;
var now_exist_items = [ document.getElementById("item0") ];
var now_showed_list = now_exist_items;
var now_mode = 'All'; // 'All' / 'Completed' / 'Active'

// create items in todo-list
function create_item( s ){

	let this_item = template_item_dom.cloneNode(true);
	this_item.id = "item" + (now_item_top);
	this_item.children[1].textContent = s ;
	this_item.children[2].id = now_item_top + '_img' ;
	this_item.children[0].children[0].id = "" + (now_item_top);
	this_item.children[0].children[1].htmlFor = "" + (now_item_top);
	if ( now_mode != 'Completed' ){
		let item_main = document.getElementById("todo-list");
		item_main.appendChild(this_item);
	}
	now_exist_items[now_item_top] = this_item;
	now_item_top ++ ;
	update_left();
}

function delete_item( idx ){

	let item_main = document.getElementById("todo-list");
	item_main.removeChild(now_exist_items[idx]);
	delete now_exist_items[idx];
	console.log(idx);
}

function update_left(){

	let left = now_exist_items.filter( elem => !elem.children[0].children[0].checked).length
	let left_text = document.getElementById("left");
	left_text.innerHTML = left + " left";
}

function update_item_style( sub_item ){
	// item-style: line-through & opacity
	let checked = sub_item.children[0].children[0].checked;
	sub_item.children[1].style["opacity"] = checked ? 0.5: 1 ;
	sub_item.children[1].style["textDecoration"] = checked ? "line-through" : "" ;		
}

function change_mode( mode ){
	// only click button can invoke this function.
	now_mode = mode;
	let item_main = document.getElementById("todo-list");
	while (item_main.firstChild) 
		item_main.removeChild(item_main.firstChild);

	now_exist_items.forEach(function(sub_item){
		let checked = sub_item.children[0].children[0].checked;
		update_item_style(sub_item);

		if ( checked && mode != 'Active' ) 
			item_main.appendChild(sub_item);
		if ( !checked && mode != 'Completed' ) 
			item_main.appendChild(sub_item);

	});
}

function clear_completed(){

	checked = now_exist_items.filter( elem => elem.children[0].children[0].checked);
	checked.map( elem => delete_item(elem.children[0].children[0].id));
	
}

document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e){
	// Catch enter signal, and trim the todo-string.
	if(e.keyCode == 13 && e.target.value.trim() !== ''){
		create_item( e.target.value.trim() );
		e.target.value = ''
		if(now_exist_items[0]){
			now_exist_items[0].children[0].children[0].checked = 1;
			update_item_style(now_exist_items[0]);
		}
	}
}

document.addEventListener("click", clickHandler, false);
function clickHandler(e){
	//	click the img-x.
	if( e.target.className == 'todo-app__item-x' )
		delete_item(parseInt(e.target.id));
	//  click the checkbox
	if( e.target.type == 'checkbox' )
		update_item_style(now_exist_items[e.target.id]);

	update_left();
}

create_item("Test 1");
create_item("Test 2");
