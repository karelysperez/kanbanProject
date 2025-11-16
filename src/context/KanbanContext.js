import { createContext, useContext,useState } from "react";

const KanbanContext = createContext(null);

const initialColumns = {
    todo: [],
    inProgress: [],
    done: [],
}

export function  KanbanProvider({ children }){
    const [columns, setColumns] = useState(initialColumns);

    //Add Task
    const addTask = (title) => {
         const trimmedTitle = title?.trim();
         if(!trimmedTitle) return;

         const newTask = {
             id: Date.now(),
             title: trimmedTitle,
             description: '',
             createAt: new Date().toISOString(),
         }

         setColumns((prev) => ({
             ...prev,

             todo: [newTask, ...prev.todo],
         }));
    };

    //Change Task Status
    const moveTask = (taskId, destinationColumn) => {
        setColumns((prev) => {
            if (!prev [destinationColumn]) return prev;

            let taskToMove = null;

            const newColumns = Object.fromEntries(
                Object.entries(prev).map(([column, tasks]) => {
                    const filtered = tasks.filter((task) => {
                        if (task.id === taskId) {
                            taskToMove = task;
                            return false;
                        }
                        return true;
                    });
                    return [column, filtered];
                })
            );

            if (!taskToMove) return prev;

            newColumns[destinationColumn] = [
                taskToMove,
                ...newColumns[destinationColumn],
            ];
            return newColumns;
        });

        const value = {
            columns,
            addTask,
            moveTask,
        }

        return (
            <KanbanContext.Provider value={value}>
                {children}
            </KanbanContext.Provider>
        );
    }

}

export function useKanban(){
    const ctx = useContext(KanbanContext);

    if (!ctx) {
        throw new Error('useKanban must be used inside a KanbanProvider');
    }
    return ctx;
}