/* ============================================
   LÓGICA DEL DASHBOARD
   ============================================ */

// Verificar que haya sesión activa
if (!BaseDatos.tieneSesion()) {
    window.location.href = 'index.html';
}

// Mostrar información del usuario
const sesion = BaseDatos.obtenerSesion();
document.getElementById('nombreUsuario').textContent = sesion.nombre;
document.getElementById('rolUsuario').textContent = sesion.rol;

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

// Función para calcular estadísticas
function calcularEstadisticas() {
    const productos = BaseDatos.obtenerProductos();
    
    // Total de productos
    const totalProductos = productos.length;
    
    // Valor total del inventario
    const valorInventario = productos.reduce((total, producto) => {
        return total + (producto.precio * producto.stock);
    }, 0);
    
    // Productos con stock bajo (incluyendo sin stock)
    const productosStockBajo = productos.filter(p => p.stock <= p.stockMinimo);
    
    // Productos sin stock
    const productosSinStock = productos.filter(p => p.stock === 0);
    
    return {
        totalProductos,
        valorInventario,
        stockBajo: productosStockBajo.length,
        sinStock: productosSinStock.length
    };
}

// Función para mostrar estadísticas en las tarjetas
function mostrarEstadisticas() {
    const stats = calcularEstadisticas();
    
    document.getElementById('totalProductos').textContent = stats.totalProductos;
    document.getElementById('valorInventario').textContent = formatearMoneda(stats.valorInventario);
    document.getElementById('stockBajo').textContent = stats.stockBajo;
    document.getElementById('sinStock').textContent = stats.sinStock;
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

// Función para mostrar productos con stock bajo
function mostrarProductosStockBajo() {
    const productosStockBajo = BaseDatos.obtenerProductosStockBajo();
    const tbody = document.getElementById('cuerpoTablaAlertas');
    
    // Limpiar tabla
    tbody.innerHTML = '';
    
    if (productosStockBajo.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 20px; color: #666;">
                     No hay productos con stock bajo
                </td>
            </tr>
        `;
        return;
    }
    
    // Agregar cada producto a la tabla
    productosStockBajo.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td><strong>${producto.nombre}</strong></td>
            <td>${producto.stock}</td>
            <td>${producto.stockMinimo}</td>
            <td>${obtenerBadgeStock(producto.stock, producto.stockMinimo)}</td>
        `;
        tbody.appendChild(fila);
    });
}

// Inicializar el dashboard al cargar la página
mostrarEstadisticas();
mostrarProductosStockBajo();

console.log('dashboard.js cargado correctamente');
