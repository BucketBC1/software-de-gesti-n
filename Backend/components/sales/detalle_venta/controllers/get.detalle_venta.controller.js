import { getConnection } from "../../../../database/connection.js";
import sql from 'mssql';

export const getDetailsOfSails = async (req, res) => {

    const pool = await getConnection();
    const result = await pool
        .request()
        .query("SELECT * FROM detalle_venta");
    res.json(result.recordset)
};


export const getDetailsOfSailsById = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input('id', sql.BigInt, req.params.id)
    .query("SELECT * FROM detalle_venta WHERE id = @id")

    if(result.rowsAffected[0] === 0){
        return res.status(404).json({message: "Detalles no encontrados"})
    }
    
    return res.json(result.recordset[0]);
};

