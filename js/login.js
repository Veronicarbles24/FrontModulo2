/* ============================================
   LÓGICA DE LA PÁGINA DE LOGIN
   ============================================ */

// Si ya hay sesión activa, ir al dashboard
if (BaseDatos.tieneSesion()) {
    window.location.href = 'dashboard.html';
}

// Obtener elementos del formulario
const formulario = document.getElementById('formularioLogin');
const inputUsuario = document.getElementById('usuario');
const inputContrasena = document.getElementById('contrasena');
const mensajeError = document.getElementById('mensajeError');

// Cuando se envía el formulario
formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); // Evitar que se recargue la página
    
    // Obtener valores
    const usuario = inputUsuario.value.trim();
    const contrasena = inputContrasena.value;
    
    // Validar que no estén vacíos
    if (usuario === '' || contrasena === '') {
        mostrarError('Por favor completa todos los campos');
        return;
    }
    
    // Intentar iniciar sesión
    if (BaseDatos.login(usuario, contrasena)) {
        // Login exitoso - ir al dashboard
        window.location.href = 'dashboard.html';
    } else {
        // Login fallido - mostrar error
        mostrarError('Usuario o contraseña incorrectos');
        inputContrasena.value = ''; // Limpiar contraseña
    }
});

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    mensajeError.textContent = mensaje;
    mensajeError.classList.remove('oculto');
    
    // Ocultar después de 3 segundos
    setTimeout(function() {
        mensajeError.classList.add('oculto');
    }, 3000);
}

console.log('✅ login.js cargado correctamente');
