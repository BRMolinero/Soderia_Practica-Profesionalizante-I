const User = require('../models/loginModel');

exports.login = async (req, res) => {
    const { nombreUsuario, contrasenia } = req.body;

    try {
        // Buscar al usuario por nombre de usuario
        const usuario = await User.findByUsername(nombreUsuario);

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado o inactivo.' });
        }

        // Comparar la contraseña ingresada con la almacenada (sin cifrado)
        if (usuario.contrasenia !== contrasenia) {
            return res.status(401).json({ message: 'Contraseña incorrecta.' });
        }

        // Enviar respuesta exitosa
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });

    } catch (error) {
        console.error('Error en login:', error);
        return res.status(500).json({ message: 'Error en el servidor.' });
    }
};
