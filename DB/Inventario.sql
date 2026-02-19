-- Tabla de categorías de los productos.
-- Cada categoría tiene un nombre único.
CREATE TABLE categorias (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL UNIQUE
);

-- Tabla de la información de los productos.
-- Incluye el código único, nombre del producto, categoría y precio.
CREATE TABLE productos (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    codigo TEXT UNIQUE NOT NULL,
    producto TEXT NOT NULL,
    categoria_id BIGINT NOT NULL REFERENCES categorias(id),
    precio NUMERIC(10, 2) NOT NULL
);

-- Tabla que almacena la información sobre la disponibilidad y estado de los productos en el inventario.
CREATE TABLE inventario (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    producto_id BIGINT NOT NULL REFERENCES productos(id),
    stock INTEGER NOT NULL,
    estado TEXT NOT NULL
);

-- Tabla que almacena la información de cada venta realizada.
-- Incluye el producto vendido, cantidad, precio total y fecha de la venta.
CREATE TABLE ventas (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    producto_id BIGINT NOT NULL REFERENCES productos(id),
    cantidad INTEGER NOT NULL,
    precio_total NUMERIC(10, 2) NOT NULL,
    fecha_venta TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Tabla que almacena la información de los proveedores.
-- Incluye el nombre, contacto y dirección del proveedor.
CREATE TABLE proveedores (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL,
    contacto TEXT,
    direccion TEXT
);

-- Tabla intermedia que relaciona proveedores con los productos que suministran.
CREATE TABLE proveedores_productos (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    proveedor_id BIGINT NOT NULL REFERENCES proveedores(id),
    producto_id BIGINT NOT NULL REFERENCES productos(id)
);

-- Tabla que define los roles disponibles en el sistema.
-- Ejemplos de roles: Admin, Vendedor, Revisor.
CREATE TABLE roles (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL UNIQUE
);

-- Tabla que define los permisos específicos que se pueden asignar a los roles.
-- Ejemplos de permisos: Crear, Leer, Actualizar, Eliminar.
CREATE TABLE permisos (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre TEXT NOT NULL UNIQUE
);

-- Tabla que almacena la información de los usuarios.
-- Incluye credenciales y el rol asignado a cada usuario.
CREATE TABLE usuarios (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    nombre_usuario TEXT NOT NULL UNIQUE,
    contraseña TEXT NOT NULL, -- Asegúrate de almacenar las contraseñas de forma segura (hashed).
    rol_id BIGINT NOT NULL REFERENCES roles(id)
);

-- Tabla intermedia que relaciona roles con permisos.
-- Indica qué acciones puede realizar cada rol.
CREATE TABLE roles_permisos (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    rol_id BIGINT NOT NULL REFERENCES roles(id),
    permiso_id BIGINT NOT NULL REFERENCES permisos(id)
);

-- Inserción de roles predeterminados en el sistema.
INSERT INTO roles (nombre) VALUES ('Admin'), ('Vendedor'), ('Revisor');

-- Inserción de permisos predeterminados en el sistema.
INSERT INTO permisos (nombre) VALUES ('Crear'), ('Leer'), ('Actualizar'), ('Eliminar');