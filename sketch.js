var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var pink1Img,pink2Img;
var yellow1Img,yellow2Img;
var red1Img,red2Img;
var gameOverImg,cycleBell;

var pinkGroup, yellowGroup,redGroup; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  pink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  pink2Img = loadAnimation("images/opponent3.png");
  
  yellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  yellow2Img = loadAnimation("images/opponent6.png");
  
  red1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  red2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
gameOver = createSprite(350,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkGroup = new Group();
yellowGroup = new Group();
redGroup = new Group();
  
  gameOver.depth=pink.depth
  gameOver.depth=red.depth
  gameOver.depth=yellow.depth
  
  gameOver.depth=gameOver.depth+1
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(15);
  fill(255);
  text("Distance: "+ distance,500,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pink();
    } else if (select_oppPlayer == 2) {
      yellow();
    } else {
      red();
    }
  }
  
   if(pinkGroup.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",pink2Img);
    }
    
    if(yellowGroup.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",yellow2Img);
    }
    
    if(redGroup.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",red2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    textSize(15);
    fill(255);
    text("Press Up Arrow to Restart the game!", 250,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkGroup.setVelocityXEach(0);
    pinkGroup.setLifetimeEach(-1);
  
    yellowGroup.setVelocityXEach(0);
    yellowGroup.setLifetimeEach(-1);
  
    redGroup.setVelocityXEach(0);
    redGroup.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function pink(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",pink1Img);
        player1.setLifetime=170;
        pinkGroup.add(player1);
}

function yellow(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",yellow1Img);
        player2.setLifetime=170;
        yellowGroup.add(player2);
}

function red(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",red1Img);
        player3.setLifetime=170;
        redGroup.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkGroup.destroyEach();
  yellowGroup.destroyEach();
  redGroup.destroyEach();
  
  distance = 0;
}