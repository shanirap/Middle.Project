import { useEffect, useRef, useState } from "react"
import axios from 'axios'
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import Post from './Post'

const Posts = () => {

    const [postsData, setPostsData] = useState([])
    const [visible, setVisible] = useState(false)
    const titleRef = useRef("")
    const bodyRef = useRef("")
    const [update, setUpdate] = useState(false)
    const [currentPost, setCurrentPost] = useState({})

    //getAllPosts
    const getPosts = async () => {
        try {
            const res = await axios.get('http://localhost:6660/postRoute/get')
            if (res.status === 200) {
                console.log(res.data)
                setPostsData(res.data)
            }

        } catch (e) {
            setPostsData([])
            console.error(e)
        }
    }


    useEffect(() => {
        getPosts()
    }, [])


    //update
    const updatePost = async () => {
        const objPost = {
            _id: currentPost._id,
            title: titleRef.current.value ? titleRef.current.value : currentPost.title,
            body: bodyRef.current.value ? bodyRef.current.value : currentPost.body,
        }
        getPosts()

        try {
            const res = await axios.put('http://localhost:6660/postRoute/put', objPost)
            if (res.status === 200) {
                console.log(res.data)
                getPosts()
                setUpdate(false)
            }
        } catch (e) {
            setPostsData([])
            console.error(e)
        }
    }


    //post
    const createPost = async () => {
        const newPost = {
            title: titleRef.current.value,
            body: bodyRef.current.value
        }
        try {
            const res = await axios.post('http://localhost:6660/postRoute/post', newPost)

            if (res.status === 200) {
                console.log(res.data)
                getPosts()
            }
        } catch (e) {
            getPosts();
            alert("Title is required")
            console.error(e)
        }

    }




    return (

        <div>
            <div className="card flex justify-content-center" style={{ backgroundColor: 'rgb(120, 180, 180)' }}>
                <Button label="Add post" icon="pi pi-book" style={{ backgroundColor: 'rgb(120, 200, 180)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth: '2px' }} onClick={() => setVisible(true)} />
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <div className="flex flex-column px-8 py-5 gap-4" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--primary-400), var(--primary-700)), ', backgroundColor: 'rgb(120, 180, 180)', marginLeft: '0.5em', borderColor: 'rgb(0, 0, 0)', borderStyle: 'double', borderWidth: '2px' }}>

                            <p width="35" height="35" className="block mx-auto" style={{ color: 'rgb(80,0,0', fontWeight: 'bold' }}> Post
                            </p>
                            <div className="inline-flex flex-column gap-2">
                                <label className="text-primary-50 font-semibold">Title</label>
                                <InputText ref={titleRef} label="Title" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                                <label>Body</label>
                                <InputText ref={bodyRef} label="Body" className="bg-white-alpha-20 border-none p-3 text-primary-50"></InputText>
                            </div>

                            <div>
                                <Button label="Save" onClick={(e) => {

                                    update ?
                                        updatePost() : createPost()
                                    hide(e)
                                }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                <Button label="Cancel" style={{ color: 'rgb(80,0,0' }} onClick={(e) => hide(e)} text ></Button>
                            </div>

                        </div>
                    )}
                >


                </Dialog>
            </div>
            {postsData ? postsData.sort(((p1, p2) => p1._id - p2._id)).map((post, index) => <Post key={index} setUpdate={setUpdate} post={post} setCurrentPost={setCurrentPost} currentPost={post} setPostsData={setPostsData} setVisible={setVisible} getPosts={getPosts}></Post>) : <></>}
        </div>
    )
}

export default Posts