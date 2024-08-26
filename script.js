const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const index = e.target.getAttribute('data-index');
    if (boardState[index] !== null || !isGameActive) {
        return;
    }
    boardState[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.classList.add(currentPlayer);
    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage();
};

const checkForWinner = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            highlightWinningCells([a, b, c]);
            break;
        }
    }

    if (roundWon) {
        isGameActive = false;
        message.textContent = `Player ${currentPlayer} wins!`;
        return;
    }

    if (!boardState.includes(null)) {
        isGameActive = false;
        message.textContent = `It's a tie!`;
    }
};

const highlightWinningCells = (indices) => {
    indices.forEach(index => {
        document.querySelector(`.cell[data-index='${index}']`).style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
    });
};

const updateMessage = () => {
    if (isGameActive) {
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    boardState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
        cell.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    });
    currentPlayer = 'X';
    isGameActive = true;
    message.textContent = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
updateMessage();
