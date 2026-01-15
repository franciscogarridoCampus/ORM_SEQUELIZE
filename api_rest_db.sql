DROP DATABASE IF EXISTS api_rest_db;
CREATE DATABASE api_rest_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE api_rest_db;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- =========================
-- TABLA: categorias
-- =========================
CREATE TABLE categorias (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================
-- TABLA: clientes
-- =========================
CREATE TABLE clientes (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  email varchar(150) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================
-- TABLA: productos
-- =========================
CREATE TABLE productos (
  id int(11) NOT NULL AUTO_INCREMENT,
  nombre varchar(100) NOT NULL,
  precio decimal(10,2) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================
-- TABLA: pedidos
-- =========================
CREATE TABLE pedidos (
  id int(11) NOT NULL AUTO_INCREMENT,
  cliente_id int(11) NOT NULL,
  fecha datetime DEFAULT current_timestamp(),
  PRIMARY KEY (id),
  KEY cliente_id (cliente_id),
  CONSTRAINT pedidos_ibfk_1
    FOREIGN KEY (cliente_id) REFERENCES clientes (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================
-- TABLA: detalles_pedido
-- =========================
CREATE TABLE detalles_pedido (
  id int(11) NOT NULL AUTO_INCREMENT,
  pedido_id int(11) NOT NULL,
  producto_id int(11) NOT NULL,
  cantidad int(11) NOT NULL,
  PRIMARY KEY (id),
  KEY pedido_id (pedido_id),
  KEY producto_id (producto_id),
  CONSTRAINT detalles_pedido_ibfk_1
    FOREIGN KEY (pedido_id) REFERENCES pedidos (id),
  CONSTRAINT detalles_pedido_ibfk_2
    FOREIGN KEY (producto_id) REFERENCES productos (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- =========================
-- TABLA: log
-- =========================
CREATE TABLE log (
  id int(11) NOT NULL AUTO_INCREMENT,
  log text NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;
