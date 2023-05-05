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

    for (let [key, valor] of numVaixellsIA) {
        console.log(key + '=' + valor);
        let colocat = false;
        while (!colocat) {
            const direccio = Math.round(Math.random());
            if (direccio == 0) {    //horitzontal
                cordLetra = Math.floor(Math.random() * 10);
                cordNum = Math.floor(Math.random() * 10) + 1;
                for (let j = 0; j < valor; j++) {
                    if (cordLetra + j < letras.length) {
                        let letraActual = letras[cordLetra + j];
                        let cordsFinal = letraActual + cordNum;
                        console.log(cordsFinal);
                        document.getElementById(cordsFinal).style.backgroundColor = "gray";
                        barcosIA[cordsFinal] = key;
                        colocat = true;
                        numVaixellsIA.delete(key);
                    } else {
                        barcosIA.splice(0, barcosIA.length);
                        colocat = false;
                        console.log("Fora");
                    }
                }
            } else if (direccio == 1) { //vertical
                cordLetra = Math.floor(Math.random() * 10);
                cordNum = Math.floor(Math.random() * 10) + 1;
                let letraActual = letras[cordLetra];
                for (let j = 0; j < valor; j++) {
                    let NumActual = cordNum + j;
                    if (NumActual <= 10) {
                        let cordsFinal = letraActual + NumActual;
                        console.log(cordsFinal);
                        document.getElementById(cordsFinal).style.backgroundColor = "gray";
                        barcosIA[cordsFinal] = key;
                        colocat = true;
                        numVaixellsIA.delete(key);
                    } else {
                        barcosIA.splice(0, barcosIA.length);
                        colocat = false;
                        console.log("Fora");
                    }
                }
            }

        }
    }
    console.log(barcosIA);
}


