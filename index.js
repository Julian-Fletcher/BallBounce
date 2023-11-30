//Finding the Canvas
const canvas = $('#plane');
const ctx = canvas[0].getContext("2d");

//Finding boundaries
let boundary = canvas[0].getBoundingClientRect();
console.log(boundary);

//Variables
var gravity = 1;
var friction = 0.9;

//Create a square when the canvas is clicked
$(document).on('click', function(event){
    let X = event.clientX;
    let Y = event.clientY;
    let validClick = X >= boundary.left && X <= boundary.right && Y >= boundary.top && Y <= boundary.bottom;

    var firstClick = false;

    if(validClick){
        //spawnSquare(X, Y);//old
        init(X, Y);
        if(!firstClick){
            animate();
            firstClick = true;
        }
        console.log('Cursor position: X= ' + X + ', Y= ' + Y);
    }
    else{
        console.log('Invalid click!');
    }
});



//Objects
function Square(x, y, dy){
    this.x = x - boundary.left;
    this.y = y - boundary.top;
    this.dy = dy;
    this.color = '#' + Math.floor(Math.random()*16777215).toString(16);
    console.log(this.dy);
    this.update = function(){
        if(this.y + 30 > boundary.height){
            this.dy = -this.dy * friction;
        }
        else{
            this.dy += gravity;
            //console.log(this.dy);
        }
        this.y += this.dy;
        this.draw();
    };

    this.draw = function(){
        ctx.beginPath();
        ctx.rect(this.x, this.y, 25, 25);
        ctx.fillStyle = this.color;
        ctx.fill();
        //ctx.stroke();
        ctx.closePath();
    }
}

//Initialize the square on click
var square;
var squares = [];
function init(initX, initY){
    squares.push(new Square(initX, initY, 1)); //for multiple squares on the screen at a time
    console.log(squares);
    //square = new Square(initX, initY, 1);
    //console.log(square);
}

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas[0].width, canvas[0].height);

    for(let i = 0; i < squares; i++){
        squares[i].update();
    }

}


/*
function spawnSquare(initX, initY){

    //Get relative spawn position based on canvas
    var relativeX = initX - boundary.left ;
    var relativeY = initY - boundary.top;

    //Set fill color
    ctx.fillStyle = '#' + Math.floor(Math.random()*16777215).toString(16);

    //Rectangle object on screen
    const rectangle = new Path2D();
    rectangle.rect(relativeX, relativeY, 25, 25);
    ctx.fill(rectangle);
}
*/