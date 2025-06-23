import { getConnection } from "../../../database/connection.js";
import sql from 'mssql';

/* export const getProducts = async (req, res) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM productos")
    res.json(result.recordset)
} */


export const getProducts = async (req, res) => {
    const pool = await getConnection();
    const { categoriaId } = req.query;

    let result;
    if (categoriaId) {
        result = await pool.request()
            .input('categoriaId', sql.BigInt, categoriaId)
            .query("SELECT * FROM productos WHERE id_categorias = @categoriaId");
    } else {
        result = await pool.request()
            .query("SELECT * FROM productos");
    }
    res.json(result.recordset);
};


export const getProduct = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
        .request()
        .input('id', sql.BigInt, req.params.id)
        .query("SELECT * FROM productos WHERE id = @id")

    if(result.rowsAffected[0] === 0){
        return res.status(404).json({message: "Producto no encontrado"});
    }
    return res.json(result.recordset[0]);

}


export const createProduct = async (req, res) => {
    console.log(req.body);

    const pool = await getConnection()
    const result = await pool
        .request()
        .input('codigo', sql.VarChar, req.body.codigo)
        .input('nombre', sql.VarChar, req.body.nombre)
        .input('descripcion', sql.VarChar, req.body.descripcion)
        .input('precio_unitario', sql.Decimal , req.body.precio_unitario)
        .input('stock', sql.Int, req.body.stock)
        .input('imagen', sql.VarBinary, req.body.imagen)
        .input('id_categorias', sql.BigInt, req.body.id_categorias)
        .input('id_unidad_medida', sql.VarBinary, req.body.id_unidad_medida)
        .query(
            "INSERT INTO productos (codigo, nombre, descripcion, precio_unitario, stock, imagen, id_categorias, id_unidad_medida) VALUES (@codigo, @nombre, @descripcion, @precio_unitario, @stock, @imagen, @id_categorias, @id_unidad_medida); SELECT SCOPE_IDENTITY() AS id;"
        )
    res.json({
        id: result.recordset[0].id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio_unitario: req.body.precio_unitario,
        stock: req.body.stock,
        imagen: req.body.imagen,
        id_categorias: req.body.id_categorias,
        id_unidad_medida: req.body.id_unidad_medida

    });
};

export const updateProduct = async (req, res) => {
    const pool = await getConnection()

    const result = await pool
    .request()
    .input('id', sql.BigInt, req.params.id)
    .input('codigo', sql.VarChar, req.body.codigo)
    .input('nombre', sql.VarChar, req.body.nombre)
    .input('descripcion', sql.VarChar, req.body.descripcion)
    .input('precio_unitario', sql.Decimal, req.body.precio_unitario)
    .input('stock', sql.Int, req.body.stock)
    .input('imagen', sql.VarBinary, req.body.imagen)
    .input('id_categorias', sql.BigInt, req.body.id_categorias)
    .input('id_unidad_medida', sql.VarBinary, req.body.id_unidad_medida)
    .query(
        "UPDATE productos SET codigo = @codigo, nombre = @nombre, descripcion = @descripcion, precio_unitario = @precio_unitario, stock = @stock, imagen = @imagen, id_categorias = @id_categorias, id_unidad_medida = @id_unidad_medida WHERE id = @id"
    )

    console.log(result);
    if(result.rowsAffected[0] === 0) {
        return res.status(404).json({message: "Producto no encontrado"})
    }
    return res.json({message: "Producto actualizado"})
}

export const deleteProduct = async (req, res) => {

    const pool = await getConnection()
    const result = await pool
    .request()
    .input('id', sql.BigInt, req.params.id)
    .query("DELETE FROM productos WHERE id = @id")

    console.log(result)
    if(result.rowsAffected[0] === 0) {
        return res.status(404).json({message: "Producto no encontrado"});
    }
    return res.json({message: "Producto eliminado"});
}