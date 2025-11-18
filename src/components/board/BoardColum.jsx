export function BoardColumn({ title, tasks }) {
    return (
        <section className="board-column">
            <h2 className="board-column-title">{title}</h2>

            <div className="board-column-tasks">

                {tasks.length === 0 ? (
                    <p className="board-column-empty">No tasks</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="board-column-task">{task.title}</div> //add <TaskCard task={task} />
                    ))
                )}
            </div>
        </section>
    );
}