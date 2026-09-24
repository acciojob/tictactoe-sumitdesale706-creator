//your JS code here. If required.
// ==========================================
// 1. INITIAL WRAPPER AND CONTAINER GENERATION
// ==========================================
// Create the outer wrapper container required by specifications
const container = document.createElement('div');
container.className = 'container';
document.body.insertBefore(container, document.body.firstChild);

// ==========================================
// 2. GENERATE REGISTRATION SCREEN VIEW
// ==========================================
const setupDiv = document.createElement('div');
setupDiv.className = 'setup-screen';

const mainHeading = document.createElement('h1');
mainHeading.textContent = 'Tic Tac Toe';
setupDiv.appendChild(mainHeading);

// Player 1 Form Configuration
const group1 = document.createElement('div');
group1.className = 'input-group';
const label1 = document.createElement('label');
label1.setAttribute('for', 'player-1');
label1.textContent = 'Player 1 Name';
const input1 = document.createElement('input');
input1.type = 'text';
input1.id = 'player-1';
input1.placeholder = 'Enter name for X';
group1.appendChild(label1);
group1.appendChild(input1);
setupDiv.appendChild(group1);

// Player 2 Form Configuration
const group2 = document.createElement('div');
group2.className = 'input-group';
const label2 = document.createElement('label');
label2.setAttribute('for', 'player-2');
label2.textContent = 'Player 2 Name';
const input2 = document.createElement('input');
input2.type = 'text';
input2.id = 'player-2';
input2.placeholder = 'Enter name for O';
group2.appendChild(label2);
group2.appendChild(input2);
setupDiv.appendChild(group2);

// Setup Submit Button
const submitBtn = document.createElement('button');
submitBtn.id = 'submit';
submitBtn.textContent = 'Submit';
setupDiv.appendChild(submitBtn);

// Mount Setup screen components inside the DOM container
container.appendChild(setupDiv);

// ==========================================
// 3. RUNTIME GAME VARIABLES & STATE
// ==========================================
let p1Name = "";
let p2Name = "";
let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombinations = [, [3, 4, 5], [6, 7, 8], // Rows, [1, 4, 7], [2, 5, 8], // Columns, [2, 4, 6]             // Diagonals
];

// ==========================================
// 4. TRANSITION EVENT LISTENER
// ==========================================
submitBtn.addEventListener('click', () => {
  p1Name = input1.value.trim() || "Player 1";
  p2Name = input2.value.trim() || "Player 2";

  // Completely clean out the configuration screen setup using .remove()
  setupDiv.remove();

  // Instantly render the dynamic interactive match grid
  renderGameBoard();
});

// ==========================================
// 5. GAME GRID SYSTEM ENGINE
// ==========================================
function renderGameBoard() {
  const gameHeading = document.createElement('h1');
  gameHeading.textContent = 'Tic Tac Toe';
  container.appendChild(gameHeading);

  const messageDiv = document.createElement('div');
  messageDiv.className = 'message';
  container.appendChild(messageDiv);

  // Turn status tracking routine matching requirement context strings
  const updateTurnMessage = () => {
    if (currentPlayer === "X") {
      messageDiv.textContent = `${p1Name}, you're up`;
    } else {
      messageDiv.textContent = `${p2Name}, you're up`;
    }
  };

  updateTurnMessage();

  const boardDiv = document.createElement('div');
  boardDiv.className = 'board';

  // Build grid components 1 to 9 sequentially using custom string mappings
  for (let i = 1; i <= 9; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = i.toString();

    // Map inline coordinate tracking handlers
    cell.addEventListener('click', () => {
      const cellIndex = i - 1;

      if (boardState[cellIndex] !== "" || !gameActive) return;

      boardState[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;

      // Scan dynamic boards against outcome index vectors
      let roundWon = false;
      for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
          roundWon = true;
          break;
        }
      }

      if (roundWon) {
        const winner = currentPlayer === "X" ? p1Name : p2Name;
        messageDiv.textContent = `${winner} congratulations you won!.`;
        gameActive = false;
        return;
      }

      if (!boardState.includes("")) {
        messageDiv.textContent = "It's a draw!";
        gameActive = false;
        return;
      }

      // Alternate active player tokens
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      updateTurnMessage();
    });

    boardDiv.appendChild(cell);
  }

  container.appendChild(boardDiv);
}
