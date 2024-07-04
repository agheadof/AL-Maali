import axios from './../axios/axios'
import React from 'react'
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/Table'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/esm/Tabs'
import DataEntryRegister from './DataEntryRegister'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const ManageAcc = () => {


    const [deAcc, setDeAcc] = useState([])
    const [wAcc, setWAcc] = useState([])
  const [searchDe, setSearchDe] = useState([])
  const [searchW, setSearchW] = useState([])



    const token = localStorage.getItem('token')
    axios.defaults.headers.common['auth-token'] = token

    useEffect(() => {


        if (token) {
            const getDeAcc = async () => {
                const res = await axios.get('/get_de_acc/')
                if (res.data !== "Forbidden") {
                    setDeAcc(res.data)
                    setSearchDe(res.data)
                }
                else {
                    setDeAcc(null)
                    setSearchDe(null)
                }

            }
            getDeAcc()
        }
        else window.location.href = '/'

    }, [])

    useEffect(() => {


        if (token) {
            const getWAcc = async () => {
                const res = await axios.get('/get_w_acc/')
                if (res.data !== "Forbidden") {
                    setWAcc(res.data)
                    setSearchW(res.data)
                }
                else {
                    setWAcc(null)
                    setSearchW(null)
                }

            }
            getWAcc()
        }
        else window.location.href = '/'

    }, [])

    const [Defilter, setDeFilter] = useState([])
    const [Wfilter, setWFilter] = useState([])


    const handleDESearch = (e) => {
      const searchWord = e.target.value;
     
      if (searchWord === '') {
        setDeAcc(searchDe)
      }
      else {
        const newFilter = searchDe.filter((value) => value.full_name.toLowerCase().includes(searchWord.toLowerCase()))
        setDeAcc(newFilter)
      }
      setDeFilter(searchWord)
    }

    const handleWSearch = (e) => {
        const searchWord = e.target.value;
        
        if (searchWord === '') {
          setWAcc(searchW)
        }
        else {
          const newFilter = searchW.filter((value) => value.full_name.toLowerCase().includes(searchWord.toLowerCase()))
          setWAcc(newFilter)
        }
        setWFilter(searchWord)
      }

    return (
        <>
            <Container className='mt-5'>
                <Tabs 
                    defaultActiveKey='wAcc'
                    id="Accounts"
                    className="mb-3"
                    justify>
                    <Tab eventKey='deCreate' title='Create DE Account'> <DataEntryRegister /> </Tab>
                    <Tab eventKey='deAcc' title="Data Entries Accounts">
                        <Form className="d-flex justify-content-start" >
                            <FloatingLabel
                                className="me-2 w-50"
                                controlId="floatingsearch"
                                label="Search By Name"
                            >
                                <Form.Control
                                    type="search"
                                    placeholder="Search By Name"
                                    value={Defilter}
                                    onInput={(e) => handleDESearch(e)}

                                    aria-label="Search"
                                />
                            </FloatingLabel>
                        </Form>
                        <Table striped bordered hover responsive size='sm' variant="dark">
                            <thead>
                                <tr>
                                    <th># ID</th>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    deAcc.map(acc => {

                                        return (<tr key={acc.id}>
                                            <td>{acc.id}</td>
                                            <td>{acc.full_name}</td>
                                            <td>{acc.email}</td>
                                            <td>{acc.phone}</td>
                                            <td>{<Button size='sm' variant='danger' onClick={() => {
                                                axios.delete(`/del_de_acc/${acc.id}/`)
                                                    .then(() => window.location.reload(false))
                                            }}>Delete User</Button>}</td>
                                        </tr>)

                                    })

                                }
                            </tbody>
                        </Table>

                    </Tab>

                    <Tab eventKey="wAcc" title="Writers Accounts">
                    <Form className="d-flex justify-content-start" >
                            <FloatingLabel
                                className="me-2 w-50"
                                controlId="floatingInput"
                                label="Search By Name"
                            >
                                <Form.Control
                                    type="search"
                                    placeholder="Search By Name"
                                    value={Wfilter}
                                    onInput={(e) => handleWSearch(e)}

                                    aria-label="Search"
                                />
                            </FloatingLabel>
                        </Form>
                        <Table striped bordered hover size='sm' variant="light">
                            <thead>
                                <tr>
                                    <th># ID</th>
                                    <th>Full Name</th>
                                    <th>Balance</th>
                                    <th>Cash Out</th>
                                    <th>Activity Log</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                {

                                    wAcc.map(acc => {
                                        return (<tr key={acc.id}>
                                            <td>{acc.id}</td>
                                            <td>{acc.full_name}</td>
                                            <td>{acc.balance}</td>
                                            <td>{<Button size='sm' variant='success' onClick={() => {
                                                axios.post(`/cash_out/${acc.id}/`)
                                                    .then(() => window.location.reload(false))
                                            }}>Cash Out now</Button>}</td>
                                            <td>{<Button size='sm' variant='info' onClick={() => window.location.href=`/genhistory/${acc.id}`}>Generate History</Button>}</td>
                                            <td>{acc.email}</td>
                                            <td>{acc.phone}</td>
                                            <td>{<Button size='sm' variant='danger' onClick={() => {
                                                axios.delete(`/del_w_acc/${acc.id}/`)
                                                    .then(() => window.location.reload(false))
                                            }}>Delete User</Button>}</td>
                                        </tr>)

                                    })

                                }
                            </tbody>
                        </Table>
                    </Tab>

                </Tabs>
            </Container>


        </>
    )
}

export default ManageAcc