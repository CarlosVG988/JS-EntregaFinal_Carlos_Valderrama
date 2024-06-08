import { obtenerPrimos, esPrimo } from './utils.js';

const AnalisisNumeros = {
    borrarNumeros: function() {
        const numeros = document.querySelectorAll('.numero');
        numeros.forEach(numero => numero.value = '');
        localStorage.removeItem('resultado');
        document.getElementById('resultado').innerText = '';
    },

    analizarNumeros: function() {
        const numeros = Array.from(document.querySelectorAll('.numero'))
                            .map(numero => parseInt(numero.value))
                            .filter(numero => !isNaN(numero)); 

        if (numeros.length === 0) {
            document.getElementById('resultado').innerText = 'No se han ingresado números.';
            return;
        }

        const primos = obtenerPrimos(numeros);
        const suma = numeros.reduce((total, numero) => total + numero, 0);
        const multiplicacion = numeros.reduce((total, numero) => total * numero, 1);

        let resultadoText = '';
        if (primos.length > 0) {
            resultadoText += 'Existen números primos: ' + primos.join('-') + '. ';
        } else {
            resultadoText += 'No existen números primos. ';
        }
        resultadoText += 'La suma de los valores es: ' + suma + '. ';
        resultadoText += 'La multiplicación de los valores es: ' + multiplicacion + '.';
        document.getElementById('resultado').innerText = resultadoText;

        localStorage.setItem('resultado', resultadoText);
    },

    cargarNumeros: async function() {
        try {
            const response = await fetch('../data/data.json');
            const data = await response.json();
            const contenedor = document.getElementById('numerosContainer');
            data.numeros.forEach(numero => {
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'numero';
                input.value = numero;
                contenedor.appendChild(input);
            });
        } catch (error) {
            console.error('Error al cargar el archivo JSON:', error);
        }
    }
};

document.getElementById('borrarNumeros').addEventListener('click', AnalisisNumeros.borrarNumeros.bind(AnalisisNumeros));
document.getElementById('analizarNumeros').addEventListener('click', AnalisisNumeros.analizarNumeros.bind(AnalisisNumeros));

window.onload = function() {
    const resultadoGuardado = localStorage.getItem('resultado');
    if (resultadoGuardado) {
        document.getElementById('resultado').innerText = resultadoGuardado;
    }
    AnalisisNumeros.cargarNumeros();
};
