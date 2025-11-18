import {TaskCard} from "../task/TaskCard.jsx";

export function BoardColumn({ title, columnKey,tasks }) {
    return (
        <section className="board-column">
            <h2 className="board-column-title">{title}</h2>

            <div className="board-column-tasks">

                {tasks.length === 0 ? (
                    <p className="board-column-empty">No tasks</p>
                ) : (
                    tasks.map((task) => (
                         <TaskCard key={task.id} task={task} currentColumn={columnKey} />
                    ))
                )}
            </div>
        </section>
    );
}