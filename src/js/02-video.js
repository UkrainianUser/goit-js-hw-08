import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
iframe.setAttribute('data-vimeo-id', '12345678');

const player = new Player(iframe);

const CURRENTTIME_KEY = "videoplayer-current-time";

let savedTime;
try {
  savedTime = localStorage.getItem(CURRENTTIME_KEY);
} catch (err) {
  console.error('Error reading from localStorage:', err);
}

if (savedTime) {
  player.setCurrentTime(savedTime);
}

const onPlay = throttle(function(data) {
  let currentTime = data.seconds;
  try {
    localStorage.setItem(CURRENTTIME_KEY, currentTime);
  } catch (err) {
    console.error('Error writing to localStorage:', err);
  }
  console.log(currentTime);
}, 1000);

player.on('timeupdate', onPlay);
