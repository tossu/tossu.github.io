function epoch() {
  return Math.round((new Date).getTime()/1000);
}

function formatTime(date) {
  return date.toLocaleTimeString("fi-FI",{ hour:"2-digit", minute: "2-digit"});
}

function removeChildren(element) {
  while(element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
