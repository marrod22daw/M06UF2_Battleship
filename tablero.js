// Módulo para la generación de letras para las coordenadas
const Coords = (() => {
  const letters = 'ABCDEFGHIJ';

  return {
    getLetter(index) {
      return letters.charAt(index);
    }
  }
})();

// Clase para crear la cuadrícula del juego
class Grid {
  constructor(boardElement) {
    this.boardElement = boardElement;
    this.cells = [];
    this.coords = Coords;
  }

 
  create() {
    const grid = document.createElement('table');
    this.boardElement.appendChild(grid);

    
    const lletraRow = document.createElement('tr');
    lletraRow.appendChild(document.createElement('th'));

    for (let i = 0; i < 10; i++) {
      const letter = document.createElement('th');
      letter.textContent = this.coords.getLetter(i);
      lletraRow.appendChild(letter);
    }

    grid.appendChild(lletraRow);

    
    for (let i = 0; i < 10; i++) {
      const row = document.createElement('tr');
      const number = document.createElement('th');
      number.textContent = i;
      row.appendChild(number);

      for (let j = 0; j < 10; j++) {
        const cell = document.createElement('td');
        cell.setAttribute('id', i * 10 + j);
        cell.setAttribute('class', 'box');
        cell.setAttribute('data-index', i * 10 + j);
        cell.setAttribute('data-cords', this.coords.getLetter(j) + i);


        cell.addEventListener('drop', drop);
        cell.addEventListener('dragover', allowDrop);
        row.appendChild(cell);

        this.cells.push(cell);
      }

      grid.appendChild(row);
    }

    return grid;
  }
}

// Clase para crear la cuadrícula del juego del ordenador que hereda de la clase Grid
class ComputerGrid extends Grid {
  constructor(boardElement) {
    super(boardElement);
  }

  // Método para crear la cuadrícula del ordenador
  create() {
    super.create();

    
    this.cells.forEach(cell => {
      cell.addEventListener('click', () => {
        const index = parseInt(cell.dataset.index);
        if (shipCoords.includes(index)) {
          console.log('acertaste');
        } else {
          console.log('fallaste');
        }
      });
    });
  }
}

// Llamamos a la función createGrid para crear la tabla del jugador cuando se carga la página
const startBtn = document.getElementById('start');
const playerGrid = new Grid(document.getElementById('player_board'));
playerGrid.create();

startBtn.addEventListener('click', startGame);

function startGame() {
  // Verificar si ya se creó la tabla de la IA
  if (document.querySelector("#computer_board table")) {
    return;
  }

  
  const computerGrid = new ComputerGrid(document.getElementById('computer_board'));
  computerGrid.create();

  
  document.getElementById('button_container').style.textAlign = 'center';
}
