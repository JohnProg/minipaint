function changeValue(input, valor){
    var campo = document.getElementById(input);
    var nuevoValor = Number(campo.value) + valor;
    if(nuevoValor <= 0){
        nuevoValor = 1;
    }else if(nuevoValor > 30){
        nuevoValor = 30;
    }
    campo.value = nuevoValor;
    radio = nuevoValor;
}

function changeColor(valor){
    color = valor;
}

