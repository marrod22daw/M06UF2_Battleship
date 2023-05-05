export function IA() {
    let barcosIA = [];
    let numVaixellsIA = new Map();
    let cordLetra;
    let cordNum;
    let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    numVaixellsIA.set(0, '5');
    numVaixellsIA.set(1, '4');
    numVaixellsIA.set(2, '4');
    numVaixellsIA.set(3, '3');
    numVaixellsIA.set(4, '3');
    numVaixellsIA.set(5, '2');
    numVaixellsIA.set(6, '2');

    for (let [key, valor] of numVaixells) {
        let colocat = false;
        while (!colocat) {
            const direccio = Math.round(Math.random());
            if (direccio == 0) {    //horitzontal
                cordLetra = Math.floor(Math.random() * 10);
                cordNum = Math.floor(Math.random() * 10) + 1;
                for (let j = 0; j < valor; j++) {
                    let letraActual = letras[cordLetra + j];
                    let cordsFinal =  letraActual + cordNum;
                    console.log(cordsFinal);
                    document.getElementById(cordsFinal).style.backgroundColor = "gray";
                    barcosIA[cordsFinal] = key;
                    if (barcosIA[cordsFinal]) {colocat = false} else {colocat = true}
                }
            } else if (direccio == 1) { //vertical
            }

        }
        numVaixells.delete(key);
    }
    console.log(barcosIA);
}

function colocar(tamany, indice, direccion, nom) {
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
