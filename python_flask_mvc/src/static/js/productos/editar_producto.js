function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault();  // Previene que el formulario se envíe
        buscarProducto();  // Llama a la función que ejecuta la búsqueda
    }
}

function buscarProducto() {
    productoActual = null; // Resetea el producto actual al iniciar una búsqueda

    var codigo = document.getElementById('buscarCodigoProducto').value.trim().toLowerCase();
    var nombre = document.getElementById('buscarNombreProducto').value.trim().toLowerCase();
    var productos = JSON.parse(localStorage.getItem('Productos')) || [];

    var resultados = productos.filter(producto =>
        ((codigo && producto.codigo.toLowerCase().includes(codigo)) ||
            (nombre && producto.nombre.toLowerCase().includes(nombre))) &&
        !producto.isDeleted // Solo incluye productos que no están eliminados
    );

    var listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = ''; // Limpiar lista anterior

    if (resultados.length === 0) {
        listaProductos.innerHTML = '<div class="list-group-item">No se encontraron productos.</div>';
    } else {
        resultados.forEach(producto => {
            var item = document.createElement('button');
            item.classList.add('list-group-item', 'list-group-item-action');
            item.textContent = `${producto.nombre} - ${producto.codigo}`;
            item.onclick = () => cargarProductoEnFormulario(producto);
            listaProductos.appendChild(item);
        });
    }

    document.getElementById('buscarCodigoProducto').value = '';
    document.getElementById('buscarNombreProducto').value = '';
}

function cargarProductoEnFormulario(producto) {
    // Establece el producto actual a este producto
    productoActual = producto;

    // Muestra la sección de datos del producto si está oculta
    document.getElementById('datosProducto').classList.remove('hidden');

    // Carga los datos del producto en los campos del formulario
    document.getElementById('codigoProducto').value = producto.codigo;
    document.getElementById('nombreProducto').value = producto.nombre;
    document.getElementById('descripcionProducto').value = producto.descripcion;
    document.getElementById('categoriaProducto').value = producto.categoria;
    document.getElementById('precioProducto').value = producto.precio;
    document.getElementById('unidadMedidaProducto').value = producto.unidadMedida;
    document.getElementById('presentacionProducto').value = producto.presentacion;
    document.getElementById('cantidadStockProducto').value = producto.cantidadStock;
    document.getElementById('estadoProducto').value = producto.isActive ? "Habilitado" : "Deshabilitado";
}

function guardarProductoEditado(event) {
    event.preventDefault();

    if (productoActual) {
        var productos = JSON.parse(localStorage.getItem('Productos')) || [];
        var index = productos.findIndex(p => p.codigo === productoActual.codigo);

        if (index !== -1) {
            productos[index] = {
                codigo: document.getElementById('codigoProducto').value,
                nombre: document.getElementById('nombreProducto').value,
                descripcion: document.getElementById('descripcionProducto').value,
                categoria: document.getElementById('categoriaProducto').value,
                precio: parseFloat(document.getElementById('precioProducto').value),
                unidadMedida: document.getElementById('unidadMedidaProducto').value,
                presentacion: document.getElementById('presentacionProducto').value,
                cantidadStock: parseInt(document.getElementById('cantidadStockProducto').value),
                isActive: productoActual.isActive  // Asegúrate de mantener el estado del producto
            };

            localStorage.setItem('Productos', JSON.stringify(productos));
            alert('Producto actualizado correctamente.');
            limpiarFormularioProducto();  // Limpia el formulario después de actualizar el producto
            limpiarListaProductos();
        } else {
            alert('Error: Producto no encontrado.');
        }
    } else {
        alert('No hay ningún producto cargado para editar.');
    }
}

function toggleEstadoProducto() {
    if (productoActual) {
        productoActual.isActive = !productoActual.isActive; // Cambia el estado de activo a inactivo y viceversa
        var productos = JSON.parse(localStorage.getItem('Productos')) || [];
        var index = productos.findIndex(p => p.codigo === productoActual.codigo);

        if (index !== -1) {
            productos[index] = productoActual;
            localStorage.setItem('Productos', JSON.stringify(productos));
            alert(productoActual.isActive ? 'Producto habilitado.' : 'Producto deshabilitado.');
            document.getElementById('estadoProducto').value = productoActual.isActive ? "Habilitado" : "Deshabilitado";  // Asegura que el input muestra el estado actualizado
        } else {
            alert('Error: Producto no encontrado.');
        }
    } else {
        alert('No hay ningún producto cargado para cambiar su estado.');
    }
}

function actualizarEstadoVisual(isActive) {
    var checkbox = document.getElementById('clienteActivo');  // Asegúrate de que este ID exista o ajusta según tu HTML
    if (checkbox) {
        checkbox.checked = isActive;
    }
}

function eliminarProducto() {
    if (productoActual) {
        var confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.");
        if (!confirmacion) {
            return;
        }

        var productos = JSON.parse(localStorage.getItem('Productos')) || [];
        var facturas = JSON.parse(localStorage.getItem('Facturas')) || [];
        var historialVentas = JSON.parse(localStorage.getItem('historial_ventas')) || [];
        var index = productos.findIndex(p => p.codigo === productoActual.codigo);

        if (index !== -1) {
            // Filtrar facturas que contienen este producto
            var facturasDelProducto = facturas.filter(factura =>
                factura.items.some(item => item.codigo === productos[index].codigo));

            // Agregar estas facturas al historial antes de eliminar el producto
            if (facturasDelProducto.length > 0) {
                historialVentas.push(...facturasDelProducto);
                localStorage.setItem('historial_ventas', JSON.stringify(historialVentas));
            }

            // Marcar el producto como eliminado
            productos[index].isDeleted = true;
            localStorage.setItem('Productos', JSON.stringify(productos));
            alert('Producto marcado como eliminado y ventas asociadas archivadas.');

            limpiarFormularioProducto();  // Limpia el formulario después de eliminar el producto
            limpiarListaProductos(); // Asegúrate de que esta función esté definida para actualizar la lista de productos
            productoActual = null;  // Resetear la variable productoActual
        } else {
            alert('Error: Producto no encontrado.');
        }
    } else {
        alert('No hay ningún producto cargado para eliminar.');
    }
}

function limpiarFormularioProducto() {
    // Implementación específica para limpiar el formulario de productos
}

function limpiarListaProductos() {
    // Implementación específica para actualizar la lista de productos
}

function limpiarFormularioProducto() {
    document.getElementById('codigoProducto').value = '';
    document.getElementById('nombreProducto').value = '';
    document.getElementById('descripcionProducto').value = '';
    document.getElementById('categoriaProducto').value = '';
    document.getElementById('precioProducto').value = '';
    document.getElementById('unidadMedidaProducto').value = '';
    document.getElementById('presentacionProducto').value = '';
    document.getElementById('cantidadStockProducto').value = '';
    document.getElementById('estadoProducto').value = '';  // Asegúrate de limpiar también el estado

    productoActual = null;  // Restablece el producto actual a null para evitar referencias erróneas
}

function limpiarListaProductos() {
    var listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = ''; // Limpia el contenido de la lista
}