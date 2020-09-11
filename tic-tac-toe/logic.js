
//global variables

let playerOne, playerTwo;
let aux;
let attempsX=[];
let attempsY=[];


const   displayPlayer = document.createElement("h2"),
        container = document.getElementById("container");

        displayPlayer.classList.add("displayPlayer");
        container.appendChild(displayPlayer);

// the player constructor 

const playerConstructor = (name, option, status) => {
    return { name, option, status};
}

// an object with all the tic-tac-toe cells

const gameBoard = (() => {  
    let myArray=[
            document.getElementById("cell0"),
            document.getElementById("cell1"),
            document.getElementById("cell2"),
            document.getElementById("cell3"),
            document.getElementById("cell4"),
            document.getElementById("cell5"),
            document.getElementById("cell6"),
            document.getElementById("cell7"),
            document.getElementById("cell8")];
    let copy=[
            document.getElementById("cell0"),
            document.getElementById("cell1"),
            document.getElementById("cell2"),
            document.getElementById("cell3"),
            document.getElementById("cell4"),
            document.getElementById("cell5"),
            document.getElementById("cell6"),
            document.getElementById("cell7"),
            document.getElementById("cell8")];
    return {myArray, copy};
})();

//Contain some functions to control the flow game

const flowGame = (() => {
    let plays=["012","048","036","147","258","345","678","246"];

    return{
        PlayerSelected: function(count){
            if (count % 2 === 0){
                return true;
            }
            else{
                return false;
            }
        },
        Compare: function(attemps){
            let aux=[],win=[];
            let count=1;

            for (i=0; i <= gameBoard.myArray.length-1; i++){
                if (gameBoard.myArray[i] === ""){
                    count++;
                }
            }
                for (i=0; i<=(plays.length-1); i++){
                    for (j=0; j<=(plays[i].length-1); j++){
                        if (attemps.includes(plays[i].charAt(j))){                       
                            aux[j]=true;
                        }
                        else {
                            aux [j]=false;
                        }
                    }               
                    if (aux[0] && aux[1] && aux [2]){
                        win = Array.from(plays[i]);
                        gameBoard.copy[win[0]].style.color="cornflowerblue";
                        gameBoard.copy[win[1]].style.color="cornflowerblue";
                        gameBoard.copy[win[2]].style.color="cornflowerblue";
                        return true;   
                    } 
                    else if(count === gameBoard.myArray.length){
                        return false;
                    }       
                    else {
                        aux=[];
                    }
                }
            
        },
        Blockoption: function(index){
            gameBoard.myArray[index]="";
        },
        replay: function(){
            let restart = document.getElementById("startBtn");

            gameBoard.myArray=[null];
            plays=[null];

            restart.setAttribute("value", "Re-Start?");
            restart.setAttribute("onclick", "document.location.href =''");
        } 
    };
})();

// Check if the players are empty and if they are'n, create objects with them. Also displays the gameBoard

function activeGameBoard(){
    const active = document.getElementById("gameBoard");

    playerOne = document.getElementById("player1").value;
    playerTwo = document.getElementById("player2").value;

    if (playerOne === "" || playerTwo === ""){
        alert("Enter players!");
    }
    else{

        active.classList.add("active");

        playerOne = playerConstructor(playerOne,"X",null),
        playerTwo = playerConstructor(playerTwo,"O",null);

        aux=playerOne.name+"'s turn";
        displayPlayer.textContent= aux;    
    }   
}   

// Render X or O on cells and display the player's turn

function render(index, flow, status){
    if (flow === true){
        gameBoard.myArray[index].textContent="X";
        if (status){
            aux = playerOne.name+" Wins!";  
            displayPlayer.classList.add("winner");
        }
        else if(status === false){
            aux = "It's a Tie!";  
            displayPlayer.classList.add("winner");
        }
        else {
            aux = playerTwo.name+"'s turn";  
        }
        displayPlayer.textContent = aux;
    }
    if (flow === false){
        gameBoard.myArray[index].textContent="0";
        if (status === true){
            aux = playerTwo.name+" Wins";  
            displayPlayer.classList.add("winner");
        }
        else if(status === false){
            aux = "It's a Tie!";  
            displayPlayer.classList.add("winner");
        }
        else {
            aux = playerOne.name+"'s turn";  
        }
        displayPlayer.textContent = aux;
    }
}

// compares attemp by attemp until some player wins

function attemps(index, flow){
    let aux;
    if (flow === true){
        attempsX[index]=index;
        aux = flowGame.Compare(attempsX.join(''));
        if (aux){
            playerOne.status = true;
            render (index, flow, playerOne.status);          
            flowGame.replay();
        }
        else if(aux === false){
            playerOne.status = false;
            render (index, flow, playerOne.status);          
            flowGame.replay();
        }
    }
    if (flow === false){
        attempsY[index]=index;
        aux = flowGame.Compare(attempsY.join(''));
        if (aux){
            playerTwo.status = true;
            render (index, flow, playerTwo.status);
            flowGame.replay();
        }
        else if(aux === false){
            playerOne.status = false;
            render (index, flow, playerTwo.status);          
            flowGame.replay();
        }
    }
}
//Event
var count=0;

gameBoard.myArray.forEach((cell, index) =>{
    cell.addEventListener("click", ()=>{

        render(index, flowGame.PlayerSelected(count), playerOne.status, playerTwo.status);

        attemps (index, flowGame.PlayerSelected(count));

        flowGame.Blockoption(index);

        count++;       
    });
});



