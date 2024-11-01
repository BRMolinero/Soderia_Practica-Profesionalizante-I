const db = require('../db/db'); 

const User = {
    findByUsername: async (nombreUsuario) => {
        const [rows] = await db.query(
            'SELECT * FROM usuario WHERE nombreUsuario = ? AND estado = 1',
            [nombreUsuario]
        );
        return rows[0];
    },

    validatePassword: (password, storedPassword) => {
        return password === storedPassword; // Comparación directa
    }
};

module.exports = User;

