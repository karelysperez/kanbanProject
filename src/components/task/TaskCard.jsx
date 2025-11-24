import {useKanban} from "../../context/useKanban.js";
import './taskCard.css';

export function TaskCard({ task, currentColumn}) {
    const {moveTask, editTask} = useKanban();

    const handleMove = (destinationColumn) => {
        if (destinationColumn === currentColumn) return;
        moveTask(task.id, destinationColumn);
    }

    const formattedDate = task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "";

    return (
        <article className={`task-card task-card--${currentColumn}`}>
            <h3 className="task-card-title">{task.title}</h3>

             <button className= "task-card-edit-btn" onClick={() => editTask(task.id, { title: prompt("Edit task title:", task.title) || task.title })}>
                Edit task
            </button>

            {formattedDate && (<small className="task-card-date">Created: {formattedDate}</small>)}

            <div className="task-card-controls">
                {currentColumn !== "todo" && (
                    <button onClick={() => handleMove("todo")}>
                        Move to TO-DO
                    </button>
                )}
                {currentColumn !== "inProgress" && (
                    <button onClick={() => handleMove("inProgress")}>
                        Move to In Progress
                    </button>
                )}
                {currentColumn !== "done" && (
                    <button onClick={() => handleMove("done")}>
                        Move to Done
                    </button>
                )}
            </div>
        </article>
    );
}