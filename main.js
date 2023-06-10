//variables for viewport dimensions
let vWidth = 0;
let vHeight = 0;


//variables for random coordinates on viewport
let randX = 0;
let randY = 0;


//array for holding target objects 
let dataHold = [];




//variables for timer-case div position on the viewport
let timerEl = document.querySelector('.timer-case').getBoundingClientRect();
let timerWidth = timerEl.width;
let timerHeight = timerEl.height;
let timerLeft = timerEl.left;
let timerTop = timerEl.top;


//Get viewport dimensions after the DOM has loaded
document.addEventListener("DOMContentLoaded", () => {
    vWidth = document.getElementById("squareGen").clientWidth;
    vHeight = document.getElementById("squareGen").clientHeight;       
    //console.log(vWidth,vHeight)
})


//generates random location on the viewport extruding the timer-case div dimensions
function generateLocation(){


    let distance = 50; //minimum distance from timer-case div
    let attemptsMax = 10;
    let attempts = 0;


    //generates a random position and checks if it's legal, until the attempts run out
    while(attempts < attemptsMax){
        

        //generates random (X,Y) within viewport dimensions
        randX = Math.floor(Math.random() * vWidth);
        randY = Math.floor(Math.random() * vHeight);
        //console.log("attempts: ",attempts,", randX: ",randX,", randY: ",randY,", vWidth: ",vWidth,", vHeight: ",vHeight);


        //checks if (X,Y) coordinates are within legal range
        if(randX >= timerLeft - distance - timerWidth &&
            randX <= timerLeft + distance + timerWidth &&
            randY >= timerTop - distance - timerHeight &&
            randY <= timerTop + distance + timerHeight
        ){
            attempts++;
            continue;
        }


        return [randX,randY]
    }


    return "Failed to find a location to spawn the items"
}

let w_count = 0;
let l_count = 0;
//loads the targets onto viewport
function load(){  

    //set cursor to magnifying glass
    document.querySelector('canvas').style.cursor = "zoom-in"

    let winning_no = diff[1];
    let loosing_no = diff[2];
    w_count = winning_no;
    l_count = loosing_no;
    for(let i = 0; i < winning_no; i++){
        let wTarg = new wTarget();
        dataHold.push(wTarg);
    }
    for(let j = 0; j < loosing_no; j++){
        let lTarg = new lTarget()
        dataHold.push(lTarg);
    }


    /*     Uncomment to console.log coordinates of targets
    console.log(`wTarg coordinates X,Y(${wTarg.locationX},${wTarg.locationY})`)
    console.log(`lTarg coordinates X,Y(${lTarg.locationX},${lTarg.locationY})`)
    console.log(`lTarg1 coordinates X,Y(${lTarg1.locationX},${lTarg1.locationY})`)
    console.log(`lTarg2 coordinates X,Y(${lTarg2.locationX},${lTarg2.locationY})`)
    console.log(`lTarg3 coordinates X,Y(${lTarg3.locationX},${lTarg3.locationY})`)
    console.log(`lTarg4 coordinates X,Y(${lTarg4.locationX},${lTarg4.locationY})`)
    */  


    //store coordinates of tragets
    console.log(dataHold);


    //cycle through dataHold array 
    for(prop of Object.entries(dataHold)){


        //generate (X,Y) coords
        let genLoc = generateLocation();


        //assign (X,Y) values to xLoc and yLoc variables
        let xLoc = genLoc[0];
        let yLoc = genLoc[1];


        //run object's method to set it's coordinates
        prop[1].setLocation(xLoc,yLoc);
    }

    //run functions
    spawnObj();
    findTarget();
}


//creates a new div and img element for each dataHold object
function spawnObj(){

    //iterates through objects of dataHold array
    for(let i = 0; i < dataHold.length; i++){
        

        //declare new div and img elements
        let div = document.createElement('div');
        let img = document.createElement('img');


        //assign styling properties to img element
        img.setAttribute("class","pic");
        img.src = dataHold[i].image;
        img.style.width = `100%`;
        img.style.height = `100%`;
        img.style.visibility = "hidden";


        //assign styling properties to div element
        div.style.backgroundColor = dataHold[i].color;
        div.style.left = `${dataHold[i].locationX}px`;
        div.style.top = `${dataHold[i].locationY}px`;
        console.log(diff[0])
        div.style.width = diff[0];
        div.style.height = diff[0];
        div.style.position = "absolute";
        div.setAttribute("id","squareItem");
        div.setAttribute("class",dataHold[i].name);


        //appends img element as a child of div element, then appends div element as a child of "squareGen" div
        div.appendChild(img);
        document.getElementById("squareGen").appendChild(div); 
    }
}


