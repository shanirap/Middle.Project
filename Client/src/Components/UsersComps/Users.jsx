import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import User from './User'

const Users = () => {

    const [usersData, setUsersData] = useState([])
    const [visible, setVisible] = useState(false)
    const nameRef = useRef("")
    const userNameRef = useRef("")
    const emailRef = useRef("")
    const addressRef = useRef("")
    const phoneRef = useRef("")
    const [update, setUpdate] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    //getAllUsers
    const getUsers = async () => {
        try {
            const res = await axios.get('http://localhost:6660/userRoute/get')
            if (res.status === 200) {
                console.log(res.data)
                setUsersData(res.data)
            }

        } catch (e) {
            setUsersData([])
            console.error(e)
        }
    }


    useEffect(() => {
        getUsers()
    }, [])


    //update
    const updateUser = async () => {
        const objUser = {
            _id: currentUser._id,
            name: nameRef.current.value ? nameRef.current.value : currentUser.name,
            userName: userNameRef.current.value ? userNameRef.current.value : currentUser.userName,
            email: currentUser.email,
            address: addressRef.current.value ? addressRef.current.value : currentUser.address,
            phone: phoneRef.current.value ? phoneRef.current.value : currentUser.phone
        }
        if (emailRef.current.value) {
            setUpdate(false)
        }

        getUsers()

        try {
            const res = await axios.put('http://localhost:6660/userRoute/put', objUser)
            if (res.status === 200) {
                console.log(res.data)
                getUsers()
                setUpdate(false)
            }
        } catch (e) {
            setUsersData([])
            console.error(e)
        }
    }


    //post
    const createUser = async () => {
        const newUser = {
            name: nameRef.current.value,
            userName: userNameRef.current.value,
            email: emailRef.current.value,
            address: addressRef.current.value,
            phone: phoneRef.current.value
        }
        try {
            const res = await axios.post('http://localhost:6660/userRoute/post', newUser)

            if (res.status === 200) {
                console.log(res.data)
                getUsers()

            }
        } catch (e) {
            getUsers();
            alert("Name and email are both required")
            console.error(e)
        }

    }



    return (

        <div>
            <div className="card flex justify-content-center" style={{ backgroundColor: 'rgb(120, 180, 180)' }}>
                <Button label="Add user" icon="pi pi-user" style={{ backgroundColor: 'rgb(120, 200, 180)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth: '2px' }} onClick={() => setVisible(true)} />
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}

                    content={({ hide }) => (
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700)), ', backgroundColor: 'rgb(120, 180, 180)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth: '2px' }}>
                            <p width="35" height="35" className="block mx-auto" style={{ color: 'rgb(80,0,0', fontWeight: 'bold' }}> User
                            </p>
                            <div className="inline-flex flex-column gap-2" >
                                <label className="text-primary-50 font-semibold">Name*</label>
                                <InputText ref={nameRef} label="Name*" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                                <label>User Name</label>
                                <InputText ref={userNameRef} label="User Name" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>
                            {
                                !update ? <div className="inline-flex flex-column gap-2">
                                    <label>Email*</label>
                                    <InputText ref={emailRef} label="Email*" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                                </div> : <></>

                            }
                            <div className="inline-flex flex-column gap-2">
                                <label>Address</label>
                                <InputText ref={addressRef} label="Address" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                                <label>Phone</label>
                                <InputText ref={phoneRef} label="Phone" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>

                            <div>
                                <Button label="Save" onClick={(e) => {
                                    update ?
                                        updateUser() : createUser()
                                    hide(e)
                                }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                <Button label="Cancel" style={{ color: 'rgb(80,0,0' }} onClick={(e) => { hide(e); setUpdate(false) }} text ></Button>
                            </div>

                        </div>
                    )}
                >

                </Dialog>
            </div>
            {usersData ? usersData.sort(((u1, u2) => u1._id - u2._id)).map((user, index) => <User key={index} setUpdate={setUpdate} user={user} setCurrentUser={setCurrentUser} currentUser={user} setUsersData={setUsersData} setVisible={setVisible} getUsers={getUsers}></User>) : <></>}
        </div>
    )
}

export default Users