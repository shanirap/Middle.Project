import { useEffect, useState } from "react"
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import axios from 'axios'
import { ToggleButton } from 'primereact/togglebutton';


const Todo = (props) => {

    const [checked, setChecked] = useState(props.todo.completed);
    //delete
    const deleteTodo = async () => {
        const _id = props.todo._id

        try {
            const res = await axios.delete(`http://localhost:6660/todosRoute/delete/${_id}`)
            if (res.status === 200) {
                console.log(res.data)
                props.getTodos()
            }
        } catch (e) {
            props.setTodosData([])
            console.error(e)
        }
    }

console.log(props);
    const header = (
        <></>// <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const updateCompleted = async () => {
        console.log(!checked)
        const objTodo = props.todo;
        objTodo.completed = !checked;
        try {
            const res = await axios.put('http://localhost:6660/todosRoute/put', objTodo)
            if (res.status === 200) {
                console.log(res.data)
                // getTodos()
            }
        } catch (e) {
            setTodosData([])
            console.error(e)
        }

    }


    const footer = (
        <>
            <div className="card flex justify-content-center">
                <Button label="Update" style={{backgroundColor: 'rgb(120, 200, 180)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth:'2px'}} onClick={(e) => {
                    props.setVisible(true)
                    props.setCurrentTodo(props.todo)
                    props.setUpdate(true)
                }} icon="pi pi-check" />
                <Button label="Delete" style={{backgroundColor: 'rgb(80, 0, 0)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth:'2px' }}  onClick={(e) => {
                    deleteTodo()
                }} icon="pi pi-times"></Button>
                 <br/>
                <ToggleButton rounded aria-label="Filter" onIcon="pi pi-check" onLabel="" offLabel=""  offIcon="pi pi-times" checked={checked} onClick={(e) => { setChecked(!checked); updateCompleted() }} className="w-8rem" />
            </div>
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Card footer={footer} header={header} style={{borderColor: 'rgb(120, 180, 180)', borderStyle: 'double', borderWidth:'2px'}}>
                {props.todo.title}
                <br/>
                {props.todo.tags?.map((tag)=>{<span>`--${tag}  `</span>})}



            </Card>
        </div>
    )
}    

export default Todo