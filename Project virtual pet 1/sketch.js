//Create variables here
var dog,happyDog,database,foodS,foodStock;
var dog_img,happyDog_img;
var feed, addFood;
var foodOBJ;
var fedTime,lastFed;
function preload()
{
  dog_img = loadImage("images/dogImg.png");
  happyDog_img = loadImage("images/dogImg1.png");
	//load images here
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  dog = createSprite(250,250,200,200);
  dog.addImage(dog_img);
  dog.scale = 0.4;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  
  feed=createButton("Feed the dog");
  feed.position(500,95);
  addFood=createButton("Add food");
  addFood.position(600,95);
  feed.mousePressed(feedDog);
  addFood.mousePressed(addFood);

  foodOBJ=new Food();
}


function draw() {  
  background(46,139,87);
  drawSprites();
  //add styles here
  console.log(foodS);
  foodOBJ.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  textSize(15);
  fill("white");
  text("Last Fed Time :"+lastFed,200,100);
  /*if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog_img);
  }
  textSize(20);
  fill("white");
  text("Press Up arrow to feed the dog",120,60);
  text("Remaining food: "+foodS,50,450);*/
}

function readStock(data)
{
   foodS = data.val();
   foodOBJ.updateFoodStock(foodS);
}

function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happyDog_img);

  if(foodOBJ.getFoodStock()<= 0){
    foodOBJ.updateFoodStock(foodOBJ.getFoodStock()*0);
  }else{
    foodOBJ.updateFoodStock(foodOBJ.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodOBJ.getFoodStock(),
   // foodTime:hours()
  })
  
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

}