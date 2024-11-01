const db = require('../db/db');

const pedido = {
  getAll: async (filter) => {
    try {
      let query = `
      SELECT
        p.idPedido,
        p.idCliente,
        p.numeroPedido,
        DATE_FORMAT(p.fechaPedido, '%d-%m-%Y') AS fechaPedido, 
        c.nombre as nombreCliente,
        c.apellido as apellidoCliente,
        p.direccionEntregaDiferente,
        p.recurrente,
        de.nombre as diaEntrega,
        de.idDiaEntrega as idDiaEntrega,
        f.nombre as frecuencia,
        f.idFrecuencia as idFrecuencia,
        mp.nombre as modoPago,
        mp.idModoPago as idModoPago,
        ep.nombre as estadoPedido,
        c.calle as calle,
        c.numeroCalle as numeroCalle,
        c.piso as piso,
        c.numeroDepartamento as numeroDepartamento,
        p.idEstadoPedido as idEstadoPedido
      FROM 
        pedido as p
        INNER JOIN cliente as c ON c.idCliente = p.idCliente
        LEFT JOIN diaEntrega as de ON p.idDiaEntrega = de.idDiaEntrega
        LEFT JOIN frecuencia as f ON p.idFrecuencia = f.idFrecuencia
        INNER JOIN modoPago as mp ON p.idModoPago = mp.idModoPago
        INNER JOIN estadoPedido as ep ON p.idEstadoPedido = ep.idEstadoPedido
      WHERE 1=1
      order by p.idEstadoPedido asc, p.fechaPedido asc, c.apellido asc`;
      const queryParams = [];

      // Ejecutamos la consulta con los parámetros correspondientes
      const [rows] = await db.query(query, queryParams);
      return rows;


    } catch (error) {
      console.error('Error en getAll:', error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM pedido WHERE idPedido = ? ', [id]);
    return rows[0];
  },

  getDetallesPedido: async (idPedido, idTipoCliente) => {
    try {
      // Paso 1: Obtener los detalles del pedido
      const query = `
        SELECT 
          dp.cantidad,
          pu.idProducto,
          pu.monto,
          p.nombre
        FROM 
          DetallePedido as dp
        INNER JOIN 
          PrecioUnitario as pu ON dp.idPrecioUnitario = pu.idPrecioUnitario
        INNER JOIN 
          Producto as p ON pu.idProducto = p.idProducto
        WHERE 
          dp.idPedido = ? AND pu.idTipoCliente = ?
      `;
  
      const [detalles] = await db.query(query, [idPedido, idTipoCliente]);
  
      // Verificar si se encontraron detalles
      if (!detalles || detalles.length === 0) {
        return null; // O lanzar un error, según lo que prefieras
      }
  
      // Formar el resultado
      const detallesCompletos = detalles.map(detalle => ({
        idProducto: detalle.idProducto,
        producto: detalle.nombre || 'Producto no encontrado',
        cantidad: detalle.cantidad,
        precioUnitario: detalle.monto,
        subtotal: detalle.cantidad * detalle.monto,
      }));
  
      return detallesCompletos;
    } catch (err) {
      throw new Error(err.message); // Manejo de errores
    }
  },

  create: async (pedido) => {
    try {
      // Validación básica
      /*   if (!pedido || !pedido.numeroPedido) {
          throw new Error('Faltan datos obligatorios');
        }
   */
      const {
        numeroPedido,
        fechaPedido,
        idCliente,
        direccionEntregaDiferente,
        recurrente,
        idDiaEntrega,
        idFrecuencia,
        idModoPago,
        idEstadoPedido,
        detallesPedido
      } = pedido;

      const [clienteResult] = await db.query(
        'SELECT idTipoCliente FROM cliente WHERE idCliente = ?',
        [idCliente]
      );

      if (clienteResult.length === 0) {
        throw new Error(`No se encontró el cliente con idCliente ${idCliente}`);
      }

      const idTipoCliente = clienteResult[0].idTipoCliente;

      const [result] = await db.query(
        'INSERT INTO pedido (numeroPedido, fechaPedido, idCliente, direccionEntregaDiferente, recurrente, idDiaEntrega, idFrecuencia, idModoPago, idEstadoPedido) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [numeroPedido, fechaPedido, idCliente, direccionEntregaDiferente, recurrente, idDiaEntrega, idFrecuencia, idModoPago, idEstadoPedido]
      );

      const idPedido = result.insertId;

      for (const detalle of detallesPedido) {
        const { idProducto, cantidad } = detalle;

        // Buscar el idPrecioUnitario más reciente y activo para el producto dado y el idTipoCliente del cliente
        const [precioResult] = await db.query(
          'SELECT idPrecioUnitario FROM preciounitario WHERE idProducto = ? AND idTipoCliente = ? AND estado = 1 ORDER BY fechaActualizacion DESC LIMIT 1',
          [idProducto, idTipoCliente]
        );

        if (precioResult.length === 0) {
          throw new Error(`No se encontró un idPrecioUnitario activo para el producto con idProducto ${idProducto} y idTipoCliente ${idTipoCliente}`);
        }

        const idPrecioUnitario = precioResult[0].idPrecioUnitario;

        // Insertar el detalle del pedido con el idPrecioUnitario encontrado
        await db.query(
          'INSERT INTO detallePedido (idPedido, idPrecioUnitario, cantidad) VALUES (?, ?, ?)',
          [idPedido, idPrecioUnitario, cantidad]
        );
      }

      return { id: result.insertId, ...pedido };
    } catch (error) {
      console.error('Error al crear pedido:', error);
      throw error; // Manejo del error según tu lógica
    }
  },


  update: async (idPedido, pedido) => {
    const {
        numeroPedido,
        fechaPedido,
        idCliente,
        direccionEntregaDiferente,
        recurrente,
        idDiaEntrega,
        idFrecuencia,
        idModoPago,
        idEstadoPedido,
        detallesPedido // Asegúrate de que detallesPedido esté aquí
    } = pedido;

    // Actualizar el pedido
    await db.query(
        `UPDATE pedido 
        SET 
            numeroPedido = ?, 
            fechaPedido = ?, 
            idCliente = ?, 
            direccionEntregaDiferente = ?, 
            recurrente = ?, 
            idDiaEntrega = ?, 
            idFrecuencia = ?, 
            idModoPago = ?, 
            idEstadoPedido = ? 
        WHERE idPedido = ?`,
        [numeroPedido, fechaPedido, idCliente, direccionEntregaDiferente, recurrente, idDiaEntrega, idFrecuencia, idModoPago, idEstadoPedido, idPedido]
    );

    // Primero borra los detalles antiguos
    await db.query('DELETE FROM detallePedido WHERE idPedido = ?', [idPedido]);

    // Obtener el idTipoCliente
    const [clienteResult] = await db.query(
        'SELECT idTipoCliente FROM cliente WHERE idCliente = ?',
        [idCliente]
    );

    if (clienteResult.length === 0) {
        throw new Error(`No se encontró el cliente con idCliente ${idCliente}`);
    }

    const idTipoCliente = clienteResult[0].idTipoCliente;

    // Validar que detallesPedido esté presente y sea un arreglo
    if (!Array.isArray(detallesPedido) || detallesPedido.length === 0) {
        throw new Error('No se han proporcionado detalles de pedido para actualizar.');
    }

    // Iterar sobre los detalles y realizar las inserciones
    for (const detalle of detallesPedido) {
        const { idProducto, cantidad } = detalle;

        // Buscar el idPrecioUnitario más reciente
        const [precioResult] = await db.query(
            'SELECT idPrecioUnitario FROM preciounitario WHERE idProducto = ? AND idTipoCliente = ? AND estado = 1 ORDER BY fechaActualizacion DESC LIMIT 1',
            [idProducto, idTipoCliente]
        );

        if (precioResult.length === 0) {
            throw new Error(`No se encontró un idPrecioUnitario activo para el producto con idProducto ${idProducto} y idTipoCliente ${idTipoCliente}`);
        }

        const idPrecioUnitario = precioResult[0].idPrecioUnitario;

        // Insertar el detalle del pedido
        await db.query(
            'INSERT INTO detallePedido (idPedido, idPrecioUnitario, cantidad) VALUES (?, ?, ?)',
            [idPedido, idPrecioUnitario, cantidad]
        );
    }

    return { idPedido, ...pedido }; // Asegúrate de que devuelves los datos correctos
},


  delete: async (id) => {
    await db.query('UPDATE pedido SET idEstadoPedido = 4 WHERE idPedido = ?', [id]);
    return { id };
  },

  restore: async (id) => {
    await db.query('UPDATE pedido SET estado = 1 WHERE idPedido = ?', [id]);
    return { id };
  }
};

module.exports = pedido;