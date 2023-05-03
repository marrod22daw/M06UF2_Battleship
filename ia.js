const iacomputerBoard = document.getElementById('computer_board');
const startBTN = document.getElementById('start');


const SHIPS = [
  { size: 5, name: 'carrier' },
  { size: 4, name: 'battleship' },
  { size: 3, name: 'cruiser' },
  { size: 3, name: 'submarine' },
  { size: 2, name: 'destroyer' },
];

const shipCoords = [];
let i = 0;
let shipPlaced = false;

while (!shipPlaced && i < SHIPS.length) {
  const randomSquare = Math.floor(Math.random() * 100);
  const direction = Math.floor(Math.random() * 2);

  // Horizontal
  if (direction === 0) {
    if (randomSquare % 10 <= 10 - SHIPS[i].size) {
      const validCoords = [];
      for (let j = 0; j < SHIPS[i].size; j++) {
        validCoords.push(randomSquare + j);
      }
      if (validCoords.every((coord) => !shipCoords.includes(coord))) {
        shipCoords.push(...validCoords);
        shipPlaced = true;

        // Convert coordinates to letters and numbers
        const startCol = String.fromCharCode(65 + randomSquare % 10);
        const startRow = Math.floor(randomSquare / 10) + 1;
        const endCol = String.fromCharCode(65 + (randomSquare % 10) + SHIPS[i].size - 1);
        const endRow = startRow;
        console.log(`Baixell ${SHIPS[i].name} colocat de ${startCol}${startRow} a ${endCol}${endRow}`);
      }
    }
  }
  // Vertical
  else {
    if (randomSquare <= 90 + (9 - SHIPS[i].size) * 10) {
      const validCoords = [];
      for (let j = 0; j < SHIPS[i].size; j++) {
        validCoords.push(randomSquare + j * 10);
      }
      if (validCoords.every((coord) => !shipCoords.includes(coord))) {
        shipCoords.push(...validCoords);
        shipPlaced = true;

        // Convert coordinates to letters and numbers
        const startCol = String.fromCharCode(65 + randomSquare % 10);
        const startRow = Math.floor(randomSquare / 10) + 1;
        const endCol = startCol;
        const endRow = Math.floor(randomSquare / 10) + SHIPS[i].size;
        console.log(`Baixell ${SHIPS[i].name} colocat de ${startCol}${startRow} a ${endCol}${endRow}`);
      }
    }
  }

  // Move on to next ship if current one is placed
  if (shipPlaced) {
    i++;
    shipPlaced = false;
  }
}

for (let i = 0; i < 100; i++) {
  const cell = iacomputerBoard.querySelectorAll('td')[i];
  if (cell) { // Verificar si cell es "truthy"
    cell.dataset.index = i;
    if (shipCoords.includes(i)) {
      cell.classList.add('ship');
    }
    cell.addEventListener('click', handleCellClick);
  }
}

function handleCellClick(event) {
  const cell = event.target;
  const index = parseInt(cell.dataset.index);
  if (shipCoords.includes(index)) {
    console.log('acertaste');
  } else {
    console.log('fallaste');
  }
}