import './App.css'
import {Board} from "./components/board/Board.jsx";
import {useState} from "react";

function App() {
    const [filterTerm, setFilterTerm] = useState('');
    return (
        <main className="app">
            <header className="app-header">
                <h1>Kanban Board</h1>

                <div className="app-header-actions">
                    <input
                    className="search-input"
                    type="text"
                    placeholder="Search tasks..."
                    value={filterTerm}
                    onChange={(event) => setFilterTerm(event.target.value)}
                    />
                    <button className="search-button">Search</button>
                </div>
            </header>

            <Board filterTerm={filterTerm} />
        </main>
    );
}

export default App
