import { getConnection } from "../../../../database/connection.js";
import sql from 'mssql';

export const createAcceso = async (req, res) => {
    const {ip, timestamp, navegador, id_usuario} = req.body;

    try {
        const pool = await getConnection();
        await pool.request()
            .input('ip', sql.VarChar, ip)
            .input('timestamp', sql.DateTime, timestamp)
            .input('navegador', sql.VarChar, navegador)
            .input('id_usuario', sql.BigInt, id_usuario)
            .query('INSERT INTO accesos (ip, timestamp, navegador, id_usuario) VALUES (@ip, @timestamp, @navegador, @id_usuario)');
            
        res.status(201).json({ message: 'Acceso creado exitosamente' });

    } catch (error) {
        console.error('Error al crear acceso:', error);
        res.status(500).json({ message: 'Error al crear acceso', error: error.message });
    }
}