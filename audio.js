var audio = new Audio('Media/audio.mp3');
audio.volume = 0.25;

var startButton = document.getElementById('start');
startButton.addEventListener('click', function() {
  if (audio.readyState === 4) {
    audio.play();
  } else {
    audio.addEventListener('canplaythrough', function() {
      audio.play();
    });
  }
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function() {
  audio.pause();
  audio.currentTime = 0;
});
