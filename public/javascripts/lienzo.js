window.addEventListener('load', function(){ 
    socket = io();
    init();
}, false);

var canvas, context, color, radio;

 $('.colors > li > a').on('click', function(){
        var color = $(this).data('color');
        localStorage.color = color;
    });
 
function init(){


    var container = document.getElementById("container");
    canvas = document.createElement("canvas");
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    container.appendChild(canvas);

    context = canvas.getContext("2d");
    if(localStorage.color){
        color = localStorage.color;
    }
    else{
        color = "red";    
    }

    radio = document.getElementById("maxValue").value;
    addListeners();
}

function sendParametersToDraw(x, y){
    socket.emit('event_mouse', {x: x, y: y});
    socket.on('msg', function(data){
        getParametersToDraw(data.x, data.y);
    });
}

function getParametersToDraw(x, y){
    context.beginPath();
    context.fillStyle = color;
    var _radio = 1 + Math.ceil(Math.random() * radio);
    var _desvX = 1 + Math.ceil(Math.random() * radio);
    var _desvY = 1 + Math.ceil(Math.random() * radio);
    context.arc(x + _desvX, y + _desvY, _radio, 0, Math.PI * 2);
    context.fill();
}

function addListeners(){
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("touchstart", touchDown, false);
}

function mouseDown(e){
    canvas.addEventListener("mousemove", mouseMove, false);
    document.addEventListener("mouseup", mouseUp, false);

    sendParametersToDraw(e.layerX, e.layerY);
}

function mouseMove(e){
    sendParametersToDraw(e.layerX, e.layerY);
}

function mouseUp(e){
    canvas.removeEventListener("mousemove", mouseMove, false);
    document.removeEventListener("mouseup", mouseUp, false);
}


function touchDown(e){
    canvas.addEventListener("touchmove", touchMove, false);
    canvas.addEventListener("touchend", touchUp, false);
    document.addEventListener("touchcancel", touchUp, false);
}

function touchMove(e){
    sendParametersToDraw(e.layerX, e.layerY);
}

function touchUp(e){
    canvas.removeEventListener("mousemove", mouseMove, false);
    document.removeEventListener("mouseup", mouseUp, false);
}

