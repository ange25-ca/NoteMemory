import '../App.css';
import NoteCoordinator from './Mod/modalCoordinator';

//Creación del componente funcional para la barra
// de visualización
const Header = () => {
    
    return (
        <div className="panel-create">
            <h4>My Notes</h4>
            <NoteCoordinator />
        </div>
    );
}

export default Header;