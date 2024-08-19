function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Previene que el formulario se envíe
        buscarYEditarVendedor();  // Llama a la función que ejecuta la búsqueda
    }
}





function buscarYEditarVendedor() {
    var tipoDocumento = document.getElementById('tipoDocumentoBusqueda').value;
    var numeroDocumento = document.getElementById('numeroDocumentoBusqueda').value.trim();
    if (!tipoDocumento || !numeroDocumento) {
        alert('Por favor, seleccione el tipo y número de documento antes de buscar.');
        return;
    }

    var vendedores = JSON.parse(localStorage.getItem('Vendedores')) || [];
    var vendedor = vendedores.find(v => v.tipoDocumento === tipoDocumento && v.numeroDocumento === numeroDocumento && !v.isDeleted);

    if (vendedor) {
        cargarDatosVendedorEnFormulario(vendedor);
    } else {
        alert('No se encontró un vendedor con el tipo y número de documento proporcionados.');
    }
}

function cargarDatosVendedorEnFormulario(vendedor) {
    document.getElementById('nombreVendedor').value = vendedor.nombre;
    document.getElementById('apellidoVendedor').value = vendedor.apellido;
    document.getElementById('cedulaVendedor').value = vendedor.numeroDocumento;  // Usando 'numeroDocumento' para ser consistente
    document.getElementById('telefonoVendedor').value = vendedor.telefono;
    document.getElementById('direccionVendedor').value = vendedor.direccion;
    document.getElementById('emailVendedor').value = vendedor.email;
}

function guardarCambios(event) {
    event.preventDefault();

    // Obtener el número y tipo de documento desde el formulario de búsqueda.
    var tipoDocumento = document.getElementById('tipoDocumentoBusqueda').value;
    var numeroDocumento = document.getElementById('numeroDocumentoBusqueda').value;

    // Obtener la lista de vendedores y encontrar el índice del vendedor específico.
    var vendedores = JSON.parse(localStorage.getItem('Vendedores')) || [];
    var indice = vendedores.findIndex(vendedor => vendedor.tipoDocumento === tipoDocumento && vendedor.numeroDocumento === numeroDocumento);

    if (indice !== -1) {
        // Actualizar la información del vendedor en el array.
        vendedores[indice].nombre = document.getElementById('nombreVendedor').value;
        vendedores[indice].apellido = document.getElementById('apellidoVendedor').value;
        vendedores[indice].telefono = document.getElementById('telefonoVendedor').value;
        vendedores[indice].direccion = document.getElementById('direccionVendedor').value;
        vendedores[indice].email = document.getElementById('emailVendedor').value;

        // Guardar los cambios en localStorage.
        localStorage.setItem('Vendedores', JSON.stringify(vendedores));
        alert('Cambios guardados correctamente');

        // Limpiar formulario tras guardar cambios.
        limpiarFormulario();
    } else {
        alert('Error al guardar los cambios: Vendedor no encontrado.');
    }
}

function eliminarVendedor() {
    var tipoDocumento = document.getElementById('tipoDocumentoBusqueda').value;
    var numeroDocumento = document.getElementById('numeroDocumentoBusqueda').value;
    var vendedores = JSON.parse(localStorage.getItem('Vendedores')) || [];
    var index = vendedores.findIndex(v => v.tipoDocumento === tipoDocumento && v.numeroDocumento === numeroDocumento && !v.isDeleted);

    if (index !== -1) {
        var nombreCompleto = vendedores[index].nombre + " " + vendedores[index].apellido;

        archivarVentasVendedor(nombreCompleto);

        var confirmacion = confirm("¿Estás seguro de que deseas eliminar este vendedor? Esta acción no se puede deshacer, pero las ventas históricas se mantendrán.");
        if (confirmacion) {
            vendedores[index].isDeleted = true;
            localStorage.setItem('Vendedores', JSON.stringify(vendedores));
            alert('Vendedor marcado como eliminado, pero su historial de ventas ha sido archivado.');
            limpiarFormulario();
        }
        } else {
            alert('Vendedor no encontrado.');
        }
}

function archivarVentasVendedor(nombreVendedor) {
    var facturas = JSON.parse(localStorage.getItem('Facturas')) || [];
    var historialVentas = JSON.parse(localStorage.getItem('HistorialVentas')) || [];

    var ventasDelVendedor = facturas.filter(factura => factura.vendedor === nombreVendedor);

    if (ventasDelVendedor.length > 0) {
        historialVentas.push(...ventasDelVendedor);
        localStorage.setItem('HistorialVentas', JSON.stringify(historialVentas));

        var facturasActualizadas = facturas.filter(factura => factura.vendedor !== nombreVendedor);
        localStorage.setItem('Facturas', JSON.stringify(facturasActualizadas));
    } else {
        alert("No se encontraron ventas para este vendedor.");
    }
}




function limpiarFormulario() {
    document.getElementById('nombreVendedor').value = '';
    document.getElementById('apellidoVendedor').value = '';
    document.getElementById('cedulaVendedor').value = '';
    document.getElementById('telefonoVendedor').value = '';
    document.getElementById('direccionVendedor').value = '';
    document.getElementById('emailVendedor').value = '';
    // Limpiar los campos de búsqueda también.
    document.getElementById('tipoDocumentoBusqueda').value = '';
    document.getElementById('numeroDocumentoBusqueda').value = '';
}
