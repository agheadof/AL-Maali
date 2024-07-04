import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"
import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert'
import axios from './../axios/axios'
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";


const AddingTask = () => {

  const [file, setFile] = useState('')
  const [title, setTitle] = useState('')
  const [deadline, setDeadline] = useState('')
  const [deadline_time, setDeadline_time] = useState('')
  const [pages, setPages] = useState('')
  const [price, setPrice] = useState('')
  const [details, setDetails] = useState('')
  const [client, setClient] = useState('')
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)

  const token = localStorage.getItem('token')
  axios.defaults.headers.common['auth-token'] = token

  const formData = new FormData()
  formData.append('file', file)
  formData.append('title', title)
  formData.append('deadline', deadline)
  formData.append('deadline_time', deadline_time)
  formData.append('pages', pages)
  formData.append('price', price)
  formData.append('details', details)
  formData.append('client', client)

  const addTask = async (event) => {
    event.preventDefault()

    await axios.post('/create_task/', formData)
      .then(() => {
        window.location.href = `/taskmanagement`
      })
      .catch(error => {
        if (error.response.status === 403) setAlert(true)
        else if (error.response.status === 400) setAlert2(true)
      })



  }

  return (
    <>
      <Container >
        <h1>Create Task</h1>
        <hr />
        <Form className='m-2' onSubmit={addTask} encType='multipart/form-data'>
          {alert ? <Alert variant='success'> Task Created Successfully <Alert.Link href="/delog">See it in your log</Alert.Link></Alert> : null}
          <Row>
            <Col>
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
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  type="text"
                  placeholder="Task Title"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="client">
                <Form.Label>Client Name</Form.Label>
                <Form.Control
                  value={client}
                  onChange={e => setClient(e.target.value)}
                  type="text"
                  placeholder="Enter Client Name"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="deadline">
                <Form.Label>Deadline Date</Form.Label>
                <Form.Control
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  type="date"
                  placeholder="Set deadline"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="deadline_time">
                <Form.Label>Deadline Time</Form.Label>
                <Form.Control
                  value={deadline_time}
                  onChange={e => setDeadline_time(e.target.value)}
                  type="time"
                  placeholder="Set deadline time"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="pages">
                <Form.Label>Pages</Form.Label>
                <Form.Control
                  value={pages}
                  onChange={e => setPages(e.target.value)}
                  type="text"
                  placeholder="Set pages"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  type="text"
                  placeholder="Set price"
                />
              </Form.Group>
            </Col>

          </Row>
          <Row>

            <Col>
              <Form.Group className="mb-3" controlId="details">
                <Form.Label>Details</Form.Label>
                <Form.Control
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  as="textarea"
                  placeholder="Enter task details"
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className='mt-2' type='submit'>
            Create Task
          </Button>
        </Form>
      </Container>
    </>
  )
}

export default AddingTask