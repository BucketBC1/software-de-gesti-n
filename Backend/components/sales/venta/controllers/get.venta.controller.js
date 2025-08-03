import { getConnection } from "../../../../database/connection.js"
import sql from 'mssql';

export const getSale = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .query("SELECT * FROM venta")
    res.json(result.recordset);
}

export const getSaleById = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('id', sql.BigInt, req.params.id)
    .query("SELECT * FROM venta WHERE id = @id")

    if(result.recordset[0] === 0) {
        return res.status(404).json({message: "Venta no encontrada"})
    }
    return res.json(result.recordset[0])

}