function getComputerChoice(difficultyLevel = 0.2, playerInput = 0) {
    let diceRoll = Math.random();
    let output = playerInput;
    //Win
    if (diceRoll > difficultyLevel && Math.random() > difficultyLevel) {
        return playerInput == 0 ? 2 : playerInput - 1;
    }
    //Draw
    else if (diceRoll > difficultyLevel){
        return playerInput;
    }
    //Lose
    else{
        return playerInput == 2 ? 0 : playerInput + 1;
    }
}
