function cargarUsuarios() {
    const usuarios = JSON.parse(localStorage.getItem('Vendedores')) || [];
    const tableBody = document.getElementById('usuariosTable');
    tableBody.innerHTML = '';
    usuarios.forEach(user => {
        const row = `<tr>
        <td>${user.tipoDocumento} - ${user.numeroDocumento}</td>
        <td>${user.nombre}</td>
        <td>${user.username || 'No asignado'}</td>
        <td><button class="btn btn-primary" onclick="mostrarModalEditar('${user.tipoDocumento}', '${user.numeroDocumento}')">Editar</button></td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function mostrarModalEditar(tipoDocumento, numeroDocumento) {
    const usuarios = JSON.parse(localStorage.getItem('Vendedores'));
    const usuario = usuarios.find(u => u.tipoDocumento === tipoDocumento && u.numeroDocumento === numeroDocumento);
    if (usuario) {
        document.getElementById('editNombreUsuario').value = usuario.username || '';
        document.getElementById('editContrasenaUsuario').value = usuario.password || '';
        document.getElementById('editUsuarioCedula').value = `${usuario.tipoDocumento}-${usuario.numeroDocumento}`;  // Guarda tipo y número juntos
        var myModal = new bootstrap.Modal(document.getElementById('editUserModal'));
        myModal.show();
    }
}

function guardarCambiosUsuario() {
    const id = document.getElementById('editUsuarioCedula').value.split('-'); // Separar tipo y número
    const tipoDocumento = id[0];
    const numeroDocumento = id[1];
    const username = document.getElementById('editNombreUsuario').value;
    const password = document.getElementById('editContrasenaUsuario').value;
    const usuarios = JSON.parse(localStorage.getItem('Vendedores'));
    const index = usuarios.findIndex(u => u.tipoDocumento === tipoDocumento && u.numeroDocumento === numeroDocumento);

    if (index !== -1) {
        usuarios[index].username = username;
        usuarios[index].password = password;
        localStorage.setItem('Vendedores', JSON.stringify(usuarios));
        alert('Usuario actualizado con éxito');
    }
}

document.addEventListener('DOMContentLoaded', cargarUsuarios);