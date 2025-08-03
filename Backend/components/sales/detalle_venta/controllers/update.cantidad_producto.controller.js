import { getConnection } from "../../../../database/connection.js";
import sql from 'mssql';

export const updateStockProducts = async (req, res) => {
    const productos = req.body.productos;
    
    try {
        const pool = await getConnection();
        for(const producto of productos) {
            const result = await pool
                .request()
                .input('codigo_producto', sql.VarChar, producto.codigo_producto)
                .input('cantidadVendida', sql.Int, producto.cantidad)
                .query(`UPDATE productos SET stock = stock - @cantidadVendida WHERE codigo = @codigo_producto`);
            
            if (result.rowsAffected[0] === 0) {
                return res.status(400).json({
                    error: `Stock insuficiente para el producto con código ${producto.codigo_producto}`
                });
            }
        }
        res.json({ message: "Stock actualizado correctamente" });  
    } catch (error) {
        console.error("Error al actualizar stock:", error);
        res.status(500).json({ error: error.message });
    }
};
