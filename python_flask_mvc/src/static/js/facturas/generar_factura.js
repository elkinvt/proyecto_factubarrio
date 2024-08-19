// Definición de las funciones fuera de cualquier manejador de eventos para ámbito global
function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevenir que el formulario se envíe automáticamente.
        // Comprobar si el campo activo es 'numeroDocumento'
        if (document.activeElement.id === "numeroDocumento") {
            buscarCliente();  // Ejecutar función de búsqueda de cliente
        }
    }
}

function handleEnterPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Prevenir que el formulario se envíe automáticamente.
        // Comprobar si el campo activo es 'cantidadFactura'
        if (document.activeElement.id === "cantidadFactura") {
            agregarProductoAFactura();  // Llamada a la función que maneja la adición del producto a la factura.
        }
    }
}

function buscarCliente() {
    let tipoDocumento = document.getElementById('tipoDocumento').value;
    let numeroDocumento = document.getElementById('numeroDocumento').value.trim();
    if (!tipoDocumento || !numeroDocumento) {
        alert("Por favor, complete el tipo y número de documento antes de buscar.");
        return;
    }
    try {
        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        let clienteEncontrado = clientes.find(cliente =>
        cliente.tipoDocumento === tipoDocumento &&
        cliente.numeroDocumento === numeroDocumento &&
        !cliente.isDeleted && cliente.isActive
        );
        if (clienteEncontrado) {
            document.getElementById('nombreCliente').value = clienteEncontrado.nombre;
        } else {
            alert('Cliente no encontrado con el tipo y número de documento especificados.');
            limpiarCamposCliente();
            }
        } catch (e) {
            console.error("Error al acceder a los datos del cliente", e);
            alert("Error al procesar los datos de los clientes.");
    }
}

function limpiarCamposCliente() {
    document.getElementById('nombreCliente').value = '';
}

document.addEventListener('DOMContentLoaded', cargarProductosParaFactura);

var factura = []; // Asegurarse de que la factura está disponible globalmente

function cargarProductosParaFactura() {
    const inputProducto = document.getElementById('productoFactura');
    inputProducto.addEventListener('input', manejarInputProducto);
}

function manejarInputProducto() {
    const texto = this.value.toLowerCase();
    const productos = cargarProductos();
    const listaSugerencias = document.getElementById('listaSugerenciasProducto');
    actualizarSugerencias(texto, productos, listaSugerencias);
}

function cargarProductos() {
    const todosLosProductos = JSON.parse(localStorage.getItem('Productos')) || [];
    return todosLosProductos.filter(producto => !producto.isDeleted && producto.isActive);
}


function actualizarSugerencias(texto, productos, listaSugerencias) {
    limpiarElemento(listaSugerencias);
    if (texto.length > 0) {
        const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(texto));
        if (productosFiltrados.length > 0) {
            mostrarSugerencias(productosFiltrados, listaSugerencias);
        } else {
            listaSugerencias.innerHTML = '<div class="list-group-item">No se encontraron productos.</div>';
        }
    } else {
        ocultarElemento(listaSugerencias);
    }
}

function mostrarSugerencias(productos, listaSugerencias) {
    productos.forEach(producto => {
    const item = document.createElement('div');
    item.className = 'list-group-item list-group-item-action';
    item.textContent = `${producto.nombre} - Precio: ${producto.precio}`;
    item.onclick = () => {
        document.getElementById('productoFactura').value = producto.nombre;
        document.getElementById('productoFacturaCodigo').value = producto.codigo;
        limpiarElemento(listaSugerencias);
    };
    listaSugerencias.appendChild(item);
    });
    listaSugerencias.style.display = 'block';
}

function limpiarElemento(elemento) {
    elemento.innerHTML = '';
}

function ocultarElemento(elemento) {
    elemento.style.display = 'none';
}

