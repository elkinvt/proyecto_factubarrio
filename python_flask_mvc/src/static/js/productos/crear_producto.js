function guardarProducto(event) {
    event.preventDefault(); // Previene el envío automático del formulario

    var codigo = document.getElementById('codigoProducto').value.trim();
    var nombre = document.getElementById('nombreProducto').value.trim();
    var descripcion = document.getElementById('descripcionProducto').value.trim();
    var categoria = document.getElementById('categoriaProducto').value.trim();
    var precio = parseFloat(document.getElementById('precioProducto').value);
    var unidadMedida = document.getElementById('unidadMedidaProducto').value;
    var presentacion = document.getElementById('presentacionProducto').value.trim();
    var cantidadStock = parseInt(document.getElementById('cantidadStockProducto').value);
    var isActive = true;

    if (!codigo || !nombre || !descripcion || !categoria || isNaN(precio) || !unidadMedida || !presentacion || isNaN(cantidadStock)) {
        alert("Por favor complete todos los campos correctamente.");
        return;
    }

    var productos = JSON.parse(localStorage.getItem('Productos')) || [];

    if (productos.some(producto => producto.codigo === codigo)) {
        alert("Un producto con este código ya existe.");
        return;
    }

    var producto = {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion,
        categoria: categoria,
        precio: precio,
        unidadMedida: unidadMedida,
        presentacion: presentacion,
        cantidadStock: cantidadStock,
        isActive: isActive,
        isDeleted: false  // Nuevo campo para la eliminación lógica
    };

    productos.push(producto);
    localStorage.setItem('Productos', JSON.stringify(productos));
    alert("Producto guardado con éxito!");
    document.getElementById('formCrearProducto').reset(); // Limpiar el formulario después de guardar
}