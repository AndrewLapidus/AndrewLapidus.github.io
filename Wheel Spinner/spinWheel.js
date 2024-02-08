const WHEEL_CANVAS = document.getElementById('wheelCanvas');
const NAMES_CONTAINER = document.getElementById('namesContainer');
const NAMES_CONTAINERX = document.getElementById('namesContainerX');
const CTX = WHEEL_CANVAS.getContext('2d');
let namesArr = [];
let spinning = false;
let rotationAngle = 0;
let speedRotate = 0.2;
let selectedSection = 0;
let NUM_SEGMENTS;
const CENTER_X = WHEEL_CANVAS.width /2;
const CENTER_Y = WHEEL_CANVAS.height /2;
const RADIUS = Math.min(CENTER_X, CENTER_Y) -1;
const POINTER_LEN = RADIUS *0.8;
function addName(param){

    let nameInput = document.getElementById('nameInput')
    let name = nameInput.value;
    if(typeof param !== 'undefined'){
        name = param
    }
    if(typeof name === 'string' && name.trim() !== ''){
        namesArr.push(name)
        console.log(`Name: ${name} added successfully.`);
        drawWheel();
    }else{
        console.log('Invalid name. Please do better.')
    }

}

function removeName(){

}

function loadNames(){
    let encodedInput = document.getElementById("importName");
    let encodedString = encodedInput.value;
    let encodedArray = encodedString.split(',');
    namesArr = 0;
    namesArr = encodedArray.map(encodedString => atob(encodedString));
    drawWheel(namesArr)
    
    
    

}

function exportNames(){
    NAMES_CONTAINER.innerHTML = '';
    let input = document.createElement('input');
    input.type='text';
    let encodedString = namesArr.map(str => btoa(str));
    input.value = encodedString
    let closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.addEventListener('click', () => NAMES_CONTAINER.innerHTML='');
    NAMES_CONTAINER.appendChild(input);
    NAMES_CONTAINER.appendChild(closeButton);

}

function displayNames(){
    NAMES_CONTAINER.innerHTML = '';
    for(let i=0; i< namesArr.length;i++){
        const INPUT = document.createElement('input');
        const REMOVE_BUTTON = document.createElement('button');
        INPUT.type = 'text';
        INPUT.value = namesArr[i];
        INPUT.addEventListener('input', (event) => updateName(i, event.target.value));
        
        REMOVE_BUTTON.textContent = 'X';
        REMOVE_BUTTON.addEventListener('click', () => removeNameX(i));

    
        NAMES_CONTAINER.appendChild(INPUT);
        NAMES_CONTAINER.appendChild(REMOVE_BUTTON);
    }

}

function removeDisplayNames(){
    NAMES_CONTAINER.innerHTML = '';
    drawWheel();
}

function updateName(index, updatedName){
    namesArr[index] = updatedName;
    console.log(`Name: ${updatedName} has been updated`)
}


function removeNameX(index) {
    const removedName = namesArr.splice(index, 1)[0];
    console.log(`Name removed: ${removedName}`);
    displayNames()
}

