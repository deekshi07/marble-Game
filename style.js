const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
let board = Array(4).fill(null).map(() => Array(4).fill(0));  // 4x4 board with 0 as empty
let currentPlayer = 1;
let gameActive = true;

// Initialize the game board UI
function initBoard() {
    boardElement.innerHTML = '';  // Clear any previous content
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => placeMarble(i, j));
            boardElement.appendChild(cell);
        }
    }
}

// Place a marble and handle the turn
function placeMarble(row, col) {
    if (!gameActive || board[row][col] !== 0) return;

    board[row][col] = currentPlayer;
    renderBoard();
    if (checkWinner()) {
        statusElement.textContent = `Player ${currentPlayer} Wins!`;
        statusElement.setAttribute('id', 'winner');
        gameActive = false;
        return;
    }

    moveMarblesCounterclockwise();
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    statusElement.textContent = `Player ${currentPlayer}'s Turn`;
}

// Move all marbles counterclockwise
function moveMarblesCounterclockwise() {
    const outerCells = [
        [0, 0], [0, 1], [0, 2], [0, 3],
        [1, 3], [2, 3], [3, 3], [3, 2],
        [3, 1], [3, 0], [2, 0], [1, 0]
    ];

    let temp = board[outerCells[11][0]][outerCells[11][1]];
    for (let i = 11; i > 0; i--) {
        const [r1, c1] = outerCells[i];
        const [r2, c2] = outerCells[i - 1];
        board[r1][c1] = board[r2][c2];
    }
    board[outerCells[0][0]][outerCells[0][1]] = temp;

    renderBoard();
}

// Render the board in the UI
function renderBoard() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.querySelector(`.cell[data-row="${i}"][data-col="${j}"]`);
            cell.classList.remove('player1', 'player2');
            if (board[i][j] === 1) cell.classList.add('player1');
            if (board[i][j] === 2) cell.classList.add('player2');
        }
    }
}

// Check for winning condition
function checkWinner() {
    // Check rows, columns, and diagonals for 4 in a row
    for (let i = 0; i < 4; i++) {
        if (checkLine([board[i][0], board[i][1], board[i][2], board[i][3]]) ||
            checkLine([board[0][i], board[1][i], board[2][i], board[3][i]])) return true;
    }
    return checkLine([board[0][0], board[1][1], board[2][2], board[3][3]]) ||
           checkLine([board[0][3], board[1][2], board[2][1], board[3][0]]);
}

// Helper to check if all values in an array are the same and not empty
function checkLine(line) {
    return line.every(cell => cell === currentPlayer);
}

// Reset game to initial state
function resetGame() {
    board = Array(4).fill(null).map(() => Array(4).fill(0));
    currentPlayer = 1;
    gameActive = true;
    statusElement.textContent = "Player 1's Turn";
    initBoard();
    renderBoard();
}

// Initialize the game on page load
window.onload = initBoard;
