//----------------------------------- G A M E   R U L E S -----------------------------------

document.getElementById("close-rules").addEventListener("click",hideRules)
function displayRules(){
    const element = document.getElementById("rules")
    element.style.visibility = "visible"
    element.style.opacity = "1"
}

function hideRules(){
    const element = document.getElementById("rules")
    element.style.visibility = "hidden"
    element.style.opacity = "0"

}


// ------------------------------- R E S U L T -------------------------------------


// check and create local storage
if(localStorage.getItem("userScore") === null || localStorage.getItem("computerScore") === null){
    localStorage.setItem("userScore", 0);
    localStorage.setItem("computerScore", 0);
}
document.getElementById("userScore").innerHTML = localStorage.getItem("userScore")
document.getElementById("computerScore").innerHTML = localStorage.getItem("computerScore")


 
let choices = ["rock", "paper", "scissor"]
//appling event listener on all choices
const options = document.querySelectorAll(".game-choices")
options.forEach((option) => {
    option.addEventListener("click", result);
});



// check for  result
function computerChoice(){
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function findWinner(user, computer){

    if(user == computer) return 0;
    else if(user == "scissor"){
        if(computer == "paper"){
            return 1;
        }
        else return -1;
    }
    else if(user == "rock"){
        if(computer == "scissor"){
            return 1;
        }
        else return-1
    }
    else{
        if(computer == "rock"){
            return 1;
        }
        else return -1;
    }
}
function applyWinnerEffects(winner){

    const outermostDiv = document.createElement('div');
    outermostDiv.style.border = '1.5rem solid #66b248';
    outermostDiv.style.borderRadius = '60%';
    
    const middleDiv = document.createElement('div');
    middleDiv.style.border = '1.5rem solid #32a62f';
    middleDiv.style.borderRadius = '60%';
    
    const innermostDiv = document.createElement('div');
    innermostDiv.style.border = '1.5rem solid #289a27';
    innermostDiv.style.borderRadius = '60%';
    
    // Append the border divs to the element
    innermostDiv.appendChild(winner)
    middleDiv.appendChild(innermostDiv)
    outermostDiv.appendChild(middleDiv)
    return outermostDiv

}

function setWinnerandLoserInResult(winner, winnerDiv,loser,loserDiv){
    const response = applyWinnerEffects(winner)                              //add winner effects
    winnerDiv.appendChild(response);

    loser.style.marginTop = '4.5rem';
    loserDiv.appendChild(loser);
}

function result(){
    const user = this.getAttribute('id');
    const computer = computerChoice();
    const gameResult = findWinner(user,computer)

    document.getElementById("game-outer-div").style.display = "none"
    document.getElementById("result-div").style.display = "flex"

    
    const userResult = document.getElementById(user);
    const userResultClone = userResult.cloneNode(true);
    userResultClone.classList.remove("game-choices");            // to remove event listener & cursor pointer from element
    
    const computerResult = document.getElementById(computer);
    const computerResultClone = computerResult.cloneNode(true);
    computerResultClone.classList.remove("game-choices");        // to remove event listener & cursor pointer from element

    const computerParent = document.getElementById("computer-result");
    const userParent = document.getElementById("user-result");

    if(gameResult == 0){
        //tie    
        document.getElementById("result-text1").innerHTML = "TIE"
        document.getElementById("result-text2").innerHTML = ""
        userResultClone.style.marginTop = '3rem';
        computerResultClone.style.marginTop = '3rem';
        userParent.appendChild(userResultClone);
        computerParent.appendChild(computerResultClone);


    }
    else{
        document.getElementById("result-text2").innerHTML = "AGAINST PC"
        
        if(gameResult == 1){
            //win
            const user = Number(localStorage.getItem("userScore"))
            localStorage.setItem("userScore",user+1)  
            document.getElementById("userScore").innerHTML = localStorage.getItem("userScore")
            document.getElementById("result-text1").innerHTML = "YOU WIN"
            document.getElementById("hurray-page-btn").style.display = "block"
            setWinnerandLoserInResult(userResultClone,userParent,computerResultClone,computerParent)
            
        }
        else{
            //lose
            const system = Number(localStorage.getItem("computerScore"))
            localStorage.setItem("computerScore",system+1)
            document.getElementById("computerScore").innerHTML = localStorage.getItem("computerScore")
            document.getElementById("result-text1").innerHTML = "YOU LOSE"
            setWinnerandLoserInResult(computerResultClone,computerParent,userResultClone,userParent)
        }

            
        
    }
    
    
    
        
  
}






// -------------------------------------  H U R R A Y   P A G E --------------------------------

function winAndPlayAgain(){
    window.location.href = "index.html";
}
function redirectToHurrayPage(){
    window.location.href = "hurray.html";
}