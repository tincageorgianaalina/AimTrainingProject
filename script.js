const start = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('.time-list');
const board = document.querySelector('#board');
const timer = document.querySelector('#time');
let interval =null;
let time = 0;
let score = 0;

const colorsList = ['#c90076', '#12f0c5', '#f9f80c', '#53f90c', '#f90cf7', '#db9424', '#db24d9'];

start.addEventListener('click', () => {
    screens[0].classList.add('up');
});

timeList.addEventListener('click', () => {
    if(event.target.classList.contains('time-btn')){        
        time = parseInt(event.target.getAttribute('data-time'));
        console.log(time);
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')){
        score++;
        event.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    interval = setInterval(decreaseTime, 1000); 
    createRandomCircle();
    setTimer(time);
}

function finishGame(){
    clearInterval(interval);
    board.innerHTML = `<h1>Score: <span class ='primary'>${score}</span></h1>`;
    timer.parentNode.innerHTML = '';
}

function decreaseTime(){
    if(time == 0){
        finishGame();
    }else{
        --time;
        setTimer(time)
    }
}

function setTimer(value){
    if(value < 10){
        timer.innerHTML = `00:0${value}`;
    }else {
        timer.innerHTML = `00:${value}`;
    }
}

function createRandomCircle(){
    const circle = document.createElement('div'); 
    const size = getRandomNumber(10,50);
    const {width, height} = board.getBoundingClientRect();    
    console.log(width);    
    console.log(height);  
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);
    circle.classList.add('circle');
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.bottom = `${x}px`;
    circle.style.backgroundColor = getRandomColor();
    console.log(circle.style.color);
  
    board.append(circle);  
}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max-min) + min);
}

function getRandomColor(){
    const index = Math.floor(Math.random() * colorsList.length); 
    return colorsList[index];
}