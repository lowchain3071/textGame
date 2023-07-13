const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 360;

//player stats
let health = 100;
let inventory = [];
let energy = 100;
let money = 100;

//messages
let bottomBarMessage = "Navigate Using Arrow Keys";
let middleMessage;
let optionA;
let optionB;
let optionC;
let optionD;


//option selection
let selectNumber = 0;
let  selected = 0;//binary mode: 0 equals false, 1 equals true. remember to use modulus
function switchSelection(){selected++};

//game states
let state;
let started;

//keyboard events
let keys = [];
window.addEventListener('keydown', e => {
if(!keys.includes(e.key)) keys.push(e.key);
});

window.addEventListener('click', e => {
  console.log(e.x, e.y)
});

let gameFrame = 0;

//inventory classes
class weapon {
  constructor(){
  this.inventoryType = 0;
  }
}

class food {
  constructor(){
  this.money = 0;
  this.inventoryType = 1;
  this.eaten = false;
  this.energy = 0;
  }
  
  eat(){
  energy += this.energy;
  }
}
if(window.prompt("keyword?") = "hi")state = "crossroads";

function animate(){
  window.localStorage.setItem("started", true);
  console.log(keys)
  ctx.clearRect(0, 0, canvas.width, canvas.height);

//keyboard input
  if(keys.includes("ArrowUp")) {
    selectNumber--;
      keys.splice('ArrowUp')
  }
  if(keys.includes("ArrowDown")) {
    selectNumber++;
    keys.splice('ArrowDown')
  }
  if(keys.includes("Enter")){
    switchSelection();
    keys.splice("Enter");
  }
  if(keys.includes(" ")){
    state = "inventory";
    keys.splice(" ");
  }

  //menu and boards
  if(state === "menu"){
  ctx.font = 25 + 'px ' + 'Courier New';
  ctx.fillText(middleMessage, 150, 150);
  }
if(state === "menu"){
  middleMessage = "HAHA FUNNY RPG"
  optionA = "Load Game";
  optionB = "New Game";
  optionC = "Credits";
  optionD = "How to Play";
  if(selected % 2 === 1){
    if(selectNumber % 4 === 0){
      started = window.localStorage.getItem('started');
      if(started != true){
        alert("You haven't started yet.");
      }
      health = window.localStorage.getItem('health');
      inventory = window.localStorage.getItem('inventory');
      money = window.localStorage.getItem('money');
      energy = window.localStorage.getItem('energy');
      
      state = window.localStorage.getItem('state');

    }
    if(selectNumber % 4 === 1){
      state = "new game";
    }
  }
}

if(state === "new game"){
  if(confirm("Are you sure you want to create a new game? This will wipe out your current save.") === true){
    window.localStorage.clear();
    health = 100;
    money = 20;
    energy = 100;
    switchSelection();
    
    state = "crossroads";
  }
}

  if(state === "crossroads"){
    middleMessage = "Choose a direction to go in."
    optionA = "go left";
    optionB = "go right";
    optionC = "go forward";
    optionD = "return to menu";
    if(selected % 2 == 1){
      if(selectNumber % 4 === 0){
        //option one
        //goleft
        resetselection();
        energy -= 2;
        state = "cliff";
      }
      if(selectNumber % 4 == 1){
        resetselection();
        energy -= 6;
        state = "village"
      }
      if(selectNumber % 4 == 2){
        resetselection();
        energy -= 3;
        state = "forest"
      }
      if(selectNumber % 4 == 3){
        resetselection();
        
        state = "menu";
      }
    }
  }

  if(state == "village"){
    middleMessage = "Welcome to the village square";
    optionA = "Get food";
    optionB = "go to training/shop";
    optionC = "stay at inn";
    optionD = "leave village and return to crossroads"

    if(selected % 2 == 1){
      if(selectNumber % 4 == 0){
      resetselection();
      state = "town grocer";
      }
      if(selectNumber % 4 == 1){
      resetselection();
      state = "training shop";
      }
      if(selectNumber % 4 == 2){
      resetselection();
      state = "inn"
      }
      if(selectNumber % 4 == 3){
      resetselection();
      energy -= 6;
      state = "crossroads";
      }
    }
  }
  //in town scenes

  if(state == "forest"){
    optionA = "venture further in the forest";
    optionB = "set up a camp";
    optionC = "gather food";
    optionD = "go hunting";
    if(selected % 2 == 1){
      if(selectNumber % 4 == 0){
        
      }else if(selectedNumber % 4 == 1){
        state = "camp_setup"
      }else if(selectNumber % 4 == 2){
        if(energy < 15){
          resetselection();
          bottomBarMessage = "not enough energy..."
        }else{
          energy -= 8;
          state = "food gathering"
        }
      }else if(selectNumber % 4 == 3){
        if(energy < 25){
          resetselection();
          bottomBarMessage = "not enough energy..."
        }else{
          
        }
      }
    }
  }
  
  
  if(state == "cliff"){
    middleMessage = "You approached a cliff. Now what do you do?"
    optionA = "scale the cliff";
    optionB = "walk around it";
    optionC = "attempt to zipline across";
    optionD = "head back to crossroads"
  } 

 if(state != "inventory"){
  ctx.font = 18 + 'px ' + 'Courier New';
  ctx.fillText(optionA, 106, 180);
  ctx.fillText(optionB, 106, 210);
  ctx.fillText(optionC, 106, 240);
  ctx.fillText(optionD, 106, 270);

  ctx.font = 14 + 'px ' + 'Courier New';
  ctx.fillText(state, 0, 340);

  if(state != "menu" && state != "new game"){
  ctx.font = 12 + 'px ' + 'Courier New';
  ctx.fillText("HEALTH: " + health, 150, 100);
  ctx.fillText("MONEY: " + money, 250, 100);
  ctx.fillText("ENERGY: "+ energy, 390, 100);
  ctx.font = 20 + 'px ' + 'Courier New';
  ctx.save();
  ctx.textAlign = "center";
  ctx.fillText(middleMessage, canvas.width/2, 155);
  ctx.restore();
    }

  ctx.font = 18 + 'px ' + 'Courier New';
  ctx.fillText(optionA, 106, 180);
  ctx.fillText(optionB, 106, 210);
  ctx.fillText(optionC, 106, 240);
  ctx.fillText(optionD, 106, 270);

  //arrow pointer and selection
  if(selectNumber === -1) selectNumber = 3;
  ctx.fillRect(70, 165 + 30* (selectNumber % 4), 20, 20);

  //bottom bar message
  ctx.font = 14 + 'px ' + 'Courier New';
  ctx.fillText(bottomBarMessage, 104, 333);
}
  while(state == "inventory"){
   ctx.font = 30 + "px " + "Courier New";
   ctx.textAlign = "center";
   ctx.fillText("inventory", canvas.width/2, 50);
   if(keys.includes(" ")) console.log("leaving...");
}


  gameFrame++;
   
  requestAnimationFrame(animate);
}
animate();

//functions
function saveProgress(){
  window.localStorage.setItem('inventory', inventory);
  window.localStorage.setItem('money', money);
  window.localStorage.setItem('started', started);
  window.localStorage.setItem('health', health);
  window.localStorage.setItem('energy', energy);
}
function resetselection(){
  selectNumber = 0;
  selected = 0;
}
