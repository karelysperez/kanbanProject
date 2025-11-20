import { useState } from 'react';
import {useKanban} from "../../context/useKanban.js";
import './newTaskForm.css';

export function NewTaskForm({ onTaskAdded, onCancel })  {
    const {addTask} = useKanban();
    const [title, setTitle] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmed = title.trim();
        if(!trimmed) return;

        addTask(trimmed);
        setTitle('');
    
        // Call the callback if provided
        if (onTaskAdded) {
            onTaskAdded();
        }
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
            <div className="form-buttons">
                <div className="add-button" onClick={handleSubmit}>Add Task</div>
                <div className="cancel-button" onClick={onCancel}>Cancel</div>
            </div>
        </form>
    );
}