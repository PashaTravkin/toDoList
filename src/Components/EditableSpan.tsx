import React, {ChangeEvent, useState} from 'react';

type ChangeTitlePropsType = {
    title: string
    collBack:(newTitle:string)=>void
}

export const EditableSpan = (props: ChangeTitlePropsType) => {

    let [edit, setEdit] = useState(true)
    let [newTitle, setNewTitle]=useState(props.title)

    const addTask=()=>{
        if(newTitle!==''){
            props.collBack(newTitle)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    let onClickHandler = () => {
        setEdit(!edit)
        addTask()
    }



    return (
        edit
            ? <span onClick={onClickHandler}>{props.title}</span>
            : <input
                onChange={onChangeHandler}
                autoFocus
                onBlur={onClickHandler}
                value={newTitle}/>
    )
        ;
};