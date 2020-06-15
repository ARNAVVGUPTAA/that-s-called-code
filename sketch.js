var canvas, drawing1, drawing2, gameState = -1,
button, button1, instructionsImage, child, child_image, father, texa;

function setup() {
  canvas = createCanvas(700, 600);
  canvas.parent("ccd");

  instructionsImage = loadImage("Annotation 2020-06-15 204656.png");

  // Create a new buffer with the same size
  drawing1 = createGraphics(width, height);  
  drawing2 = createGraphics(width, height);
  
  button = createButton("create");
  button.position(720,20);
  
  button1 = createButton("NEXT");
  button1.position(720,350);

  child = createSprite(300,300,50,90);
  child.visible = false;

  father = createSprite(210,300,50,110);
  father.visible = false;

  texa = createElement("h5");
  texa.html("CREATE HOW YOU WANT TO SEE YOURSELF IN THE GAME");
  texa.position(20,620);

  texb = createElement("h5");
  texb.html("CREATE HOW YOU WANT TO SEE YOUR FATHER IN THE GAME");
  texb.position(20,620);
}

function draw() {

  background("white");

  

  texa.hide();
  texb.hide();
    
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

    texa.show()
    button.show();
    
    if(mouseIsPressed){
      strokeWeight(4);
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

    texb.show();
    button.show();
    
    if(mouseIsPressed){
      strokeWeight(4);
      // Call the line function on the drawing buffer
      drawing2.line(mouseX, mouseY, pmouseX, pmouseY);
    }
    image(drawing2,0,0);
    button.mousePressed(()=> {
        gameState++;
        texa.position(10000,10000);
      });
    }
  if(gameState === 3){
    child.visible = true;
    child_image.loadImage(image(drawing1),child.x,child.width,child.height);
    child.addImage(child_image);
    father.visible = true;
  }
  drawSprites()
}