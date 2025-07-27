
const DeleteProducts = ({id, onDelete}) => {
    const handleDelete = async (e) => {
        e.stopPropagation();
        if(window.confirm("¿Seguro deseas eliminar este producto?")) {
            const res = await fetch(`http://localhost:5000/productos/${id}`, {
                method: "DELETE"
            });
            if(res.ok) {
                onDelete(id);
            } else {
                alert("No se pudo eliminar el producto.");
            }
        }
    };
    return(
        <box-icon 
            name='trash' 
            color='#ff0000'
            style={{cursor: "pointer"}}
            onClick={handleDelete}
        ></box-icon>
    );
};

export default DeleteProducts;