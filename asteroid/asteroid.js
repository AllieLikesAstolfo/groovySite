const TOP = 0;
const BOTTOM  = 600;
const LEFT =0;
const RIGHT  = 1700;
const ASTEROID_NUMBER =15; //Determines the amount of asteroids in play

var score = 0 //Sets the score value to 0 once you load the page

var aImg = new Image(); //Variable for the asteroids
aImg.src = 'asteroid.png' //Texture for the asteroids

class Asteroid{ //Asteroid movement
	x=(Math.random()*RIGHT)
	y=(Math.random()*BOTTOM)
	r = 15
	dx=Math.random()-0.5;
	dy=Math.random()-0.5;
	move(){
		this.x= this.x + this.dx;

		this.y= this.y +this.dy;
		
	}
	draw(){
		console.log('draw')

		ctx.drawImage(aImg,this.x-this.r, this.y-this.r);

	}
}

var asteroids = []; //Variable for creating multiple asteroids
	for(var i = 0; i< ASTEROID_NUMBER; i++)
	asteroids[i] = new Asteroid();


//Red circle
var rImg = new Image(); //Variable for the red circle
rImg.src = 'redCir.png' //Texture for the red circle



//Ship variables
var x=10 //X value for the spaceship
var y=10 //Y value for the spaceship
var dx=10 //X speed value for the spaceship
var dy=10 //Y speed value for the spaceship
var r = 15 //radius for the spaceship

var shipImg = new Image(); //Variable for the spaceship 
shipImg.src = 'blueCir.png'; //Texture for the spaceship


var ctx
var timer

var redX = 960; //X value for the red cricle
var redY = 560; //Y value for the red circle
var redR = 15; //R(radius) value for the red circle
var score; //Variable for the score system


function redCollision(){ //Collision between you and the red circle
	var distance_x = x - redX;
	var distance_y = y - redY;
	var radii = r + redR;
		if (distance_x * distance_x + distance_y * distance_y <= radii * radii) {
		x = 20; //These X and Y statements put you back to x20 y20 if you touch the red circle
		y = 20;
		score = score + 10000; //Gives you +10000 score each time you touch the red circle
		return true;
	}
}

function drawAsteroids(){ //Draws the asteroids
	for(var i = 0; i< ASTEROID_NUMBER; i++){
		asteroids[i].draw();
	}
}

function drawRImg(){ //Draws the red circle
	ctx.drawImage(rImg, redX, redY);
}

function drawShip(){ //Draws the spaceship
	ctx.drawImage(shipImg,x-r, y-r);
}

function draw(){
	ctx.fillStyle = "#000000" ; 
    ctx.fillRect(LEFT, TOP, RIGHT, BOTTOM);
	drawShip(x, y); //Draws the spaceship
	drawAsteroids(); //Draws the asteroids
	drawRImg(); //Draws the red circle
}

function move(){ //Makes the asteroids move around randomly
	for(var i = 0; i< ASTEROID_NUMBER; i++){
		asteroids[i].move();
	}
} 

var distance_x
var distance_y
var radii



function asteroidCollision(){
	for(var i = 0; i< ASTEROID_NUMBER; i++){ //I've used circular collison here to make it so when you get hit by a asteroid you get your points reset and go back to x20 y20
		var distance_x = x - asteroids[i].x;
		var distance_y = y - asteroids[i].y;
		var radii = r + asteroids[i].r;
			if (distance_x * distance_x + distance_y * distance_y <= radii * radii) {
			x = 20
			y = 20
			score = score - 10
			return true
			
		}
	}
}


function update(){ //These statements allow for the player to move around the screen and the X and Y statements set the players position when you open the game
	if(upKeyPressed) y -= dy
	if(downKeyPressed) y += dy
	if(leftKeyPressed) x -= dx
	if(rightKeyPressed) x += dx
	if(spacePressed){
		x = 20
		y = 20
	}
	

	document.getElementById("score").innerHTML = "Score: " + score;

	if(y < 0)y = 0 //The following 4 if statements allow the player to stay within the black box, aka the play area
	if(y > 600)y = 600 // Look above
	if(x > 1000)x = 1000 // Look above
	if(x < 0)x = 0 // Look above

	for(var i = 0; i< ASTEROID_NUMBER; i++){ //These if statments allow the asteroids to wrap around the screen on the X and Y axis
		if (asteroids[i].x < 0){
			asteroids[i].x = 1000
		}
		if (asteroids[i].x > 1000){
			asteroids[i].x = 0
		}
		if (asteroids[i].y < 0){
			asteroids[i].y = 600
		}
		if (asteroids[i].y > 600){
			asteroids[i].y = 0
	}
		asteroidCollision()
		redCollision();
		move()	
		draw()
	}
}


var upKeyPressed =false
var downKeyPressed =false
var leftKeyPressed =false
var rightKeyPressed =false
var spacePressed =false

function keyDown(e){
	changeKey(e.keyCode, true)
}

function keyUp(e){
	changeKey(e.keyCode, false)
}


function changeKey(which, to){
	switch (which){
		case 32: spacePressed =to; break
		case 37: leftKeyPressed =to; break 
		case 38: upKeyPressed =to; break
		case 39: rightKeyPressed =to; break 
		case 40: downKeyPressed=to; break
			
	}
}
window.onload=function(){
	ctx=document.getElementById("myCanvas").getContext("2d")
	document.onkeyup=keyUp
	document.onkeydown=keyDown
	timer = setInterval(update, 25)
}