function agregarProductoAFactura() {
    console.log("Iniciando agregarProductoAFactura");
    var codigo = document.getElementById('productoFacturaCodigo').value;
    console.log("Codigo del producto: ", codigo);
    var cantidadInput = document.getElementById('cantidadFactura');
    var cantidad = parseInt(cantidadInput.value);
    console.log("Cantidad: ", cantidad);
    var productos = JSON.parse(localStorage.getItem('Productos'));
    console.log("Productos cargados: ", productos);
    var producto = productos.find(p => p.codigo === codigo && !p.isDeleted && p.isActive);

    if (!codigo || isNaN(cantidad) || cantidad <= 0 || !producto) {
        alert("Por favor, verifica que has seleccionado un producto y has introducido una cantidad válida.");
        return;
    }

    if (cantidad > producto.cantidadStock) {
        alert("No hay suficiente stock del producto.");
        return;
    }

    producto.cantidadStock -= cantidad;
    var subtotal = producto.precio * cantidad;
    factura.push({ codigo: producto.codigo, producto: producto.nombre, cantidad: cantidad, precioUnitario: producto.precio, subtotal: subtotal });
    console.log("Factura después de añadir producto: ", factura);
    localStorage.setItem('Productos', JSON.stringify(productos));

    mostrarDetallesFactura();
}


function mostrarDetallesFactura() {
    console.log("Actualizando detalles de factura");
    var facturaBody = document.getElementById('facturaBody');
    var facturaTotal = document.getElementById('facturaTotal');
    facturaBody.innerHTML = '';
    var total = 0;
    factura.forEach((item, index) => {
    let row = `<tr>
        <td>${item.producto}</td>
        <td>${item.cantidad}</td>
        <td>$${item.precioUnitario}</td>
        <td>$${item.subtotal}</td>
        <td><button onclick="eliminarProductoDeFactura(${index})" class="btn btn-danger btn-sm">Eliminar</button></td>
        </tr>`;
        facturaBody.innerHTML += row;
        total += item.subtotal;
    });
    facturaTotal.textContent = `$${total}`;
}
function eliminarProductoDeFactura(index) {
    let productoEliminado = factura[index];
    factura.splice(index, 1);
    let productos = JSON.parse(localStorage.getItem('Productos'));
    let producto = productos.find(p => p.codigo === productoEliminado.codigo);
    if (producto) {
        producto.cantidadStock += productoEliminado.cantidad;
        localStorage.setItem('Productos', JSON.stringify(productos));
    }
    mostrarDetallesFactura();
}

function validarProductosEnFactura() {
    if (factura.length === 0) {
        alert("La factura está vacía. Agrega productos antes de pagar.");
        return false;
    }

    // Suponemos que cada producto en la factura debe estar activo y no eliminado para ser válido
    let productosInvalidos = factura.some(item => {
    let producto = JSON.parse(localStorage.getItem('Productos')).find(p => p.codigo === item.codigo);
    return producto.isDeleted || !producto.isActive;
    });

    if (productosInvalidos) {
    alert("Algunos productos en la factura ya no están disponibles. Por favor, revisa tu selección.");
    return false;
    }

    return true;
}

document.addEventListener('DOMContentLoaded', cargarVendedores);

function cargarVendedores() {
    let vendedores = JSON.parse(localStorage.getItem('Vendedores')) || [];
    let selectorVendedor = document.getElementById('vendedorFactura');
    selectorVendedor.innerHTML = '<option value="">Seleccione un vendedor</option>';
    vendedores.filter(v => !v.isDeleted).forEach(vendedor => {
        let opcion = document.createElement('option');
        opcion.value = `${vendedor.nombre} ${vendedor.apellido}`;
        opcion.textContent = `${vendedor.nombre} ${vendedor.apellido}`;
        selectorVendedor.appendChild(opcion);
    });
}
function validarSeleccionDeVendedor() {
    let vendedorSeleccionado = document.getElementById('vendedorFactura').value;
    if (!vendedorSeleccionado || vendedorSeleccionado === "") {
        alert("Por favor, seleccione un vendedor antes de proceder con el pago.");
        return false;
    }
    return true;
}

var factura = [];  // Asegúrate de que la factura está globalmente disponible

document.addEventListener('DOMContentLoaded', function() {
    cargarVendedores();  // Asegura que los vendedores estén cargados
});

