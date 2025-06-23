
import { useNavigate } from "react-router-dom";

const ShowCategories = ({categories, products}) => {

  const navigate = useNavigate(); 


  const categoriasConProductos = categories.filter(cat => 
    products.some(prod => prod.id_categorias === cat.id)
  );



  return (
    <>
      {categoriasConProductos.map((categoria) => (
        <li 
          key={categoria.id} 
          className="categoria"
          onClick={() => navigate(`/productos/${categoria.id}`)}
          style={{cursor: "pointer"}}
        >
          <a href="#"></a>
          <span className="nombreCategoria">{categoria.nombre}</span>
        </li>
      ))}
    </>
  );
};

export default ShowCategories;