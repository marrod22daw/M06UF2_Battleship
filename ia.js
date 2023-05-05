export function IA() {
    // Inicializa el objeto IndexedDB
    const request = window.indexedDB.open("MiBaseDeDatos");
    // Cuando la base de datos esté lista
    request.onsuccess = (event) => {
        const db = event.target.result;

        let barcosIA = [];
        let numVaixellsIA = new Map();
        let cordLetra;
        let cordNum;
        let letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        numVaixellsIA.set("5", "Portaviones");
        numVaixellsIA.set("4", "Destructor 1");
        numVaixellsIA.set("4", "Destructor 2");
        numVaixellsIA.set("3", "Fragata 1");
        numVaixellsIA.set("3", "Fragata 2");
        numVaixellsIA.set("2", "Submarino 1");
        numVaixellsIA.set("2", "Submarino 2");

        for (let [key, valor] of numVaixellsIA) {
            console.log(key + '=' + valor);
            let colocat = false;
            while (!colocat) {
                const direccio = Math.round(Math.random());
                if (direccio == 0) {    //horitzontal
                    cordLetra = Math.floor(Math.random() * 10);
                    cordNum = Math.floor(Math.random() * 10) + 1;
                    for (let j = 0; j < parseInt(key); j++) {
                        if (cordLetra + j < letras.length) {
                            let letraActual = letras[cordLetra + j];
                            let cordsFinal = letraActual + cordNum;
                            console.log(cordsFinal);
                            document.getElementById(cordsFinal).style.backgroundColor = "gray";
                            barcosIA[cordsFinal] = valor;
                            // Agrega la casilla a IndexedDB
                            const objectStore = db.transaction("casillas", "readwrite").objectStore("casillas");
                            const request = objectStore.add({ casilla: cordsFinal, barco: valor });
                            request.onerror = (event) => {
                                console.error("Error al agregar la casilla a IndexedDB", event)
                            }
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
                    for (let j = 0; j < parseInt(key); j++) {
                        let NumActual = cordNum + j;
                        if (NumActual <= 10) {
                            let cordsFinal = letraActual + NumActual;
                            console.log(cordsFinal);
                            document.getElementById(cordsFinal).style.backgroundColor = "gray";
                            barcosIA[cordsFinal] = valor;
                            // Agrega la casilla a IndexedDB
                            const objectStore = db.transaction("casillas", "readwrite").objectStore("casillas");
                            const request = objectStore.add({ casilla: cordsFinal, barco: valor });
                            request.onerror = (event) => {
                                console.error("Error al agregar la casilla a IndexedDB", event)
                            }
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
    // Si hay un error al abrir la base de datos
    request.onerror = (event) => {
        console.error("Error al abrir la base de datos", event);
    }

    // Crea el objeto store en IndexedDB
    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore("casillas", { keyPath: "casilla" });
    }

}