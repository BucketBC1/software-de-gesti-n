import { getConnection } from "../../../../database/connection.js";
import sql from 'mssql';


export const getUsuarios = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .query(`SELECT * FROM usuarios`)
    res.json(result.recordset);
}

export const getUsuarioById = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .query(`SELECT * FROM usuarios WHERE id = @id`)

    if(result.recordset[0] === 0) {
        return res.status(404).json({message: 'Usuario no encontrado'});
    }
    return res.json(result.recordset[0]);

}

