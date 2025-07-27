import { getConnection } from "../../../../database/connection.js"
import sql from 'mssql';

export const getCajas = async (req, res) => {

    const pool = await getConnection();

    const result = await pool
        .request()
        .query('SELECT * FROM caja')
    res.json(result.recordset);
}

export const getCajaById = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .query('SELECT * FROM caja WHERE id = @id')

    if(result.rowsAffected[0] === 0) {
        return res.status(404).json({message: 'Caja no encontrada'});
    }
    return res.json(result.recordset[0]);
}

export const createCaja = async (req, res) => {

    console.log(req.body)

    const pool = await getConnection();
    const result = await pool
        .request()
        .input('nombre_caja', sql.VarChar, req.body.nombre_caja)
        .input('password', sql.VarChar, req.body.password)
        .query(
            'INSERT INTO caja (nombre_caja, password) VALUES (@nombre_caja, @password); SELECT SCOPE_IDENTITY() AS id;'
        )
        res.json({
            id: result.recordset[0].id,
            nombre: req.body.nombre
        });
};