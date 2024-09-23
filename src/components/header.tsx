import '../App.css'
import NewNote from "./newNote";

const Header = () => {
    return (
        <div className="panel-create">
            <h4>My Notes</h4>
            <NewNote />
        </div>
    );
}

export default Header;