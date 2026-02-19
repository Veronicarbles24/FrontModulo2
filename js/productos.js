/* ============================================
   LÓGICA DE GESTIÓN DE PRODUCTOS
   ============================================ */

// Verificar que haya sesión activa
if (!BaseDatos.tieneSesion()) {
    window.location.href = 'index.html';
}

// Mostrar información del usuario
const sesion = BaseDatos.obtenerSesion();
document.getElementById('nombreUsuario').textContent = sesion.nombre;
document.getElementById('rolUsuario').textContent = sesion.rol;

// Variable para saber si estamos editando
let productoEditandoId = null;

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
        BaseDatos.logout();
        window.location.href = 'index.html';
    }
}

// Función para formatear números como moneda
function formatearMoneda(numero) {
    return '$' + numero.toLocaleString('es-CO');
}

// Función para obtener el badge de estado de stock
function obtenerBadgeStock(stock, stockMinimo) {
    if (stock === 0) {
        return '<span class="badge badge-rojo">Sin Stock</span>';
    } else if (stock <= stockMinimo) {
        return '<span class="badge badge-amarillo">Stock Bajo</span>';
    } else {
        return '<span class="badge badge-verde">Disponible</span>';
    }
}

// Función para mostrar todos los productos en la tabla
function mostrarProductos() {
    const productos = BaseDatos.obtenerProductos();
    const tbody = document.getElementById('cuerpoTablaProductos');
    
    // Limpiar tabla
    tbody.innerHTML = '';
    
    if (productos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 20px; color: #666;">
                    No hay productos registrados. ¡Agrega tu primer producto!
                </td>
            </tr>
        `;
        return;
    }
    
    // Agregar cada producto a la tabla
    productos.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td><strong>${producto.nombre}</strong></td>
            <td>${producto.categoria}</td>
            <td>${formatearMoneda(producto.precio)}</td>
            <td>${producto.stock}</td>
            <td>${obtenerBadgeStock(producto.stock, producto.stockMinimo)}</td>
            <td>
                <button class="btn-editar" onclick="editarProducto('${producto.id}')">
                    ✏️ Editar
                </button>
                <button class="btn-eliminar" onclick="eliminarProducto('${producto.id}')">
                    🗑️ Eliminar
                </button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

// Función para abrir el modal para agregar producto
function abrirModalAgregar() {
    productoEditandoId = null;
    document.getElementById('tituloModal').textContent = 'Agregar Producto';
    document.getElementById('formularioProducto').reset();
    document.getElementById('modalProducto').classList.add('mostrar');
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById('modalProducto').classList.remove('mostrar');
    productoEditandoId = null;
}

// Función para editar un producto
function editarProducto(id) {
    const producto = BaseDatos.obtenerProductoPorId(id);
    
    if (!producto) {
        alert('Producto no encontrado');
        return;
    }
    
    // Guardar el ID del producto que estamos editando
    productoEditandoId = id;
    
    // Cambiar título del modal
    document.getElementById('tituloModal').textContent = 'Editar Producto';
    
    // Llenar el formulario con los datos del producto
    document.getElementById('codigo').value = producto.codigo;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('categoria').value = producto.categoria;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('stock').value = producto.stock;
    document.getElementById('stockMinimo').value = producto.stockMinimo;
    document.getElementById('descripcion').value = producto.descripcion || '';
    
    // Mostrar el modal
    document.getElementById('modalProducto').classList.add('mostrar');
}

// Función para eliminar un producto
function eliminarProducto(id) {
    const producto = BaseDatos.obtenerProductoPorId(id);
    
    if (!producto) {
        alert('Producto no encontrado');
        return;
    }
    
    if (confirm(`¿Estás seguro de eliminar "${producto.nombre}"?`)) {
        BaseDatos.eliminarProducto(id);
        mostrarProductos();
        alert('Producto eliminado correctamente');
    }
}

// Manejar el envío del formulario
document.getElementById('formularioProducto').addEventListener('submit', function(evento) {
    evento.preventDefault();
    
    // Obtener los datos del formulario
    const datosProducto = {
        codigo: document.getElementById('codigo').value,
        nombre: document.getElementById('nombre').value,
        categoria: document.getElementById('categoria').value,
        precio: parseFloat(document.getElementById('precio').value),
        stock: parseInt(document.getElementById('stock').value),
        stockMinimo: parseInt(document.getElementById('stockMinimo').value),
        descripcion: document.getElementById('descripcion').value
    };
    
    // Si estamos editando, actualizar; si no, agregar nuevo
    if (productoEditandoId) {
        BaseDatos.actualizarProducto(productoEditandoId, datosProducto);
        alert(' Producto actualizado correctamente');
    } else {
        BaseDatos.agregarProducto(datosProducto);
        alert(' Producto agregado correctamente');
    }
    
    // Cerrar modal y actualizar tabla
    cerrarModal();
    mostrarProductos();
});

// Función para buscar productos
document.getElementById('buscarProducto').addEventListener('input', function() {
    const textoBusqueda = this.value.toLowerCase();
    const filas = document.querySelectorAll('#cuerpoTablaProductos tr');
    
    filas.forEach(fila => {
        const texto = fila.textContent.toLowerCase();
        
        if (texto.includes(textoBusqueda)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
});

// Cerrar modal al hacer clic fuera de él
document.getElementById('modalProducto').addEventListener('click', function(evento) {
    if (evento.target === this) {
        cerrarModal();
    }
});

// Cargar productos al iniciar
mostrarProductos();

console.log(' productos.js cargado correctamente');
