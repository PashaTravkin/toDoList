import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type todoListType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<Array<todoListType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'I dont now', filter: 'active'},
    ])
    let [tasks, setTasks] = useState({
            [todolistID1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            [todolistID2]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
            ]

        }
    );

    let removeTodoList = (id: string) => {
        todoLists.filter(t => t.id !== id)
        setTodoLists( todoLists.filter(t => t.id !== id))
        delete tasks[id]
        setTasks({ ...tasks })

    }

    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function addTask(todoListId: string,title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = [task, ...todoListTasks]
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, todoListId: string, isDone: boolean, ) {
        let todoListTasks = tasks[todoListId]
        let task = todoListTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }

    function changeFilter(tdID: string, value: FilterValuesType) {
        let todoList = todoLists.find(t => t.id === tdID)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }

    return (
        <div className="App">

            <input/> <button>+</button>

            {
                todoLists.map(t => {

                    let allTodoListsTasks = tasks[t.id];
                    let tasksForTodolist = allTodoListsTasks

                    if (t.filter === "active") {
                        tasksForTodolist = allTodoListsTasks.filter(t => t.isDone === false);
                    }
                    if (t.filter === "completed") {
                        tasksForTodolist = allTodoListsTasks.filter(t => t.isDone === true);
                    }

                    return (
                        <Todolist
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={t.filter}
                            removeTodoList={removeTodoList}

                        />
                    )
                })
            }

        </div>
    );
}

export default App;
