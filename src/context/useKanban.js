import { createContext,useContext } from "react";

export const KanbanContext = createContext(null);

export function useKanban(){
    const ctx = useContext(KanbanContext);

    if (!ctx) {
        throw new Error('useKanban must be used inside a KanbanProvider');
    }
    return ctx;
}