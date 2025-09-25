import { useParams } from "react-router-dom";
/* import { useAuth } from "../../../context/AuthContext.jsx"; */

export const UseConfirmarOrden = () => {
    /* const { token } = useAuth(); */

    const {idCaja} = useParams();

    const handleSubmit = async (e, productosSeleccionados, numeroOrden, totalOrden) => {
        e.preventDefault();

        const nuevaOrden = {
            numero_orden: numeroOrden,
            precio_total: totalOrden,
            id_caja: idCaja
        }

        try {
            const responseOrden = await fetch("http://localhost:5000/ventas", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"/* ,
                    "authorization": `Bearer ${token}` */
                },
                body: JSON.stringify(nuevaOrden)
            });

            if (!responseOrden.ok) {
                const errorText = await responseOrden.text();
                console.error("Error al guardar orden:", errorText);
                alert("Error al guardar la orden");
                return false;
            }

            const ordenData = await responseOrden.json();
            console.log("Datos devueltos por ventas", ordenData);

            const idVenta = ordenData.id;

            if (!idVenta) {
                console.error("ID de la venta no recibido correctamente");
                alert("Error: no se obtuvo el ID de la venta");
                return false;
            }

            const detalleVenta = productosSeleccionados.map(producto => ({
                codigo_producto: producto.codigo,
                nombre_producto: producto.nombre,
                cantidad: producto.cantidad,
                precio_cantidad: producto.precio_unitario * producto.cantidad,
                id_venta: idVenta
            }));

            const responseDetalle = await fetch("http://localhost:5000/detalles", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"/* ,
                    "authorization": `Bearer ${token}` */
                },
                body: JSON.stringify({ productos: detalleVenta })
            });

            if (!responseDetalle.ok) {
                const errorText = await responseDetalle.text();
                console.error("Error al guardar detalles:", errorText);
                alert("Error al guardar los detalles");
                return false;
            }

            const productosParaActualizar = detalleVenta.map(producto => ({
                codigo_producto: producto.codigo_producto,
                cantidad: producto.cantidad
            }));

            const responseActualizarStock = await fetch("http://localhost:5000/productos", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"/* ,
                    "authorization": `Bearer ${token}` */
                },
                body: JSON.stringify({ productos: productosParaActualizar  })
            });

            if (!responseActualizarStock.ok) {
                const errorText = await responseActualizarStock.text();
                console.error("Error al actualizar stock:", errorText);
                alert("Error al actualizar el stock de los productos");
                return false;
            }

            alert("Orden creada exitosamente");
            return true;

        } catch (error) {
            console.error("Error de red", error);
            alert("Error de red")
            return false;
        }
    };

    return {
        handleSubmit
    }  
} 