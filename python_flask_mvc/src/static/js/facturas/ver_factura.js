function buscarFacturasPorFecha() {
    let fechaIngresada = document.getElementById('fechaConsulta').value;
    let facturas = JSON.parse(localStorage.getItem('Facturas')) || [];
    let contenedor = document.getElementById('listaFacturas');
    contenedor.innerHTML = ''; // Limpia contenido anterior

    // Asegúrate de comparar solo la parte de la fecha de cada factura
    let facturasFiltradas = facturas.filter(factura => factura.fecha.split(' ')[0] === fechaIngresada);

    if (facturasFiltradas.length > 0) {
        facturasFiltradas.forEach(factura => {
            contenedor.innerHTML += `
            <tr>
            <td>${factura.id}</td>
            <td>${factura.fecha}</td>
            <td>${factura.cliente}</td>
            <td>$${factura.total}</td>
            <td><button class="btn btn-info btn-sm" onclick="mostrarDetallesFactura('${factura.id}')">Ver Detalles</button></td>
            </tr>
            `;
        });
    } else {
        contenedor.innerHTML = '<tr><td colspan="5" class="text-center">No se encontraron facturas para la fecha seleccionada.</td></tr>';
    }
}


function mostrarDetallesFactura(idFactura) {
    let facturas = JSON.parse(localStorage.getItem('Facturas')) || [];
    let facturaEncontrada = facturas.find(factura => factura.id === idFactura);

    if (facturaEncontrada) {
        let detalleHtml = `
            <p><strong>ID:</strong> ${facturaEncontrada.id}</p>
            <p><strong>Fecha:</strong> ${facturaEncontrada.fecha} ${facturaEncontrada.hora}</p>
            <p><strong>Cliente:</strong> ${facturaEncontrada.cliente}</p>
            <p><strong>Vendedor:</strong> ${facturaEncontrada.vendedor}</p> <!-- Muestra el vendedor aquí -->
            <p><strong>Total:</strong> $${facturaEncontrada.total}</p>
            <p><strong>Monto Pagado:</strong> $${facturaEncontrada.montoPagado.toFixed(2)}</p>
            <p><strong>Cambio:</strong> $${facturaEncontrada.cambio.toFixed(2)}</p>
            <div><strong>Items:</strong></div>
            <ul>
                ${facturaEncontrada.items.map(item => `<li>${item.producto} - ${item.cantidad} x $${item.precioUnitario} = $${item.subtotal}</li>`).join('')}
            </ul>
            `;

        document.getElementById('detalleFacturaContent').innerHTML = detalleHtml;
        var myModal = new bootstrap.Modal(document.getElementById('facturaModal'));
        myModal.show();
    } else {
        alert("Detalles de factura no encontrados.");
    }
}


function cargarFacturas() {
    let facturas = JSON.parse(localStorage.getItem('Facturas')) || [];
    console.log(facturas);  // Verifica qué se está cargando realmente
    let contenedor = document.getElementById('listaFacturas');
    contenedor.innerHTML = ''; // Limpia contenido anterior
    facturas.forEach((factura, index) => {
        contenedor.innerHTML += `<div>Factura ${factura.id} - ${factura.fecha} - Total: $${factura.total}</div>`;
    });
}
