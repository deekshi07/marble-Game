Two Player Marble Game
Code Documentation
1. HTML (index.html)
This file contains the structure of the game, including the title, grid, status message, and reset
button. It also includes Bootstrap for styling.
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Two-Player Marble Game</title>
<!-- Bootstrap for styling -->
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="game-container">
<h1>Two-Player Marble Game</h1>
<p id="status">Player 1's Turn</p>
<!-- Grid container for the board -->
<div class="grid-container mx-auto" id="board">
<!-- JavaScript generates the 4x4 grid cells here -->
</div>
<!-- Reset button for restarting the game -->
<button class="btn btn-primary" onclick="resetGame()">Reset Game</button>
</div>
<script src="script.js"></script>
</body>
</html>
Explanation:
● game-container: A central container for the game’s title, status message, game
board, and reset button.
● grid-container: A 4x4 grid where the game is played, with cells created dynamically
in the JavaScript code.
● resetGame(): A JavaScript function to clear the board and reset the game, triggered
by the "Reset Game" button.
2. CSS (styles.css)
This file handles the styling of the game layout and elements
/* Universal box-sizing for consistency */
* {
box-sizing: border-box;
}
/* Center the entire page content */
body {
font-family: Arial, sans-serif;
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
margin: 0;
background-color: #f5f5f5;
}
/* Center-align game content and board */
.game-container {
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
gap: 20px; /* space between elements */
padding: 20px;
background-color: #fff;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
border-radius: 10px;
}
/* Grid board setup */
.grid-container {
display: grid;
grid-template-columns: repeat(4, 80px);
grid-template-rows: repeat(4, 80px);
gap: 5px;
}
/* Styling for individual cells */
.cell {
width: 80px;
height: 80px;
display: flex;
justify-content: center;
align-items: center;
font-size: 24px;
border: 1px solid #333;
cursor: pointer;
transition: background-color 0.3s;
}
/* Player 1 and Player 2 marble styles */
.player1 {
background-color: #3498db;
border-radius: 50%;
}
.player2 {
background-color: #e74c3c;
border-radius: 50%;
}
/* Styling for the status message */
#winner {
color: green;
font-weight: bold;
}
Explanation:
.game-container: A flexbox container that centers and spaces the game elements.
.grid-container: Defines the grid layout for the game board with 4 rows and 4 columns.
.cell: Styles each grid cell with a border, center alignment, and cursor pointer for interactivity.
.player1 and .player2: Assigns colors and circular shapes to represent marbles for each
player.
3. JavaScript (script.js)
This file contains the core game logic, including board setup, turn management, marble
movement, and win condition checks.
const board = Array(4).fill(null).map(() => Array(4).fill(null));
let currentPlayer = 'player1';
let gameEnded = false;
document.addEventListener("DOMContentLoaded", () => {
const boardElement = document.getElementById("board");
for (let i = 0; i < 4; i++) {
for (let j = 0; j < 4; j++) {
const cell = document.createElement("div");
cell.classList.add("cell");
cell.dataset.row = i;
cell.dataset.col = j;
cell.addEventListener("click", handleCellClick);
boardElement.appendChild(cell);
}
}
});
function handleCellClick(event) {
if (gameEnded) return;
const row = event.target.dataset.row;
const col = event.target.dataset.col;
if (board[row][col] === null) {
board[row][col] = currentPlayer;
event.target.classList.add(currentPlayer);
if (checkWin()) {
document.getElementById("status").textContent = `${currentPlayer === 'player1' ?
'Player 1' : 'Player 2'} Wins!`;
gameEnded = true;
return;
}
moveMarbles();
currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
document.getElementById("status").textContent = `${currentPlayer === 'player1' ? 'Player
1' : 'Player 2'}'s Turn`;
}
}
function moveMarbles() {
const outerPositions = [
[0, 0], [0, 1], [0, 2], [0, 3],
[1, 3], [2, 3], [3, 3], [3, 2],
[3, 1], [3, 0], [2, 0], [1, 0]
];
const temp = board[0][0];
for (let i = 0; i < outerPositions.length - 1; i++) {
const [row, col] = outerPositions[i];
const [nextRow, nextCol] = outerPositions[i + 1];
board[row][col] = board[nextRow][nextCol];
}
board[outerPositions[outerPositions.length - 1][0]][outerPositions[outerPositions.length - 1][1]]
= temp;
updateBoardUI();
}
function updateBoardUI() {
document.querySelectorAll(".cell").forEach(cell => {
const row = cell.dataset.row;
const col = cell.dataset.col;
cell.className = "cell";
if (board[row][col]) cell.classList.add(board[row][col]);
});
}
function checkWin() {
for (let i = 0; i < 4; i++) {
if (checkRow(i) || checkColumn(i)) return true;
}
return checkDiagonals();
}
function checkRow(row) {
return board[row].every(cell => cell === currentPlayer);
}
function checkColumn(col) {
return board.every(row => row[col] === currentPlayer);
}
function checkDiagonals() {
return (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] ===
currentPlayer && board[3][3] === currentPlayer) ||
(board[0][3] === currentPlayer && board[1][2] === currentPlayer && board[2][1] ===
currentPlayer && board[3][0] === currentPlayer);
}
function resetGame() {
board.forEach(row => row.fill(null));
gameEnded = false;
currentPlayer = 'player1';
document.getElementById("status").textContent = "Player 1's Turn";
updateBoardUI();
}
Explanation:
board Array: Stores the game state for each cell.
handleCellClick Function: Handles cell clicks, places a marble, checks win conditions, and
moves marbles.
moveMarbles Function: Rotates outer cells counterclockwise after each turn.
checkWin Function: Checks if a player has four consecutive marbles in a row, column, or
diagonal.
resetGame Function: Resets the game state and UI to start a new game.
Approach
The primary approach in this game implementation is as follows:
● Grid-based Game Board: The 4x4 grid board is dynamically generated using
JavaScript. Each cell is clickable and displays the player’s marble when selected.
● Turn-Based Marble Placement: Players take turns placing marbles on empty cells in
the grid. Each marble is visually represented in the cell based on the player who placed
it.
● Counterclockwise Movement: After each turn, all marbles on the outer edges of the
grid move one cell counterclockwise, implemented by rotating values around the board’s
edges.
● Winning Condition: The code checks for four consecutive marbles of the same player
in rows, columns, or diagonals after each move. If a winning condition is met, the game
ends and displays a message.
Libraries/Frameworks Used
● Bootstrap: Used for styling buttons, centering elements, and making the layout
responsive.
● CSS Flexbox and Grid: Provides central alignment and spacing for game elements, and
organizes the 4x4 board layout.
User Guide
How to Play the Game
1. Objective: The objective is to align four marbles of the same color in a row, column, or
diagonal to win the game.
2. Taking Turns:
○ Player 1 and Player 2 take turns. The current player's turn is displayed at the top
of the screen.
○ Each player clicks an empty cell to place their marble on the board. Player 1's
marbles are blue, and Player 2's marbles are red.
3. Counterclockwise Movement:
○ After each turn, all marbles on the outer edges of the board rotate one cell
counterclockwise. This movement is automatic.
4. Winning:
○ The first player to align four marbles consecutively—horizontally, vertically, or
diagonally—wins the game.
○ When a player wins, the status displays a message, and the game is paused.
5. Resetting the Game: To start a new game, click the "Reset Game" button. This clears
the board and restarts the game from Player 1's turn.
