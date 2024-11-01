// Cargar inmediatamente las barras antes del contenido principal
fetch('barras.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('layout').innerHTML = data;
    })
    .catch(error => {
        console.error('Error cargando barras.html:', error);
    });


