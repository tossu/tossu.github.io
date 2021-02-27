function epoch() {
  return Math.round((new Date).getTime()/1000);
}

function formatTime(date) {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return hours + ":" + minutes;
}

function removeChildren(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
