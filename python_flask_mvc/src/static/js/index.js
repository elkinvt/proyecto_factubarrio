function validarUsuario() {
    var usuario = document.getElementById('usuario').value;
    var contraseña = document.getElementById('contraseña').value;
    if (usuario === "admin" && contraseña === "admin") {
        window.location.href = 'pprincipal.html'; // Redirige al usuario a la página principal
    } else {
        alert('Usuario o contraseña incorrectos');
    }
    return false; // Previene el envío real del formulario
}
