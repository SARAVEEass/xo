//creating game stuff?? commenting bcs i m following a ytube tutorial here

let game;
let gameWidth = 500;
let gameHhh = 500;
let context;

//creating player + mod 
let playerw = 100;
let playerh = 10;
let playerVelocityX = 0;
let MODw = 500; 

let player = {
    x : gameWidth/2,
    y : gameHhh - playerh - 10,
    width : playerw,
    height : playerh,
    velocityX : playerVelocityX
}

let mod = {
    x : 0,
    y : 10,
    width : MODw, 
    height : playerh,
    velocityX : playerVelocityX
} //i am so so tired

//ball
let ballwidth = 10;
let ballheight = 10;
let ballVX = 0.5;
let ballVY = 1;
let ball = {
    x : gameWidth/2,
    y : gameHhh/2,
    width : ballwidth,
    height : ballheight,
    velocityX : ballVX,
    velocityY : ballVY
}


window.onload = function(){
    game = document.getElementById("game");
    game.height = gameHhh;
    game.width = gameWidth;
    context = game.getContext("2d"); //used 2 draw on game

    //drawing player
    context.fillStyle = "crimson";
    context.fillRect(player.x, player.y, player.width, player.height);

    requestAnimationFrame(update);
    document.addEventListener("keyup", movePlayer);

}

function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0, game.width, game.height);
    //lowk draw player again
    context.fillStyle = "crimson";
    //player.x += player.velocityX;
    let nextPlayer1X = player.x + player.velocityX;
    if(!outofbounds(nextPlayer1X)){
        player.x = nextPlayer1X;
    }
    context.fillRect(player.x, player.y, player.width, player.height);
    //drawing the MOD (winner)
    context.fillRect(mod.x, mod.y, mod.width, mod.height);
    //drawing the BALL
    context.fillStyle = "palegoldenrod";
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);

    if(ball.x <= 0 || ball.x + ball.width >= gameHhh){
        ball.velocityX *= -1;
    }

    if (detectcollision(ball, player)) {
        if (ball.y + ball.height >= player.y) {
            ball.velocityY *= -1; 
        }
    }    
    else if (detectcollision(ball, mod)) {
        if (ball.y <= mod.y + mod.height) { 
            ball.velocityY *= -1.5; 
        }
    }

    if (ball.y + ball.height >= gameHhh) {
        gameOver();
    }


}

function outofbounds(xpos){
    return (xpos < 0 || xpos + playerw > gameWidth);
}

function movePlayer(e){
    if(e.code == "KeyA"){
        player.velocityX = -3;
    }
    else if(e.code == "KeyD"){
        player.velocityX = 3;
    }
}

function detectcollision(a, b){
    return a.x < b.x + b.width && //a's TL corner doesnt reach b's TR corner
           a.x + a.width > b.x && //a's TR corner passes b's TL corner
           a.y < b.y + b.height && //a's TL corner doesnt reach b's BL corner
           a.y + a.height > b.y; //a's BL corner passes b's TL corner

}

function gameOver() {
    document.body.innerHTML = "<h1 style='color: red; text-align: center;'>Game Over! Redirecting... (IDK WHY IT TAKES LIKE A WHOLE MINUTE TO LOAD OK ITS 2.40AM IM TIRED just wait x)</h1>";
    setTimeout(() => {
        window.location.href = "loser.html"; 
    }, 2000); // Show message for 2 seconds before redirecting
}

