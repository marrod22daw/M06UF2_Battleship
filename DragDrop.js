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
const netejar = document.getElementById('neteja');
const guardar = document.getElementById('guarda');

if (localStorage.getItem('barcosJugador')) {
  barcosJugador = JSON.parse(localStorage.getItem('barcosJugador'));
}

window.onload = function() {
  for (let z = 0; z < barcosJugador.length; z++) {
    var barco = barcosJugador[z];
    if (barco !=undefined){
      document.getElementById(z).style.backgroundColor = "gray";
    }
    console.log(barco);
  }
}


netejar.addEventListener('click', () => {
  localStorage.clear();
const imgs2 = document.querySelectorAll(`img`);
  numVaixells.set(0, '5');
  numVaixells.set(1, '4');
  numVaixells.set(2, '4');
  numVaixells.set(3, '3');
  numVaixells.set(4, '3');
  numVaixells.set(5, '2');
  numVaixells.set(6, '2');
  barcosJugador.splice(0, barcosJugador.length);
  const cells = document.querySelectorAll('.box');
  cells.forEach(cell => {
    cell.style.backgroundColor = 'white';
  });
});

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
    //barcosJugador[index] = data;
    cord = ev.target.dataset.cords;
    pintar(tam, index, direccio, data);
    //ev.target.appendChild(document.getElementById(data));
    console.log("nom:", data, "tamany:", tam, "index:", index, "cord:", cord);
  
  }
}

function pintar(tamany, indice, direccion, nom) {

  /* for (let z = 0; z < barcosJugador.length; z++) {
    var barco = barcosJugador[z];
    if (barco !=undefined){
      document.getElementById(z).style.backgroundColor = "gray";
    }
    console.log(barco);
  } */


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
      barcosJugador[cordFinal] = nom;
    } else if (direccion == "V") {
      cordFinal = indice + j * 10;
      barcosJugador[cordFinal] = nom;
    }
    console.log(cordFinal);
    document.getElementById(cordFinal).style.backgroundColor = "gray";
  }

}

guardar.addEventListener('click', guardarBD);

function guardarBD() {

  localStorage.setItem('barcosJugador', JSON.stringify(barcosJugador));


}
