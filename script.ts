const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 360;

//player stats
let health;
let inventory = [];
let energy;
let money;

//messages
let bottomBarMessage = "Navigate Using Arrow Keys";
let middleMessage;
let optionA;
let optionB;
let optionC;
let optionD;


//option selection
let selectNumber = 0;
let selected = 0; //binary mode: 0 equals false, 1 equals true. remember to use modulus
function switchSelection(){selected++};

//game states
let state = "menu";
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
    if(state != "inventory" && state != "menu" ){state = "inventory"; keys.splice(" ")}else{console.log("broken system"); keys.splice(" ")}
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
      selected = 0;
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
        selectNumber = 0;
        energy -= 2;
        state = "cliff";
      }
      if(selectNumber % 4 == 1){
        selectNumber = 0;
        selected = 0;
        energy -= 6;
        state = "village"
      }
      if(selectNumber % 4 == 2){
        selectNumber = 0;
        selected = 0;
        energy -= 3;
        state = "forest"
      }
      if(selectNumber % 4 == 3){
        selectNumber = 0;
        selected = 0;
        state = "menu";
      }
    }
  }

  if(state == "village"){
    middleMessage = "Welcome to the village square";
    optionA = "Get food";
    optionB = "go to trainer";
    optionC = "add to inventory";
    optionD = "stay at inn"
  }
  if(state == "forest"){
    optionA = "venture further in the forest";
    optionB = "set up a camp";
    optionC = "gather food";
    optionD = "go hunting";
  }
  
  
  if(state == "cliff"){
    middleMessage = "You approached a cliff. Now what do you do?"
    optionA = "scale the cliff";
    optionB = "walk around it";
    optionC = "attempt to zipline across";
    optionD = "head back to crossroads"
  } 

  while(state == "inventory"){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = 30 + "px " + "Courier New";
    ctx.textAlign = "Center";
    ctx.fillText("inventory", 50, 50);
  }
 
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

  ctx.font = 18 + 'px ' + 'Courier New';
  ctx.fillText(optionA, 106, 180);
  ctx.fillText(optionB, 106, 210);
  ctx.fillText(optionC, 106, 240);
  ctx.fillText(optionD, 106, 270);
  }

  //arrow pointer and selection
  if(selectNumber === -1) selectNumber = 3;
  ctx.fillRect(70, 165 + 30* (selectNumber % 4), 20, 20);

  //bottom bar message
  ctx.font = 14 + 'px ' + 'Courier New';
  ctx.fillText(bottomBarMessage, 104, 333);


  gameFrame++;
   
  requestAnimationFrame(animate);
}
animate();

function saveProgress(){window.localStorage.setItem('inventory', inventory);
  window.localStorage.setItem('money', money);
  window.localStorage.setItem('started', started);
  window.localStorage.setItem('health', health);
  window.localStorage.setItem('energy', energy);
}