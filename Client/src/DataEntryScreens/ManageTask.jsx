import React from 'react'
import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useParams } from 'react-router-dom'
import axios from './../axios/axios'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'
import jwt from 'jwt-decode'


const ManageTask = () => {
  const [details, setDetails] = useState([])
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)
  let DeId = ''

  const [note, setNote] = useState('')
  const { taskId } = useParams()
  const token = localStorage.getItem('token')
  axios.defaults.headers.common['auth-token'] = token

  if (token) {

    let data = jwt(token)
    DeId = data.dataEntryId
  }

  const logout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(taskId)
    await axios.patch('/needs_modifying/', { note: note, taskId: taskId })
      .then(() => window.location.href='/taskmanagement')
      .catch(error => console.log(error))
  }

  const handleDownload = async (event) => {
    event.preventDefault()
    await axios.get(`/download_comp_task/${taskId}/`, { responseType: 'blob' })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `completed ${details.title}.zip`);
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
      taskState = 'Done'

      break
    default: variant = null

  }

  const MarkAsDone = () => {
    let writerId = details.writerId
    let price = details.price
    let pages = details.pages

    axios.patch(`/mark_as_done/`, { taskId: taskId, writerId: writerId, price: price, pages: pages })
    setAlert(true)
    window.location.href='/dedashboard'
  }

  const DeleteTask = () => {
    axios.delete(`/delete_task/${taskId}`)
      .then(() => window.location.href = '/taskmanagement')
      .catch(err => {console.log(err)})
  }

  useEffect(() => {

    if (token) {
      const getTaskDetails = async () => {

        const res = await

          axios.get(`/get_single_task/${taskId}/`)
        setDetails(res.data.data[0])



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
              <ListGroupItem> <Card.Subtitle>Client Name:  {details.client}</Card.Subtitle> </ListGroupItem>
              <ListGroupItem> <Card.Subtitle>Price:  {details.price} SP Per Page</Card.Subtitle> </ListGroupItem>
              <ListGroupItem><Card.Subtitle>Deadline: {details.deadline} || {details.deadline_time} </Card.Subtitle></ListGroupItem>
              <ListGroupItem><Card.Subtitle>Pages: {details.pages}</Card.Subtitle></ListGroupItem>
              <ListGroupItem><Card.Subtitle className='m-auto'> Description: </Card.Subtitle>
              <Card.Text className='m-auto text-end'>{details.details}</Card.Text>
              </ListGroupItem>

            </ListGroup>

            <Col>
              <Button className='m-2' onClick={MarkAsDone} hidden={taskState === 'Taken' || taskState === 'Available' || taskState === 'Needs Modifying' || taskState === 'Done'}>
                Accept Task
              </Button>


              {/* {alert ? <Alert variant='success'> Apllied for this task successfully <Alert.Link href="/log">See it in your log</Alert.Link> OR <Alert.Link onClick={logout}>Logout</Alert.Link> </Alert> : null}
                  {alert2 ? <Alert variant='success'> File has been submitted, your task now is in review </Alert> : null} */}


              <Form className='m-2' onSubmit={handleSubmit} hidden={taskState === 'Taken' || taskState === 'Available' || taskState === 'Needs Modifying' || taskState === 'Done'}>
                <Form.Group className="mb-3" controlId="note">
                  <Form.Label>Note</Form.Label>
                  <Form.Control
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    as="textarea"
                    placeholder="Enter Your Notes About The Task"
                  />
                  <Button variant='warning' className='mt-2' type='submit'>Needs Modifying</Button>
                </Form.Group>
              </Form>

              <Button className='m-2' onClick={handleDownload} hidden={taskState === 'Taken' || taskState === 'Available'}>
                Download Completed Task File
              </Button>

              <Button variant='danger' className='m-2' onClick={DeleteTask} >
                Delete Task
              </Button>

            </Col>
            <Card.Footer className="text-muted"> Since: {details.createdAt}</Card.Footer>
          </Card>
        </Col>
      </Row>


    </Container>
  )
}

export default ManageTask