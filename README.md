# Sistema de Inventario

Sistema web para gestión de inventario con localStorage.

 Login seguro con usuarios y contraseñas
 Dashboard con estadísticas en tiempo real
 Gestión completa de productos (Agregar, Editar, Eliminar)
 Alertas de stock bajo
 Búsqueda de productos
 Interfaz moderna y responsive
 Sin necesidad de servidor o base de datos por el momentooo

# Administrador
- Usuario: `admin`
- Contraseña: `admin123`

#Vendedor
- Usuario: `vendedor`
- Contraseña: `vendedor123`

2. Dashboard
- Visualiza estadísticas del inventario
- Revisa productos con stock bajo
- Navega a Productos para gestionar

Configuración

Cambiar Datos Iniciales

Edita el archivo `js/datos.js` en la función `inicializarDatos()`:

```javascript
// Agregar más usuarios
const usuarios = [
    {
        id: 'user3',
        usuario: 'miusuario',
        contrasena: 'mipassword',
        nombre: 'Mi Nombre',
        rol: 'Mi Rol'
    }
];

// Agregar más productos
const productos = [
    {
        id: 'prod6',
        nombre: 'Nuevo Producto',
        codigo: 'NP-001',
        categoria: 'Categoría',
        precio: 100000,
        stock: 50,
        stockMinimo: 10,
        descripcion: 'Descripción del producto'
    }
];
```

### Borrar Todos los Datos

Abre la consola del navegador (F12) y ejecuta:

```javascript
BaseDatos.borrarTodo();
```
 Los datos se guardan en el navegador (localStorage)
 Si borras el caché del navegador, perderás los datos
 Los datos NO se sincronizan entre dispositivos
 Para uso en producción, migra a una base de datos real

