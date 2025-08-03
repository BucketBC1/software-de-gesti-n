import { getConnection } from "../../../../database/connection.js"
import sql from 'mssql';

export const createSale = async (req, res)  => {

    const pool = await getConnection();
    const result = await pool
    .request()
    .input('numero_orden', sql.VarChar, req.body.numero_orden)
    .input('precio_total', sql.Decimal, req.body.precio_total)
    .input('id_caja', sql.BigInt, req.body.id_caja)
    .input('id_descuento', sql.BigInt, req.body.id_descuento)
    .query("INSERT INTO venta (numero_orden, precio_total, id_caja, id_descuento) VALUES (@numero_orden, @precio_total, @id_caja, @id_descuento); SELECT SCOPE_IDENTITY() AS id;")

    res.json({
        id: result.recordset[0].id,
        numero_orden: req.body.numero_orden,
        precio_total: req.body.precio_total,
        id_caja: req.body.id_caja,
        id_descuento: req.body.id_descuento
    });  
};