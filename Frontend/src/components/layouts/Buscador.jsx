import './styles/Header.css';

function Buscador() {
    return (
        <header className='searchHeader'>
            <input type="search" placeholder="Buscar..."/>

            <div className='Icons'>
                <div className='headerIcon'>
                    <a>
                        <box-icon type='solid' name='bell-ring' color='#505050' size='20px'></box-icon>
                    </a>
                </div>
                <div className='headerIcon'>
                    <a>
                        <box-icon name='message-rounded' color='#505050' size='20px'></box-icon>
                    </a>
                </div>
            </div>
        </header>
    )
}

export default Buscador;
