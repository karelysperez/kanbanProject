import './App.css'
import {Board} from "./components/board/Board.jsx";
import {useState} from "react";

function App() {
    const [filterTerm, setFilterTerm] = useState('');
    return (
        <div>
            <h1>Kanban Board</h1>
            {/*TODO: Here goes SearchFilter*/}
            <Board filterTerm={filterTerm} />
        </div>
    );
}

export default App
