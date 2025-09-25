import { getConnection } from "../../../../database/connection.js";
import sql from 'mssql';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const createUsuario = async (req, res) => {

    try {
        const pool = await getConnection();

        // Verificar si el correo ya existe
        const userExists = await pool
        .request()
        .input('correo', sql.VarChar, req.body.correo)
        .query(`SELECT id FROM usuarios WHERE correo = @correo`);

        if (userExists.recordset.length > 0) {
            return res.status(400).json({ message: "El correo ya está registrado" });
        }

        // Hashear la contraseña antes de guardarla
        const passwordHash = await bycrypt.hash(req.body.password, 10);

        const result = await pool
        .request()
        .input('tipo_usuario', sql.VarChar, req.body.tipo_usuario)
        .input('correo', sql.VarChar, req.body.correo)
        .input('telefono', sql.VarChar, req.body.telefono)
        .input('direccion', sql.VarChar, req.body.direccion)
        .input('password', sql.VarChar, passwordHash)
        .query(`INSERT INTO usuarios (tipo_usuario, correo, telefono, direccion, password) VALUES (@tipo_usuario, @correo, @telefono, @direccion, @password); SELECT SCOPE_IDENTITY() AS id;`);

        const nuevoUsuario = result.recordset[0];

        const token = jwt.sign({ id: nuevoUsuario.id, correo: nuevoUsuario.correo }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({
            message: "Usuario creado exitosamente",
            token,
            id: nuevoUsuario.id
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al registrar usuario" });
    }

}