function pagarFactura() {
    if (!validarProductosEnFactura()) {
        alert("No se puede proceder con el pago, revisa los productos.");
        return;
    }
    if (!validarSeleccionDeVendedor()) {
        alert("Selecciona un vendedor válido.");
        return;
    }

    let montoPago = obtenerMontoPago();
    if (montoPago === null) {
        alert("Se ha cancelado el pago o el monto no es válido.");
        return;
    }

    procesarPago(montoPago);
}

function obtenerMontoPago() {
    let monto = prompt("Ingrese el monto con el que va a pagar:");
    return monto && !isNaN(parseFloat(monto)) ? parseFloat(monto) : null;
}

function procesarPago(montoPago) {
    let totalFactura = factura.reduce((total, item) => total + item.subtotal, 0);
    if (montoPago < totalFactura) {
        alert("El monto ingresado ($" + montoPago + ") es insuficiente para cubrir el total de la factura ($" + totalFactura + ").");
        return;
    }

    let cambio = montoPago - totalFactura;
    guardarFactura(montoPago, totalFactura, cambio);
    alert(`Factura pagada con éxito! El cambio a devolver es: $${cambio.toFixed(2)}.`);
    limpiarCamposFactura();
}

function guardarFactura(montoPago, totalFactura, cambio) {
    let facturas = JSON.parse(localStorage.getItem('Facturas')) || [];
    let ahora = new Date();
    let nuevaFactura = {
        id: 'F' + (facturas.length + 1).toString().padStart(3, '0'),
        fecha: ahora.toLocaleDateString('es-CO', {year: 'numeric', month: '2-digit', day: '2-digit'}).split('/').reverse().join('-'), // Formato YYYY-MM-DD ajustado a la zona horaria local
        hora: ahora.getHours() + ":" + ahora.getMinutes().toString().padStart(2, '0'), // HH:mm
        cliente: document.getElementById('nombreCliente').value,
        vendedor: document.getElementById('vendedorFactura').value,
        items: factura,
        total: totalFactura,
        montoPagado: montoPago,
        cambio: cambio
    };
    facturas.push(nuevaFactura);
    localStorage.setItem('Facturas', JSON.stringify(facturas));
    factura = []; // Limpia la factura actual para nuevos usos
}

function anularFactura() {
    if (factura.length === 0) {
        alert("No hay productos en la factura para anular.");
        return;
    }

    // Confirmación antes de anular
    if (!confirm("¿Está seguro de que desea anular esta factura?")) {
        return;  // Si el usuario no confirma, salir de la función
    }

    var productos = JSON.parse(localStorage.getItem('Productos'));
    devolverStock(productos);
    alert("Factura anulada con éxito.");
    limpiarCamposFactura();
}

function devolverStock(productos) {
    // Recargar los productos para evitar conflictos de sobreescritura
    productos = JSON.parse(localStorage.getItem('Productos')) || [];
    factura.forEach(item => {
    var producto = productos.find(p => p.codigo === item.codigo && !p.isDeleted && p.isActive);
    if (producto) {
        producto.cantidadStock += item.cantidad;
    } else {
        console.log("Producto no encontrado o inactivo: ", item.codigo);
        }
    });
    localStorage.setItem('Productos', JSON.stringify(productos));
    factura = []; // Limpieza de la factura actual
}

function limpiarCamposFactura() {
    // Limpieza de los campos relacionados con el producto
    document.getElementById('productoFactura').value = '';
    document.getElementById('cantidadFactura').value = '';
    document.getElementById('productoFacturaCodigo').value = '';  // Asegúrate de limpiar el campo oculto del código del producto

    // Limpieza de los campos relacionados con el cliente
    document.getElementById('tipoDocumento').selectedIndex = 0;  // Reinicia el selector de tipo de documento al primer ítem
    document.getElementById('numeroDocumento').value = '';
    document.getElementById('nombreCliente').value = '';

    // Limpieza del selector de vendedores
    document.getElementById('vendedorFactura').selectedIndex = 0;

    // Limpieza de la tabla de detalles de factura
    document.getElementById('facturaBody').innerHTML = '';
    document.getElementById('facturaTotal').textContent = '$0';

    // Restablecimiento del arreglo de factura
    factura = [];
}
