
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import axios from 'axios'
const Post = (props) => {

    //delete
    const deletePost = async () => {
        const _id = props.post._id

        try {
            const res = await axios.delete(`http://localhost:6660/postRoute/delete/${_id}`)
            if (res.status === 200) {
                console.log(res.data)
                props.getPosts()
            }
        } catch (e) {
            props.setPostsData([])
            console.error(e)
        }
    }


    const header = (
      <></>  // <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const footer = (
        <>
            <Button label="Update" style={{backgroundColor: 'rgb(120, 200, 180)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth:'2px'}} onClick={(e) => {
                props.setVisible(true)
                props.setCurrentPost(props.post)
                props.setUpdate(true)
            }} icon="pi pi-check" />
            
            <Button label="Delete" style={{backgroundColor: 'rgb(80, 0, 0)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth:'2px' }} onClick={(e) => {
                deletePost()
            }} icon="pi pi-times"></Button>
        </>
    );

    return (
        <div className="card flex justify-content-center">
            <Card footer={footer} header={header} style={{borderColor: 'rgb(120, 180, 180)', borderStyle: 'double', borderWidth:'2px'}}>
                {props.post.title}
                <br></br>
                {props.post.body}

            </Card>
        </div>
    )
}

export default Post