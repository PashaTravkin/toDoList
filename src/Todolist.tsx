import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksStateType} from './App';
import {AddItemForm} from "./Components/AddItemForm";
import {EditableSpan} from "./Components/EditableSpan";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, id: string) => void
    changeFilter: (vtdID: string, value: FilterValuesType) => void
    addTask: (id: string, title: string) => void
    changeTaskStatus: (id: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (id: string) => void
    setTitle: (newTitle: string) => void
    editTask:(todoListID:string, taskID:string,newTitle: string, )=>void
    // setTaskTitle:(todoListID:string, taskID:string,newTitle: string, )=>void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.id, "all");
    const onActiveClickHandler = () => props.changeFilter(props.id, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.id, "completed");

    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }

    const setTitle = (newTitle: string) => {
        props.setTitle(newTitle)
    }

    let editTaskHandler = (taskID:string, newTitle: string) => {
        props.editTask(props.id,taskID, newTitle)
    }

    return <div>
        <h3>
            <EditableSpan collBack={setTitle} title={props.title}/>
            <button onClick={() => props.removeTodoList(props.id)}>-</button>
        </h3>

        <AddItemForm addItem={addTask}/>

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
                            <EditableSpan collBack={(newTitle) => editTaskHandler(t.id, newTitle)} title={t.title}/>
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



