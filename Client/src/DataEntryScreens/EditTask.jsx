import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert'
import axios from './../axios/axios'
import { useParams } from "react-router-dom";


const EditTask = () => {

    const { taskId } = useParams()
    const [file, setFile] = useState('')
    const [title, setTitle] = useState('')
    const [deadline, setDeadline] = useState('')
    const [pages, setPages] = useState('')
    const [price, setPrice] = useState('')
    const [details, setDetails] = useState('')
    const [alert, setAlert] = useState(false)
    const [alert2, setAlert2] = useState(false)

    const token = localStorage.getItem('token')
    axios.defaults.headers.common['auth-token'] = token

    const formData = new FormData()
    formData.append('file', file)
    formData.append('title', title)
    formData.append('deadline', deadline)
    formData.append('pages', pages)
    formData.append('price', price)
    formData.append('details', details)




    const addTask = async (event) => {
        event.preventDefault()

        await axios.patch(`/edit_task/${taskId}/`, formData)
            .then(() => window.location.href = '/')
            .catch(error => {
                if (error.response.status === 403) setAlert(true)
                else if (error.response.status === 400) setAlert2(true)
            })



    }

    return (
        <>
            <Container>
                <h1>Edit Task</h1>
                <hr />
                <Form className='m-2' onSubmit={addTask} encType='multipart/form-data'>
                    {alert ? <Alert variant='success'> Task Edited Successfully <Alert.Link href="/delog">See it in your log</Alert.Link></Alert> : null}
                    <Form.Group className="mb-3" controlId="file">
                        <Form.Label>Upload File </Form.Label>
                        <Form.Control
                            name='file'
                            onChange={e => setFile(e.target.files[0])}
                            type="file"
                            placeholder="file.zip"
                        />
                        {alert2 ? <Alert variant='success'> File has been submitted </Alert> : null}

                    </Form.Group>

                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            type="text"
                            placeholder="Task Title"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="deadline">
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control
                            value={deadline}
                            onChange={e => setDeadline(e.target.value)}
                            type="date"
                            placeholder="Set deadline"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="pages">
                        <Form.Label>Pages</Form.Label>
                        <Form.Control
                            value={pages}
                            onChange={e => setPages(e.target.value)}
                            type="text"
                            placeholder="Set pages"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            type="text"
                            placeholder="Set price"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="details">
                        <Form.Label>Details</Form.Label>
                        <Form.Control
                            value={details}
                            onChange={e => setDetails(e.target.value)}
                            type="text"
                            placeholder="Enter task details"
                        />
                    </Form.Group>

                    <Button className='mt-2' type='submit'>
                        Update Task
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default EditTask