
var trailElements = document.getElementsByClassName('trailElement');

var mouseX = 100;
var mouseY = 100;
var dx = [];
var dy = [];
var vx = [0,0,0,0];
var vy = [0,0,0,0];
var ease = [0.05,2,0.01,0.8];
var friction = [0.95, 0.2, 0.5, 0.5];


function updateMouseLocations(e){
  mouseX = e.pageX;
  mouseY = e.pageY;
}

function trailTheElements(){
  console.log('trail');
  for(x=0; x < trailElements.length; x++){
    console.log('count', x);
    // trailElements[x].style.left = e.pageX + 'px';
    // trailElements[x].style.top = e.pageY + 'px';
    trailElements[x] = loop(trailElements[x], x);
  }
  // trailTheElements();
  requestAnimationFrame(trailTheElements);
}

function loop(trailElement, i){
    x = parseFloat(trailElement.style.left) || 0;
    y = parseFloat(trailElement.style.top) || 0;

    x_diff = mouseX - x;
    y_diff = mouseY - y;

    x_move = x_diff * 0.5;
    y_move = y_diff * 0.5;
    // dx[i] = mouseX - x;
    // dy[i] = mouseY - y;
    // vx[i] += dx[i]*ease[i];
    // vy[i] += dy[i]*ease[i];
    // vx[i] *= friction[i];
    // vy[i] *= friction[i];
    // x += vx[i];
    // y += vy[i];
    console.log('x before', x)
    x += x_move
    y += y_move
    console.log('x after', x, x_move, i);
    trailElement.style.left = x + 'px';
    trailElement.style.top = y + 'px';
    // loop(trailElement, i);
    return trailElement;
}

document.onmousemove = updateMouseLocations;
trailTheElements();


