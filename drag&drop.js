function dragdrop() {
    const barcos = document.querySelectorAll('.barco');

let barcoSeleccionado = null;

for (let barco of barcos) {
  barco.addEventListener('dragstart', (e) => {
    barcoSeleccionado = e.target;
  });
  
  barco.addEventListener('dragend', () => {
    barcoSeleccionado = null;
  });
}

const celdas = document.querySelectorAll('.cell');

for (let celda of celdas) {
  celda.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  
  celda.addEventListener('dragenter', (e) => {
    e.preventDefault();
    celda.classList.add('hover');
  });
  
  celda.addEventListener('dragleave', () => {
    celda.classList.remove('hover');
  });
  
  celda.addEventListener('drop', () => {
    celda.appendChild(barcoSeleccionado);
    celda.classList.remove('hover');
  });
}

}

window.onload = function () {
    dragdrop();
}