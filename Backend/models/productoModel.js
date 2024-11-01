const db = require("../db/db");

const producto = {
  getAll: async (filter) => {
    try {
      let query = `
    SELECT 
        p.idProducto,
        p.codigoInterno,
        p.nombre,
        p.presentacion,
        p.stockMinimo,
        p.stock,
        t.nombre AS tipoProducto,
        pr.razonSocial AS proveedor,
        p.estado,
        p.idProveedor,
        
        -- Precio y fecha para Mayorista (idTipoCliente = 2)
        (SELECT pu.monto 
         FROM preciounitario AS pu
         WHERE pu.idProducto = p.idProducto 
           AND pu.idTipoCliente = 2
         ORDER BY pu.fechaActualizacion DESC
         LIMIT 1) AS precioMayorista,

        -- Precio y fecha para Minorista (idTipoCliente = 1)
        (SELECT pu.monto 
         FROM preciounitario AS pu
         WHERE pu.idProducto = p.idProducto 
           AND pu.idTipoCliente = 1
         ORDER BY pu.fechaActualizacion DESC
         LIMIT 1) AS precioMinorista,

        -- Última fecha de actualización de cualquier precio
        (SELECT MAX(pu.fechaActualizacion)
         FROM preciounitario AS pu
         WHERE pu.idProducto = p.idProducto) AS fechaActualizacion
         
    FROM 
        producto AS p
    INNER JOIN tipoProducto AS t ON p.idTipoProducto = t.idTipoProducto
    INNER JOIN proveedor AS pr ON p.idProveedor = pr.idProveedor
    WHERE 1=1
`;
      const condiciones = [];

      if (filter.codigo) {
        query += `
        AND p.codigoInterno LIKE ?
    `;
        const valorCodigo = `%${filter.codigo}%`;
        condiciones.push(valorCodigo);
      }

      if (filter.nombre) {
        query += ` AND p.nombre LIKE ?`;
        condiciones.push(`%${filter.nombre}%`);
      }

      if (filter.codigoInterno) {
        query += ` AND p.codigoInterno LIKE ?`;
        condiciones.push(`%${filter.codigoInterno}%`);
      }

      query += `
    ORDER BY p.nombre
`;
      // Ejecuta la consulta con la conexión a la bd
      const [resultados] = await db.query(query, condiciones);
      return resultados;
    } catch (error) {
      console.error("Error en getAll:", error);
      throw error;
    }
  },

  getById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM producto WHERE idProducto = ? AND estado = 1",
      [id]
    );
    return rows[0];
  },

  getAllListaPrecios: async (filter) => {
    try {
      let query = `
        SELECT p.codigoInterno, p.nombre, tc.nombre AS tipoCliente, pu.monto 
        FROM producto AS p 
        INNER JOIN preciounitario AS pu ON pu.idProducto = p.idProducto
        LEFT JOIN tipocliente AS tc ON pu.idTipoCliente = tc.idTipoCliente
    `;

      const params = [];

      // Aplicar filtro si se proporciona
      if (filter.tipoCliente) {
        query += " WHERE pu.idTipoCliente = ?";
        params.push(filter.tipoCliente);
      }

      query += " ORDER BY p.nombre";

      const [rows] = await db.query(query, params);
      return rows; // Cambié a rows en vez de rows[0] para que devuelva todos los registros
    } catch (error) {
      console.error("Error en getAllListaPrecios:", error);
      throw error;
    }
  },

  create: async (producto) => {
    try {
      const {
        codigoInterno,
        nombre,
        presentacion,
        stockMinimo,
        stock,
        idTipoProducto,
        idProveedor,
        estado,
        precioMayorista, // Precio para clientes mayoristas
        precioMinorista, // Precio para clientes minoristas
      } = producto;

      const [result] = await db.query(
        "INSERT INTO producto (codigoInterno, nombre, presentacion, stockMinimo, stock, idTipoProducto, idProveedor, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          codigoInterno,
          nombre,
          presentacion,
          stockMinimo,
          stock,
          idTipoProducto,
          idProveedor,
          estado,
        ]
      );

      // Obtén el ID del producto recién creado
      const productoId = result.insertId;

      // Inserciones en preciounitario según los precios recibidos
      if (precioMayorista) {
        await db.query(
          "INSERT INTO preciounitario (fechaActualizacion, monto, idProducto, idTipoCliente, estado) VALUES (NOW(), ?, ?, 2, 1)",
          [precioMayorista, productoId]
        );
      }

      if (precioMinorista) {
        await db.query(
          "INSERT INTO preciounitario (fechaActualizacion, monto, idProducto, idTipoCliente, estado) VALUES (NOW(), ?, ?, 1, 1)",
          [precioMinorista, productoId]
        );
      }

      // Devuelve el producto creado con su ID
      return { id: productoId, ...producto };
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  },

  update: async (idProducto, producto) => {
    const {
      codigoInterno,
      nombre,
      presentacion,
      stockMinimo,
      stock,
      idTipoProducto,
      idProveedor,
      estado,
      precioMayorista,
      precioMinorista,
    } = producto;

    try {
      // Actualizar los datos del producto
      await db.query(
        `UPDATE producto 
         SET 
           codigoInterno = ?, 
           nombre = ?, 
           presentacion = ?, 
           stockMinimo = ?, 
           stock = ?, 
           idTipoProducto = ?, 
           idProveedor = ?, 
           estado = ? 
         WHERE idProducto = ?`,
        [
          codigoInterno,
          nombre,
          presentacion,
          stockMinimo,
          stock,
          idTipoProducto,
          idProveedor,
          estado,
          idProducto,
        ]
      );

      // Manejo de precios en la tabla `preciounitario`
      const fechaActualizacion = new Date();

      // Verificar y actualizar/insertar precio mayorista
      if (producto.precioMayorista) {
        const [mayorista] = await db.query(
          "SELECT * FROM preciounitario WHERE idProducto = ? AND idTipoCliente = 2",
          [idProducto]
        );

        if (mayorista.length > 0) {
          // Actualizar si existe el precio mayorista
          await db.query(
            `UPDATE preciounitario 
             SET monto = ?, fechaActualizacion = ? 
             WHERE idProducto = ? AND idTipoCliente = 2`,
            [precioMayorista, fechaActualizacion, idProducto]
          );
        } else {
          // Insertar si no existe el precio mayorista
          await db.query(
            `INSERT INTO preciounitario (idProducto, idTipoCliente, monto, fechaActualizacion, estado) 
             VALUES (?, 2, ?, ?, 1)`,
            [idProducto, precioMayorista, fechaActualizacion]
          );
        }
      }

      // Verificar y actualizar/insertar precio minorista
      if (producto.precioMinorista) {
        const [minorista] = await db.query(
          "SELECT * FROM preciounitario WHERE idProducto = ? AND idTipoCliente = 1",
          [idProducto]
        );

        if (minorista.length > 0) {
          // Actualizar si existe el precio minorista
          await db.query(
            `UPDATE preciounitario 
             SET monto = ?, fechaActualizacion = ? 
             WHERE idProducto = ? AND idTipoCliente = 1`,
            [precioMinorista, fechaActualizacion, idProducto]
          );
        } else {
          // Insertar si no existe el precio minorista
          await db.query(
            `INSERT INTO preciounitario (idProducto, idTipoCliente, monto, fechaActualizacion, estado) 
             VALUES (?, 1, ?, ?, 1)`,
            [idProducto, precioMinorista, fechaActualizacion]
          );
        }
      }

      return { idProducto, ...producto };
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      throw error;
    }
  },

  delete: async (id) => {
    await db.query("UPDATE producto SET estado = 0 WHERE idProducto = ?", [id]);
    return { id };
  },

  restore: async (id) => {
    await db.query("UPDATE producto SET estado = 1 WHERE idProducto = ?", [id]);
    return { id };
  },
};

module.exports = producto;
