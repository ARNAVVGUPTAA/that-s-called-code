var canvas, drawing1, drawing2, gameState = -1, bg1,
button, button1, instructionsImage, child, child_image, father, texa, sprie, bg,
car, cars, interval, tiger, tiger_image, hider, hiders, yes_button, no_button, tiger1, tiger12
//there are some chats to be shown so just don't want to change the gameState for such small matters  
playState = -1,
//making the code sophisticated; using arrays to load chat images for father and son, separately!!!
father_chat = [], son_chat = [],
//for delaying purposes 
time = 0;
var tester, yes_button, no_button, a, b;
function setup() {
  canvas = createCanvas(700, 600);
  //made the canvas store in a div so that I can arbitrarily use screen outside canvas 
  canvas.parent("ccd");
  bg = loadImage("bg.jpg");
  bg1 = loadImage("bg2.jpg");

  for(var i = 0; i < 9; i++){
    father_chat[i] = loadImage((i+1)+"a.png");
    son_chat[i] = loadImage((i+1) + ".png");
  }
  //almost made all sprites according to their depths

  car = loadImage("car.png");

  cars = createSprite(950,495,10,10);
  cars.addImage(car);
  cars.scale = 0.5;

  /*
  a.addImage(a_,"1st");
  a.addImage(c_,"2nd");
  b.addImage(b_,"1ST");
  b.addImage(d_,"2ND");
  AM NOT USING addImage() because it(loading, adding, changing images) looks cumbersome and can end up in chaos, image() is okay to use.....
  */

  instructionsImage = loadImage("Annotation 2020-06-15 204656.png");

  // Create a new buffer with the same size
  drawing1 = createGraphics(233, 600); 
  drawing2 = createGraphics(233, 600);
  
  button = createButton("create");
  button.position(720,20);
  
  button1 = createButton("NEXT");
  button1.position(720,280);
  
  yes_button = createButton("YES");
  yes_button.position(150,620);
  
  no_button = createButton("NO");
  no_button.position(450,620);

  child = createSprite(300,300,50,90);

  sprie = createSprite(466,300,466,600);

  tiger1 = loadImage("tiger1.png");
  tiger12 = createSprite(160,390,10,10);
  tiger12.addImage(tiger1);

  tiger_image = loadImage("tiger.png");
  tiger = createSprite(100,300,10,10);
  tiger.addImage(tiger_image);
  tiger.scale = 0.2;

  hider = loadImage("hider.png");
  hiders = createSprite(10,270,10,10);
  hiders.addImage(hider);
  hiders.scale = 1.3;

  father = createSprite(210,300,50,110);
  texa = createElement("h5");
  texa.html("CREATE HOW YOU WANT TO SEE YOURSELF IN THE GAME");
  texa.position(20,620);

  texb = createElement("h5");
  texb.html("CREATE HOW YOU WANT TO SEE YOUR FATHER IN THE GAME");
  texb.position(20,620);

  texc = createElement("h5");
  texc.html("CLICK ANYWHERE ON THE SCREEN TO CONTINUE");
  texc.position(20,620);
}

function draw(){

  if(tester === "hospital"){
  }

  background("white");
  
  sprie.shapeColor = "blue";

  //falsing the visibility of every thing that's not required at the moment
  child.visible = false;
  father.visible = false;
  sprie.visible = false;
  hiders.visible = false;
  tiger.visible = false;
  tiger12.visible = false;

  texa.hide();
  texb.hide();
  texc.hide();
  button1.hide();
  button.hide();
  if(playState !== 7){
  yes_button.hide();
  no_button.hide();
  } else {yes_button.show();
          no_button.show();}                

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

    hiders.visible = true;
    tiger.visible = true;

      child.x = cars.x;
      child.y = cars.y - 80;

      father.x = cars.x + 110;
      father.y = cars.y - 80;
    update();
    changeChats();
    
    if(mouseIsPressed){
      texc.hide();
    }

    setInterval(() => {
      cars.velocityX = -3;
      

      if(cars.x < 349){
        if(playState === -1){
          playState = 0;
        }
        if(tester !== "win2"){
          cars.velocityX = 0;
        }
      }
    }, 2000);
  }
  if(gameState === 3){
    tiger1.visible = true;

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
    yes_button.hide();
    no_button.hide();
  }


  if(tiger.x === NaN){
    tiger.y = 300;
    tiger.x = 99;
  }

  drawSprites();
  //print(frameCount);
}

