
var trailElements = document.getElementsByClassName('trailElement');
var mouse = { 'x': 100, 'y': 100};
var drag = [0.35,0.3,0.25,0.2];

function updateMouseLocations(e){
  mouse['x'] = e.pageX;
  mouse['y'] = e.pageY;
}

function trailTheElements(){
  console.log('trail');
  for(var x=0; x < trailElements.length; x++){
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


    if(typeof trailElements[i-1] != "undefined"){
      if(i == 1){
      }
      following_x = parseFloat(trailElements[i-1].style.left);
      following_y = parseFloat(trailElements[i-1].style.top);
      console.log(i, following_x, following_y);
    } else {
      following_x =  mouse['x'];
      following_y = mouse['y'];
    }


    x_diff = following_x - x;
    y_diff = following_y - y;

    x_diff = x_diff > 0 ? (x_diff - 10) : (x_diff + 10)
    y_diff = y_diff > 0 ? (y_diff - 10) : (y_diff + 10)

    x_move = x_diff * drag[i];
    y_move = y_diff * drag[i];

    x += x_move
    y += y_move

    trailElement.style.left = x + 'px';
    trailElement.style.top = y + 'px';
    // loop(trailElement, i);
    return trailElement;
}

document.onmousemove = updateMouseLocations;
trailTheElements();


