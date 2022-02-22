

//Crear variable de objetos del programa
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var obstaculo1,obstaculo2, obstaculo3, obstaculo4, obstaculo5, obstaculo6;
var obstaculosGroup, obstaculosImage;
var play = 1;
var fin = 0;
var estadodejuego = play;
var puntuación = 0;



function preload(){
  //precargar imagen de trex corriendo
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  
  //precargar imagen de trex colisionando
  trex_collided = loadAnimation("trex_collided.png");
  
  //precargar imagen de suelo
  groundImage = loadImage("ground2.png");
  
  //precargar imagen de nubes
  cloudImage = loadImage("cloud.png");
  
  obstaculo1=loadImage("obstacle1.png");
  obstaculo2=loadImage("obstacle2.png");
  obstaculo3=loadImage("obstacle3.png");
  obstaculo4=loadImage("obstacle4.png");
  obstaculo5=loadImage("obstacle5.png");
  obstaculo6=loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);

  //crea el sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  //crea el sprite de suelo
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  
  //crea el sprite de suelo invisible
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  
  obstaculosGroup = new Group();
}

function draw(){ 
  background(180);
  text("puntos   "+ puntuación, 180,50)
 if(estadodejuego==play) {
   
  
      //mover el suelo
      ground.velocityX = -6
      puntuación = puntuación + Math.round(getFrameRate()/60);
       
      //trex salta cuando se presiona la tecla de espacio y reproduce sonido de salto
      if(keyDown("space") && trex.y>=160){
        trex.velocityY = -10;
        //jumpSound.play();
      }

      //gravedad del trex
      trex.velocityY = trex.velocityY + 0.6
if (ground.x<0){
  ground.x=ground.width/2;
}
      //aparece las nubes
      spawnClouds();
      spawnObstaculos();
      cloudsGroup.setLifetimeEach(-1);
  
  //evita que el Trex caiga
  trex.collide(invisibleGround);
 if(obstaculosGroup.isTouching(trex)){
    estadodejuego = fin;
    }
  
  
}
if(estadodejuego == fin) {
  ground.velocityX = 0; 
  trex.velocityY = 0;
  cloudsGroup.setVelocityXEach(0);
  obstaculosGroup.setVelocityXEach(0);
  trex.changeAnimation("collided", trex_collided);
}
drawSprites();
}

function spawnClouds() {
  //escribe el código aquí para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.6;
    cloud.velocityX = -6
    cloud.lifetime = 220;
    
    //ajusta la profundidad
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    
    //añade cada nube al grupo
    cloudsGroup.add(cloud);
    }
}

 function spawnObstaculos() {
   if (frameCount % 60 === 0){
     obstaculo = createSprite (600, 165, 10, 40);
     obstaculo.velocityX = -6;
     obstaculo. scale = 0.5;
     var número = Math.round(random(1,6));
     switch(número){
        case 1: obstaculo.addImage(obstaculo1);
        break;
        case 2: obstaculo.addImage(obstaculo2);
        break;
        case 3: obstaculo.addImage(obstaculo3);
        break;
        case 4: obstaculo.addImage(obstaculo4);
        break;
        case 5: obstaculo.addImage(obstaculo5);
        break;
        case 6: obstaculo.addImage(obstaculo6);
        break;
        defaut: break;
     }
     
     
     obstaculo.scale = 0.5;
     obstaculosGroup.add(obstaculo)
   }
   
}