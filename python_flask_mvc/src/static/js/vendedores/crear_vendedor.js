function guardarVendedor(event) {
    event.preventDefault();

    var tipoDocumento = document.getElementById('tipoDocumentoVendedor').value;
    var numeroDocumento = document.getElementById('numeroDocumentoVendedor').value; // Actualizado a numeroDocumentoVendedor
    var nombre = document.getElementById('nombreVendedor').value;
    var apellido = document.getElementById('apellidoVendedor').value;
    var telefono = document.getElementById('telefonoVendedor').value;
    var direccion = document.getElementById('direccionVendedor').value;
    var email = document.getElementById('emailVendedor').value;

    if (!tipoDocumento || !numeroDocumento || !nombre || !apellido || !telefono || !direccion || !email) {
        alert('Por favor, complete todos los campos antes de guardar.');
        return;
    }

    var vendedores = JSON.parse(localStorage.getItem('Vendedores')) || [];
    var vendedorExistente = vendedores.find(v => v.numeroDocumento === numeroDocumento && v.tipoDocumento === tipoDocumento);

    if (vendedorExistente) {
        alert('Ya existe un vendedor con el documento ' + tipoDocumento + ' ' + numeroDocumento + '.');
        return;
    }

    var nuevoVendedor = {
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento, // Actualizado para usar el campo correcto
        nombre: nombre,
        apellido: apellido,
        telefono: telefono,
        direccion: direccion,
        email: email,
        isDeleted: false
    };

    vendedores.push(nuevoVendedor);
    localStorage.setItem('Vendedores', JSON.stringify(vendedores));
    alert('Vendedor guardado con éxito!');

    limpiarFormulario();
}

function limpiarFormulario() {
    document.getElementById('tipoDocumentoVendedor').selectedIndex = 0;
    document.getElementById('numeroDocumentoVendedor').value = ''; // Actualizado a numeroDocumentoVendedor
    document.getElementById('nombreVendedor').value = '';
    document.getElementById('apellidoVendedor').value = '';
    document.getElementById('telefonoVendedor').value = '';
    document.getElementById('direccionVendedor').value = '';
    document.getElementById('emailVendedor').value = '';
}