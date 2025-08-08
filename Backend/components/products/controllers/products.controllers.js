import { getConnection } from "../../../database/connection.js";
import sql from 'mssql';
import multer from "multer";
import path from "path";
import fs from 'fs';

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

    const productos = result.recordset.map(producto => {
        if (producto.imagen) {
            producto.imagen = producto.imagen;
        }
        return producto;

    })
    res.json(productos);
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

    const producto = result.recordset[0];
    if (producto.imagen) {
        producto.imagen = producto.imagen;
    }
    return res.json(producto);
}

const uploadDir = path.join(process.cwd(), "backend", "uploads");
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {recursive: true});
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });


export const createProduct = async (req, res) => {

    try {
        console.log(req.file);
        console.log(req.body);


        const pool = await getConnection()
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null
        const result = await pool
        .request()
        .input('codigo', sql.VarChar, req.body.codigo)
        .input('nombre', sql.VarChar, req.body.nombre)
        .input('descripcion', sql.VarChar, req.body.descripcion)
        .input('precio_unitario', sql.Decimal , req.body.precio_unitario)
        .input('stock', sql.Int, req.body.stock)
        .input('imagen', sql.VarChar, imagePath)
        .input('id_categorias', sql.BigInt, req.body.id_categorias)
        .input('id_subcategoria', sql.BigInt, req.body.id_subcategoria)
        .input('id_unidad_medida', sql.VarBinary, req.body.id_unidad_medida)
        .query(
            "INSERT INTO productos (codigo, nombre, descripcion, precio_unitario, stock, imagen, id_categorias, id_subcategoria, id_unidad_medida) VALUES (@codigo, @nombre, @descripcion, @precio_unitario, @stock, @imagen, @id_categorias, @id_subcategoria, @id_unidad_medida); SELECT SCOPE_IDENTITY() AS id;"
        )
        res.json({
        id: result.recordset[0].id,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio_unitario: req.body.precio_unitario,
        stock: req.body.stock,
        imagen: imagePath,
        id_categorias: req.body.id_categorias,
        id_subcategorias: req.body.id_subcategorias,
        id_unidad_medida: req.body.id_unidad_medida

    });
        
    } catch (error) {
        res.status(500).json({message: error.message});
        
    }
    
};




export const updateProductById = async (req, res) => {

    const pool = await getConnection()

    const result = await pool
    .request()
    .input('id', sql.BigInt, req.params.id)
    .input('codigo', sql.VarChar, req.body.codigo)
    .input('nombre', sql.VarChar, req.body.nombre)
    .input('descripcion', sql.VarChar, req.body.descripcion)
    .input('precio_unitario', sql.Decimal, req.body.precio_unitario)
    .input('stock', sql.Int, req.body.stock)
    .input('imagen', sql.VarChar, req.body.imagen)

    .query(
        "UPDATE productos SET codigo = @codigo, nombre = @nombre, descripcion = @descripcion, precio_unitario = @precio_unitario, stock = @stock, imagen = @imagen WHERE id = @id"
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