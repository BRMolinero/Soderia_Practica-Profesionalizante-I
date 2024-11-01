CREATE DATABASE  IF NOT EXISTS `bdsoderia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bdsoderia`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bdsoderia
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `idCliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `telefono` varchar(25) NOT NULL,
  `correoElectronico` varchar(60) DEFAULT NULL,
  `fechaNacimiento` date NOT NULL,
  `DNI` varchar(10) DEFAULT NULL,
  `razonSocial` varchar(50) DEFAULT NULL,
  `cuitCuil` varchar(15) DEFAULT NULL,
  `idZona` int NOT NULL,
  `idTipoCliente` int NOT NULL,
  `estado` tinyint(1) NOT NULL,
  `calle` varchar(30) NOT NULL,
  `numeroCalle` int NOT NULL,
  `piso` int DEFAULT NULL,
  `numeroDepartamento` char(5) DEFAULT NULL,
  `idCondicionFiscal` int DEFAULT NULL,
  PRIMARY KEY (`idCliente`),
  KEY `idZona` (`idZona`),
  KEY `idTipoCliente` (`idTipoCliente`),
  KEY `FK_idCondicionFiscal` (`idCondicionFiscal`),
  CONSTRAINT `cliente_ibfk_1` FOREIGN KEY (`idZona`) REFERENCES `zona` (`idZona`) ON DELETE CASCADE,
  CONSTRAINT `cliente_ibfk_2` FOREIGN KEY (`idTipoCliente`) REFERENCES `tipocliente` (`idTipoCliente`) ON DELETE CASCADE,
  CONSTRAINT `FK_idCondicionFiscal` FOREIGN KEY (`idCondicionFiscal`) REFERENCES `condicionfiscal` (`idCondicionFiscal`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (9,'Sofía','Lopez','3534426378','lopezsofia@hotmail.com','1990-01-01','12445678','','',3,1,0,'Santiago del Estero',1043,NULL,'',2),(16,'Juan Carlos','Gómez','3564330866','juancarlosg@yahoo.com.ar','1998-10-14','12345678','PAE S.A.','21-12345678-2',6,2,0,'Caracas',123,NULL,'',4),(18,'María Emilia','Morales','3535123457','me.morales@gmail.com','1998-10-15','32345679','','24-32345679-3',2,2,0,'Córdoba',4,5,'',2),(20,'Nahuel','Grande','3535636247','grandenahuel@gmail.com','1998-10-06','41411202','Hernandez S.A.','20-41411202-2',6,1,0,'Colombia',1393,3,'',1),(23,'Javier','Sánchez','3535432123','lopezyasociados@gmail.com','1967-09-17','16934439','Lopez & Asociados','20-16934439-2',1,2,1,'Aguirre Cámara',1020,2,'F',4),(26,'Ana','Franco','3564354487','','2024-09-25','','','',5,1,1,'Velez',11,22,'4B',3),(27,'Gabriel','Blanco','3456784235','','2024-10-03','','','',1,1,0,'Lima',432,4,'4',4),(28,'Mara Soledad','Fernandez Bossio','3564483487','','2024-10-01','','','',3,1,1,'Resistencia',331,NULL,'',1),(29,'Marcos','Pérez','3464330976','','1999-07-05','','','',4,1,1,'Sobral',76,NULL,'',3),(30,'Claudia María','Arias','35644589068','arias.claudia@hotmail.com','2001-01-11','18654032','','22-18654032-2',3,1,1,'Córdoba',324,NULL,'',3),(31,'Ivana Paola','Garabello','3534237845','','1990-10-10','','','',1,1,1,'Córdoba',123,2,'3',1);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condicionfiscal`
--

