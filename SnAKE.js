let inputDir={x:0,y:0};
let foodSound=new Audio('eat.wav')
// let gameOverSound=new Audio('f.mp3')
let moveSound=new Audio('audioturn.mp3')
let musicSound=new Audio('GamingZone.mp3')
let box=document.querySelector('.box');
let speed=6;
let lastPaintTime=0;
let score=0;
let scoreBox=document.getElementById('scoreBox');
let snakeArray=[
    {x:13,y:15}
]
food={x:3,y:12}



function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime);
    if((ctime-lastPaintTime)/1000<1/speed){
      return;
    }
    lastPaintTime=ctime;
    gameEngine();
}
function isCollide(snake){
    for (let index = 1; index < snakeArray.length; index++) {
        if(snake[0].x===snake[index].x&&snake[0].y===snake[index].y){   
         return true;
        }
    }
    if(snake[0].x<=0||snake[0].x>=19||snake[0].y<=0||snake[0].y>=19){
        return true;
    }
    // return false;
}
function gameEngine(){
    //  updating snake array and food
      if(isCollide(snakeArray)){
    //    gameOverSound.play();
       musicSound.pause();3
       inputDir={x:0,y:0};
       alert("Game over press any key to continue");
       snakeArray=[{x:13,y:15}];
    //    musicSound.play();
    scoreBox.innerHTML="score:"+0;
      }
    //   if snake eat the food and increment score and regenerate the food
          if(snakeArray[0].x==food.x&&snakeArray[0].y==food.y){
            score+=1;
            scoreBox.innerHTML="score:"+score;
            foodSound.play();
            let a=2;
            let b=16;
            snakeArray.unshift({x:snakeArray[0].x+inputDir.x,y: snakeArray[0].y+inputDir.y});
            food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
          }

          //moving the snake
          for (let index = snakeArray.length-2; index >=0; index--) {
            snakeArray[index+1]={...snakeArray[index]};
            
          }
          snakeArray[0].x+=inputDir.x;
          snakeArray[0].y+=inputDir.y;




    // display the snake
     box.innerHTML="";
     snakeArray.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
            
        box.appendChild(snakeElement);
     })

    //  display the food
        foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        box.appendChild(foodElement);
}





window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{

    inputDir={x:0,y:1};
    moveSound.play();
    musicSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrayUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrayDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrayLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrayRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})


