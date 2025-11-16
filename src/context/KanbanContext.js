import { createContext, useContext,useState } from "react";

const KanbanContext = createContext(null);

const initialColumns = {
    todo: [],
    inProgress: [],
    done: [],
}

export function  KanbanProvider(){
    const [columns, setColumns] = useState(initialColumns);



}