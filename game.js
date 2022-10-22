const grid = document.getElementById('grid');
const gridWidth = 700;
const gridHeight = 400
const blockWidth = 40;
const blockHeight = 45;
const userWidth = 100;
const userHeight = 25;
const UserStart = [300,20];
const fierBallStart =[320,50];
let fierBallCurrontPossctin = fierBallStart;
let UserCurrentPosition = UserStart;
let xDrection =2;
let yDrection =2;
const FierBalldiameter = 40;
let timeOutId;
let currentPosition= UserCurrentPosition;
let boomCount =0;
class Block{
    constructor(xAxis,yAxis){
         this.bottomLeft = [xAxis,yAxis];
         this.bottomRight = [xAxis+blockWidth,yAxis];
         this.topLeft = [xAxis,yAxis+blockHeight];
         this.topRight = [xAxis+blockWidth,yAxis+blockHeight];
    }
}

const blocks= [
    new Block(40,330),
    new Block(150,330),
    new Block(260,330),
    new Block(370,330),
    new Block(480,330),
    new Block(580,330),


    new Block(95,265),
    new Block(205,265),
    new Block(320,265),
    new Block(435,265),
    new Block(542,265),

    
    new Block(40,210),
    new Block(150,210),
    new Block(260,210),
    new Block(370,210),
    new Block(480,210),
    new Block(580,210),
];

// add ghost
function addBlocks(){
    for (let i =0;i<blocks.length;i++){
    const block = document.createElement('div');
    block.classList.add('block');
    block.style.left=blocks[i].bottomLeft[0]+'px';
    block.style.bottom=blocks[i].bottomLeft[1]+'px';
    grid.appendChild(block); 
    }

}
addBlocks();

// add user

const user = document.createElement('div');
user.classList.add('user');
drowUser();
grid.appendChild(user);

//move user

function  moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(UserCurrentPosition[0] > 0){
            UserCurrentPosition[0] -= 10;
            drowUser();
        }break;
        case 'ArrowRight':
            if(UserCurrentPosition[0] < (gridWidth-userWidth)-10){
                UserCurrentPosition[0] += 10;
                drowUser();
            }
    }
}

// drow user
function drowUser(){
    user.style.left = UserCurrentPosition[0]+'px';
    user.style.bottom = UserCurrentPosition[1]+'px';
}

document.addEventListener('keydown',moveUser);

//drow fierBall
function drowFierBall(){
    fierBall.style.left = fierBallCurrontPossctin[0]+'px';
    fierBall.style.bottom = fierBallCurrontPossctin[1]+'px';
}

   //add ball
    const fierBall= document.createElement('div');
    fierBall.classList.add('fireBall');
   // console.log(fierBall);
    drowFierBall();
    grid.appendChild(fierBall);

// *************************************************************************************************
                                                                                                //**
 timeOutId = setInterval(moveFierBall,30);                                                    //**
          //  console.log(timeOutId);                                                                                    //**
 // *************************************************************************************************
//move foerball
function moveFierBall(){
   fierBallCurrontPossctin[0] += xDrection;
   fierBallCurrontPossctin[1] += yDrection;
   drowFierBall();
   checkForCollisions();
//check is out
if(fierBallCurrontPossctin[1] <= 0){
    clearInterval(timeOutId);
    document.querySelector('span').innerHTML=`<h3>oops</h3><h1>You are Lost..!</h1>`;
}


}

function checkForCollisions(){
    //const allblocks1 = Array.from(document.querySelectorAll('.block'));
    for(let i = 0;i<blocks.length;i++){
        if(fierBallCurrontPossctin[0] > blocks[i].bottomLeft[0] && fierBallCurrontPossctin[0] < blocks[i].bottomRight[0] && (fierBallCurrontPossctin[1]+blockHeight)>blocks[i].bottomLeft[1] && fierBallCurrontPossctin[1] < blocks[i].topLeft[1]){
            const allblocks = Array.from(document.querySelectorAll('.block'));
            allblocks[i].classList.remove('block');
            allblocks[i].classList.add('boom');
           setTimeout(allblocks1,400);
           boomCount++;
            blocks.splice(i,1);
            changeDirection();
            if(boomCount == blocks.length){
                document.querySelector('span').innerHTML=`<h3>congratulations</h3><h1>You Are Win..!..!</h1>`;
            }
        }
    }
      function allblocks1(){
         const boom = Array.from(document.querySelectorAll('.boom'));
         for(let i=0;i<boom.length;i++){
            boom[i].classList.remove('boom');
         }
      }
 
    //check user collisions

if((fierBallCurrontPossctin[0] > UserCurrentPosition[0] && fierBallCurrontPossctin[0] < UserCurrentPosition[0] + userWidth) && (fierBallCurrontPossctin[1] >UserCurrentPosition[1] && fierBallCurrontPossctin[1]<UserCurrentPosition[1]+userHeight)){
    changeDirection();
  }
//console.log(UserCurrentPosition[0]);

//check for wall collisions

if(fierBallCurrontPossctin[1] >= gridHeight-FierBalldiameter || fierBallCurrontPossctin[0] >= gridWidth-FierBalldiameter || fierBallCurrontPossctin[0] <=0){
    changeDirection();
    
}
}
//changeDirection
function changeDirection(){
    if(xDrection === 2 && yDrection ===2){
        yDrection = -2;
        return
    }
    if(xDrection ===2 && yDrection ===-2){
        xDrection = -2;
        return
    }
    if(xDrection === -2 && yDrection === -2){
        yDrection = 2;
        return
    }
    if(xDrection  ===-2 && yDrection ===2){
        xDrection = 2;
        return
    } 
}