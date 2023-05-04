window.onload = function() {
  let audio = new Audio('Media/audio.mp3');

  let startButton = document.getElementById('pirata');
  let isPlaying = false; 
  startButton.addEventListener('click', function() {
    startButton.classList.add('animado');
    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      startButton.classList.remove('animado');
      startButton.classList.remove('active'); 
    } else { 
      if (audio.readyState === 4) {
        audio.play();
        isPlaying = true;
        startButton.classList.add('active'); 
      } else {
        audio.addEventListener('canplaythrough', function() {
          audio.play();
          isPlaying = true;
          startButton.classList.add('active'); 
        });
      }
    }
  });
}
