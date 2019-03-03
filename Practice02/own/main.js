url_prefix = 'https://http.cat/';
url_list=['100','101','200','201','202'];
now_index = 0; 
var target_img_src = document.getElementById('display');
target_img_src.src=url_prefix + url_list[0];
function check_boundary(){
	var back_btn = document.getElementById('back_btn');
	var next_btn = document.getElementById('next_btn');
	// back_btn.opacity = 0.2;
	back_btn.style.cssText = (now_index == 0) ?  "opacity:0.2;" : "opacity:1;";
	next_btn.style.cssText = (now_index == url_list.length-1) ?  "opacity:0.2;" : "opacity:1;";
}
function warning(msg){
	var warning_bar = document.getElementById("warning_bar");
	warning_bar.innerHTML = msg;
	warning_bar.style.cssText = "height: 45px;opacity : 1;";
}
function change_pic(target_url){
	target_img_src.src='images/loading.gif';
	target_img_src.onload = function() {
		target_img_src.src=target_url;
	}
	warning_bar.style.cssText = "height: 45px;opacity : 0;";
	check_boundary();
}
function prev_image(){
	if(now_index != 0){
		change_pic(url_prefix + url_list[--now_index]);
	}else{
		warning("leftmost!");
	}
}
function next_image(){
	if(now_index != url_list.length-1){
		change_pic(url_prefix + url_list[++now_index]);
	}else{
		warning("rightmost!");
	}
}
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e){
	console.log(e);
	if(e.keyCode == 39)
		next_image(0);
	if(e.keyCode == 37)
		prev_image(0);
}

check_boundary();