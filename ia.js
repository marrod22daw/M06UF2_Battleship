const iacomputerBoard = document.getElementById('computer_board');
const startBTN = document.getElementById('start');

let db;
// Crear o abrir la base de datos
const request = indexedDB.open('battleship', 1);

// Manejar errores al abrir la base de datos
request.onerror = function(event) {
  console.log('Error al abrir la base de datos', event);
};

// Crear la estructura de la base de datos si no existe
request.onupgradeneeded = function(event) {
  console.log('Creando estructura de la base de datos');
  const db = event.target.result;
  const objectStore = db.createObjectStore('ships', { keyPath: 'id' });
};

// Guardar los datos en la base de datos
request.onsuccess = function(event) {
  console.log('Base de datos abierta con éxito');
  const db = event.target.result;
  const transaction = db.transaction('ships', 'readwrite');
  const objectStore = transaction.objectStore('ships');
  for (let i = 0; i < SHIPS.length; i++) {
    
    const shipData = {
      id: i,
      name: SHIPS[i].name,
      coords: shipCoords[i],
      position: `${startCol}${startRow}-${endCol}${endRow}`
    };    
    const request = objectStore.add(shipData);
    request.onerror = function(event) {
      console.log('Error al guardar los datos', event);
    };
    request.onsuccess = function(event) {
      console.log('Datos guardados con éxito', event);
    };
  }
};

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
let startCol, startRow, endCol, endRow;
const validCoords = [];

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
        startCol = String.fromCharCode(65 + randomSquare % 10);
    startRow = Math.floor(randomSquare / 10) + 1;
    endCol = String.fromCharCode(65 + (randomSquare % 10) + SHIPS[i].size - 1);
    endRow = startRow;
    console.log(`Placed ${SHIPS[i].name} from ${startCol}${startRow} to ${endCol}${endRow}`);
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
        startCol = String.fromCharCode(65 + randomSquare % 10);
        startRow = Math.floor(randomSquare / 10) + 1;
        endCol = String.fromCharCode(65 + (randomSquare % 10) + SHIPS[i].size - 1);
        endRow = startRow;
        console.log(`Placed ${SHIPS[i].name} from ${startCol}${startRow} to ${endCol}${endRow}`);
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