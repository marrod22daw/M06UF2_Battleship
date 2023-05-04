class Ship {
  constructor(name, size) {
    this.name = name;
    this.size = size;
    this.coords = [];
    this.placed = false;
  }

  placeShip() {
    const randomSquare = Math.floor(Math.random() * 100);
    const direction = Math.floor(Math.random() * 2);

    // Horizontal
    if (direction === 0) {
      if (randomSquare % 10 <= 10 - this.size) {
        const validCoords = [];
        for (let j = 0; j < this.size; j++) {
          validCoords.push(randomSquare + j);
        }
        if (validCoords.every((coord) => !this.coords.includes(coord))) {
          this.coords.push(...validCoords);
          this.placed = true;

          // Convert coordinates to letters and numbers
          const startCol = String.fromCharCode(65 + randomSquare % 10);
          const startRow = Math.floor(randomSquare / 10) + 1;
          const endCol = String.fromCharCode(65 + (randomSquare % 10) + this.size - 1);
          const endRow = startRow;
          console.log(`Placed ${this.name} from ${startCol}${startRow} to ${endCol}${endRow}`);
        }
      }
    }
    // Vertical
    else {
      if (randomSquare <= 90 + (9 - this.size) * 10) {
        const validCoords = [];
        for (let j = 0; j < this.size; j++) {
          validCoords.push(randomSquare + j * 10);
        }
        if (validCoords.every((coord) => !this.coords.includes(coord))) {
          this.coords.push(...validCoords);
          this.placed = true;

          // Convert coordinates to letters and numbers
          const startCol = String.fromCharCode(65 + randomSquare % 10);
          const startRow = Math.floor(randomSquare / 10) + 1;
          const endCol = String.fromCharCode(65 + (randomSquare % 10) + this.size - 1);
          const endRow = startRow;
          console.log(`Placed ${this.name} from ${startCol}${startRow} to ${endCol}${endRow}`);
        }
      }
    }
  }
}

const SHIPS = [
  new Ship('carrier', 5),
  new Ship('battleship', 4),
  new Ship('cruiser', 3),
  new Ship('submarine', 3),
  new Ship('destroyer', 2),
];

const iacomputerBoard = document.getElementById('computer_board');
const startBTN = document.getElementById('start');

const shipCoords = [];

for (let ship of SHIPS) {
  while (!ship.placed) {
    ship.placeShip();
  }
  shipCoords.push(...ship.coords);
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
