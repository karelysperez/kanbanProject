import {useKanban} from "../../context/useKanban.js";
import { NewTaskForm } from "../task/NewTaskForm.jsx";
import { BoardColumn } from "./BoardColumn.jsx";
import { useState } from "react";

export function Board ({ filterTerm}){
    const { columns } = useKanban();
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);

    const normalizedTerm = filterTerm?.trim().toLowerCase();

    const filterTask = (tasks) => {
        if (!normalizedTerm) return tasks;

        return tasks.filter((task) => {
            const title = (task.title ?? "").toLowerCase();
            const description = (task.description ?? "").toLowerCase();
            return (
                title.includes(normalizedTerm) || description.includes(normalizedTerm)
            );
        });
    }

    const filteredColumns = {
        todo: filterTask(columns.todo),
        inProgress: filterTask(columns.inProgress),
        done: filterTask(columns.done),
    }

    return (
        <section className="board">
            <div className="board-columns">
                <BoardColumn title="To Do" columnKey="todo" tasks={filteredColumns.todo} />
                <BoardColumn title="In Progress" columnKey="inProgress" tasks={filteredColumns.inProgress} />
                <BoardColumn title="Done" columnKey="done" tasks={filteredColumns.done} />
            </div>

            <div className="new-task-div">
                {/* Toggle button for new task form */}
                <button
                    className="new-task-toggle-btn"
                    onClick={() => setShowNewTaskForm(!showNewTaskForm)}
                >
                    {showNewTaskForm ? 'Cancel' : 'New Task'}
                </button>

                {/* Conditionally render the form */}
                {showNewTaskForm && <NewTaskForm onTaskAdded={() => setShowNewTaskForm(false)} />}
            </div>
        </section>
    );
}