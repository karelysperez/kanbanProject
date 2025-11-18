import { useState } from 'react';
import {useKanban} from "../../context/KanbanContext.jsx";

export function NewTaskForm()  {
    const {addTask} = useKanban();
    const [title, setTitle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmed = title.trim();
        if(!trimmed) return;

        addTask(trimmed);
        setTitle('');
    }

    const handleChange = (event) => {
        setTitle(event.target.value);
    }

    return (
        <form className="new-task-form" onSubmit={handleSubmit}>
            <label htmlFor="new-task-title">New task</label>
            <input
                id="new-task-title"
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={handleChange}
            />
            <button type="submit" disabled={!title.trim()}>Add</button>
        </form>
    );
}