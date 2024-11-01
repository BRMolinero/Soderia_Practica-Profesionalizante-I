const db = require('../db/db');

const tipoCliente = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          t.idTipoCliente,
          t.nombre,
          t.descripcion,
          t.estado
        FROM tipoCliente AS t
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM tipoCliente WHERE idTipoCliente = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  },
};

const zona = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          z.idZona,
          z.nombre AS zona,
          l.nombre AS localidad,
          z.idLocalidad,
          z.estado
        FROM zona AS z
          INNER JOIN localidad AS l ON z.idLocalidad = l.idLocalidad
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query(`
        SELECT 
          z.idZona,
          z.nombre AS zona,
          l.nombre AS localidad,
          z.estado
        FROM zona AS z
          INNER JOIN localidad AS l ON z.idLocalidad = l.idLocalidad
        WHERE z.idZona = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  },
};

const localidad = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          l.idLocalidad,
          l.nombre AS localidad,
          l.estado
        FROM localidad AS l
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM localidad WHERE idLocalidad = ?', [id]);
    return rows[0];
  },
};

const condicionFiscal = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          co.idCondicionFiscal,
          co.nombre AS condicionFiscal,
          co.estado
        FROM condicionFiscal AS co
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM condicionFiscal WHERE idCondicionFiscal = ?', [id]);
    return rows[0];
  },
};


const modoPago = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          mp.idModoPago,
          mp.nombre AS modoPago,
          mp.estado
        FROM modoPago AS mp
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM modoPago WHERE idModoPago = ?', [id]);
    return rows[0];
  },
};

const estadoPedido = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          ep.idEstadoPedido,
          ep.nombre AS estadoPedido,
          ep.estado
        FROM estadoPedido AS ep
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM estadoPedido WHERE idEstadoPedido = ?', [id]);
    return rows[0];
  },
};

const frecuencia = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          f.idFrecuencia,
          f.nombre AS frecuencia,
          f.estado
        FROM frecuencia AS f
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM frecuencia WHERE idFrecuencia = ?', [id]);
    return rows[0];
  },
};

const dia = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          de.idDiaEntrega,
          de.nombre AS diaEntrega,
          de.estado
        FROM diaEntrega AS de
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM frecuencia WHERE diaEntrega = ?', [id]);
    return rows[0];
  },
};

/* Productos */
const producto = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
         p.idProducto, 
         p.codigoInterno,
         p.nombre,
         p.presentacion,
         p.stockMinimo,
         p.stock,
         tp.nombre as tipoProducto,
         pr.razonSocial as proveedor,
         p.estado
        FROM producto AS p
        INNER JOIN tipoProducto as tp on p.idTipoProducto = tp.idTipoProducto
        INNER JOIN proveedor as pr on p.idProveedor = pr.idProveedor
      `);
      return rows;
    } catch (error) {
      console.error('Error en traer todos los productos:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query('SELECT * FROM producto WHERE idProducto = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error en tratar de traer un producto en específico:', error);
      throw error;
    }
  },
};

const tipoProducto = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          tp.idTipoProducto,
          tp.nombre AS tipoProducto,
          tp.estado
        FROM tipoProducto AS tp
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query(`
        SELECT * FROM tipoProducto WHERE idTipoProducto = ?`, [id]);
      return rows[0];
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  },
};

const proveedor = {
  getAll: async () => {
    try {
      const [rows] = await db.query(`
        SELECT 
          pr.idProveedor,
          pr.razonSocial,
          pr.cuit,
          pr.telefono,
          pr.correoElectronico,
          pr.domicilio,
          l.nombre AS localidad,
          r.nombre AS rubro,
          pr.estado
        FROM proveedor AS pr
        INNER JOIN localidad AS l ON pr.idLocalidad = l.idLocalidad
        INNER JOIN rubro AS r ON r.idRubro = pr.idRubro
        ORDER BY pr.razonSocial DESC
      `);
      return rows;
    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const [rows] = await db.query(`
        SELECT * FROM proveedor WHERE idProveedor = ?`, [id]);
      return rows[0];
    } catch (error) {
      console.error('Error en getById:', error);
      throw error;
    }
  },
};

module.exports = {
  tipoCliente,
  zona,
  localidad,
  condicionFiscal,
  modoPago,
  estadoPedido,
  frecuencia,
  dia,
  producto,
  tipoProducto,
  proveedor
};