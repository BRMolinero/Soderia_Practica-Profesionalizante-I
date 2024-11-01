const Producto = require('../models/productoModel');

exports.getAllProducto = async (req, res) => {
  try {
    const filter = req.query; // Extraemos los filtros de req.query
    const producto = await Producto.getAll(filter); // Pasamos los filtros al modelo
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllListaPrecios = async (req, res) => {
  console.log("Solicitud recibida en /lista-precios"); // Confirma que la solicitud llega aquí
  try {
      const filter = req.query;
      const listaPrecios = await Producto.getAllListaPrecios(filter);
      res.json(listaPrecios);
  } catch (err) {
      console.error("Error en el controlador:", err);
      res.status(500).json({ error: err.message });
  }
};

// Obtener un Producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.getById(id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener lista de precios general
exports.getListaPrecios = async (req, res) => {
  try {
    const listaPrecio = await Producto.getAllListaPrecio();
    res.json(listaPrecio);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo Producto
exports.createProducto = async (req, res) => {
  try {
    const nuevoProducto = req.body;
    const producto = await Producto.create(nuevoProducto);
    res.status(201).json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un Producto existente
exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    const producto = await Producto.update(id, datosActualizados);
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deshabilitar un Producto
exports.deshabilitarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.delete(id, { estado: 0 }); // Cambiar solo el estado a 0
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};