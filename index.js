class square{
    //Construct the object????
    constructor(startX, startY){
        this.posX = startX;
        this.posY = startY;
        this.color = Math.floor(Math.random()*16777215).toString(16); //Generate a random color
    }
}

//Get the boundary of the plane
let plane = $('#plane'); //Select the plane 
let boundary = plane[0].getBoundingClientRect();
console.log(boundary);

function spawnSquare(X, Y){
    //Create div element and assign class
    let newSquare = document.createElement('div');
    newSquare.className = 'square'; 

    //Set background to random color
    newSquare.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    
    //Spawn position relative to bounding box
    relativeX = X - boundary.left;
    relativeY = Y - boundary.top;

    //Set the position of the square
    newSquare.style.position = 'absolute';
    newSquare.style.left = relativeX + 'px';
    newSquare.style.top = relativeY + 'px';

    plane[0].appendChild(newSquare);
}

//Function to spawn new squares when the plane is clicked
$(document).on('click', function(event){
    let X = event.clientX;
    let Y = event.clientY;
    let validClick = X >= boundary.left && X <= boundary.right &&
                      Y >= boundary.top && Y <= boundary.bottom;

    if(validClick){
        spawnSquare(X, Y);
    }
    console.log('Cursor position: X= ' + X + ', Y= ' + Y);
});

$(document).ready(function(){

});