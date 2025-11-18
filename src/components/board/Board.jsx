import { useKanban } from "../../context/KanbanContext.jsx";
import { NewTaskForm } from "../task/NewTaskForm.jsx";
import { BoardColumn } from "./BoardColumn.jsx";


export function Board ({ filterTerm}){
    const { columns } = useKanban();

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
            {/* Crate new task (not Modal)*/}
            <NewTaskForm />

            <div className="board-columns">
                <BoardColumn title="To Do" tasks={filteredColumns.todo} />
                <BoardColumn title="In Progress" tasks={filteredColumns.inProgress} />
                <BoardColumn title="Done" tasks={filteredColumns.done} />
            </div>
        </section>
    );
}