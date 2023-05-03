/* let barcosJugador = [];
let barcosTotal = 30;
function cambiarColor(celda) {
  if (barcosJugador.some(function (x) { return x === celda.id; })) {
    celda.style.backgroundColor = "white";
    eliminarBarcoJugador(celda.id);
  } else {
    celda.style.backgroundColor = "grey";
    agregarBarcoJugador(celda.id);
  }
}

function agregarBarcoJugador(idCelda) {
  barcosJugador.push(idCelda);
  barcosTotal--;
  console.log(barcosJugador);
  console.log(barcosTotal);
}

function eliminarBarcoJugador(idCelda) {
  barcosJugador.pop(idCelda);
  barcosTotal++;
  console.log(barcosJugador);
  console.log(barcosTotal);
}
   */

let barcosJugador = [];
let tam;
let direccio;
let cord;
let numVaixells = new Map();
numVaixells.set(0, '5');
numVaixells.set(1, '4');
numVaixells.set(2, '4');
numVaixells.set(3, '3');
numVaixells.set(4, '3');
numVaixells.set(5, '2');
numVaixells.set(6, '2');

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  tam = ev.target.getAttribute("tam");
  direccio = ev.target.getAttribute("direccio");
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  let index = parseInt(ev.target.dataset.index);
  if (barcosJugador[index] == undefined) { //se fija que no haya un valor
    console.log(barcosJugador);
    let data = ev.dataTransfer.getData("text");
    barcosJugador[index] = data;
    cord = ev.target.dataset.cords;
    pintar(tam, index, direccio);
    //ev.target.appendChild(document.getElementById(data));
    console.log("nom:", data, "tamany:", tam, "index:", index, "cord:", cord);
  }
}

function pintar(tamany, indice, direccion) {

  for (let [key, valor] of numVaixells) {
    if (tamany == valor) {
      console.log(key + '=' + valor);
      numVaixells.delete(key);
      if (![...numVaixells.values()].includes(valor)) {
        const imgs = document.querySelectorAll(`img[tam="${valor}"]`); 
        imgs.forEach(img => img.parentNode.removeChild(img));
      }
      break;
    }
  }


  for (let j = 0; j < tamany; j++) {
    if (direccion == "H") {
      cordFinal = indice + j;
    } else if (direccion == "V") {
      cordFinal = indice + j * 10;
    }
    console.log(cordFinal);
    document.getElementById(cordFinal).style.backgroundColor = "gray";
  }

}
