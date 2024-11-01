const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa cors

const clienteRoutes = require('./routes/clienteRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes'); 
/* const recorridoRoutes = require('./routes/recorridoRoutes');*/
const loginRoutes = require('./routes/loginRoutes'); 
const secundariasRoutes = require('./routes/secundariasRoutes');
const productosRoutes = require('./routes/productosRoutes');

const app = express();

// Middleware
app.use(cors()); // Usa CORS para todas las rutas
app.use(bodyParser.json());

// Rutas
app.use('/api/cliente', clienteRoutes);
app.use('/api/pedido', pedidoRoutes);
app.use('/api/producto', productosRoutes);
/* app.use('/api/recorrido', recorridoRoutes);*/
app.use('/api/login', loginRoutes); 

app.use('/api/secundarias', secundariasRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" }); 
});


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
