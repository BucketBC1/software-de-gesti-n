import { getConnection } from "../../../../database/connection.js"
import sql from 'mssql';


export const createDetailsOfSails = async (req, res) => {
    const productos = req.body.productos;

    const pool = await getConnection();

    try {
        for (const producto of productos){
            await pool
            .request()
            .input('codigo_producto', sql.VarChar, producto.codigo_producto)
            .input('nombre_producto', sql.VarChar, producto.nombre_producto)
            .input('cantidad', sql.Int, producto.cantidad)
            .input('precio_cantidad', sql.Decimal, producto.precio_cantidad)
            .input('id_venta', sql.BigInt, producto.id_venta)
            .query("INSERT INTO detalle_venta (codigo_producto, nombre_producto, cantidad, precio_cantidad, id_venta) VALUES (@codigo_producto, @nombre_producto, @cantidad, @precio_cantidad, @id_venta) SELECT SCOPE_IDENTITY() AS id;")
        }
        res.json({ message: "Detalles guardados correctamente" });
          
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};