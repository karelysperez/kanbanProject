import {useKanban} from "../../context/useKanban.js";

export function TaskCard({ task, currentColumn}) {
    const {moveTask} = useKanban();

    const handleStatusChange = (event) => {
        const destinationColumn = event.target.value;

        if (destinationColumn === currentColumn) return;

        moveTask(task.id, destinationColumn);
    }

    const formattedDate = task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "";

    return (
        <article className="task-card">
            <h3 className="task-card-title">{task.title}</h3>

            {formattedDate && (<small className="task-card-date">Created: {formattedDate}</small>)}

            <div className="task-card-controls">
                <label>
                    Status:{" "}
                    <select value={currentColumn} onChange={handleStatusChange}>
                        <option value="todo">To Do</option>
                        <option value="inProgress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                </label>
            </div>
        </article>
    );
}