
var trailElements = document.getElementsByClassName('trailElement');
var mouse = { 'x': 100, 'y': 100};
var drag = [0.35,0.3,0.25,0.2];

function updateMouseLocations(e){
  mouse['x'] = e.pageX;
  mouse['y'] = e.pageY;
}

function trailTheElements(){
  for(var x=0; x < trailElements.length; x++){
    trailElements[x] = loop(trailElements[x], x);
  }
  requestAnimationFrame(trailTheElements);
}

function loop(trailElement, i){
    x = parseFloat(trailElement.style.left) || 0;
    y = parseFloat(trailElement.style.top) || 0;


    if(typeof trailElements[i-1] != "undefined"){
      following_x = parseFloat(trailElements[i-1].style.left);
      following_y = parseFloat(trailElements[i-1].style.top);
    } else {
      following_x =  mouse['x'];
      following_y = mouse['y'];
    }


    x_diff = following_x - x;
    y_diff = following_y - y;

    distance_behind = (i == 0) ? 20 : 10

    x_diff = x_diff > 0 ? (x_diff - distance_behind) : (x_diff + distance_behind)
    y_diff = y_diff > 0 ? (y_diff - distance_behind) : (y_diff + distance_behind)

    x_move = x_diff * drag[i];
    y_move = y_diff * drag[i];

    x += x_move
    y += y_move

    trailElement.style.left = x + 'px';
    trailElement.style.top = y + 'px';

    return trailElement;
}

document.onmousemove = updateMouseLocations;
trailTheElements();


