document.addEventListener('DOMContentLoaded', function () {
    var emailInput = document.getElementById('emailCliente');

    emailInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();  // Previene la acción por defecto de enviar el formulario
            guardarCliente();  // Llama a la función que maneja la lógica de guardar
        }
    });
});

function guardarCliente() {
    var tipoDocumento = document.getElementById('tipoDocumento').value;
    var numeroDocumento = document.getElementById('numeroDocumento').value;
    var nombre = document.getElementById('nombreCliente').value;
    var apellido = document.getElementById('apellidoCliente').value;
    var telefono = document.getElementById('telefonoCliente').value;
    var direccion = document.getElementById('direccionCliente').value;
    var email = document.getElementById('emailCliente').value;
    var isActive = true;  // Valor predeterminado al crear un nuevo cliente

    if (!tipoDocumento || !numeroDocumento || !nombre || !apellido || !telefono || !direccion || !email) {
        alert('Por favor, complete todos los campos antes de guardar.');
        return;  // Detiene la función si algún campo está vacío
    }

    var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
    var clienteExistente = clientes.find(cliente => cliente.numeroDocumento === numeroDocumento && cliente.tipoDocumento === tipoDocumento);

    // Verificar si ya existe un cliente con el mismo tipo y número de documento
    if (clienteExistente) {
        alert('Ya existe un cliente con el tipo de documento ' + tipoDocumento + ' y número ' + numeroDocumento);
        return;  // Detiene la función si ya existe un cliente con ese documento
    }

    var cliente = {
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento,
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        direccion: direccion,
        email: email,
        isActive: isActive,
        isDeleted: false  // Nuevo campo para manejar la eliminación lógica
    };

    clientes.push(cliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    limpiarFormulario();  // Función que limpia el formulario después de guardar
    alert('Cliente guardado con éxito!');
}

function limpiarFormulario() {
    document.getElementById('tipoDocumento').selectedIndex = 0;
    document.getElementById('numeroDocumento').value = '';
    document.getElementById('nombreCliente').value = '';
    document.getElementById('apellidoCliente').value = '';
    document.getElementById('telefonoCliente').value = '';
    document.getElementById('direccionCliente').value = '';
    document.getElementById('emailCliente').value = '';
}