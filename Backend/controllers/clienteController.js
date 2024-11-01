const Cliente = require('../models/clienteModel');

exports.getAllCliente = async (req, res) => {
  try {
    const filter = req.query; // Extraemos los filtros de req.query
    const cliente = await Cliente.getAll(filter); // Pasamos los filtros al modelo
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.getById(id);
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ message: 'Cliente no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
  try {
    const nuevoCliente = req.body;
    const cliente = await Cliente.create(nuevoCliente);
    res.status(201).json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un cliente existente
exports.updateCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;
    const cliente = await Cliente.update(id, datosActualizados);
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Deshabilitar un cliente
exports.deshabilitarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const cliente = await Cliente.delete(id, { estado: 0 }); // Cambiar solo el estado a 0
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};