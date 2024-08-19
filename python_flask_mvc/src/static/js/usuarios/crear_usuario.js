function cargarDatosVendedor(event, isKeyPress) {
    if (isKeyPress && event.key !== 'Enter') {
        return;
    }

    event?.preventDefault();  // Previene el comportamiento por defecto si es un evento
    var tipoDocumento = document.getElementById('tipoDocumento').value;
    var numeroDocumento = document.getElementById('cedulaVendedor').value;
    var vendedores = JSON.parse(localStorage.getItem('Vendedores')) || [];
    var vendedor = vendedores.find(v => v.tipoDocumento === tipoDocumento && v.numeroDocumento === numeroDocumento);

    if (vendedor) {
        document.getElementById('nombre').value = vendedor.nombre;
        document.getElementById('apellido').value = vendedor.apellido;
        document.getElementById('email').value = vendedor.email;
        document.getElementById('nombre').disabled = false;
        document.getElementById('apellido').disabled = false;
        document.getElementById('email').disabled = false;
    } else {
        alert('No se encontró un vendedor con esos datos');
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('email').value = '';
    }
}


function guardarUsuario(event) {
    event.preventDefault(); // Previene el envío automático del formulario

    var nombreUsuario = document.getElementById('nombreUsuario').value.trim();
    var contrasenaUsuario = document.getElementById('contrasenaUsuario').value.trim();
    var tipoDocumento = document.getElementById('tipoDocumento').value;
    var numeroDocumento = document.getElementById('cedulaVendedor').value.trim();

    if (!nombreUsuario || !contrasenaUsuario || !tipoDocumento || !numeroDocumento) {
        alert('Por favor, complete todos los campos requeridos, incluyendo tipo y número de documento.');
        return; // Detener la función si los campos están vacíos
    }

    var vendedores = JSON.parse(localStorage.getItem('Vendedores')) || [];
    var vendedor = vendedores.find(v => v.tipoDocumento === tipoDocumento && v.numeroDocumento === numeroDocumento);

    if (vendedor && vendedor.username) {
        alert('Este vendedor ya tiene un usuario asignado.');
        return; // Detiene la función si el vendedor ya tiene usuario
    }

    if (vendedor) {
        vendedor.username = nombreUsuario;
        vendedor.password = contrasenaUsuario;
        localStorage.setItem('Vendedores', JSON.stringify(vendedores));
        alert('Usuario guardado con éxito!');
        document.getElementById('formCrearUsuario').reset(); // Limpia el formulario después de guardar exitosamente
    } else {
        alert('No se encontró un vendedor con los datos de identificación proporcionados.');
    }
}

function limpiarFormulario(idFormulario) {
    var formulario = document.getElementById(idFormulario);
    var inputs = formulario.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type === 'text' || inputs[i].type === 'password' || inputs[i].type === 'email') {
        inputs[i].value = '';
        }
    }
}