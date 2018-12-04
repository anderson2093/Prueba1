// Funcion verifica si es par
function xyz(n) {
    var i = Math.sqrt(n);
    console.log(i);
    var j = Math.ceil(i);
    console.log(j);
    var k = 2;
    var x = k;
    var t;
    while (x <= j) {
        if ((n % x) === 0) // si es par el residuo de dividirlo entre un numero par sera 0
        {
            t = false;
            document.getElementById("resultado").innerHTML = t;
            return t;
        } else
            x++;
    }
    t = true;
    document.getElementById("resultado").innerHTML = t;
}