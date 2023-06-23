const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 360;

//player stats
let health = 100;
let money = 20;
let energy = 100;

//messages
let bottomBarMessage = "Navigate Using Arrow Keys";
let middleMessage = "HAHA FUNNY RPG"
let optionA = "Load Game";
let optionB = "New Game";
let optionC = "Credits";
let optionD = "How to Play";

//option selection
let selectNumber = 0;
let selected = false;

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
      selected = true;
      break;
  }
});

window.addEventListener('click', e => {
  console.log(e.x, e.y)
});

function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //menu and boards
  if(state === "menu"){
  ctx.font = 25 + 'px ' + 'Courier New';
  ctx.fillText(middleMessage, 150, 150);
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

if(state === "menu"){
optionA = "load game"
  if(selected === true){
    if(selectNumber % 4 === 1){
      state = "load game";
    }
  }
}
  
  requestAnimationFrame(animate);
}
animate();