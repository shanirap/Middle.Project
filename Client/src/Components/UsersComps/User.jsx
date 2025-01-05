
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import axios from 'axios'
const User = (props) => {

    //delete
    const deleteUser = async () => {
        const _id = props.user._id

        try {
            const res = await axios.delete(`http://localhost:6660/userRoute/delete/${_id}`)
            if (res.status === 200) {
                console.log(res.data)
                props.getUsers()
            }
        } catch (e) {
            props.setUsersData([])
            console.error(e)
        }
    }


    const header = (
        <></>
        // <h1 style={{backgroundColor:"purple"}}></h1>// <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const footer = (
        <>
            <Button label="Update" style={{backgroundColor: 'rgb(120, 200, 180)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth:'2px'}} onClick={(e) => {
                props.setVisible(true)
                props.setCurrentUser(props.user)
                props.setUpdate(true)
            }} icon="pi pi-check" />
            <Button label="Delete" style={{backgroundColor: 'rgb(80, 0, 0)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth:'2px' }} onClick={(e) => {
                deleteUser()
            }} icon="pi pi-times"></Button>
        </>
    );

    return (
        <div className="card flex justify-content-center" >
            <Card footer={footer} header={header} style={{borderColor: 'rgb(120, 180, 180)', borderStyle: 'double', borderWidth:'2px'}}>
                {props.user.name}
                <br></br>
                {props.user.userName}
                <br></br>
                {props.user.email}
                <br></br>
                {props.user.address}
                <br></br>
                {props.user.phone}
                

            </Card>
        </div>
    )
}

export default User