-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-08-2024 a las 01:06:14
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `factu_barrio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL,
  `Categoria` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`idcategoria`, `Categoria`) VALUES
(2, 'abarrotes'),
(4, 'bebidas'),
(5, 'carnes y embutidos'),
(6, 'frutas y verduras'),
(3, 'lacteos'),
(7, 'limpieza y hogar'),
(8, 'panaderia'),
(1, 'Sin Categoría');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `idclientes` int(11) NOT NULL,
  `tipo_documento` varchar(10) NOT NULL,
  `numero_documento` varchar(20) NOT NULL,
  `nombres_cliente` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion_iddireccion` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`idclientes`, `tipo_documento`, `numero_documento`, `nombres_cliente`, `telefono`, `direccion_iddireccion`, `email`) VALUES
(13, 'CC', '123456789', 'Juan Pérez', '3111234567', 1, 'juan.perez@factubarrio.com'),
(14, 'CC', '987654321', 'María Rodríguez', '3129876543', 2, 'maria.rodriguez@factubarrio.com'),
(15, 'NIT', '900123456', 'Empresa XYZ', '3151239876', 3, 'contacto@empresaxyz.com'),
(16, 'CE', '654321987', 'Ana María Hernández', '3136543219', 5, 'ana.hernandez@factubarrio.com'),
(17, 'CC', '789123456', 'Luisa Fernández', '3187891234', 8, 'luisa.fernandez@factubarrio.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_producto`
--

CREATE TABLE `detalle_producto` (
  `factura_idfactura` int(11) NOT NULL,
  `productos_idproductos` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL,
  `total_precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalle_producto`
--

INSERT INTO `detalle_producto` (`factura_idfactura`, `productos_idproductos`, `cantidad`, `precio_unitario`, `total_precio`) VALUES
(1, 1, 10, 2500.00, 25000.00),
(1, 2, 5, 1200.00, 6000.00),
(2, 3, 10, 800.00, 8000.00),
(2, 4, 20, 1500.00, 30000.00),
(3, 5, 5, 3500.00, 17500.00),
(3, 7, 2, 2800.00, 5600.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--

CREATE TABLE `direccion` (
  `iddireccion` int(11) NOT NULL,
  `tipo_via` varchar(20) NOT NULL,
  `numero_via` int(11) NOT NULL,
  `letra_bis` varchar(2) DEFAULT NULL,
  `numero_via_secundaria` int(11) NOT NULL,
  `numero_placa` int(11) NOT NULL,
  `detalles_adicionales` varchar(100) DEFAULT NULL,
  `barrio` varchar(50) NOT NULL DEFAULT 'desconocido',
  `ciudad` varchar(50) NOT NULL DEFAULT 'desconocido',
  `municipio` varchar(50) NOT NULL DEFAULT 'desconocido',
  `pais` varchar(50) NOT NULL DEFAULT 'desconocido'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `direccion`
--

INSERT INTO `direccion` (`iddireccion`, `tipo_via`, `numero_via`, `letra_bis`, `numero_via_secundaria`, `numero_placa`, `detalles_adicionales`, `barrio`, `ciudad`, `municipio`, `pais`) VALUES
(1, 'Calle', 26, 'A', 34, 15, 'Apartamento 301', 'Chapinero', 'Bogotá', 'Bogotá', 'Colombia'),
(2, 'Carrera', 15, NULL, 45, 12, 'Casa', 'El Poblado', 'Medellín', 'Medellín', 'Colombia'),
(3, 'Avenida', 6, 'B', 30, 10, 'Edificio Central', 'Centro', 'Cali', 'Cali', 'Colombia'),
(5, 'Carrera', 9, 'C', 23, 45, 'Apartamento 502', 'San Antonio', 'Pereira', 'Pereira', 'Colombia'),
(6, 'Calle', 11, NULL, 22, 33, 'Casa esquinera', 'Santa Rosa', 'Manizales', 'Manizales', 'Colombia'),
(7, 'Avenida', 7, 'D', 40, 20, 'Centro Comercial', 'Versalles', 'Barranquilla', 'Barranquilla', 'Colombia'),
(8, 'Carrera', 22, 'E', 14, 9, 'Conjunto Residencial', 'La Flora', 'Cali', 'Cali', 'Colombia'),
(10, 'Avenida', 5, NULL, 60, 18, 'Oficina 204', 'Centro Internacional', 'Bogotá', 'Bogotá', 'Colombia'),
(11, 'Calle', 12, 'F', 50, 17, 'Apartamento 101', 'San Victorino', 'Bogotá', 'Bogotá', 'Colombia'),
(12, 'Carrera', 18, NULL, 67, 34, 'Casa bifamiliar', 'Las Acacias', 'Medellín', 'Medellín', 'Colombia'),
(14, 'Calle', 5, NULL, 14, 11, 'Conjunto Los Pinos', 'Ciudad Jardín', 'Cali', 'Cali', 'Colombia'),
(15, 'Carrera', 21, 'H', 31, 77, 'Oficina 301', 'Centro', 'Bucaramanga', 'Bucaramanga', 'Colombia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `idfactura` int(11) NOT NULL,
  `clientes_idclientes` int(11) NOT NULL,
  `vendedores_idvendedores` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `total_valor` decimal(10,2) NOT NULL,
  `impuesto` decimal(10,2) NOT NULL,
  `descuento` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura`
--

INSERT INTO `factura` (`idfactura`, `clientes_idclientes`, `vendedores_idvendedores`, `fecha`, `hora`, `total_valor`, `impuesto`, `descuento`) VALUES
(1, 14, 3, '2024-08-15', '10:30:00', 25000.00, 3000.00, 500.00),
(2, 17, 5, '2024-08-14', '14:45:00', 40000.00, 4800.00, 800.00),
(3, 13, 2, '2024-08-13', '09:15:00', 18000.00, 2160.00, 300.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `idproductos` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `categoria_idcategoria` int(11) DEFAULT 1,
  `unidad_medida_idunidad_medida` int(11) DEFAULT 1,
  `presentacion` varchar(50) DEFAULT NULL,
  `cantidad_stock` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`idproductos`, `nombre`, `descripcion`, `categoria_idcategoria`, `unidad_medida_idunidad_medida`, `presentacion`, `cantidad_stock`, `precio_unitario`) VALUES
(1, 'Arroz', 'Arroz blanco de grano largo', 2, 7, 'Bolsa', 100, 2500.00),
(2, 'Leche', 'Leche entera pasteurizada', 3, 8, 'Botella', 50, 1200.00),
(3, 'Jabón', 'Jabón de tocador', 7, 10, 'caja', 200, 800.00),
(4, 'Pan', 'Pan integral de molde', 8, 4, 'Paquete', 100, 1500.00),
(5, 'Aceite', 'Aceite vegetal', 2, 3, 'Botella', 60, 3500.00),
(6, 'Azúcar', 'Azúcar blanca refinada', 2, NULL, 'Bolsa', 150, 1800.00),
(7, 'Mantequilla', 'Mantequilla con sal', 2, NULL, 'Tarrina', 40, 2800.00),
(8, 'Papel Higiénico', 'Papel higiénico doble hoja', NULL, 4, 'Paquete', 80, 4200.00),
(9, 'Detergente', 'Detergente en polvo', NULL, 4, 'bolsa', 90, 3000.00),
(10, 'Galletas', 'Galletas de chocolate', NULL, NULL, 'Paquete', 75, 2200.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_medida`
--

CREATE TABLE `unidad_medida` (
  `idunidad_medida` int(11) NOT NULL,
  `unidad_medida` varchar(20) NOT NULL,
  `unidad_padre_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `unidad_medida`
--

INSERT INTO `unidad_medida` (`idunidad_medida`, `unidad_medida`, `unidad_padre_id`) VALUES
(1, 'Sin Unidad', NULL),
(2, 'Kilogramo', NULL),
(3, 'Litro', NULL),
(4, 'Unidad', NULL),
(5, 'Paquete', NULL),
(6, 'Caja', NULL),
(7, 'Gramo', 2),
(8, 'Mililitro', 3),
(9, 'Botella', 5),
(10, 'sachet', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vendedores`
--

CREATE TABLE `vendedores` (
  `idvendedores` int(11) NOT NULL,
  `tipo_documento` varchar(10) NOT NULL,
  `numero_documento` varchar(20) NOT NULL,
  `nombres_vendedor` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion_iddireccion` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vendedores`
--

INSERT INTO `vendedores` (`idvendedores`, `tipo_documento`, `numero_documento`, `nombres_vendedor`, `telefono`, `direccion_iddireccion`, `email`) VALUES
(1, 'CC', '1029384756', 'Sofía Ramírez', '3111029384', 15, 'sofia.ramirez@ejemplo.com'),
(2, 'CC', '5647382910', 'Miguel Torres', '3105647382', 6, 'miguel.torres@ejemplo.com'),
(3, 'CE', '1092837465', 'Valentina Morales', '3151092837', 12, 'valentina.morales@ejemplo.com'),
(4, 'CC', '4321987650', 'Camila López', '3204321987', 7, 'camila.lopez@ejemplo.com'),
(5, 'CC', '7685940321', 'Andrés García', '3177685940', 11, 'andres.garcia@ejemplo.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idcategoria`),
  ADD UNIQUE KEY `Categoria` (`Categoria`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`idclientes`),
  ADD UNIQUE KEY `numero_documento` (`numero_documento`),
  ADD KEY `direccion_iddireccion` (`direccion_iddireccion`);

--
-- Indices de la tabla `detalle_producto`
--
ALTER TABLE `detalle_producto`
  ADD PRIMARY KEY (`factura_idfactura`,`productos_idproductos`),
  ADD KEY `productos_idproductos` (`productos_idproductos`);

--
-- Indices de la tabla `direccion`
--
ALTER TABLE `direccion`
  ADD PRIMARY KEY (`iddireccion`),
  ADD KEY `idx_ciudad` (`ciudad`),
  ADD KEY `idx_barrio` (`barrio`),
  ADD KEY `idx_pais` (`pais`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idfactura`),
  ADD KEY `clientes_idclientes` (`clientes_idclientes`),
  ADD KEY `vendedores_idvendedores` (`vendedores_idvendedores`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`idproductos`),
  ADD KEY `categoria_idcategoria` (`categoria_idcategoria`),
  ADD KEY `unidad_medida_idunidad_medida` (`unidad_medida_idunidad_medida`);

--
-- Indices de la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  ADD PRIMARY KEY (`idunidad_medida`),
  ADD UNIQUE KEY `unidad_medida` (`unidad_medida`),
  ADD KEY `unidad_padre_id` (`unidad_padre_id`);

--
-- Indices de la tabla `vendedores`
--
ALTER TABLE `vendedores`
  ADD PRIMARY KEY (`idvendedores`),
  ADD UNIQUE KEY `numero_documento` (`numero_documento`),
  ADD KEY `direccion_iddireccion` (`direccion_iddireccion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idcategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `idclientes` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `direccion`
--
ALTER TABLE `direccion`
  MODIFY `iddireccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `idfactura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `idproductos` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  MODIFY `idunidad_medida` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `vendedores`
--
ALTER TABLE `vendedores`
  MODIFY `idvendedores` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`direccion_iddireccion`) REFERENCES `direccion` (`iddireccion`);

--
-- Filtros para la tabla `detalle_producto`
--
ALTER TABLE `detalle_producto`
  ADD CONSTRAINT `detalle_producto_ibfk_1` FOREIGN KEY (`factura_idfactura`) REFERENCES `factura` (`idfactura`),
  ADD CONSTRAINT `detalle_producto_ibfk_2` FOREIGN KEY (`productos_idproductos`) REFERENCES `productos` (`idproductos`);

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`clientes_idclientes`) REFERENCES `clientes` (`idclientes`),
  ADD CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`vendedores_idvendedores`) REFERENCES `vendedores` (`idvendedores`);

--
-- Filtros para la tabla `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`categoria_idcategoria`) REFERENCES `categoria` (`idcategoria`),
  ADD CONSTRAINT `productos_ibfk_2` FOREIGN KEY (`unidad_medida_idunidad_medida`) REFERENCES `unidad_medida` (`idunidad_medida`);

--
-- Filtros para la tabla `unidad_medida`
--
ALTER TABLE `unidad_medida`
  ADD CONSTRAINT `unidad_medida_ibfk_1` FOREIGN KEY (`unidad_padre_id`) REFERENCES `unidad_medida` (`idunidad_medida`);

--
-- Filtros para la tabla `vendedores`
--
ALTER TABLE `vendedores`
  ADD CONSTRAINT `vendedores_ibfk_1` FOREIGN KEY (`direccion_iddireccion`) REFERENCES `direccion` (`iddireccion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