function drawWheel(){
    CTX.clearRect(0,0, WHEEL_CANVAS.width, WHEEL_CANVAS.height);

    
    let NUM_SEGMENTS = namesArr.length;
    
    const ANGLE_PER_SEG = (2*Math.PI) / NUM_SEGMENTS;


    //litterally realized that after working on this, this is pointless 
    CTX.beginPath();
    CTX.arc(CENTER_X,CENTER_Y,RADIUS,0,2*Math.PI);
    CTX.fillStyle = 'lightblue';
    CTX.fill();
    CTX.lineWidth = 2;
    CTX.strokeStyle = 'blue';
    CTX.stroke();

    for(let i=0; i<NUM_SEGMENTS; i++){
        const START_ANGLE = i *ANGLE_PER_SEG + rotationAngle;
        const END_ANGLE = (i+1) * ANGLE_PER_SEG + rotationAngle;

        CTX.beginPath();
        CTX.moveTo(CENTER_X,CENTER_Y);
        CTX.arc(CENTER_X,CENTER_Y,RADIUS,START_ANGLE,END_ANGLE);
        CTX.fillStyle = i%2 === 0 ? 'lightgreen' : 'lightyellow';
        CTX.fill();
        CTX.lineWidth=2;
        CTX.strokeStyle = 'black';
        CTX.stroke();

        const SEG_CENTER_ANGLE = (START_ANGLE + END_ANGLE) /2;
        const TEXT_X = CENTER_X + RADIUS * 0.5 * Math.cos(SEG_CENTER_ANGLE);
        const TEXT_Y = CENTER_Y + RADIUS * 0.5 * Math.sin(SEG_CENTER_ANGLE);

        CTX.save();
        CTX.translate(TEXT_X,TEXT_Y);
        CTX.rotate(SEG_CENTER_ANGLE);
        CTX.fillStyle = 'black';
        CTX.font = '20px Arial';
        
        CTX.fillText(namesArr[i], 0,0);

        CTX.restore();

        const ARROW_START_ANGLE = selectedSection * ANGLE_PER_SEG;
        const ARROW_END_ANGLE = (selectedSection + 1) * ANGLE_PER_SEG;
        
        const POINTER_WID = 20;
        const POINTER_X = CENTER_X + POINTER_LEN *Math.cos((ARROW_START_ANGLE+ARROW_END_ANGLE)/2);
        const POINTER_Y = CENTER_Y + POINTER_LEN *Math.sin((ARROW_START_ANGLE+ARROW_END_ANGLE)/2) ;

        // CTX.beginPath();
        // CTX.moveTo(CENTER_X+RADIUS ,CENTER_Y);
        // CTX.lineTo(POINTER_X+RADIUS+20,POINTER_Y);
        // CTX.lineWidth =10;
        // CTX.strokeStyle = 'red';
        // CTX.stroke();

        if(i === 11){
            let temp;
        }
        
        CTX.beginPath();
        CTX.moveTo(POINTER_X +RADIUS+ POINTER_WID * Math.cos(rotationAngle + Math.PI / 2), POINTER_Y + POINTER_WID * Math.sin(rotationAngle + Math.PI / 2));
        CTX.lineTo(POINTER_X, POINTER_Y);
        CTX.lineTo(POINTER_X+RADIUS + POINTER_WID * Math.cos(rotationAngle - Math.PI / 2), POINTER_Y + POINTER_WID * Math.sin(rotationAngle - Math.PI / 2));
        CTX.fillStyle = 'red';
        CTX.fill();




        
    }
    let temp='testing';
    
}

function getSelectedName() {
    if (namesArr.length > 0 && selectedSection >= 0 && selectedSection < namesArr.length) {
        return namesArr[selectedSection];
    }
    return null; // Return null or handle the case when no name is selected
}

function spinWheel(){
    if(!spinning){
        spinning=true;
        rotateWheel();
        
    }

}

function rotateWheel(){
    

    
    rotationAngle += speedRotate;
    console.log(speedRotate);
    drawWheel();

    
    if(spinning){
        requestAnimationFrame(rotateWheel);
    }
}

async function stopWheel() {
    while (speedRotate > 0.01) {
        speedRotate -= 0.03;
        await sleep(250);
    }
    spinning = false;
    speedRotate = 0.2;

    // CTX.clearRect(0, 0, WHEEL_CANVAS.width, WHEEL_CANVAS.height);

    const arrowX = 5;
    const arrowY = 5;

    // Check which person's section contains the arrow's coordinates
    let selectedPerson = null;
    let NUM_SEGMENTS = namesArr.length;
    let ANGLE_PER_SEG = (2*Math.PI) / NUM_SEGMENTS;
    const remainderFractionPi = (rotationAngle % (2*Math.PI));//(2*Math.PI);
    const segmantNumber = remainderFractionPi/ANGLE_PER_SEG;
  
    
    if (selectedPerson !== null) {
        console.log(`Wheel stopped on: ${selectedPerson}`);
    } else {
        console.log('Pointer did not land on any person.');
    }
    selectedSection = 0;
}

function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
addName('1');
addName('2');
addName('3');
addName('4');
addName('5');
addName('6');
drawWheel();