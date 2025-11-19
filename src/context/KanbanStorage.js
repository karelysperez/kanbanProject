const STORAGE_KEY = 'kanban_columns';

export function loadColumnsFromStorage(){
    try{
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored)  return null;

        const parsed = JSON.parse(stored);

        if(
            parsed && typeof parsed === 'object' &&
            "todo" in parsed &&
            "inProgress" in parsed
            && "done" in parsed
        ) {
            return parsed;
        }
        return null;

    }catch(error){
        console.error('Error loading columns from storage:', error);
        return null;
    }
}

export function saveColumnsToStorage(columns){
    try{
        localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
    }catch(error){
        console.error('Error saving columns to storage:', error);
    }
}

export async function fetchInitialColumns(limit = 5){
    const response = await fetch(`https://dummyjson.com/todos?limit=${limit}`);
    const data = await response.json();
    const todos = Array.isArray(data.todos) ? data.todos : [];

    const now = new Date().toISOString();

    const mappedColumns = {
        todo: [],
        inProgress: [],
        done: [],
    };

    todos.forEach((item) => {
        const task = {
            id: item.id,
            title: item.todo ?? "",
            description: "",
            createdAt: now,
        };

        if (item.completed){
            mappedColumns.done.push(task);
        }else{
            mappedColumns.todo.push(task);
        }
    });
    return mappedColumns;
}