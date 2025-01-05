import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Todo from './Todo'
import { MultiSelect } from 'primereact/multiselect';

const Todos = () => {

    const [todosData, setTodosData] = useState([])
    const [visible, setVisible] = useState(false)
    const titleRef = useRef("")
    const tagsRef = useRef([])
    const completedRef = useRef("")
    const [update, setUpdate] = useState(false)
    const [currentTodo, setCurrentTodo] = useState({})

    //getAllTodos
    const getTodos = async () => {
        try {
            const res = await axios.get('http://localhost:6660/todosRoute/get')
            if (res.status === 200) {
                console.log(res.data)
                setTodosData(res.data)
            }

        } catch (e) {
            setTodosData([])
            console.error(e)
        }
    }


    useEffect(() => {
        getTodos()
    }, [])


    //update
    const updateTodo = async () => {
        debugger
        const objTodo = {
            _id: currentTodo._id,
            title: titleRef.current.value ? titleRef.current.value : currentTodo.title,
            tags: selectedTags ? selectedTags : currentTodo.body,
            completed: completedRef.current.value ? completedRef.current.value : currentTodo.completed
        }
        getTodos()

        try {
            const res = await axios.put('http://localhost:6660/todosRoute/put', objTodo)
            if (res.status === 200) {
                console.log(res.data)
                getTodos()
                setUpdate(false)
                setSelectedTags([])
            }
        } catch (e) {
            setTodosData([])
            console.error(e)
        }
    }


    //post
    const createTodo = async () => {
        const newTodo = {
            title: titleRef.current.value,
            tags: selectedTags ? selectedTags : currentTodo.body,
            completed: false
        }
        try {
            const res = await axios.post('http://localhost:6660/todosRoute/post', newTodo)

            if (res.status === 200) {
                console.log(res.data)
                setSelectedTags([])
                getTodos()
            }
        } catch (e) {
            getTodos();
            alert("Title is required")
            console.error(e)
        }

    }


    const [selectedTags, setSelectedTags] = useState(null);
    const tags = [
        'houseworks',
        'appointments',
        'shopping',
        'homework',
        'working at the office'
    ];




    return (

        <div>
            <div className="card flex justify-content-center" style={{ backgroundColor: 'rgb(120, 180, 180)' }}>
                <Button label="Add Todo" icon="pi pi-clipboard" style={{backgroundColor: 'rgb(120, 200, 180)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth:'2px'}}onClick={() => setVisible(true)} />
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700)), ', backgroundColor: 'rgb(120, 180, 180)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth: '2px' }}>
                            <p width="35" height="35" className="block mx-auto" style={{ color: 'rgb(80,0,0', fontWeight: 'bold' }}> Todo
                            </p>
                            <div className="inline-flex flex-column gap-2">
                                <label className="text-primary-50 font-semibold">Title</label>
                                <InputText ref={titleRef} label="Title" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                                <label className="text-primary-50 font-semibold">Tags</label>
                                <MultiSelect value={selectedTags} onChange={(e) => setSelectedTags(e.value)} options={tags}
                                    filter placeholder="Select Tags" maxSelectedLabels={3} className="bg-white-alpha-20 border-none p-3 text-primary-50" style={{color:'white'}}/>
                            </div>

                            <div>
                                <Button label="Save" onClick={(e) => {

                                    update ?
                                        updateTodo() : createTodo()
                                    hide(e)
                                }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                <Button label="Cancel" style={{ color: 'rgb(80,0,0' }} onClick={(e) => hide(e)} text ></Button>
                            </div>

                        </div>
                    )}
                >


                </Dialog>
            </div>
            {todosData.map((todo, index) => <Todo key={index} setUpdate={setUpdate} todo={todo} setCurrentTodo={setCurrentTodo} currentTodo={todo} setTodosData={setTodosData} setVisible={setVisible} getTodos={getTodos}></Todo>)}
        </div>
    )
}

export default Todos