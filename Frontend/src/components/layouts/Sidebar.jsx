import {Link} from 'react-router-dom';
import './styles/Sidebar.css';
import 'boxicons';

<script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>

function Nav() {
    return(
        <nav className='sideBar'>
            <div>
                <div className='navLogo'>
                    <a className=''>NOMBRE DE EMPRESA</a>
                </div>
                <ul className='navUl'>
                    <Link to="/" className='navLink'>
                        <div>
                            <box-icon name='home-alt-2'color='#ffffff' size='17px'></box-icon>
                            <li className='navIl'>
                                    Inicio
                            </li>
                        </div>
                    </Link>
                    <Link to="/Tienda" className='navLink'>
                        <div>
                            <box-icon name='store' color='#ffffff' size='17px'></box-icon>
                            <li className='navIl'>
                                Tienda
                            </li>
                        </div>
                    </Link>
                    <Link to="/Ventas" className='navLink'>
                        <div>
                            <box-icon name='purchase-tag-alt' color='#ffffff' size='17px'></box-icon>
                            <li className='navIl'>
                                Ventas
                            </li>
                        </div>
                    </Link>
                    <Link to="/Compras" className='navLink'>
                        <div>
                            <box-icon name='cart-alt' color='#ffffff' size='17px'></box-icon>
                            <li className='navIl'>
                                Compras
                            </li>
                        </div>
                    </Link>
                    <Link to="/Inventario" className='navLink'>
                        <div>
                            <box-icon name='cube' color='#ffffff' size='17px'></box-icon>
                            <li className='navIl'>
                                    Inventario
                            </li>
                        </div>
                    </Link>
                    <Link to="/Contactos" className='navLink'>
                        <div>
                            <box-icon type='solid' name='contact' color='#ffffff' size='17px'></box-icon>
                            <li className='navIl'>
                                Contactos
                            </li>
                        </div>
                    </Link>
                </ul>
            </div>
            <div className='navUser'>
                <a>NOMBRE DE USUARIO</a>
                <div className='navUserOptions'>
                    <div>
                        <a>Configuración</a>
                    </div>
                    <div>
                        <a>Ayuda y soporte</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav;