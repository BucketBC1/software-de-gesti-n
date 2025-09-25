import { getConnection } from "../../../../database/connection.js";
import bycrypt from 'bcrypt';
import sql from 'mssql';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const login = async (req, res) => {

    try {
        const { correo, password } = req.body;

        const pool = await getConnection();
        const result = await pool
        .request()
        .input('correo', sql.VarChar, correo)
        .query(`SELECT id, correo, password, tipo_usuario FROM usuarios WHERE correo = @correo`);
    
        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const user = result.recordset[0];
        const valid = await bycrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: "Login exitoso",
            token,
            usuario: {
                id: user.id,
                correo: user.correo,
                tipo_usuario: user.tipo_usuario
            }
            
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error en el login" });

    }
    

}