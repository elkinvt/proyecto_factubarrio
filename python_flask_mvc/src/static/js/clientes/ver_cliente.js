function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Previene que el formulario se envíe
        buscarCliente();  // Llama a la función que ejecuta la búsqueda
    }
}

function buscarCliente() {
    var tipoDocumento = document.getElementById('tipoDocumento').value; // Recoge el tipo de documento
    var numeroDocumento = document.getElementById('buscarCedula').value.trim(); // Recoge el número de documento

    if (!tipoDocumento || !numeroDocumento) {
        alert("Por favor, complete el tipo y número de documento antes de buscar.");
        return;
    }

    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    // Busca un cliente que coincida con el tipo y número de documento y que no esté eliminado
    var clienteEncontrado = clientes.find(cliente => cliente.tipoDocumento === tipoDocumento && cliente.numeroDocumento === numeroDocumento && !cliente.isDeleted);

    if (clienteEncontrado) {
        // Actualiza los campos de la interfaz de usuario con la información del cliente encontrado
        document.getElementById('clienteNombre').value = clienteEncontrado.nombre;
        document.getElementById('clienteApellido').value = clienteEncontrado.apellido;
        document.getElementById('clienteCedula').value = clienteEncontrado.numeroDocumento; // Suponiendo que este campo es para mostrar el número de documento
        document.getElementById('clienteTelefono').value = clienteEncontrado.telefono;
        document.getElementById('clienteDireccion').value = clienteEncontrado.direccion;
        document.getElementById('clienteEmail').value = clienteEncontrado.email;
        document.getElementById('clienteEstado').value = clienteEncontrado.isActive ? 'Habilitado' : 'Deshabilitado'; // Estado como texto
    } else {
        alert('No se encontró un cliente con el tipo y número de documento especificados.');
        limpiarCampos(); // Limpia los campos si no se encuentra el cliente
    }
}

function limpiarCampos() {
    document.getElementById('clienteNombre').value = '';
    document.getElementById('clienteApellido').value = '';
    document.getElementById('clienteCedula').value = '';
    document.getElementById('clienteTelefono').value = '';
    document.getElementById('clienteDireccion').value = '';
    document.getElementById('clienteEmail').value = '';
    document.getElementById('clienteEstado').value = '';
}