//reveals targets on mouseover event and stop the timer when the winning target is found
function findTarget(){
    let count = 0;

    //selects all generated targets and adds an event listener which is triggered on mouseover event
    document.querySelectorAll("#squareItem").forEach(item =>{
        let isFound = false;
        item.addEventListener("mouseover", () => {


            //winning target, reveal on mouseover event and stop the timer
            if(item.className == "wTarget" && !isFound){
                item.children[0].style.visibility = "visible";
                count++
                console.log(count," green targets found out of ",w_count)
                isFound = true;
                if(count < w_count){
                    return
                }else{
                    
                    stop();
                    document.getElementById('restBtn').disabled = false;
                    //document.getElementById("restBtn").style.visibility = "visible"
                    document.querySelector('#restBtn').classList.remove("fade-out-btn")
                    document.querySelector('#restBtn').classList.add("fade-in-btn");
                
                }
            }
            

            //loosing target, reveal on mouseover event
            else{
                item.children[0].style.visibility = "visible"
            }
        })
    })
}



//super function, triggered on button click event
function launchGame(){
    
    document.getElementById('restBtn').disabled = true;
    //document.getElementById('restBtn').style.visibility = "hidden";
    let input1 = document.getElementById("winning").value;
    let input2 = document.getElementById("loosing").value;

    if(document.querySelector('input[name="difficulty"]:checked') == undefined ||
        input1 == undefined || input2 == undefined){
        console.log("please fill in the required fields !")

        return;
    }
    
    document.getElementById("timer-case-id").style.visibility = "visible";

    //adds a class to .container element, fades out on button click, disables button so no more targets can be spawned
    document.querySelector('.container-fluid').classList.add("fade-out");
    
    document.getElementById('myBtn').disabled = true; //after fixing the surrounding area around the timer-case div, spam play to spawn in many targets and see the calculated borders for their spawns
    
    //runs functions
    grabInfo();
    start();
    load();
    generateLocation();
}

let diff = [];

function grabInfo(){
    let difficultyOption = document.querySelector('input[name="difficulty"]:checked')
    let winning_count = document.getElementById("winning");
    let loosing_count = document.getElementById("loosing");
    console.log(difficultyOption.id)
    if(difficultyOption.id == "easy"){
        diff.push('100px')
    }
    else if(difficultyOption.id == "medium"){
        diff.push('50px')
    }
    else if(difficultyOption.id == "hard"){
        diff.push('20px')
    }  
    diff.push(winning_count.value, loosing_count.value)
    console.log(diff)
}

//removes old targets and resets the dataHold array of target objects
function removeTargets(){
    for(let i = 0; i < dataHold.length; i++){
        
        document.getElementById("squareItem").remove();
    }

    dataHold = []
}



//restarts the game
function restartGame(){

    document.getElementById('restBtn').disabled = true;
    document.querySelector('#restBtn').classList.remove("fade-in-btn")
    document.querySelector('#restBtn').classList.add("fade-out-btn");
    removeTargets()
    load();
    reset();
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}


let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");

canvas.width = canvas.clientWidth * 2;
canvas.height = canvas.clientHeight * 2;


let lineStartX; 
let lineStartY;

let posX = 0 
let posY = 0


canvas.addEventListener("mousemove",mouseOver);
function mouseOver(event){

    let rect = canvas.getBoundingClientRect();
    let posX = ((event.clientX - rect.left) * canvas.width) / rect.width;
    let posY = ((event.clientY - rect.top) * canvas.height) / rect.height;

    //console.log(posX,posY)

    ctx.beginPath();

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#c0392b';

    ctx.moveTo(lineStartX,lineStartY);
    ctx.lineTo(posX,posY);
    ctx.stroke();


    lineStartX = posX;
    lineStartY = posY;
    //console.log(lineStartX,lineStartY,"mouse pos")
}



