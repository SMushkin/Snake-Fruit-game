const box =32;//beacuse each box in ground is of 32px

const cvs = document.getElementById('snake');//canvas
const ctx = cvs.getContext('2d');//to get canvas properties, 2d dimension


// load images

const ground = new Image();
ground.src = "img/ground.png";//it has (17,13) boxes in main light green rectangle, +3 boxes in y direction out side rectangle, so 15 boxes in y

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";


let snake = [];
snake[0]= {
    x: 9*box,
    y: 10*box
};


let food={
    x: Math.floor(Math.random()*17 + 1)*box,//to get x position of food b/w 1 & 17
    y: Math.floor(Math.random()*15 + 3)*box// y position b/w 3 & 18 means 15 boxes

}
/* The floor() method rounds a number DOWNWARDS to the nearest integer, and returns the result*/
/* Math.random() returns a random number between 0 (inclusive),  and 1 (exclusive)*/


//control the snake

let d;//direction

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// create the score var
let score=0;
// draw everything to the canvas
function draw(){
    
    ctx.drawImage(ground,0,0);//to draw ground image on canvas
    
    //snake properties
    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "white";//color to fill in a rectangle
        ctx.fillRect(snake[i].x,snake[i].y,box,box);//position of rectangle
        
        ctx.strokeStyle = "red";//red boundary on a box
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);//drawing fruit image on canvas
    //score properties
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);
    
    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        wel = document.querySelector('#welcome');
        wel.innerHTML = "Game Over - Reload to Play Again";
        
    }
    //to change position of head
    snake.unshift(newHead);//to add element to beginning of snake array
    
   
}



//to call draw function after every 100 ms
let game = setInterval(draw,100);
