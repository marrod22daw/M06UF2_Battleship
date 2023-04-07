function dragdrop() {
    const draggables = document.querySelectorAll('.barco');


    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {

            event.dataTransfer.setData('text/plain', draggable.id);
        });
    });


    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('dragover', event => {
            event.preventDefault();
        });
    });


    cells.forEach(cell => {
        cell.addEventListener('drop', event => {

            const id = event.dataTransfer.getData('text');


            const draggable = document.getElementById(id);


            event.target.appendChild(draggable);
        });
    });
}

window.onload = function () {
    dragdrop();
}