function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Previene que el formulario se envíe
        buscarVendedor();  // Llama a la función que ejecuta la búsqueda
    }
}

function buscarVendedor() {
    var tipoDocumento = document.getElementById('tipoDocumentoBuscar').value;
    var numeroDocumento = document.getElementById('cedulaBuscar').value.trim();
    if (!tipoDocumento || !numeroDocumento) {
        alert("Por favor, seleccione el tipo y número de documento antes de buscar.");
        return;
    }

    var vendedores = JSON.parse(localStorage.getItem('Vendedores')) || [];
    var vendedorEncontrado = vendedores.find(v => v.tipoDocumento === tipoDocumento && v.numeroDocumento === numeroDocumento && !v.isDeleted);

    if (vendedorEncontrado) {
        document.getElementById('nombreVendedor').value = vendedorEncontrado.nombre;
        document.getElementById('apellidoVendedor').value = vendedorEncontrado.apellido;
        document.getElementById('cedulaVendedor').value = vendedorEncontrado.numeroDocumento;
        document.getElementById('telefonoVendedor').value = vendedorEncontrado.telefono;
        document.getElementById('direccionVendedor').value = vendedorEncontrado.direccion;
        document.getElementById('emailVendedor').value = vendedorEncontrado.email;
        document.getElementById('infoVendedor').classList.add('visible');
    } else {
        document.getElementById('infoVendedor').classList.remove('visible');
        alert("No se encontró un vendedor con ese tipo y número de documento.");
    }
}
