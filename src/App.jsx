import './App.css'
import {Board} from "./components/board/Board.jsx";
import {useState} from "react";
import {SearchFilter} from "./components/searchFilter/SearchFilter.jsx";

function App() {
    const [filterTerm, setFilterTerm] = useState('');
    return (
        <main className="app">
            <header className="app-header">
                <h1>Kanban Board</h1>

                <div className="app-header-actions">
                    <SearchFilter onFilterChange={setFilterTerm} />
                </div>
            </header>

            <Board filterTerm={filterTerm} />
        </main>
    );
}

export default App
