/* ============================================
   ARCHIVO DE DATOS
   Maneja toda la información del sistema
   ============================================ */

// Objeto principal que maneja los datos
const BaseDatos = {
    
    // Nombres de las "tablas" en localStorage
    TABLAS: {
        PRODUCTOS: 'productos',
        USUARIOS: 'usuarios',
        SESION: 'sesion_activa'
    },

    // ===== FUNCIONES BÁSICAS =====
    
    // Guardar datos en localStorage
    guardar(nombreTabla, datos) {
        localStorage.setItem(nombreTabla, JSON.stringify(datos));
    },

    // Obtener datos de localStorage
    obtener(nombreTabla) {
        const datos = localStorage.getItem(nombreTabla);
        return datos ? JSON.parse(datos) : [];
    },

    // Generar un ID único simple
    generarId() {
        return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
    },

    // ===== USUARIOS =====
    
    // Iniciar sesión
    login(usuario, contrasena) {
        const usuarios = this.obtener(this.TABLAS.USUARIOS);
        
        // Buscar el usuario
        const usuarioEncontrado = usuarios.find(u => 
            u.usuario === usuario && u.contrasena === contrasena
        );

        if (usuarioEncontrado) {
            // Guardar sesión
            this.guardar(this.TABLAS.SESION, {
                nombre: usuarioEncontrado.nombre,
                usuario: usuarioEncontrado.usuario,
                rol: usuarioEncontrado.rol,
                loginTime: new Date().toISOString()
            });
            return true;
        }
        return false;
    },

    // Cerrar sesión
    logout() {
        localStorage.removeItem(this.TABLAS.SESION);
    },

    // Verificar si hay sesión activa
    tieneSesion() {
        return localStorage.getItem(this.TABLAS.SESION) !== null;
    },

    // Obtener datos de la sesión actual
    obtenerSesion() {
        const sesion = localStorage.getItem(this.TABLAS.SESION);
        return sesion ? JSON.parse(sesion) : null;
    },

    // ===== PRODUCTOS =====
    
    // Obtener todos los productos
    obtenerProductos() {
        return this.obtener(this.TABLAS.PRODUCTOS);
    },

    // Obtener un producto por su ID
    obtenerProductoPorId(id) {
        const productos = this.obtenerProductos();
        return productos.find(p => p.id === id);
    },

    // Agregar un nuevo producto
    agregarProducto(producto) {
        const productos = this.obtenerProductos();
        producto.id = this.generarId();
        producto.fechaCreacion = new Date().toISOString();
        productos.push(producto);
        this.guardar(this.TABLAS.PRODUCTOS, productos);
        return producto;
    },

    // Actualizar un producto existente
    actualizarProducto(id, datosNuevos) {
        const productos = this.obtenerProductos();
        const indice = productos.findIndex(p => p.id === id);
        
        if (indice !== -1) {
            productos[indice] = { ...productos[indice], ...datosNuevos };
            this.guardar(this.TABLAS.PRODUCTOS, productos);
            return true;
        }
        return false;
    },

    // Eliminar un producto
    eliminarProducto(id) {
        const productos = this.obtenerProductos();
        const productosFiltrados = productos.filter(p => p.id !== id);
        this.guardar(this.TABLAS.PRODUCTOS, productosFiltrados);
    },

    // Obtener productos con stock bajo
    obtenerProductosStockBajo() {
        const productos = this.obtenerProductos();
        return productos.filter(p => p.stock <= p.stockMinimo);
    },

    // ===== INICIALIZAR DATOS DE EJEMPLO =====
    
    inicializarDatos() {
        // Si ya hay datos, no hacer nada
        if (this.obtener(this.TABLAS.USUARIOS).length > 0) {
            return;
        }

        // Crear usuarios de ejemplo
        const usuarios = [
            {
                id: 'user1',
                usuario: 'admin',
                contrasena: 'admin123',
                nombre: 'Administrador',
                rol: 'Administrador'
            },
            {
                id: 'user2',
                usuario: 'vendedor',
                contrasena: 'vendedor123',
                nombre: 'Juan Pérez',
                rol: 'Vendedor'
            }
        ];

        // Crear productos de ejemplo
        const productos = [
            {
                id: 'prod1',
                nombre: 'Laptop HP',
                codigo: 'LAP-001',
                categoria: 'Electrónica',
                precio: 2500000,
                stock: 15,
                stockMinimo: 5,
                descripcion: 'Laptop HP Core i5, 8GB RAM',
                fechaCreacion: new Date().toISOString()
            },
            {
                id: 'prod2',
                nombre: 'Mouse Logitech',
                codigo: 'MOU-001',
                categoria: 'Periféricos',
                precio: 45000,
                stock: 3,
                stockMinimo: 10,
                descripcion: 'Mouse inalámbrico',
                fechaCreacion: new Date().toISOString()
            },
            {
                id: 'prod3',
                nombre: 'Teclado Mecánico',
                codigo: 'TEC-001',
                categoria: 'Periféricos',
                precio: 180000,
                stock: 25,
                stockMinimo: 8,
                descripcion: 'Teclado mecánico RGB',
                fechaCreacion: new Date().toISOString()
            },
            {
                id: 'prod4',
                nombre: 'Monitor 24 pulgadas',
                codigo: 'MON-001',
                categoria: 'Electrónica',
                precio: 650000,
                stock: 0,
                stockMinimo: 5,
                descripcion: 'Monitor Full HD',
                fechaCreacion: new Date().toISOString()
            },
            {
                id: 'prod5',
                nombre: 'Impresora HP',
                codigo: 'IMP-001',
                categoria: 'Oficina',
                precio: 450000,
                stock: 12,
                stockMinimo: 4,
                descripcion: 'Impresora multifuncional',
                fechaCreacion: new Date().toISOString()
            }
        ];

        // Guardar en localStorage
        this.guardar(this.TABLAS.USUARIOS, usuarios);
        this.guardar(this.TABLAS.PRODUCTOS, productos);
        
        console.log(' Datos de ejemplo cargados correctamente');
    },

    // Borrar todos los datos
    borrarTodo() {
        Object.values(this.TABLAS).forEach(tabla => {
            localStorage.removeItem(tabla);
        });
        this.inicializarDatos();
    }
};

// Inicializar datos cuando se carga la página
BaseDatos.inicializarDatos();
console.log(' datos.js cargado correctamente');
