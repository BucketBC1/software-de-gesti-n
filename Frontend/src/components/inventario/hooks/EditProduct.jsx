import { useState } from "react";

const EditProduct = ({ product, onSave, onCancel }) => {
    const [form, setForm] = useState({
        codigo: product.codigo,
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio_unitario: product.precio_unitario,
        stock: product.stock,
        id_categorias: product.id_categorias

    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:5000/productos/${product.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        });
        if (res.ok) {
            onSave({ ...product, ...form });
        } else {
            alert("No se pudo actualizar el producto.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-product-form">
            <input 
                type="text"
                value={form.codigo}
                onChange={handleChange}
                placeholder="Codigo"
                required
                name="codigo"
            />
            <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                required
            />
            <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción"
                required
            />
            <input
                name="precio_unitario"
                type="number"
                value={form.precio_unitario}
                onChange={handleChange}
                placeholder="Precio por unidad"
                required
            />
            <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                placeholder="Cantidad"
                required
            />
            <input
                type="hidden"
                name="id_categorias"
                value={form.id_categorias}
                readOnly
            />
            <div style={{ marginTop: "12px" }}>
                <button type="submit">Guardar</button>
                <button type="button" onClick={onCancel} style={{ marginLeft: "8px" }}>Cancelar</button>
            </div>
        </form>
    );
};

export default EditProduct;