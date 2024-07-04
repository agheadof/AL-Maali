import axios from './../axios/axios'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'
import {  useParams } from 'react-router-dom'

const GenHistory = () => {
    const [wLog , setWLog] = useState([])
    const {writerId} = useParams ()

    const token = localStorage.getItem('token')
    axios.defaults.headers.common['auth-token'] = token

    useEffect(() => {


        if (token) {
            const getWLog = async () => {
                const res = await axios.get(`/get_w_log/${writerId}/`)
                if (res.data !== "Forbidden") {
                    setWLog(res.data)
                }
                else {
                    setWLog(null)
                }

            }
            getWLog()
        }
        else window.location.href = '/'

    }, [])

  return (
    <Container>
        <Table striped bordered hover responsive size='sm' variant="dark">
                            <thead>
                                <tr>
                                    <th># ID</th>
                                    <th>Title</th>
                                    <th>Pages</th>
                                    <th>Price</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    wLog.map(his => {

                                        return (<tr key={his.id}>
                                            <td>{his.id}</td>
                                            <td>{his.title}</td>
                                            <td>{his.pages}</td>
                                            <td>{his.price}</td>
                                            <td>{his.createdAt}</td>
                                        </tr>)

                                    })

                                }
                            </tbody>
                        </Table>
    </Container>
  )
}

export default GenHistory