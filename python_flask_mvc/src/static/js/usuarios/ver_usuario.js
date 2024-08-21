function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('Vendedores')) || [];
    const tableBody = document.getElementById('usuariosTable');
    tableBody.innerHTML = '';

    usuarios.forEach(user => {
        const documento = `${user.tipoDocumento} - ${user.numeroDocumento}`; // Combina tipo y número de documento
        const row = `<tr>
        <td>${documento}</td>
        <td>${user.nombre}</td>
        <td>${user.apellido}</td>
        <td>${user.email}</td>
        <td>${user.username || 'No asignado'}</td>
    </tr>`;
        tableBody.innerHTML += row;
    });
}

window.onload = cargarUsuarios; // Carga los usuarios cuando la página está lista