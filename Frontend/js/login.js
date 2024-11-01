// Mostrar / Ocultar contraseña
const togglePassword = document.querySelector('#togglePassword');
const passwordField = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
    // Alterna el tipo de input entre 'password' y 'text'
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // Alterna el icono
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
});

// Manejar el envío del formulario
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita que la página se recargue

    // Captura los valores del formulario
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const contrasenia = document.getElementById('password').value;

    try {
        // Envío de datos al backend usando Axios
        const response = await axios.post('http://localhost:3000/api/login', {
            nombreUsuario,
            contrasenia
        });

        // Mostrar mensaje de éxito
        document.getElementById('loginMessage').innerHTML = `<div class="alert alert-success">${response.data.message}</div>`;
      
    } catch (error) {
              document.getElementById('loginMessage').innerHTML = `<div class="alert alert-danger">${error.response.data.message}</div>`;
    }
});

// Manejar el envío del formulario
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    // Captura los valores del formulario
    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const contrasenia = document.getElementById('password').value;

    try {
                const response = await axios.post('http://localhost:3000/api/login', {
            nombreUsuario,
            contrasenia
        });

        // Mostrar mensaje de éxito
        document.getElementById('loginMessage').innerHTML = `<div class="alert alert-success">${response.data.message}</div>`;

        // Redirigir al panel principal tras un inicio de sesión exitoso
        window.location.href = 'index.html'; 
    } catch (error) {
                document.getElementById('loginMessage').innerHTML = `<div class="alert alert-danger">${error.response.data.message}</div>`;
    }
});

