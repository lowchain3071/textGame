if ('indexedDB' in window) {
  console.log("This browser doesn't support IndexedDB");
}

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 360;

//player stats
let health;
let inventory;
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
  if(keys.includes('x')){
    switchSelection();
    keys.splice('x');
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
      if(started === false){
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
        energy -= 2;
        state = "cliff";
      }
    }
    
  }
 
  ctx.font = 18 + 'px ' + 'Courier New';
  ctx.fillText(optionA, 106, 180);
  ctx.fillText(optionB, 106, 210);
  ctx.fillText(optionC, 106, 240);
  ctx.fillText(optionD, 106, 270);

  ctx.font = 14 + 'px ' + 'Courier New';
  ctx.fillText(state, 0, 340);

  if(state === "crossroads" || state === "new game" || state === "cliff"){
  ctx.font = 12 + 'px ' + 'Courier New';
  ctx.fillText("HEALTH: " + health, 150, 100);
  ctx.fillText("MONEY: " + money, 250, 100);
  ctx.fillText("ENERGY: "+ energy, 390, 100);
  ctx.font = 20 + 'px ' + 'Courier New';
  ctx.fillText(middleMessage, 180, 155);

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
  window.localStorage.setItem('inventory', inventory);
  window.localStorage.setItem('money', money);
  window.localStorage.setItem('started', started);
  window.localStorage.setItem('health', health);
  window.localStorage.setItem('energy', energy);
   
  requestAnimationFrame(animate);
}
animate();