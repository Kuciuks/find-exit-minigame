//declare the timer element
const timer = document.getElementById("timer");


//declare the time variables
let miliseconds = 0;

let milDisplay = 0; //only to display on screen, value is being reset to 0


//declare control interval
let interval = null


//timer function
function runTime(){
    miliseconds++;
    milDisplay++;

    let secs = Math.floor(miliseconds / 100) % 60;
    let mins = Math.floor(miliseconds / 100 / 60);


    //update the milliseconds on screen
    if(milDisplay === 100) {
        milDisplay = 0;
    }


    //ads additional 0 of secs and mins are less than 10, formating
    if(secs < 10) secs = "0" + secs;
    if(mins < 10) mins = "0" + mins;


    //updates timer div inner text with corresponding values
    timer.innerText = `${mins}:${secs}:${milDisplay}`
}


//timer start function
function start(){
    interval = setInterval(runTime, 10)
}


//timer stop function
function stop(){
    clearInterval(interval);
    interval = null
}


//reset timer
function reset(){
    milDisplay = 0;
    miliseconds = 0;
    interval = setInterval(runTime, 10)
}