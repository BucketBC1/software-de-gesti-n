import { getConnection } from "../../../../database/connection.js";
import sql from 'mssql';

export const getEmpresaById = async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', sql.BigInt, id)
            .query('SELECT * FROM empresas  WHERE id = @id');

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Persona no encontrada' });
        }

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).json(error.message);
    }
}