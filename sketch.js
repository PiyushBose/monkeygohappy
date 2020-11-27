var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score;
var survivalTime = 0;
var health = 100;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  
  monkey = createSprite(80,340,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(300,380,600,20);
  ground.velocityX = -4;
  ground.shapeColor = "lightgreen";
  ground.x = ground.width/2;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.debug = true;
  monkey.setCollider("circle",0,0,300);
}


function draw() {
  background("lightblue");
  
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: "+survivalTime,100,50);
  text("Health: "+health,120,100);
  console.log(monkey.y);
  
  if(gameState === PLAY){
    
    survivalTime = Math.ceil(frameCount/frameRate());
    
    if(keyDown("space") && monkey.y >= 330){
      monkey.velocityY = -15;
    } 

    monkey.velocityY += 0.7;

   if(ground.x <= 100){
      ground.x = 300;
    }

    if(monkey.isTouching(foodGroup)){
      foodGroup.destroyEach();
      if(health > 0 && health < 100){
        health += 10;
      }
    }

    if(monkey.isTouching(obstacleGroup)){
      obstacleGroup.destroyEach();
      health -= 20;
    }
    
    spawnFood();
    
    spawnObstacle();

    if(health <= 0){
      health = 0;
      monkey.destroy();
      ground.destroy();
      foodGroup.destroyEach();
      obstacleGroup.destroyEach();
      
      gameState = END;
      
      
    }
  }
  
  if(gameState === END){
    stroke("red");
      textSize(40);
      fill("red");
      text("GAME OVER",80,200);
  }
  
  
  
  
  monkey.collide(ground);
  
  
  
  

  drawSprites();
}

function spawnFood(){
  if(frameCount % 200 === 0){
    banana = createSprite(400,340,20,20);
    banana.velocityX = -8;
    
    banana.y = Math.round(random(250,340));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 55;
    foodGroup.add(banana);
  }
}

function spawnObstacle(){
  if(frameCount % 100 === 0){
    obstacle = createSprite(400,340,20,20);
    obstacle.velocityX = -(5 + survivalTime/500);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 85;
    obstacleGroup.add(obstacle);
  }
}