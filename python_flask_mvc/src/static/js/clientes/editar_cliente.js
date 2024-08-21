
function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Previene que el formulario se envíe
        buscarYEditarCliente();  // Llama a la función que ejecuta la búsqueda
    }
}



function buscarYEditarCliente() {
    var tipoDocumento = document.getElementById('tipoDocumento').value;
    var numeroDocumento = document.getElementById('buscarCedula').value.trim();

    if (!numeroDocumento) {
        alert("Por favor, ingrese el número de documento.");
        return;
    }

    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    var cliente = clientes.find(cliente => cliente.tipoDocumento === tipoDocumento && cliente.numeroDocumento === numeroDocumento);

    if (cliente) {
        document.getElementById('nombreCliente').value = cliente.nombre;
        document.getElementById('apellidoCliente').value = cliente.apellido;
        document.getElementById('cedulaCliente').value = cliente.numeroDocumento; // Asegúrate de que 'cedulaCliente' ahora maneje 'numeroDocumento'
        document.getElementById('telefonoCliente').value = cliente.telefono;
        document.getElementById('direccionCliente').value = cliente.direccion;
        document.getElementById('emailCliente').value = cliente.email;
        document.getElementById('estadoCliente').value = cliente.isActive ? "Activo" : "Inactivo";
        document.getElementById('datosCliente').style.display = 'flex';
    } else {
        alert('Cliente no encontrado');
        document.getElementById('buscarCedula').value = '';
    }
}



function guardarCambios(event) {
    event.preventDefault();

    var tipoDocumento = document.getElementById('tipoDocumento').value;
    var numeroDocumento = document.getElementById('buscarCedula').value;
    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    var cliente = clientes.find(cliente => cliente.tipoDocumento === tipoDocumento && cliente.numeroDocumento === numeroDocumento);

    if (cliente) {
        cliente.nombre = document.getElementById('nombreCliente').value;
        cliente.apellido = document.getElementById('apellidoCliente').value;
        cliente.telefono = document.getElementById('telefonoCliente').value;
        cliente.direccion = document.getElementById('direccionCliente').value;
        cliente.email = document.getElementById('emailCliente').value;

        localStorage.setItem('clientes', JSON.stringify(clientes));
        alert('Cambios guardados correctamente');
        limpiarformulario();
        document.getElementById('buscarCedula').value = ''; // Limpiar campo de búsqueda
    } else {
        alert('Error al guardar los cambios');
    }
}




function limpiarformulario() {
    document.getElementById('nombreCliente').value = '';
    document.getElementById('apellidoCliente').value = '';
    document.getElementById('cedulaCliente').value = ''; // Este campo podría cambiar de nombre si decides usar "numeroDocumento"
    document.getElementById('telefonoCliente').value = '';
    document.getElementById('direccionCliente').value = '';
    document.getElementById('emailCliente').value = '';
    document.getElementById('tipoDocumento').value = 'CC'; // Restablece a 'Cédula de Ciudadanía' como predeterminado, ajusta según necesidad
}


function toggleEstadoCliente() {
    var numeroDocumento = document.getElementById('buscarCedula').value; // Asegúrate de que este campo obtiene el número de documento correctamente.
    var tipoDocumento = document.getElementById('tipoDocumento').value; // Asegúrate de que este campo obtiene el tipo de documento correctamente.
    if (!numeroDocumento || !tipoDocumento) {
        alert('Por favor, ingrese el número y tipo de documento para buscar el cliente.');
        return;
    }

    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    var cliente = clientes.find(cliente => cliente.numeroDocumento === numeroDocumento && cliente.tipoDocumento === tipoDocumento);

    if (cliente) {
        var confirmacion = confirm(`Está a punto de ${cliente.isActive ? 'bloquear' : 'activar'} al cliente. ¿Desea continuar?`);
        if (confirmacion) {
            cliente.isActive = !cliente.isActive; // Cambia el estado de activo a inactivo y viceversa.
            localStorage.setItem('clientes', JSON.stringify(clientes));
            alert(cliente.isActive ? 'Cliente activado.' : 'Cliente bloqueado.');
            actualizarEstadoVisual(cliente.isActive); // Actualiza la interfaz para reflejar el cambio de estado.
        }
    } else {
        alert('Cliente no encontrado con el número y tipo de documento especificados.');
    }
}

function actualizarEstadoVisual(isActive) {
    var estadoVisual = document.getElementById('estadoCliente'); // Asume que tienes un elemento para mostrar el estado
    if (estadoVisual) {
        estadoVisual.value = isActive ? 'Activo' : 'Inactivo'; // Cambia el valor mostrado en la interfaz
    }
}



function eliminarCliente() {
    var numeroDocumento = document.getElementById('buscarCedula').value; // Asegúrate de que este es el campo correcto para el número de documento.
    var tipoDocumento = document.getElementById('tipoDocumento').value; // Asegúrate de que este es el campo correcto para el tipo de documento.

    if (!numeroDocumento || !tipoDocumento) {
        alert("Por favor ingrese el tipo y número de documento del cliente que desea eliminar.");
        return;
    }

    var confirmacion = confirm("¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.");
    if (confirmacion) {
        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        var encontrado = false;

        var historial = JSON.parse(localStorage.getItem('historial_clientes')) || [];

        clientes = clientes.map(cliente => {
            if (cliente.numeroDocumento === numeroDocumento && cliente.tipoDocumento === tipoDocumento && !cliente.isDeleted) {
                encontrado = true;
                historial.push({ ...cliente, fecha_eliminacion: new Date().toISOString() });
                return { ...cliente, isDeleted: true }; // Marcar como eliminado en lugar de eliminar completamente
            }
            return cliente;
        });

        if (encontrado) {
            localStorage.setItem('clientes', JSON.stringify(clientes));
            localStorage.setItem('historial_clientes', JSON.stringify(historial));
            alert('Cliente eliminado.');
            limpiarformulario();
            document.getElementById('buscarCedula').value = ''; // Limpiar campo de búsqueda
        } else {
            alert('No se encontró un cliente activo con ese tipo y número de documento.');
        }
    }
}