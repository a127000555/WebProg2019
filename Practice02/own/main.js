url_prefix = 'https://http.cat/';
url_list=['100','101','200','201','202'];
now_index = 0; 
var target_img_src = document.getElementById('display');
var back_btn = document.getElementById('back_btn');
var next_btn = document.getElementById('next_btn');
back_btn.deg = 0;
next_btn.deg = 0;
back_btn.preempt = 0;
next_btn.preempt = 0;
back_btn.using = 0;
next_btn.using = 0;

target_img_src.src=url_prefix + url_list[0];

function check_boundary(){
	// back_btn.opacity = 0.2;
	back_btn.style.opacity = (now_index == 0) ?  0.2:1;
	next_btn.style.opacity = (now_index == url_list.length-1) ? 0.2 : 1;
}
function warning(msg){
	var warning_bar = document.getElementById("warning_bar");
	warning_bar.innerHTML = msg;
	if(warning_bar.style.opacity == 1)
		return 1;
	warning_bar.style.opacity = 1;
	return 0;
}
function change_pic(target_url){
	target_img_src.src='images/loading.gif';
	target_img_src.onload = function() {
		target_img_src.src=target_url;
	}
	warning_bar.style.opacity = 0;
	change_degree(back_btn,0);
	change_degree(next_btn,0);
	back_btn.style.borderWidth = "0";
	next_btn.style.borderWidth = "0";
	check_boundary();
}
function prev_image(){
	if(now_index != 0){
		change_pic(url_prefix + url_list[--now_index]);
	}else{
		if(warning("leftmost!")){
			change_degree(back_btn,180);
			back_btn.style.borderWidth = "5px";
			back_btn.style.borderColor = "red";
		}
	}
}
function next_image(){
	if(now_index != url_list.length-1){
		change_pic(url_prefix + url_list[++now_index]);
	}else{
		if(warning("rightmost!")){
			change_degree(next_btn,-180);
			next_btn.style.borderWidth = "5px";
			next_btn.style.borderColor = "red";
		}
	}
}
function change_degree(btn,target){
	if(btn.deg == target){
		return ;
	}
	btn.preempt = 1;
	wait = 0
	if(btn.using >= 1){
		function x(){
			change_degree(btn,target);
		}
		setTimeout(x,100);
		console.log('waiting');
		return ;
	}
	btn.using ++;


	dd = Math.round(Math.abs(target-btn.deg) / (target-btn.deg))*2;
	interval = 500/(Math.abs(target-btn.deg));
	function f(){
		btn.deg += dd;
		btn.style.transform  = 'rotate(' + btn.deg+'deg)'; 
		if(btn.deg != target || btn.preempt != 1){
			setTimeout(f,interval);
		}else{
			btn.using --;
		}
	}
	setTimeout(f,interval);
	
}
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e){
	if(e.keyCode == 39)
		next_image(0);
	if(e.keyCode == 37)
		prev_image(0);
}
check_boundary();