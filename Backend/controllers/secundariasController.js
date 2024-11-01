const Secundarias = require('../models/secundariasModel');

/* TIPO CLIENTE---------------------------------------------------------------- */
exports.getAllTipoCliente = async (req, res) => {
  try {
    const tipoCliente = await Secundarias.tipoCliente.getAll(); 
    res.json(tipoCliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTipoClienteById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoCliente = await Secundarias.tipoCliente.getById(id);
    if (tipoCliente) {
      res.json(tipoCliente);
    } else {
      res.status(404).json({ message: 'Tipo de Cliente no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ZONA-------------------------------------------------------------------------- */
exports.getAllZona = async (req, res) => {
  try {
    const zona = await Secundarias.zona.getAll();
    res.json(zona);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getZonaById = async (req, res) => {
  try {
    const { id } = req.params;
    const zona = await Secundarias.zona.getById(id);
    if (zona) {
      res.json(zona);
    } else {
      res.status(404).json({ message: 'Zona no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOCALIDAD------------------------------------------------------------------- */
exports.getAllLocalidad = async (req, res) => {
  try {
    const localidad = await Secundarias.localidad.getAll();
    res.json(localidad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLocalidadById = async (req, res) => {
  try {
    const { id } = req.params;
    const localidad = await Secundarias.localidad.getById(id);
    if (localidad) {
      res.json(localidad);
    } else {
      res.status(404).json({ message: 'Localidad no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* CONDICION FISCAL ------------------------------------------------------------------- */
exports.getAllCondicionFiscal = async (req, res) => {
  try {
    const condicionFiscal = await Secundarias.condicionFiscal.getAll();
    res.json(condicionFiscal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCondicionFiscalById = async (req, res) => {
  try {
    const { id } = req.params;
    const condicionFiscal = await Secundarias.condicionFiscal.getById(id);
    if (condicionFiscal) {
      res.json(condicionFiscal);
    } else {
      res.status(404).json({ message: 'Condición Fiscal no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Modo de pago */
exports.getAllModoPago = async (req, res) => {
  try {
    const modoPago = await Secundarias.modoPago.getAll();
    res.json(modoPago);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getModoPagoById = async (req, res) => {
  try {
    const { id } = req.params;
    const modoPago = await Secundarias.modoPago.getById(id);
    if (modoPago) {
      res.json(modoPago);
    } else {
      res.status(404).json({ message: 'Modo Pago no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Estado de pago */
exports.getAllEstadoPedido = async (req, res) => {
  try {
    const estadoPedido = await Secundarias.estadoPedido.getAll();
    res.json(estadoPedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEstadoPedidoById = async (req, res) => {
  try {
    const { id } = req.params;
    const estadoPedido = await Secundarias.estadoPedido.getById(id);
    if (estadoPedido) {
      res.json(estadoPedido);
    } else {
      res.status(404).json({ message: 'Estado Pedido no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Dia */
exports.getAllDia = async (req, res) => {
  try {
    const dia = await Secundarias.dia.getAll();
    res.json(dia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDiaById = async (req, res) => {
  try {
    const { id } = req.params;
    const dia = await Secundarias.dia.getById(id);
    if (dia) {
      res.json(dia);
    } else {
      res.status(404).json({ message: 'Día no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Frecuencia */
exports.getAllFrecuencia = async (req, res) => {
  try {
    const frecuencia = await Secundarias.frecuencia.getAll();
    res.json(frecuencia);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFrecuenciaById = async (req, res) => {
  try {
    const { id } = req.params;
    const frecuencia = await Secundarias.frecuencia.getById(id);
    if (frecuencia) {
      res.json(frecuencia);
    } else {
      res.status(404).json({ message: 'Frecuencia no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Productos --> despues hacer un archivo propio cuando tenga que hacer el ABM d esto para el final*/
exports.getAllProducto = async (req, res) => {
  try {
    const producto  = await Secundarias.producto.getAll(); 
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Secundarias.producto.getById(id);
    if (producto) {
      res.json(producto);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Tipo de Producto */
exports.getAllTipoProducto = async (req, res) => {
  try {
    const tipoProducto = await Secundarias.tipoProducto.getAll();
    res.json(tipoProducto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTipoProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoProducto = await Secundarias.tipoProducto.getById(id);
    if (tipoProducto) {
      res.json(tipoProducto);
    } else {
      res.status(404).json({ message: 'Tipo de producto no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* Proveedor */
exports.getAllProveedor = async (req, res) => {
  try {
    const proveedor = await Secundarias.proveedor.getAll();
    res.json(proveedor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProveedorById = async (req, res) => {
  try {
    const { id } = req.params;
    const proveedor = await Secundarias.proveedor.getById(id);
    if (proveedor) {
      res.json(proveedor);
    } else {
      res.status(404).json({ message: 'Proveedor no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};