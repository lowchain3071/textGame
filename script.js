const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 640;
const CANVAS_HEIGHT = canvas.height = 360;

//player stats
let health = 100;
let money = 20;
let energy = 100;

//messages
let bottomBarMessage = "Navigate Using Arrow Keys";
let middleMessage = "HAHA FUNNY RPG"
let optionA = "Load Game";
let optionB = "New Game"
let optionC = "Credits";
let optionD = "How to Play";

//option selection
let selectNumber = 0;
let selected = false;
let pointer = new Image();
pointer.src = "pointer.draw";

//game states
let state = "menu";

window.addEventListener('keydown', e =>{
  switch(e.key){
    case 'ArrowUp' :
      selectNumber--;
      break;
    case 'ArrowLeft':
      selectNumber--;
      break;
    case 'ArrowDown':
      selectNumber++;
      break;
    case 'ArrowRight': 
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
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  //menu and boards
  if(state === "menu"){
  ctx.font = 25 + 'px ' + 'Courier New';
  ctx.fillText(middleMessage, CANVAS_WIDTH/2-170, 150);
  }
 
  ctx.font = 18 + 'px ' + 'Courier New';
  ctx.fillText(optionA, 106, 180);
  ctx.fillText(optionB, 106, 210);
  ctx.fillText(optionC, 106, 240);
  ctx.fillText(optionD, 106, 270);

if(!state === "menu"){
  ctx.font = 12 + 'px ' + 'Courier New';
  ctx.fillText("HEALTH: " + health, 150, 100);
  ctx.fillText("MONEY: " + money, 250, 100);
  ctx.fillText("ENERGY: "+ energy, 350, 100);
  }

  //arrow pointer and selection
  ctx.fillRect(70, 165 + 30* (selectNumber % 4), 20, 20);
    
  requestAnimationFrame(animate);
}
animate();