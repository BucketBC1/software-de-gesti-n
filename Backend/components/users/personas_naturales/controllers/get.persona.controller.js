import { getConnection } from "../../../../database/connection.js";
import sql from 'mssql';

export const getPersonaById = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('id', sql.BigInt, req.params.id)
        .query('SELECT * FROM personas_naturales WHERE id = @id');
        
    if (result.recordset.length > 0) {
        res.json(result.recordset[0]);
    } else {
        res.status(404).json({ message: 'Persona no encontrada' });
    }
}