const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 360;

//player stats
let health = 100;
let money = 20;
let energy = 100;

//messages
let bottomBarMessage = "Navigate Using Arrow Keys"
let optionA;
let optionB;
let optionC;
let optionD;

//option selection
let selectNumber = 0;
let selected = 1;

//game states
let state = "menu";

window.addEventListener('keydown', e => {
  switch(e.key){
    case 'ArrowUp' :
      selectNumber--;
      break;
    case 'w':
      selectNumber--;
      break;
    case 'ArrowLeft':
      selectNumber--;
      break;
    case 'a':
      selectNumber--;
      break;
    case 'ArrowDown':
      selectNumber++;
      break;
    case 's':
      selectNumber++;
      break;
    case 'ArrowRight': 
      selectNumber++;
      break;
    case 'd': 
      selectNumber++;
      break; 
    case 'x':
      selected++;
      break;
  }
});
started = false;

window.addEventListener('click', e => {
  console.log(e.x, e.y)
});

function animate(){

//data
  saveData();
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //menu and boards
  if(state === "menu"){
  ctx.font = 25 + 'px ' + 'Courier New';
  ctx.fillText("HAHA FUNNY RPG", 150, 150);
  optionA = "Load Game";
  optionB = "New Game";
  optionC = "Credits";
  optionD = "How to Play";
  if(selected % 2 === 0){
    if(selectNumber % 4 === 0){
      selected--;
      retrieveData();
      if(started === false){
        bottomBarMessage = "You haven't started yet, press X to go back";
        if(selected % 2 === 1) {
          selected = 0;
          selectNumber = 0;
          bottomBarMessage = "Navigate using arrow keys";
        }
      }
    }
    if(selectNumber % 4 === 2 && selected % 2 === 1){
      //new game
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

if(!state === "menu" && !state === "credits" && !state === "load game" && !state === "how to play"){
  ctx.font = 12 + 'px ' + 'Courier New';
  ctx.fillText("HEALTH: " + health, 150, 100);
  ctx.fillText("MONEY: " + money, 250, 100);
  ctx.fillText("ENERGY: "+ energy, 350, 100);
  ctx.font = 20 + 'px ' + 'Courier New';
  ctx.fillText(middleMessage, 110, 94);
  }

  //arrow pointer and selection
  if(selectNumber === -1) selectNumber = 3;
  ctx.fillRect(70, 165 + 30* (selectNumber % 4), 20, 20);

  //bottom bar message
  ctx.font = 14 + 'px ' + 'Courier New';
  ctx.fillText(bottomBarMessage, 104, 333);
  
  requestAnimationFrame(animate);
}
animate();

function saveData(){
  window.localStorage.setItem('money', money);
  window.localStorage.setItem('health', health);
  window.localStorage.setItem('energy', energy);
  window.localStorage.setItem('started', started);
  window.localStorage.setItem('state', state)
}
function retrieveData(){
  window.localStorage.getItem('money');
  window.localStorage.getItem('health');
  window.localStorage.getItem('energy');
  window.localStorage.getItem('started');
  window.localStorage.getItem('state');
}