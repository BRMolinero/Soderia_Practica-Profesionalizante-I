const express = require('express');
const router = express.Router();

/* Secundarias -----------------------------------------------------------*/
const secundariasController = require('../controllers/secundariasController');


/* Tipo de cliente -----------------------------------------------------------*/
router.get('/tipo-cliente', secundariasController.getAllTipoCliente);

router.get('/tipo-cliente/:id', secundariasController.getTipoClienteById);

/* Zona -------------------------------------------------------------------------*/
router.get('/zona', secundariasController.getAllZona);

router.get('/zona/:id', secundariasController.getZonaById);

/* Localidad --------------------------------------------------------------------*/
router.get('/localidad', secundariasController.getAllLocalidad);

router.get('/localidad/:id', secundariasController.getLocalidadById);

/* Condicion Fiscal --------------------------------------------------------------------*/
router.get('/condicion-fiscal', secundariasController.getAllCondicionFiscal);

router.get('/condicion-fiscal/:id', secundariasController.getCondicionFiscalById);

/* Modo de pago ---------------------------------------------------------------------*/
router.get('/modo-pago', secundariasController.getAllModoPago);

router.get('/modo-pago/:id', secundariasController.getModoPagoById);

/* Estado de pedido ---------------------------------------------------------------------*/
router.get('/estado-pedido', secundariasController.getAllEstadoPedido);

router.get('/estado-pedido/:id', secundariasController.getEstadoPedidoById);

/* Frecuencia ---------------------------------------------------------------------*/
router.get('/frecuencia', secundariasController.getAllFrecuencia);

router.get('/frecuencia/:id', secundariasController.getFrecuenciaById);

/* Dias Entrega ---------------------------------------------------------------------*/
router.get('/dia', secundariasController.getAllDia);

router.get('/dia/:id', secundariasController.getDiaById);

/* Producto ---------------------------------------------------------------------*/
router.get('/producto', secundariasController.getAllProducto);

router.get('/producto/:id', secundariasController.getProductoById);

/* Tipo de Producto ---------------------------------------------------------------------*/
router.get('/tipo-producto', secundariasController.getAllTipoProducto);

router.get('/tipo-producto/:id', secundariasController.getTipoProductoById);

/* Proveedor ---------------------------------------------------------------------*/
router.get('/proveedor', secundariasController.getAllProveedor);

router.get('/proveedor/:id', secundariasController.getProveedorById);

module.exports = router;
