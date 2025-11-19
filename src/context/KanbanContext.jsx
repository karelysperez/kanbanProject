import {createContext, useContext, useEffect, useState} from "react";
import { loadColumnsFromStorage, saveColumnsToStorage, fetchInitialColumns } from "./KanbanStorage";

const KanbanContext = createContext(null);

const initialColumns = {
    todo: [],
    inProgress: [],
    done: [],
}

export function  KanbanProvider({ children }){
    const [columns, setColumns] = useState(() => {
        // Try to load from storage first during initialization
        const stored = loadColumnsFromStorage();
        return stored !== null ? stored : initialColumns;
    });
    const [initialized, setInitialized] = useState(() => {
        // If we loaded from storage, we're already initialized
        return loadColumnsFromStorage() !== null;
    });


    //initial load
    useEffect(() => {
        // Only fetch if not already initialized (i.e., nothing in storage)
        if (initialized) return;

        fetchInitialColumns(5)
            .then((mappedColumns) => {
                setColumns(mappedColumns);
                setInitialized(true);        // <-- initialized after fetch
            })
            .catch((error) => {
                console.error("Error fetching initial todos from dummyjson", error);
                setInitialized(true);

            });
    }, [initialized]);

    //save columns to storage
    useEffect(() => {
        if (!initialized) return;
        saveColumnsToStorage(columns);
    }, [columns, initialized]);

    //Add Task
    const addTask = (title) => {
         const trimmedTitle = title?.trim();
         if(!trimmedTitle) return;

         const newTask = {
             id: Date.now(),
             title: trimmedTitle,
             description: '',
             createdAt: new Date().toISOString(),
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
                }),
            );

            if (!taskToMove) return prev;

            newColumns[destinationColumn] = [
                taskToMove,
                ...newColumns[destinationColumn],
            ];
            return newColumns;
        });
    }

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

// eslint-disable-next-line react-refresh/only-export-components
export function useKanban(){
    const ctx = useContext(KanbanContext);

    if (!ctx) {
        throw new Error('useKanban must be used inside a KanbanProvider');
    }
    return ctx;
}