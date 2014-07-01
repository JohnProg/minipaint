window.onload = function(){
    socket = io();
    init();
}

var canvas, context, color, radio;

function init(){


    var container = document.getElementById("container");
    canvas = document.createElement("canvas");
    canvas.width = $(window).width();
    canvas.height = $(window).height();
    container.appendChild(canvas);

    context = canvas.getContext("2d");
    color = "red";
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
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("touchstart", touchDown);
}

function mouseDown(e){
    canvas.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    sendParametersToDraw(e.layerX, e.layerY);
}

function mouseMove(e){
    sendParametersToDraw(e.layerX, e.layerY);
}

function mouseUp(e){
    canvas.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
}


function touchDown(e){
    canvas.addEventListener("touchmove", touchMove);
    canvas.addEventListener("touchend", touchUp);
    document.addEventListener("touchcancel", touchUp);
}

function touchMove(e){
    sendParametersToDraw(e.layerX, e.layerY);
}

function touchUp(e){
    canvas.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);
}

