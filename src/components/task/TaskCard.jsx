import {useKanban} from "../../context/useKanban.js";

export function TaskCard({ task, currentColumn}) {
    const {moveTask} = useKanban();

    const handleMove = (destinationColumn) => {
        if (destinationColumn === currentColumn) return;
        moveTask(task.id, destinationColumn);
    }

    const formattedDate = task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "";

    return (
        <article className="task-card">
            <h3 className="task-card-title">{task.title}</h3>

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