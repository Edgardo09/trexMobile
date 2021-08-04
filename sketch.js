var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var newImage;
var PLAY=1;
var END=0;
var gameState=PLAY;
var obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstaclesGroup;
var gameOver,gO;
var restart,r;
var trexCollision;
var checkP;
var die;
var jump;
var mensaje="yo soy el mejor";


function preload()
{
    trex_running=loadAnimation("trex1.png","trex3.png", "trex4.png");
  trex_collided=loadAnimation("trex_collided.png");
  trexCollision=loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  gameOver=loadImage("gameOver.png");
  restart=loadImage("restart.png");
  checkP=loadSound("checkPoint.mp3");
  die=loadSound("die.mp3");
  jump=loadSound("jump.mp3");
  
}

function setup() 
{
  createCanvas(windowWidth,windowHeight);

  trex = createSprite(50,height-140,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collide",trexCollision);
  trex.scale = 0.5;
  
  ground = createSprite(width/2,height-150,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;

  
  invisibleGround = createSprite(width/2,height/2+150,width,10);
  invisibleGround.visible = false;
  cloudsGroup=new Group();
  obstaclesGroup=new Group();
  
  
  score=0;
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  
  //trex.debug=true;
  gO=createSprite(width/2,height/2-70);
 gO.addImage(gameOver);
 gO.scale=0.4;
 gO.visible=false;
 r=createSprite(width/2,height/2);
 r.addImage(restart);
 r.scale=0.5;
 r.visible=false;
}   

function draw() 
{
  background('white');
  text("Puntuación:"+score,500,50);

  //Una variable local solo funciona en donde se declara y una global funciona en cualquier parte del codigo.
  console.log(windowHeight);
  console.log(trex.y);
  if (gameState==PLAY)
  {
    if(touches.lengh>0||keyDown("space") && trex.y>=height-180)
    {
    trex.velocityY = -10;
    jump.play();
    
    }
    trex.velocityY = trex.velocityY + 0.8;
    ground.velocityX=-(6+3*(score/100));
    if (ground.x < 0)
    {
    ground.x = ground.width/2;
    }
    
    score=score+ Math.round(getFrameRate()/60);
    if(score>0&&score%100==0)
    {
      checkP.play();
    }
    if (obstaclesGroup.isTouching(trex)){
      gameState=END;
      die.play();
    }
      spawnClouds();
    spawnObstacles();
  }
  else if(  gameState==END)
 {
  gO.visible=true;
  r.visible=true;
 ground.velocityX=0;
 trex.velocityY=0;
 trex.changeAnimation("collide",trexCollision);
   obstaclesGroup.setVelocityXEach(0);
   cloudsGroup.setVelocityXEach(0);
   obstaclesGroup.setLifetimeEach(-1);
   cloudsGroup.setLifetimeEach(-1);
    if (mousePressedOver(r))
    {
  Reset();
    }
 }
  
  
  trex.collide(invisibleGround);

  
  drawSprites();
}
function spawnObstacles()
{
  if(frameCount%60===0)
  {
    var   obstacle=createSprite(width,height-150,10,40);
    obstacle.velocityX=-(6+3*(score/100)) ;
    var rand=Math.round(random(1,6));
    switch(rand)
    {
        case 1: obstacle.addImage(obstacle1);
        break;
        case 2: obstacle.addImage(obstacle2);
        break;
        case 3: obstacle.addImage(obstacle3);
        break;
        case 4: obstacle.addImage(obstacle4);
        break;
        case 5: obstacle.addImage(obstacle5);
        break;
        case 6: obstacle.addImage(obstacle6);
        break;
        default:break;
    }
    obstacle.scale=0.6;
    obstacle.lifetime=300;  
    obstaclesGroup.add(obstacle);
  }
}
function Reset()
{
  gameState=PLAY;
  r.visible=false;
  gO.visible=false;
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  trex.changeAnimation("running",trex_running)
  score=0;
  
}
function spawnClouds()
{
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) 
  {
    cloud = createSprite(width,height,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(40,300))
    cloud.scale = 1;
    cloud.velocityX = -3;
    
    cloud.lifetime=200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
    
    
    }
}