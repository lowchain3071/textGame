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
let optionC = "credits";
let optionD = null;

//option selection
let selectNumber = 1;
let selected = false;

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

window.addEventListener('click', e =>{
  
});

function animate(){
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.font = 50 + 'px' + 'Hevetica';
  
  requestAnimationFrame(animate);
}
animate();