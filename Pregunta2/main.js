function onda(amplitud, frecuencia) {
    var i, j;
    var n = frecuencia;
    while (n != 0) {
        for (i = 1; i <= amplitud; i++) {
            for (j = i; j >= 1; j--) {
                document.write(i);
            }
            document.write("<br />");
        }
        for (i = amplitud - 1; i >= 1; i--) {
            for (j = 1; j <= i; j++) {
                document.write(i);
            }
            document.write("<br />");
        }
        n--;
    }
}

function entrada() {
    var ampl = -1,
        frec;

    while (ampl > 9 || ampl < 0) {
        ampl = prompt("Ingresar amplitud de la onda: ");
    }
    frec = prompt("Ingresar frecuencia de la onda: ");
    document.write("La amplitud de la onda es: " + ampl + "<br>");
    document.write("La frecuencia de la onda es: " + frec + "<br>");
    document.write("<br>");


    onda(ampl, frec);
}