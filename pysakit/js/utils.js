function epoch() {
  return Math.round((new Date).getTime()/1000);
}

function pad(num, size) {
  let s = num+"";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}

function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds / 60) % 60);
  return pad(hours,2) + ":" + pad(minutes,2);
}
