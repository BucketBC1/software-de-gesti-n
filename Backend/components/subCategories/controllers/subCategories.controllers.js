import { getConnection } from "../../../database/connection.js";
import sql from 'mssql';

export const getSubCategories = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .query('SELECT * FROM sub_categorias')

    res.json(result.recordset);
           
}

export const getSubCategoryById = async (req, res) => {

    const pool = await getConnection();
    const result = await pool
        .request()
        .input('id', sql.Int, req.params.id)
        .query('SELECT * FROM sub_categorias WHERE id = @id')

    if (result.rowsAffected[0] === 0 ) {
        return res.status(404).json({ message: 'Subcategory not found' });
    }
    return res.json(result.recordset[0]);
}
