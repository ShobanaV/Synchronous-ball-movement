var ball;
var database, positionRef;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();
    positionRef = database.ref("ball/position");
    positionRef.on("value", readPosition, showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
   positionRef.set({
       x : ball.x + x,
       y : ball.y + y
   });
}

// Data is read successfully
function readPosition(data) {
    var position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

// When error occurs during read
function showError(errorMsg){
    console.log(errorMsg);
}


// var data = {
//     ball : {
//         position : {
//             x : 200,
//             y : 200
//         }
//     }
// }