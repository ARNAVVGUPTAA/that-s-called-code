var canvas, drawing1, drawing2, gameState = -1,
button, button1, instructionsImage, child, child_image, father, texa, sprie, bg,
car, cars, a_, b_, c_, d_,a, b, interval,tiger, tiger_image, hider, hiders
//there are some chats to be shown so just don't want to change the gameState for such small matters  
playState = -1;

function setup() {
  canvas = createCanvas(700, 600);
  //made the canvas store in a div so that I can arbitrarily use screen outside canvas 
  canvas.parent("ccd");
  bg = loadImage("bg.jpg");
  //almost made all sprites according to their depths

  tiger_image = loadImage("tiger.png");
  tiger = createSprite(100,300,10,10);
  tiger.addImage(tiger_image);
  tiger.scale = 0.2;

  hider = loadImage("hider.png");
  hiders = createSprite(10,270,10,10);
  hiders.addImage(hider);
  hiders.scale = 1.3;

  car = loadImage("car.png");

  cars = createSprite(950,495,10,10);
  cars.addImage(car);
  cars.scale = 0.5;

  a_ = loadImage("1.png");
  a = createSprite(400,380,10,10);
  a.addImage(a_);

  b_ = loadImage("2.png");
  b = createSprite(550,380,10,10);
  b.addImage(b_);

  c_ = loadImage("wigflip-ds (1).png");
  d_ = loadImage("wigflip-ds (2).png");

  instructionsImage = loadImage("Annotation 2020-06-15 204656.png");

  // Create a new buffer with the same size
  drawing1 = createGraphics(233, 600); 
  drawing2 = createGraphics(233, 600);

  sprie = createSprite(466,300,466,600);
  
  button = createButton("create");
  button.position(720,20);
  
  button1 = createButton("NEXT");
  button1.position(720,280);

  child = createSprite(300,300,50,90);

  father = createSprite(210,300,50,110);
  texa = createElement("h5");
  texa.html("CREATE HOW YOU WANT TO SEE YOURSELF IN THE GAME");
  texa.position(20,620);

  texb = createElement("h5");
  texb.html("CREATE HOW YOU WANT TO SEE YOUR FATHER IN THE GAME");
  texb.position(20,620);

  texc = createElement("h5");
  texc.html("CLICK ANYWHERE ON THE SCREEN TO CONTINUE")
}
function draw(){

  background("white");
  sprie.shapeColor = "blue";

  // just in case, the father and child don't go out from the screen
  child.x = constrain(child.x, 0, width);
  father.y = constrain(child.x, 0, height);

  //falsing the visibility of every thing that's not required at the moment
  child.visible = false;
  father.visible = false;
  sprie.visible = false;
  hiders.visible = false;
  tiger.visible = false;

  texa.hide();
  texb.hide();
  texc.hide();
  button1.hide();
  button.hide();

  if(gameState === -1){

    image(instructionsImage,0,0);

    button1.show();
    button1.mousePressed(()=>{
      gameState++;
    });
  }
  if(gameState === 0){

    sprie.visible = true;

    texa.show()
    button.show();
    
    if(mouseIsPressed){
      drawing1.strokeWeight(8);
      // Call the line function on the drawing buffer
      drawing1.line(mouseX, mouseY, pmouseX, pmouseY);
    }
    image(drawing1,0,0);

    button.mousePressed(()=> {
      gameState++;
     // 
    });
  }
  if(gameState === 1){

    sprie.visible = true;

    texb.show();
    button.show();
    
    if(mouseIsPressed){
      drawing2.strokeWeight(8);
      // Call the line function on the drawing buffer
      drawing2.line(mouseX, mouseY, pmouseX, pmouseY);
    }
    image(drawing2,0,0);
    button.mousePressed(()=> {
        gameState++;
        texa.position(10000,10000);
      });
    }
  if(gameState === 2){

    background(bg);

    tiger.visible = true;
    hiders.visible = true;

    child.x = cars.x;
    child.y = cars.y - 80;

    father.x = cars.x + 110;
    father.y = cars.y - 80;

    update();
    
    setInterval(() => {
      cars.velocityX = -3;
      
      if(mouseIsPressed){
        texc.hide();
      }  
      
      if(cars.x < 350){
        cars.velocityX = 0;
      }
      if(cars.x === 348){
        playState = 0;
      }

    }, 2000);

  }
  if(gameState === 3){
  }

  changeChats();
  console.log(playState);
  drawSprites();
}
  
function update(){

  //loadImage was not working so tried this and this worked even better
  image(drawing1,child.x,child.y,child.width,child.height);
  image(drawing2,father.x,father.y,father.width,father.height);

}

function changeChats(){
  
  //for gameState 2    
  //playState can't be any number other than -1 if gameState !== 2
  if(playState === 0){
    //small shift of car so that playState works fine because of line 151
    cars.x = 349;
    
    a.visible = true;

    if(mouseIsPressed){
      playState  = 1;
    }
  } else {a.visible = false;};

  if(playState === 1){
    b.visible = true;
    a.visible = false;
    interval = setInterval(() =>{
    if(mouseIsPressed){
      playState = 2;
      clearInterval(interval);
    }
  },1000);
    
  } else {b.visible = false;};

  if(playState === 2){
    
    tiger.velocityX = 1;

    var toto = setInterval(()=>{
      tiger.velocityX = -1;

      if(tiger.x <= 100){
        playState = 3;      
        clearInterval(toto);
      }

    },500);
  }

  if(playState === 3){
    a.visible = true;
    
    a.changeImage(c_);

    if(mouseIsPressed){
      playState = 4;
    }
  } else {a.visible = false;};
  //the above else condition is just to make sure everything works okay

  if(playState === 4){
    b.visible = true;

    b.changeImage(d_);

    if(mouseIsPressed){
      playState = 5;
    }
  }
}