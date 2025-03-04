document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#formulario');
    const resultado = document.querySelector('#resultado');
    const spinner = document.querySelector('#spinner');

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        const ciudad = document.querySelector('#ciudad').value.trim();
        const pais = document.querySelector('#pais').value;

        if (!ciudad || !pais) {
            mostrarError('Por favor, completa todos los campos.');
            return;
        }

        mostrarSpinner();
        try {
            const datosClima = await obtenerClima(ciudad, pais);
            mostrarClima(datosClima);
        } catch (error) {
            mostrarError('No se pudo obtener el clima. Verifica los datos ingresados.');
        } finally {
            ocultarSpinner();
        }
    });

    function mostrarError(mensaje) {
        const alerta = document.createElement('p');
        alerta.textContent = mensaje;
        alerta.style.color = 'red';
        alerta.style.marginTop = '10px';
        resultado.appendChild(alerta);

        setTimeout(() => alerta.remove(), 3000);
    }

    function mostrarSpinner() {
        spinner.classList.remove('hidden');
    }

    function ocultarSpinner() {
        spinner.classList.add('hidden');
    }

    async function obtenerClima(ciudad, pais) {
        const apiKey = 'a408662e33be07db29171167d4d6d3af';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}&units=metric`;

        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error('Error en la consulta del clima');
        }
        return await respuesta.json();
    }

    function mostrarClima(datos) {
        const { name, main: { temp, temp_max, temp_min } } = datos;
        resultado.innerHTML = `
            <h2>Clima en ${name}</h2>
            <p>Temperatura actual: ${temp}°C</p>
            <p>Máxima: ${temp_max}°C</p>
            <p>Mínima: ${temp_min}°C</p>
        `;
    }
});
