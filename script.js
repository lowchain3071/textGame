document.write("running...");
import checkgeneration from "./scenegeneration.js"

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 360;

//player stats
let health = 250;
let inventory = [];
let energy = 250;
let money = 100;

//messages
let bottomBarMessage = "Navigate Using Arrow Keys";
let middleMessage;
let optionA;
let optionB;
let optionC;
let optionD;1
//option selection
let selectNumber = 0;
let  selected = 0;//binary mode: 0 equals false, 1 equals true. remember to use modulus
function switchSelection(){selected++};

//game states
let state = "crossroads";
let started;
let lastState;
let gameFrame = 0;

//scene generation
let forestoption = [];
let clifftrail = [];
let town_option = [];
let mines_options = [];
let generationArray = [];

//time mechanism
let timestamp = 0;
let deltatime = 0;
let lasttime = 0;

//keyboard events
let keys = [];
window.addEventListener('keydown', e => {
if(!keys.includes(e.key)) keys.push(e.key);
});

window.addEventListener('click', e => {
  console.log(e.x, e.y)
});

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
  
  use(){
  energy += this.energy;
  }
}

document.write("setup done");

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
        state = "forest_initial"
      }
      if(selectNumber % 4 == 3){
        resetselection();
        state = "menu";
      }
    }
  }

  if(state == "village"){
    middleMessage = "Welcome to the village square";
    optionA = "Get food, replinish supplies/health";
    optionB = "go to training/shop";
    optionC = "stay at inn";
    optionD = "leave village and return to " + lastState;

    if(selected % 2 == 1){
      if(selectNumber % 4 == 0){
      resetselection();
      state = "inventory";
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
      state = lastState;
      }
    }
  }
  //town mechanism


  if(state == "forest_initial"){
    
  }
  //in town scenes

  if(state == "forest_initial"){
    optionA = "venture further in the forest";
    optionB = "set up a camp";
    optionC = "gather food";
    optionD = "go hunting";
    if(selected % 2 == 1){
        if(selectNumber % 4 == 0){
            resetselection();
            state = "random_forest_scene_generation";
        }
        if(selectNumber % 4 == 1){
          resetselection();
          state = "camping";
        }
        if(selectNumber % 4 == 2){
            resetselection();
            if(energy < 15){
                bottomBarMessage = "not enough energy. you need 15 to gather food.";
            }else{
              state = "food gathering";
            }
        }
        if(selectNumber % 4 == 3){
            resetselection();
            if(energy < 25){
                bottomBarMessage = "not enough energy. you need 25 to hunt.";
            }else{
                state = "hunting";
            }
        }
    }
  }

  if(state == "cliff"){
    middleMessage = "You approached a cliff. Now what do you do?"
    optionA = "scale the cliff";
    optionB = "walk further in";
    optionC = "attempt to zipline across";
    optionD = "head back to " + lastState;
    if(selected % 2 == 0){
      resetselection();
      if(energy > 20){
        state = "cliff face";
      }else{
        bottomBarMessage = "whelp, you don't have enough energy...";
      }
      if(selectNumber % 2 == 1){
        resetselection();
        state = "cliff_trail_spawn";
      }
      if(selectNumber % 2 == 2){
        if(energy < 10){
          resetselection();
          state = "zipline_unpredictable";
        }else{
          resetselection();
          bottomBarMessage = "not enough energy to zipline."
        }
      }
      if(selectNumber % 2 == 3){
        resetselection();
        state = lastState;
      }
    }
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

//inventory mechanism
  while(state == "inventory"){
   ctx.font = 30 + "px " + "Courier New";
   ctx.textAlign = "center";
   ctx.fillText("inventory", canvas.width/2, 50);
   if(keys.includes(" ")) state = "lastState";
}

  checkgeneration(state, forestoption, clifftrail, town_option, generationArray, middleMessage, optionA, optionB, optionC, optionD, resetselection, selectNumber, selected, ctx, canvas);
  findTime();
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
function resetselection() {
  selectNumber = 0;
  selected = 0;
  lastState = state;
  bottomBarMessage = "use arrow keys and enter to navigate";
  saveProgress();
}

//time function
function findTime(){
    timestamp = new Date().getMilliseconds();
    deltatime = timestamp - lasttime;
    lasttime = timestamp;
}