let cvsWrapper = null;

// assets from: https://github.com/sourabhv/FlapPyBird/tree/master/assets
const pipe_width = 104;
const pipe_height = 640;
const bird_width = 68;
const bird_height = 48;
const W = 432;
const H = 768;

function preload() {
	// Image preload
	baseImg = loadImage("assets/sprites/base.png");
	openImg = loadImage("assets/sprites/message.png");
	endImg = loadImage("assets/sprites/gameover.png");
	bgImg = [
		loadImage("assets/sprites/background-day.png"),
		loadImage("assets/sprites/background-night.png")]

	birdImg = ["blue", "red", "yellow"].map(
		color => ["upflap", "midflap", "downflap"].map(
			flap => loadImage(`assets/sprites/${color}bird-${flap}.png`)
		)
	);
	pipeImg = ["green", "red"].map(
		color => ["lower","upper"].map(
			pos => loadImage(`assets/sprites/pipe-${color}-${pos}.png`)
		)
	);
	numImg = ["0","1","2","3","4","5","6","7","8","9"].map(
		num => loadImage(`assets/sprites/${num}.png`)
	);

	// sound preload
	wingSound = loadSound('assets/audio/wing.wav')
	hitSound = loadSound('assets/audio/hit.wav')
	swooshSound = loadSound('assets/audio/swoosh.wav')
	pointSound = loadSound('assets/audio/point.wav')
	dieSound = loadSound('assets/audio/die.wav')

	// random choose bird & scene
	bird_color_idx = int(Math.random()*3);
	scene_idx = int(Math.random()*2);

	// framerate
	frameRate(50);
}
function init(){
	bird_wing_time = 0
	wall_y = H-baseImg.height;
	x = W/2;
	y = H/2+bird_height*2;
	vy = 0;
	ay = 0.8;
	deg = 0;
	ddeg = 0.05;
	start = false;
	end = false;
	scene_time = 0;
	score = 0;
	pipe_pos = [ 100 , 150 ]
	pipe_interval = [  300 , 300 ]
	// opening -> start = false, end = false
	// playing -> start = true, end = false
	// end -> start = true, end = true
}
function setup() {
	// Game basic setup.
	// Mounting canvas onto div for convenient styling.
	cvsWrapper = document.getElementById("canvasWrapper");
	const myCanvas = createCanvas(432,768);
	myCanvas.parent("canvasWrapper");
	// setup code below
	init();
}
function collide_ceiling_action(){
	vy = 0;
	y = bird_height;
	if(!end){
		hitSound.play();
		dieSound.play();
	}
	end = 1;
}
function collide_ground_action(){
	ay = vy = ddeg = 0;
	// y = H-bird[0][0].height;
	if(end != 2){
		hitSound.play();
	}
	end = 2;
}
rec = [0,0]
t = 0;
function draw() {
	background(0);
	
	if(start){
		// Starting or GameOver

		// bird action setting
		y += vy;
		vy += ay;
		deg += ddeg;
	
		if ( rec[0] != pipe_pos[0] || rec[1] != pipe_pos[1]){
			rec[0] = pipe_pos[0];
			rec[1] = pipe_pos[1];
			t++;
			console.log(pipe_pos[0],pipe_pos[1] ,  scene_time);
		}
		// Move Scene
		for(let i=0;i<2;i++){

			// background move
			image(bgImg[scene_idx], scene_time - i*W, 0, W, H);
			
			// pipe move
			image(pipeImg[0][1], scene_time - i*W + 80, pipe_pos[i]-pipe_height ,pipe_width, pipe_height);
			image(pipeImg[0][0], scene_time - i*W + 80, pipe_pos[i]+pipe_interval[i] ,pipe_width, pipe_height);			
		
		}

		// GameOver Scene
		if (end){

			image(endImg, (W - endImg.width*2)/2 , (H - endImg.height*8)/2,endImg.width*2,endImg.height*2);

		// Starting		
		}else if(start && !end){

			if( scene_time == 0 ){
				// Swap scene 0 1
				[ pipe_interval[0],pipe_interval[1]] = [ pipe_interval[1],pipe_interval[0]];				
				[ pipe_pos[0], pipe_pos[1]] = [ pipe_pos[1],pipe_pos[0]];				
			
				pipe_interval[0] = max(150,300-score*5);
				pipe_pos[0] = int(Math.random() * 400)+50;
				// pipe_interval[1] = 100;
			
			}
			if( scene_time == 87 ){
				pointSound.play();
				score += 1;
			}

			scene_time = ( scene_time - 3 + W ) % W;
			bird_wing_time ++;

		}
	}else{
		// Opening
		init();  
		image(bgImg[scene_idx], 0, 0, W, H);
		image(openImg, (W - openImg.width*2)/2 , (H - openImg.height*2)/2,openImg.width*2,openImg.height*2);
	}


	// ceiling / ground collision detect.
	if( y < 0 ){
		collide_ceiling_action();
	}
	if( y > wall_y - bird_height/2){
		collide_ground_action();
	}

	// draw bird
	push();	
	translate(x,y);
	rotate(deg);
	image(birdImg[bird_color_idx][min(2,int(bird_wing_time/10))], -bird_width/2 , -bird_height/2  , bird_width, bird_height);
	pop();	

	// draw ground
	image(baseImg, scene_time-W, H-baseImg.height, baseImg.width*1.5);
	image(baseImg, scene_time, H-baseImg.height, baseImg.width*1.5);
		

}


function keyPressed() {
	if (keyCode == 32){
		bird_wing_time = 0;
		if(start && end){
			// dead now. change to opening
			start = false; 
			bird_color_idx = int(Math.random()*3);
			scene_idx = int(Math.random()*2);
		}else if(start){
			vy = -10;
			deg = -1;
			wingSound.play();
		}else{
			start = true;
			vy = -10;
			deg = -1;
			wingSound.play();
		}
	}
	if(keyCode == 39){
		// right 
		bird_color_idx = ( bird_color_idx + 1 ) % 3
		swooshSound.play();
	}
	if(keyCode == 37){
		// right 
		bird_color_idx = ( bird_color_idx + 2 ) % 3
		swooshSound.play();
	}

}