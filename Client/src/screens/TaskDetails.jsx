import React from 'react'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import {  useParams } from 'react-router-dom'
import axios from './../axios/axios'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'
import jwt from 'jwt-decode'


const TaskDetails = () => {



  const [details, setDetails] = useState([])
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)
  let writerId = ''

  const [file, setFile] = useState('')
  const { taskId } = useParams()
  const token = localStorage.getItem('token')
  axios.defaults.headers.common['auth-token'] = token

  if (token) {

    let data = jwt(token)
    writerId = data.writerId
  }

  const logout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  const formData = new FormData()
  formData.append('file_path', file)
  formData.append('taskId', taskId)


  const handleSubmmit = async (event) => {
    event.preventDefault()

    await axios.post('/submit_task/', formData)
      .then(() => setAlert2(true))
      .catch(error => console.log(error))
  }

  const handleDownload = async (event) => {
    event.preventDefault()
    await axios.get(`/download_docs/${taskId}/`, { responseType: 'blob' })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${details.title}.zip`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error)
      })

  }




  let variant = ''
  let taskState = ''


  switch (details.state) {
    case 0: variant = 'light'
      taskState = 'Available'
      break
    case 1: variant = 'info'
      taskState = 'Taken'
      break

    case 2: variant = 'success'
      taskState = 'In Review'

      break
    case 3: variant = 'warning'
      taskState = 'Needs Modifying'

      break
    case 4: variant = 'secondery'
      taskState = 'Done '

      break
    default: variant = null

  }

  const Apply = () => {

    axios.patch(`/do_task/${taskId}/`)
    setAlert(true)

  }


  useEffect(() => {

    if (token) {
      const getTaskDetails = async () => {

        const res = await

          axios.get(`/writer_single_task/${taskId}/`)
        setDetails(res.data[0])


      }
      getTaskDetails()
    }
    else window.location.href = '/'



  }, [])

  return (
    <Container className='justify-content-center m-5 p-2' >
      <h1 className='text-center'> Task Details</h1>
      <hr />

      <Row>

        <Col key={details.id}>
          <Card className='shadow m-2 p-2 ' border={variant}
            key={variant}>
            <Card.Header>
              <Card.Title >Title: {details.title}</Card.Title>
            </Card.Header>



            <ListGroup variant='Flush'>
              <ListGroupItem> <Card.Subtitle>Price:  {details.price} SP Per Page</Card.Subtitle> </ListGroupItem>
              <ListGroupItem><Card.Subtitle>Deadline: {details.deadline} || {details.deadline_time} </Card.Subtitle></ListGroupItem>
              <ListGroupItem><Card.Subtitle>Pages: {details.pages}</Card.Subtitle></ListGroupItem>
              <ListGroupItem><Card.Subtitle className='m-auto'> Description: </Card.Subtitle>
              <Card.Text className='m-auto text-end'>{details.details}</Card.Text>
              </ListGroupItem>
              <ListGroupItem hidden={taskState === 'Taken' || taskState === 'In Review' || taskState === 'Available' || taskState === 'Done'}><Card.Text className='m-auto'>NOTES: {details.notes}</Card.Text></ListGroupItem>

            </ListGroup>

            <Col>
              <Button className='m-2' onClick={Apply} hidden={taskState === 'Taken' || taskState === 'In Review' || taskState === 'Needs Modifying' || taskState === 'Done'}>
                Apply
              </Button>

              <Button variant='warning' className='m-2' onClick={Apply} hidden={taskState === 'Taken' || taskState === 'In Review' || taskState === 'Available' || taskState === 'Done'}>
                Work on it
              </Button>


              {alert ? <Alert variant='success'> Apllied for this task successfully <Alert.Link href="/log">See it in your log</Alert.Link> OR <Alert.Link onClick={logout}>Logout</Alert.Link> </Alert> : null}
              <Form className='m-2' onSubmit={handleSubmmit} encType='multipart/form-data' hidden={details.writerId == writerId}>
                <Form.Group className="mb-3" controlId="file">
                  <Form.Label>Upload File </Form.Label>
                  <Form.Control
                    name='file_path'
                    onChange={e => setFile(e.target.files[0])}
                    type="file"
                    placeholder="file.zip"
                  />
                  {alert2 ? <Alert variant='success'> File has been submitted, your task now is in review </Alert> : null}
                  <Button className='mt-2' type='submit'>
                    Submit Task
                  </Button>
                  
                </Form.Group>
                

              </Form>

              <Button className='m-2' onClick={handleDownload}>
                Download Task Documents
              </Button>

            </Col>
            <Card.Footer className="text-muted"> Since: {details.createdAt}</Card.Footer>
          </Card>
        </Col>
      </Row>


    </Container>
  )
}

export default TaskDetails