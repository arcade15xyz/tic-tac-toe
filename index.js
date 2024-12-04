const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.game-info');
const newGameBtn = document.querySelector('.btn');

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,5,8],
    [0,3,6],
    [0,4,8],
    [2,4,6]
];


//lets create a funcition to initailize the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI needs to be empty
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        //remove green color
        box.classList = `box box${index+1}`;

    });
    newGameBtn.classList.remove('active');
    gameInfo.innerText = `Current Player -${currentPlayer}`;
}

initGame();

function swapTurn(){
    if(currentPlayer ==="X"){
        currentPlayer ="O";
    }
    else{
        currentPlayer = "X";
    }
    //UI update
    gameInfo.innerText = `Current Player -${currentPlayer}`;
}

function checkGameOver(){

    let answer = "";
    winningPosition.forEach((position)=>{

        //all 3 boxes should't be non empty and exactly dame in value
        if((gameGrid[position[0]]!=="" || gameGrid[position[1]]!=="" || gameGrid[position[2]]!=="") && (gameGrid[position[0]] === gameGrid[position[1]])&&(gameGrid[position[1]] === gameGrid[position[2]])){
            //check if winner is X
            if(gameGrid[position[0]]==="X")
                answer="X";
            else
                answer = "O";

            //disable pointer event
            boxes.forEach((box)=>{
                box.style.pointerEvents ="none";
            })
            //now we know X/O is a winner
            boxes[position[0]].classList.add('win');
            boxes[position[1]].classList.add('win');
            boxes[position[2]].classList.add('win');
        }
    })
    if(answer!==""){
        gameInfo.innerText=`Winner Player is ${answer}`;
        newGameBtn.classList.add('active');
        return;
    }

    // when there is a tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box!==""){
            fillCount++;
        }
    });

    if(fillCount ===9){
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    }
    
}



function handleClick(index){
    if(gameGrid[index]===""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        //swap turn
        swapTurn();
        //check if won
        checkGameOver();
    }
}

boxes.forEach((boxes,index) => {
    boxes.addEventListener('click',()=>{
        handleClick(index);
    });
});


newGameBtn.addEventListener('click',initGame);
