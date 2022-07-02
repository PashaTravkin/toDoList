import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, id: string) => void
    changeFilter: (vtdID: string, alue: FilterValuesType) => void
    addTask: (id: string, title: string) => void
    changeTaskStatus: (id: string, taskId: string, isDone: boolean ) => void
    filter: FilterValuesType
    removeTodoList:(id:string)=>void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.id,"all" );
    const onActiveClickHandler = () => props.changeFilter(props.id, "active" );
    const onCompletedClickHandler = () => props.changeFilter(props.id,"completed");


    return <div>
        <h3>{props.title}  <button onClick={()=>props.removeTodoList(props.id)} >-</button></h3>

        <AddItemForm id={props.id} addTask={props.addTask} />

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, props.id, e.currentTarget.checked);
                    }

                    return (
                        <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onClickHandler}>x</button>
                    </li>)
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

type AddItemPropsType={
    id:string
    addTask:(id: string, title: string)=>void
}

const AddItemForm =(props:AddItemPropsType)=>{

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.id, title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

       return(
           <div>
               <input value={title}
                      onChange={onChangeHandler}
                      onKeyPress={onKeyPressHandler}
                      className={error ? "error" : ""}
               />
               <button onClick={addTask}>+</button>
               {error && <div className="error-message">{error}</div>}
           </div>
    )
}
