# 🏢 SERVIOPCIÓN - Sistema de Inventario

Sistema web para gestión de inventario con localStorage.

## 📋 Características

✅ Login seguro con usuarios y contraseñas
✅ Dashboard con estadísticas en tiempo real
✅ Gestión completa de productos (Agregar, Editar, Eliminar)
✅ Alertas de stock bajo
✅ Búsqueda de productos
✅ Interfaz moderna y responsive
✅ Sin necesidad de servidor o base de datos

## 🚀 Instalación

1. **Descomprime el archivo ZIP**
2. **Abre index.html** en tu navegador
3. ¡Listo! Ya puedes usar el sistema

## 👤 Usuarios de Prueba

### Administrador
- Usuario: `admin`
- Contraseña: `admin123`

### Vendedor
- Usuario: `vendedor`
- Contraseña: `vendedor123`

## 📁 Estructura del Proyecto

```
serviopcion-simple/
├── index.html          (Página de login)
├── dashboard.html      (Panel principal)
├── productos.html      (Gestión de productos)
├── css/
│   └── estilo.css     (Estilos del sistema)
└── js/
    ├── datos.js       (Base de datos localStorage)
    ├── login.js       (Lógica del login)
    ├── dashboard.js   (Lógica del dashboard)
    └── productos.js   (Lógica de productos)
```

## 💡 Cómo Usar

### 1. Iniciar Sesión
- Abre `index.html` en tu navegador
- Ingresa usuario y contraseña
- Haz clic en "Iniciar Sesión"

### 2. Dashboard
- Visualiza estadísticas del inventario
- Revisa productos con stock bajo
- Navega a Productos para gestionar

### 3. Gestión de Productos
- **Agregar:** Clic en "Agregar Producto"
- **Editar:** Clic en el botón "✏️ Editar"
- **Eliminar:** Clic en el botón "🗑️ Eliminar"
- **Buscar:** Usa la barra de búsqueda

## 🔧 Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- LocalStorage

## 📱 Responsive

El sistema funciona perfectamente en:
- 💻 Computadoras
- 📱 Tablets
- 📱 Teléfonos móviles

## ⚙️ Configuración

### Cambiar Datos Iniciales

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

Luego recarga la página (F5).

## 🐛 Solución de Problemas

### Problema: No carga los estilos
**Solución:** Verifica que la carpeta `css/` esté en la misma ubicación que `index.html`

### Problema: No funciona el login
**Solución:** Abre la consola (F12) y verifica que no haya errores. Revisa que `js/datos.js` se haya cargado.

### Problema: Los datos no se guardan
**Solución:** El navegador debe permitir localStorage. Verifica que no estés en modo incógnito.

## 📝 Notas Importantes

⚠️ Los datos se guardan en el navegador (localStorage)
⚠️ Si borras el caché del navegador, perderás los datos
⚠️ Los datos NO se sincronizan entre dispositivos
⚠️ Para uso en producción, migra a una base de datos real

## 🔜 Próximas Mejoras

- [ ] Exportar datos a Excel
- [ ] Reportes e impresión
- [ ] Categorías personalizadas
- [ ] Historial de movimientos
- [ ] Múltiples usuarios con permisos
- [ ] Conexión a base de datos (Firebase/MySQL)

## 📧 Soporte

Si tienes problemas o preguntas:
1. Revisa este README
2. Abre la consola del navegador (F12) para ver errores
3. Verifica que todos los archivos estén en su lugar

## 📄 Licencia

Proyecto educativo - Libre uso

---

✨ **¡Disfruta usando Serviopción!** ✨
