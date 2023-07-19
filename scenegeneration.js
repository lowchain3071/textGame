export default function checkgeneration(state, forestoptions, clifftrail, town_option, generationArray, middleMessage, optionA, optionB, optionC, optionD, resetselection, selectNumber, selected, ctx, canvas){
  //spontaneous generation
  
  //forest living mechanism
  //forest scene spawn
  if(state = "random_forest_scene_generation"){
    forestoptions = ["explore mountain base", "enter spotted abandoned camp", "start camp setup", "go to forest exit", "enter cave enterance", "end"];
    generationArray = generatescene(1, forestoptions);
    middleMessage = "You venture further in to the forest."
    optionA = generationArray[1];
    optionB = "explore further in the forest";
    optionC = "gather food";
    optionD = "go hunting";
    if(selected % 2 == 1){
      if(selectNumber % 4 == 0){
        resetselection();
        switch(optionA){
          case "explore mountain base":
            state = "mountain base";
            break;
          case "enter spotted abandoned camp":
            state = "abandoned camp";
            break;
          case "start camp setup":
            state = "camp setup";
            break;
          case "go to forest exit":
            state = "forest exit";
            break;
          case "enter cave enterance":
            state = "cave enterance";
            break;
          default:
            console.log("ERROR: NO STATE DETECTED");
        }
      if(selectNumber % 4 == 1){
        energy -= Math.floor(Math.random() * 7);
        resetselection();
        state = "random_forest_scene_generation"
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
  }
  //camping
  while(state = "camp setup"){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    middleMessage = "You decided to set up a camp";
  }
  //food gathering
  //hunting
  //cliff mechanism
  if(state = "cliff_trail_spawn"){
    clifftrail = ["explore nearby mountain base", "zipline past cliff", "start camp setup", "explore cave enterance", "jump off cliff(SUICIDE)", "end"];
    generationArray = generatescene(3, clifftrail);
    middleMessage = "You walked further in the cliff";
    optionA = "go even further";
    optionB = generationArray[0];
    optionC = generationArray[1];
    optionD = "go back";
    if(selected % 2 == 1){
        resetselection();
        if(selectNumber % 4 == 0){
          resetselection();
            state = "cliff_trail_spawn";
        }
        if(selectNumber % 4 == 1){
          resetselection();
            switch(optionB){
              case "explore nearby mountain base":
                energy -= 2;
                state = "mountain base";
              case "zipline past cliff":
                if(energy < 10){
                  if(inventory.includes("zipline")){
                    state = "zipline_attempt";
                    break;
                  }else{
                    bottomBarMessage = "You don't have a zipline. Go to town if you can."
                    state = "cliff_trail_spawn";
                  }
                }else{
                  bottomBarMessage = "not enough energy to zipline";
                }
              case "start camp setup":
                state = "camp setup";
                break;
              case "explore cave enterance":
                energy -= 1.5;
                break;
              case "jump off cliff(SUICIDE)":
                state = "death";
                break;
            }
        }
        if(selectNumber % 4 == 2){
            resetselection();
            switch(optionC){
              case "explore nearby mountain base":
                energy -= 2;
                state = "mountain base";
              case "zipline past cliff":
                if(energy < 10){
                  if(inventory.includes("zipline")){
                    state = "zipline_attempt";
                    break;
                  }else{
                    bottomBarMessage = "You don't have a zipline. Go to town if you can."
                    state = "cliff_trail_spawn";
                  }
                }else{
                  bottomBarMessage = "not enough energy to zipline";
                }
              case "start camp setup":
                state = "camp setup";
                break;
              case "explore cave enterance":
                energy -= 1.5;
                break;
              case "jump off cliff(SUICIDE)":
                state = "death";
                break;
            }
        }
        if (selectNumber % 4 == 3) {
          resetselection();
          state = lastState;
        }
    }
  }
}

//scene generation functions
function generatescene(slots, array){
  let loopIndex = 0;
  let generatedNumber;
  let randomNumbers = [];
  let generatedOptions = [];
  while(loopIndex < slots){
    generatedNumber = Math.floor(Math.random() * (array.lastIndexOf("end") - 1));
    if(!randomNumbers.includes(generatedNumber)){
      randomNumbers.push(generatedNumber);
      loopIndex++;
      }
    }
    return generatedOptions;
  }