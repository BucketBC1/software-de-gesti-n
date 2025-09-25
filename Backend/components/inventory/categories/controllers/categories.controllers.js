import { getConnection } from "../../../../database/connection.js";
import sql from 'mssql';

export const getCategories = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM categorias");
    res.json(result.recordset);
}

export const getCategorie = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request()
    .input('id', sql.BigInt, req.params.id)
    .query(
        "SELECT * FROM categorias WHERE id = @id"
    )

    if(result.rowsAffected[0] === 0) {
        return res.status(404).json({message: "Categoria no encontrada"})
    }
    return res.json(result.recordset[0])
}

export const createCategorie = async (req, res) => {


    console.log(req.body)

    const pool = await getConnection()
    const result = await pool
    .request()
    .input('nombre', sql.VarChar, req.body.nombre)
    .query(
        "INSERT INTO categorias (nombre) VALUES (@nombre); SELECT SCOPE_IDENTITY() AS id;"
    )
    res.json({
        id: result.recordset[0].id,
        nombre: req.body.nombre
    });
}; 

export const updateCategorie = async (req, res) => {
    const pool = await getConnection()
    const result = await pool
    .request()
    .input('id', sql.BigInt, req.params.id)
    .input('nombre', sql.VarChar, req.body.nombre)
    .query("UPDATE categorias SET nombre = @nombre WHERE id = @id")
    console.log(result)

    if(result.rowsAffected[0] === 0){
        return res.status(404).json({message: "Categoria no encontrada"})
    }
    return res.json({message: "Categoria actualizada"})

}

export const deleteCategorie = async (req, res) => {
    const pool = await getConnection()
    const result = await pool
    .request()
    .input('id', sql.BigInt, req.params.id)
    .query("DELETE FROM categorias WHERE id = @id")

    console.log(result)

    if(result.rowsAffected[0] === 0) {
        return res.status(404).json({message: "Categoria no encontrada"})
    } 
    return res.json({message: "Categoria eliminada"})
}