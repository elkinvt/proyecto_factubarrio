function handleKeyPress(event) {
    if (event.key === "Enter") {
         event.preventDefault();  // Previene que el formulario se envíe
        buscarProducto();  // Llama a la función que ejecuta la búsqueda
    }
}

function buscarProducto() {
    var textoBusqueda = document.getElementById('buscarProductoInput').value.trim().toLowerCase();
    document.getElementById('buscarProductoInput').value = '';
    var productos = JSON.parse(localStorage.getItem('Productos')) || [];
    var productosFiltrados = productos.filter(producto => 
    (producto.codigo.toLowerCase().includes(textoBusqueda) || 
    producto.nombre.toLowerCase().includes(textoBusqueda)) &&
    !producto.isDeleted);

    var listaProductos = document.getElementById('listaProductos');
    listaProductos.innerHTML = '';
    listaProductos.style.visibility = productosFiltrados.length > 0 ? 'visible' : 'hidden';

    if (productosFiltrados.length === 0) {
        listaProductos.innerHTML = '<div class="list-group-item">No se encontraron productos con el término buscado.</div>';
        listaProductos.style.visibility = 'visible';  // Asegura que el mensaje sea visible
    } else {
        productosFiltrados.forEach(producto => {
        var item = document.createElement('button');
        item.classList.add('list-group-item', 'list-group-item-action');
        item.textContent = `${producto.nombre} - ${producto.codigo}`;
        item.onclick = () => cargarProducto(producto);
        listaProductos.appendChild(item);
        });
        listaProductos.style.visibility = 'visible';  // Asegura que la lista sea visible
    }
}

function cargarProducto(producto) {
    document.getElementById('codigoProducto').value = producto.codigo;
    document.getElementById('nombreProducto').value = producto.nombre;
    document.getElementById('descripcionProducto').value = producto.descripcion;
    document.getElementById('categoriaProducto').value = producto.categoria;
    document.getElementById('precioProducto').value = producto.precio;
    document.getElementById('presentacionProducto').value = producto.presentacion;
    document.getElementById('cantidadStockProducto').value = producto.cantidadStock;
    document.getElementById('estadoProducto').value = producto.isActive ? "Habilitado" : "Deshabilitado";
    document.getElementById('unidadMedidaProducto').value = producto.unidadMedida;

    // Mostrar los detalles del producto si está presente
    document.getElementById('infoProducto').style.visibility = 'visible';
}