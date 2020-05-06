const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const title = document.getElementById('title');
const cover = document.getElementById('cover');

//song titles
const songs = ['hey', 'summer', 'ukulele'];

// keep track of song
let songIndex = 1;

// Functions update song details
let loadSong = (song) => {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
};

let playSong = () => {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
};

let pauseSong = () => {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  audio.pause();
};

// initially load song details into dom
loadSong(songs[songIndex]);

// Add evenet listerners
playBtn.addEventListener('click', () => {
  // Check if song is playing
  const isPlaying = musicContainer.classList.contains('play');
  console.log(isPlaying);
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// change song
let previousSong = () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
};
prevBtn.addEventListener('click', previousSong);

let nextSong = () => {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
};
nextBtn.addEventListener('click', nextSong);

// Time song update
let updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  //   console.log(duration, currentTime);
  const progressPercentage = (currentTime / duration) * 100;
  progress.style.width = `${progressPercentage}%`;
};
audio.addEventListener('timeupdate', updateProgress);

//click on progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  console.log(width);
  audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);

// handle when song ends
audio.addEventListener('ended', nextSong);
