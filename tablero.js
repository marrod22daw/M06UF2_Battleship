const playerBoard = document.getElementById('player_board');
const computerBoardElement = document.getElementById('computer_board');
const startBtn = document.getElementById('start');


// Llamamos a la función createGrid para crear la tabla del jugador cuando se carga la página
createGrid(playerBoard);

startBtn.addEventListener('click', startGame);

function startGame() {
  // Verificar si ya se creó la tabla de la IA
  if (document.querySelector("#computer_board table")) {
    return;
  }

  // Llamamos a la función createComputerGrid para crear la tabla de la IA
  createComputerGrid();

  // Centrar el botón después de hacer clic en él
  document.getElementById('button_container').style.textAlign = 'center';
}

function createGrid(board) {
  const grid = document.createElement('table');
  board.appendChild(grid);

  const lletra = 'ABCDEFGHIJ';

  // Crea la fila de las letras
  const lletraRow = document.createElement('tr');
  lletraRow.appendChild(document.createElement('th'));

  for (let i = 0; i < 10; i++) {
    const letter = document.createElement('th');
    letter.textContent = lletra.charAt(i);
    lletraRow.appendChild(letter);
  }

  grid.appendChild(lletraRow);

  // Crea las filas de los números y celdas vacías
  for (let i = 1; i <= 10; i++) {
    const row = document.createElement('tr');
    const number = document.createElement('th');
    number.textContent = i;
    row.appendChild(number);

    for (let j = 0; j < 10; j++) {
      const cell = document.createElement('td');

      cell.setAttribute('id', i * 10 + j);
      cell.setAttribute('class', 'box');
      cell.setAttribute('data-index', i * 10 + j);
      cell.setAttribute('data-cords', lletra[i] + j);

      cell.addEventListener('drop', drop);
      cell.addEventListener('dragover', allowDrop);

      row.appendChild(cell);
    }

    grid.appendChild(row);
  }

  return grid;
}

function createComputerGrid() {
  const grid = document.createElement('table');
  computerBoardElement.appendChild(grid);

  const lletra = 'ABCDEFGHIJ';

  // Crea la fila de las letras
  const lletraRow = document.createElement('tr');
  lletraRow.appendChild(document.createElement('th'));

  for (let i = 0; i < 10; i++) {
    const letter = document.createElement('th');
    letter.textContent = lletra.charAt(i);
    lletraRow.appendChild(letter);
  }

  grid.appendChild(lletraRow);

  // Crea las filas de los números y celdas vacías
  // Dentro de la función createComputerGrid()

for (let i = 1; i <= 10; i++) {
  const row = document.createElement('tr');
  const number = document.createElement('th');
  number.textContent = i;
  row.appendChild(number);

  for (let j = 0; j < 10; j++) {
    const cell = document.createElement('td');
    cell.dataset.index = (i - 1) * 10 + j; // Guardar el índice de la celda en un atributo "data"
    cell.addEventListener('click', function(event) {
      const index = parseInt(event.target.dataset.index);
      if (shipCoords.includes(index)) {
        console.log('acertaste');
      } else {
        console.log('fallaste');
      }
    });
    row.appendChild(cell);
  }

  grid.appendChild(row);
}


  return grid;
}