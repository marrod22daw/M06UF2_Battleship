let db;

function initDB() {
  let request = indexedDB.open('barcosDB', 1);

  request.onerror = function(event) {
    console.log('Error opening database');
  };

  request.onsuccess = function(event) {
    db = request.result;
    console.log('Database opened successfully');

    // leer datos de indexeddb y actualizar barcosJugador
    let transaction = db.transaction(['barcosStore'], 'readonly');
    let objectStore = transaction.objectStore('barcosStore');
    let request = objectStore.get('barcosJugador');

    request.onerror = function(event) {
      console.log('Error reading data from indexeddb');
    };

    request.onsuccess = function(event) {
      if (request.result) {
        barcosJugador = request.result;
        console.log('Data read from indexeddb:', barcosJugador);
      }
    };
  };

  request.onupgradeneeded = function(event) {
    db = event.target.result;
    console.log('Database upgrade needed');

    // crear objeto de almacén de objetos
    let objectStore = db.createObjectStore('barcosStore', { keyPath: 'id' });

    // escribir datos en el objeto de almacén de objetos
    objectStore.add({ id: 'barcosJugador', data: barcosJugador });
  };
}

function actualizarDB() {
  let transaction = db.transaction(['barcosStore'], 'readwrite');
  let objectStore = transaction.objectStore('barcosStore');

  // actualizar datos en el objeto de almacén de objetos
  objectStore.put({ id: 'barcosJugador', data: barcosJugador });
}
