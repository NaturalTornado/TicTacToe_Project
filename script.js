document.addEventListener('DOMContentLoaded', function() {


const Player = (name, marker) => {
    return {name, marker};

}

// Factory function for creating the gameboard module
const Gameboard = (() => {
    const board = Array(9).fill('');
   
    // Array to represent the game board
    const getBoard = () => board;

    // Function to update the board
    const updateBoard = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
        }

    };

    // Function to reset the board
    const resetBoard = () => {

    };

    return { getBoard, updateBoard, resetBoard };
   
})();

 // Factory function for creating the game controller module
const GameController = (() => {
    const playerOne = Player("Player One", "X");
    const playerTwo = Player("Player Two", "O");
    let currentPlayer = playerOne;
    let moveCount = 0;
    let gameOver = false;


   // Function to handle player's move
   const playerMove = (index) => {
    if (!gameOver && Gameboard.getBoard()[index] === "") {
        // Update the board and display the marker
        Gameboard.updateBoard(index, currentPlayer.marker);
        document.getElementById(index + 1).textContent = currentPlayer.marker;
        moveCount++;
        console.log(currentPlayer.marker);
        if (checkWin()) {
            gameOver = true;
            alert(`${currentPlayer.name} Wins!`);
            console.log(currentPlayer.name + 'Wins!');
        } else if (moveCount === 9) {
            gameOver = true;
            alert("It's a tie!");
        } else {
            switchPlayer();
        }
    }

   };

// Function to switch players
const switchPlayer = () => { 
    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;

};


 // Function to check if there is a winner
 const checkWin = () => {
    const board = Gameboard.getBoard();
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    return winConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer.marker);
    });
 };


 // Function to reset the game
        const resetGame = () => {
                Gameboard.resetBoard();
                moveCount = 0;
                gameOver = false;
                currentPlayer = playerOne;
                document.querySelectorAll('.gameButton').forEach(button => {
                    button.textContent = "";
                });
            };
    
return { playerMove, resetGame };

})();


// event listener for game buttons

document.querySelectorAll('.gameButton').forEach((button, index) => {
    button.addEventListener('click', () => {
        GameController.playerMove(index);
    });
});



// event listener for new game button
const newGameButton = document.getElementById('newGameButton');
newGameButton.addEventListener('click', () =>  {
GameController.resetGame();    

});

});