DROP TABLE IF EXISTS `condicionfiscal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `condicionfiscal` (
  `idCondicionFiscal` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idCondicionFiscal`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condicionfiscal`
--

LOCK TABLES `condicionfiscal` WRITE;
/*!40000 ALTER TABLE `condicionfiscal` DISABLE KEYS */;
INSERT INTO `condicionfiscal` VALUES (1,'Consumidor final',1),(2,'Exento',1),(3,'Monotributista',1),(4,'Responsable inscripto',1);
/*!40000 ALTER TABLE `condicionfiscal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallepedido`
--

DROP TABLE IF EXISTS `detallepedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallepedido` (
  `idPedido` int NOT NULL,
  `idPrecioUnitario` int NOT NULL,
  `cantidad` int NOT NULL,
  PRIMARY KEY (`idPedido`,`idPrecioUnitario`),
  KEY `idPrecioUnitario` (`idPrecioUnitario`),
  CONSTRAINT `detallepedido_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`idPedido`) ON DELETE CASCADE,
  CONSTRAINT `detallepedido_ibfk_2` FOREIGN KEY (`idPrecioUnitario`) REFERENCES `preciounitario` (`idPrecioUnitario`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallepedido`
--

LOCK TABLES `detallepedido` WRITE;
/*!40000 ALTER TABLE `detallepedido` DISABLE KEYS */;
INSERT INTO `detallepedido` VALUES (39,2,2),(40,2,2),(44,1,4),(45,2,3),(46,1,15);
/*!40000 ALTER TABLE `detallepedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diaentrega`
--

DROP TABLE IF EXISTS `diaentrega`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diaentrega` (
  `idDiaEntrega` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idDiaEntrega`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diaentrega`
--

LOCK TABLES `diaentrega` WRITE;
/*!40000 ALTER TABLE `diaentrega` DISABLE KEYS */;
INSERT INTO `diaentrega` VALUES (1,'Lunes',1),(2,'Martes',1),(3,'Miércoles',1),(4,'Jueves',1),(5,'Viernes',1),(6,'Sábado',1),(7,'Domingo',0);
/*!40000 ALTER TABLE `diaentrega` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `idEmpleado` int NOT NULL AUTO_INCREMENT,
  `numeroLegajo` int NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `DNI` varchar(10) DEFAULT NULL,
  `telefono` varchar(25) NOT NULL,
  `domicilio` varchar(50) NOT NULL,
  `idLocalidad` int NOT NULL,
  `idUsuario` int NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idEmpleado`),
  KEY `idLocalidad` (`idLocalidad`),
  KEY `idUsuario` (`idUsuario`),
  CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`) ON DELETE CASCADE,
  CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,1,'Carlos','Martínez','1980-07-15','12345678','3564346790','San José 456',1,1,1),(2,2,'Laura','Fernández','1992-11-22','37654321','3564550934','Lima 789',1,2,1),(3,3,'María','Sánchez','1985-09-10','23456789','3564443346','Corrientes 123',1,3,1);
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadopedido`
--

DROP TABLE IF EXISTS `estadopedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadopedido` (
  `idEstadoPedido` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `descripcion` varchar(60) DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idEstadoPedido`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadopedido`
--

LOCK TABLES `estadopedido` WRITE;
/*!40000 ALTER TABLE `estadopedido` DISABLE KEYS */;
INSERT INTO `estadopedido` VALUES (1,'Pendiente','Pedido pendiente de realizar',1),(2,'En Proceso','Pedido en preparacion o envió',1),(3,'Entregado','Pedido entregado al cliente',1),(4,'Cancelado','Pedido cancelado por cliente o repartidor',1);
/*!40000 ALTER TABLE `estadopedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `frecuencia`
--

DROP TABLE IF EXISTS `frecuencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `frecuencia` (
  `idFrecuencia` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idFrecuencia`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `frecuencia`
--

LOCK TABLES `frecuencia` WRITE;
/*!40000 ALTER TABLE `frecuencia` DISABLE KEYS */;
INSERT INTO `frecuencia` VALUES (1,'Semanal',1),(2,'Quincenal',1),(3,'Mensual',1);
/*!40000 ALTER TABLE `frecuencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidad`
--

DROP TABLE IF EXISTS `localidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidad` (
  `idLocalidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idLocalidad`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidad`
--

LOCK TABLES `localidad` WRITE;
/*!40000 ALTER TABLE `localidad` DISABLE KEYS */;
INSERT INTO `localidad` VALUES (1,'Devoto',1),(2,'San Francisco',1);
/*!40000 ALTER TABLE `localidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marca`
--

DROP TABLE IF EXISTS `marca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `marca` (
  `idMarca` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idMarca`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marca`
--

LOCK TABLES `marca` WRITE;
/*!40000 ALTER TABLE `marca` DISABLE KEYS */;
INSERT INTO `marca` VALUES (1,'Marca A',1),(2,'Marca B',1);
/*!40000 ALTER TABLE `marca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modelo`
--

DROP TABLE IF EXISTS `modelo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modelo` (
  `idModelo` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `idMarca` int NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idModelo`),
  KEY `idMarca` (`idMarca`),
  CONSTRAINT `modelo_ibfk_1` FOREIGN KEY (`idMarca`) REFERENCES `marca` (`idMarca`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modelo`
--

LOCK TABLES `modelo` WRITE;
/*!40000 ALTER TABLE `modelo` DISABLE KEYS */;
INSERT INTO `modelo` VALUES (1,'Modelo X',1,1),(2,'Modelo Y',2,1);
/*!40000 ALTER TABLE `modelo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modopago`
--

DROP TABLE IF EXISTS `modopago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modopago` (
  `idModoPago` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(20) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idModoPago`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modopago`
--

LOCK TABLES `modopago` WRITE;
/*!40000 ALTER TABLE `modopago` DISABLE KEYS */;
INSERT INTO `modopago` VALUES (1,'Débito',1),(2,'Efectivo',1),(3,'Transferencia',1);
/*!40000 ALTER TABLE `modopago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `idPedido` int NOT NULL AUTO_INCREMENT,
  `numeroPedido` int NOT NULL,
  `fechaPedido` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `idCliente` int NOT NULL,
  `direccionEntregaDiferente` varchar(255) DEFAULT NULL,
  `recurrente` tinyint(1) NOT NULL,
  `idDiaEntrega` int DEFAULT NULL,
  `idFrecuencia` int DEFAULT NULL,
  `idModoPago` int NOT NULL,
  `idEstadoPedido` int NOT NULL,
  PRIMARY KEY (`idPedido`),
  KEY `idCliente` (`idCliente`),
  KEY `idDiaEntrega` (`idDiaEntrega`),
  KEY `idFrecuencia` (`idFrecuencia`),
  KEY `idModoPago` (`idModoPago`),
  KEY `idEstadoPedido` (`idEstadoPedido`),
  CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `cliente` (`idCliente`) ON DELETE CASCADE,
  CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`idDiaEntrega`) REFERENCES `diaentrega` (`idDiaEntrega`) ON DELETE CASCADE,
  CONSTRAINT `pedido_ibfk_3` FOREIGN KEY (`idFrecuencia`) REFERENCES `frecuencia` (`idFrecuencia`) ON DELETE CASCADE,
  CONSTRAINT `pedido_ibfk_4` FOREIGN KEY (`idModoPago`) REFERENCES `modopago` (`idModoPago`) ON DELETE CASCADE,
  CONSTRAINT `pedido_ibfk_5` FOREIGN KEY (`idEstadoPedido`) REFERENCES `estadopedido` (`idEstadoPedido`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (39,81354,'2024-11-09 03:00:00',30,NULL,0,NULL,NULL,2,1),(40,314947,'2024-10-14 03:00:00',30,NULL,0,NULL,NULL,1,3),(44,532922,'2024-11-05 03:00:00',29,NULL,1,3,2,2,4),(45,599969,'2024-11-07 03:00:00',28,'',0,NULL,NULL,3,1),(46,23075,'2024-11-02 03:00:00',29,NULL,0,NULL,NULL,1,1);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preciounitario`
--

DROP TABLE IF EXISTS `preciounitario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preciounitario` (
  `idPrecioUnitario` int NOT NULL AUTO_INCREMENT,
  `fechaActualizacion` datetime NOT NULL,
  `monto` decimal(13,2) NOT NULL,
  `idProducto` int NOT NULL,
  `idTipoCliente` int NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idPrecioUnitario`),
  KEY `idProducto` (`idProducto`),
  KEY `idTipoCliente` (`idTipoCliente`),
  CONSTRAINT `preciounitario_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`idProducto`) ON DELETE CASCADE,
  CONSTRAINT `preciounitario_ibfk_2` FOREIGN KEY (`idTipoCliente`) REFERENCES `tipocliente` (`idTipoCliente`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preciounitario`
--

LOCK TABLES `preciounitario` WRITE;
/*!40000 ALTER TABLE `preciounitario` DISABLE KEYS */;
INSERT INTO `preciounitario` VALUES (1,'2024-10-14 17:11:21',1000.00,27,1,1),(2,'2024-10-14 17:11:21',500.00,26,1,1),(3,'2024-10-14 17:11:54',800.00,27,2,1),(4,'2024-10-14 17:11:50',400.00,26,2,1),(5,'2024-10-14 17:11:50',2000.00,25,1,1),(6,'2024-10-14 17:11:50',1800.00,25,2,1),(7,'2024-10-14 17:11:50',3000.00,24,1,1),(8,'2024-10-14 17:11:50',2700.00,24,2,1),(9,'2024-10-14 17:11:50',1500.00,23,1,1),(10,'2024-10-14 17:11:50',1300.00,23,2,1),(11,'2024-10-30 17:59:35',1200.00,22,1,1),(12,'2024-10-30 17:59:35',1000.00,22,2,1),(13,'2024-10-14 17:11:50',1400.00,21,1,1),(14,'2024-10-14 17:11:50',1200.00,21,2,1),(15,'2024-10-14 17:11:50',1800.00,20,1,1),(16,'2024-10-14 17:11:50',1600.00,20,2,1);
/*!40000 ALTER TABLE `preciounitario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `idProducto` int NOT NULL AUTO_INCREMENT,
  `codigoInterno` int NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `presentacion` varchar(50) NOT NULL,
  `stockMinimo` int NOT NULL,
  `stock` int NOT NULL,
  `idTipoProducto` int NOT NULL,
  `idProveedor` int NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idProducto`),
  UNIQUE KEY `codigoInterno` (`codigoInterno`),
  KEY `idTipoProducto` (`idTipoProducto`),
  KEY `idProveedor` (`idProveedor`),
  CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`idTipoProducto`) REFERENCES `tipoproducto` (`idTipoProducto`) ON DELETE CASCADE,
  CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`idProveedor`) REFERENCES `proveedor` (`idProveedor`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (20,7,'Cilindro de Gas Chico','Cilindro de Gas 45kg',10,100,2,1,1),(21,8,'Cilindro de Gas Grande','Cilindro de Gas 60kg',10,100,2,1,1),(22,3,'Botellón de Agua Chico','Botellón de Agua 12L',20,100,1,1,1),(23,4,'Botellón de Agua Grande','Botellón de Agua 20L',10,100,1,1,1),(24,5,'Garrafa de Gas Chica','Garrafa de Gas 10kg',10,100,2,1,1),(25,6,'Garrafa de Gas Mediana','Garrafa de Gas 15kg',10,100,2,1,1),(26,2,'Soda en Sifón Chico','Soda en Sifón 500cc',10,100,3,2,1),(27,1,'Soda en Sifón Grande','Soda en Sifón 1500cc',10,100,3,2,1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `idProveedor` int NOT NULL AUTO_INCREMENT,
  `razonSocial` varchar(40) NOT NULL,
  `cuit` varchar(15) NOT NULL,
  `telefono` varchar(25) NOT NULL,
  `correoElectronico` varchar(60) DEFAULT NULL,
  `domicilio` varchar(50) NOT NULL,
  `idLocalidad` int NOT NULL,
  `idRubro` int NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idProveedor`),
  KEY `idLocalidad` (`idLocalidad`),
  KEY `idRubro` (`idRubro`),
  CONSTRAINT `proveedor_ibfk_1` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`) ON DELETE CASCADE,
  CONSTRAINT `proveedor_ibfk_2` FOREIGN KEY (`idRubro`) REFERENCES `rubro` (`idRubro`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
INSERT INTO `proveedor` VALUES (1,'Proveedor A','12-33345678-3','3564455678','contacto@proveedorA.com','Rivadavia 742',1,1,1),(2,'Proveedor B','20-14654321-5','3564345677','','Santa Fe 123',1,2,1);
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recorrido`
--

DROP TABLE IF EXISTS `recorrido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recorrido` (
  `idRecorrido` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `descripcion` varchar(60) DEFAULT NULL,
  `idZona` int NOT NULL,
  `idVehiculo` int NOT NULL,
  `idEmpleado` int NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idRecorrido`),
  KEY `idZona` (`idZona`),
  KEY `idVehiculo` (`idVehiculo`),
  KEY `idEmpleado` (`idEmpleado`),
  CONSTRAINT `recorrido_ibfk_1` FOREIGN KEY (`idZona`) REFERENCES `zona` (`idZona`) ON DELETE CASCADE,
  CONSTRAINT `recorrido_ibfk_2` FOREIGN KEY (`idVehiculo`) REFERENCES `vehiculo` (`idVehiculo`) ON DELETE CASCADE,
  CONSTRAINT `recorrido_ibfk_3` FOREIGN KEY (`idEmpleado`) REFERENCES `empleado` (`idEmpleado`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recorrido`
--

LOCK TABLES `recorrido` WRITE;
/*!40000 ALTER TABLE `recorrido` DISABLE KEYS */;
/*!40000 ALTER TABLE `recorrido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolusuario`
--

DROP TABLE IF EXISTS `rolusuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolusuario` (
  `idRolUsuario` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idRolUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolusuario`
--

LOCK TABLES `rolusuario` WRITE;
/*!40000 ALTER TABLE `rolusuario` DISABLE KEYS */;
INSERT INTO `rolusuario` VALUES (1,'Administrador',1),(2,'Supervisor',1),(3,'Usuario',1);
/*!40000 ALTER TABLE `rolusuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rubro`
--

DROP TABLE IF EXISTS `rubro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rubro` (
  `idRubro` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idRubro`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rubro`
--

LOCK TABLES `rubro` WRITE;
/*!40000 ALTER TABLE `rubro` DISABLE KEYS */;
INSERT INTO `rubro` VALUES (1,'Agua',1),(2,'Gas',1),(3,'Soda',1);
/*!40000 ALTER TABLE `rubro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipocliente`
--

DROP TABLE IF EXISTS `tipocliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipocliente` (
  `idTipoCliente` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `descripcion` varchar(60) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idTipoCliente`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipocliente`
--

LOCK TABLES `tipocliente` WRITE;
/*!40000 ALTER TABLE `tipocliente` DISABLE KEYS */;
INSERT INTO `tipocliente` VALUES (1,'Minorista','Cliente particular',1),(2,'Mayorista','Cliente que compra al por mayor',1);
/*!40000 ALTER TABLE `tipocliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoproducto`
--

DROP TABLE IF EXISTS `tipoproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoproducto` (
  `idTipoProducto` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idTipoProducto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoproducto`
--

LOCK TABLES `tipoproducto` WRITE;
/*!40000 ALTER TABLE `tipoproducto` DISABLE KEYS */;
INSERT INTO `tipoproducto` VALUES (1,'Agua',1),(2,'Gas',1),(3,'Soda',1);
/*!40000 ALTER TABLE `tipoproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `nombreUsuario` varchar(50) NOT NULL,
  `contrasenia` varchar(30) NOT NULL,
  `correoElectronico` varchar(60) NOT NULL,
  `fechaRegistro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ultimoAcceso` timestamp NULL DEFAULT NULL,
  `idRolUsuario` int NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE KEY `nombreUsuario` (`nombreUsuario`),
  UNIQUE KEY `correoElectronico` (`correoElectronico`),
  KEY `idRolUsuario` (`idRolUsuario`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`idRolUsuario`) REFERENCES `rolusuario` (`idRolUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'carlosm','contrasenia1','carlos.martinez@gmail.com','2024-09-22 22:24:46',NULL,3,1),(2,'lauraf','contraseña2','laura.fernandez@gmail.com','2024-09-22 22:24:46',NULL,2,2),(3,'marias','contraseña3','maria.sanchez@gmail.com','2024-09-22 22:24:46',NULL,3,1);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehiculo`
--

DROP TABLE IF EXISTS `vehiculo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vehiculo` (
  `idVehiculo` int NOT NULL AUTO_INCREMENT,
  `dominio` varchar(20) NOT NULL,
  `numeroChasis` varchar(20) NOT NULL,
  `numeroMotor` varchar(20) NOT NULL,
  `idModelo` int NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idVehiculo`),
  KEY `idModelo` (`idModelo`),
  CONSTRAINT `vehiculo_ibfk_1` FOREIGN KEY (`idModelo`) REFERENCES `modelo` (`idModelo`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehiculo`
--

LOCK TABLES `vehiculo` WRITE;
/*!40000 ALTER TABLE `vehiculo` DISABLE KEYS */;
INSERT INTO `vehiculo` VALUES (1,'NBC473','1HGBH41JXMN109186 ','KLREZ11234567',1,1),(2,'AF027EA','2C3KA63H36H123456','EZNID7654321',2,1);
/*!40000 ALTER TABLE `vehiculo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zona`
--

DROP TABLE IF EXISTS `zona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zona` (
  `idZona` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) NOT NULL,
  `idLocalidad` int NOT NULL,
  `estado` tinyint(1) NOT NULL,
  PRIMARY KEY (`idZona`),
  KEY `idLocalidad` (`idLocalidad`),
  CONSTRAINT `zona_ibfk_1` FOREIGN KEY (`idLocalidad`) REFERENCES `localidad` (`idLocalidad`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zona`
--

LOCK TABLES `zona` WRITE;
/*!40000 ALTER TABLE `zona` DISABLE KEYS */;
INSERT INTO `zona` VALUES (1,'Centro',1,1),(2,'Este',1,1),(3,'Norte',1,1),(4,'Oeste',1,1),(5,'Sur',1,1),(6,'Centro',2,1);
/*!40000 ALTER TABLE `zona` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-01 20:19:02
