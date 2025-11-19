import {useKanban} from "../../context/useKanban.js";
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
                <BoardColumn title="To Do" columnKey="todo" tasks={filteredColumns.todo} />
                <BoardColumn title="In Progress" columnKey="inProgress" tasks={filteredColumns.inProgress} />
                <BoardColumn title="Done" columnKey="done" tasks={filteredColumns.done} />
            </div>
        </section>
    );
}