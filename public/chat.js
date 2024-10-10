
function mostrarPanelRegistro() {
    document.getElementById('panel-bienvenida').style.display = 'none';
    document.getElementById('panel-registro').style.display = 'block';
}

function mostrarPanelLogin() {
    document.getElementById('panel-bienvenida').style.display = 'none';
    document.getElementById('panel-login').style.display = 'block';
}

// Enviar solicitud de registro
document.getElementById('form-register').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('register-usuario').value;
    const password = document.getElementById('register-password').value;

    fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password: password })
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('mensaje-registro').textContent = data;
    });
});

// Enviar solicitud de inicio de sesión
document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById('login-usuario').value;
    const password = document.getElementById('login-password').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usuario, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Inicio de sesión exitoso") {
            document.getElementById('panel-login').style.display = 'none';
            document.getElementById('app-chat').style.display = 'block';
            document.getElementById('usuario').value = data.username;

            // Emitir un evento para cargar mensajes existentes
            socket.emit('load messages');
        } else {
            document.getElementById('mensaje-login').textContent = data.message;
        }
    });
});

// Manejar la conexión del socket
const socket = io.connect('http://18.224.170.70:5000');


// Escuchar mensajes de chat
socket.on('chat', function(data) {
    const output = document.getElementById('output');
    output.innerHTML += `<p><strong>${data.usuario}:</strong> ${data.mensaje}</p>`;
});

// Escuchar mensajes históricos al cargar
socket.on('load messages', function(messages) {
    const output = document.getElementById('output');
    messages.forEach(msg => {
        output.innerHTML += `<p><strong>${msg.usuario}:</strong> ${msg.mensaje}</p>`;
    });
});

// Enviar un mensaje
document.getElementById('enviar').addEventListener('click', function() {
    const mensaje = document.getElementById('mensaje').value;
    const usuario = document.getElementById('usuario').value;

    if (mensaje) {
        // Emitir el mensaje al servidor
        socket.emit('chat', { usuario: usuario, mensaje: mensaje });

        // Limpiar el campo de entrada
        document.getElementById('mensaje').value = '';
    }
});
