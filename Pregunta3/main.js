function numPalabras(cadena) {
    var count = 0;

    for (var i in cadena.split(" ")) {
        count++;
    }
    return count;
}

function entrada() {
    var cadena = "";
    var resultado = [];
    while (cadena != "0") {
        cadena = prompt("Ingrese una cadena de texto: ");
        resultado.push(numPalabras(cadena));
    }
    resultado.pop();

    resultado.forEach(element => {
        console.log(element);
    });
}