function update(){
  image(drawing1,child.x,child.y,child.width,child.height);
  image(drawing2,father.x,father.y,father.width,father.height);
}

function changeChats(){
  
  if(playState > 2 && playState !== "win-win"){
    tiger.y = 300;
    tiger.x = 100;
    tiger.velocityX = 0;
  }
  //for gameState 2    
  //playState can't be any number other than -1 if gameState !== 2
  if(playState === 0){
    cars.velocityX = 0;
    image(son_chat[0],250,300)
    texc.show();
      if(mouseIsPressed){
        playState  = 1;
        time = frameCount;
      }
      
    }
  
  
  if(playState === 1){

    image(father_chat[0],350,300);

    if(frameCount > time + 60){  
      texc.show()
      if(mouseIsPressed){
        playState = 2;
      }
    }
    
  }

  if(playState === 2){
    
    tiger.velocityX = 1;

    var toto = setInterval(()=>{
      tiger.velocityX = -1;
      clearInterval(toto);
    },500);
    
    if(tiger.x < 99){
      playState = 3;
      time = frameCount; 
    }
  }

  if(playState === 3){
    image(son_chat[1],250,300);

    if(frameCount > time + 60){  
      texc.show()
      if(mouseIsPressed){
        time = frameCount;
        playState = 4;
      }
    }
  }

  if(playState === 4){
    image(father_chat[1],350,300);

    if(frameCount > time + 60){  
      texc.show()
      if(mouseIsPressed){
        time = frameCount;
        playState = 5;
      }
    }
  }

  if(playState === 5){
    image(son_chat[2],250,300);

    if(frameCount > time + 60){   
      texc.show()
      if(mouseIsPressed){
        time = frameCount;
        playState = 6;
      }
    }
  }

  if(playState === 6){
    image(father_chat[2],350,300);

    if(frameCount > time + 60){  
      texc.show()
      if(mouseIsPressed){
        time = frameCount; 
        playState = 7;
      }
    }
    tester = "noyes";
  }
    

    if(playState === 7){

      yes_button.show();
      no_button.show();

      yes_button.mousePressed(()=>{
        tester = "yes";
        playState++;
        time = frameCount;
      });
      
      no_button.mousePressed(()=>{
        tester = "no";
        playState++;
        time = frameCount;
      })
    }

    if(playState === 8){
      if(tester === "yes"){
        image(son_chat[4],250,300);
      if(frameCount > time + 30){
        playState = "win-win"
        time = frameCount;
      }
      } else
      if(tester === "no"){
        image(son_chat[3],250,300);

        if(frameCount > time + 60){  
          texc.show()
          if(mouseIsPressed){
            time = frameCount; 
            playState = "it's still a win";
          }
      }

    }
  }
    if(playState === "win-win"){
      tiger.velocityX = -6;

      if(frameCount > time + 60){
        tiger.velocityX = -6;
      }
      if(tiger.x < -100 && tester !== "to be shown"){
        tiger.velocityX = 0;
        tester = "to be shown";
      }
      if(tester === "to be shown"){
        image(father_chat[5],350,300);
        tiger.x = -80;
        if(frameCount > time + 90){  
          texc.show()
          if(mouseIsPressed){
            tiger.visible = false;
            tester = "win";
            time = frameCount;
          }
        }
      }
      console.log(tester)
      if(tester === "win"){
        tiger.x = -80;
        image(son_chat[5],350,300);
        if(frameCount > time + 60){  
          texc.show()
          if(mouseIsPressed){
            time = frameCount; 
            tester = "win1";
          }
        }
      }

      if(tester === "win1"){
        image(father_chat[6],350,300);
        image(son_chat[6],250,300);
        tiger.x = -80;
        if(frameCount > time + 90){  
          button1.show();
          button1.mousePressed(()=>{
            gameState++;
          })
        }
      }
    }

        
      
  if(playState === "it's still a win"){

    child.depth = 2;
    cars.depth = child.depth;
    child.depth = 1;

    if(frameCount > time + 60){ 
      texc.show()
      if(mouseIsPressed){
        time = frameCount; 
        tester = "hospital";
        hiders.visible = false;
        tiger.visible = false;
        cars.visible = false;
      }
      
    }
    if(tester === "hospital"){
      background(bg1);
      if(frameCount > time + 30){
        image(drawing1,child.x,child.y,child.width,child.height);
        image(drawing2,father.x,father.y,father.width,father.height);

        image(son_chat[6],250,300);

      }
    }
  }
}
