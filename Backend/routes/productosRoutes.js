const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Obtener todos los Producto
router.get('/', productoController.getAllProducto);

// Obtener un Producto por ID
router.get('/:id', productoController.getProductoById);

// Crear un nuevo Producto
router.post('/', productoController.createProducto);

// Actualizar un Producto existente
router.put('/:id', productoController.updateProducto);

// Deshabilitar Producto
router.put('/deshabilitar/:id', productoController.deshabilitarProducto);

// Obtener la lista de precios
router.get('/lista-precios', productoController.getAllListaPrecios);

router.get('/test', (req, res) => {
    res.send("Ruta de prueba funcionando");
});

module.exports = router;