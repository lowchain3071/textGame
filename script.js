const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 640;
const CANVAS_HEIGHT = canvas.height = 360;
console.log(ctx);

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

window.addEventListener('keydown', e =>{
  
});

function animate(){

  
  requestAnimationFrame(animate);
}
animate();