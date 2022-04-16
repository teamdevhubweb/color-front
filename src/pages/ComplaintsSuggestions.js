import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Card } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';
import styled from 'styled-components'


const ComplaintsSuggestions = ({ baseUrl }) => {

    const [ticketData, setTicketData] = useState([])

    useEffect(() => {
        showTicket()
    }, [])

    const showTicket = () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var raw = JSON.stringify({
            'userId':localStorage.getItem('token')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "show/admin/Ticket", requestOptions)
            .then(response => response.json())
            .then(result => {
                setTicketData(result)
            })
            .catch(error => console.log('error', error));
    }

    const changeComp = (val) => {

        if (val === 'completed') {
            document.getElementById('wait').style.display = 'none'
            document.getElementById('completed').style.display = 'block'
        } else if (val === 'wait') {
            document.getElementById('wait').style.display = 'block'
            document.getElementById('completed').style.display = 'none'
        }
    }

    return (
        <>
            <div>
                <Navbar bg="primary" expand="lg" variant="dark">
                    <Navbar.Brand style={{ color: 'white' }}><Link to='/mine' style={{ color: 'white' }}><IoMdArrowRoundBack /></Link><span style={{ marginLeft: '2px', cursor:'pointer' }} onClick={() => changeComp('wait')}>Complaints&Suggestions</span> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{ padding: '20px' }}>
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => changeComp('completed')}>COMPLETED</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
            <div id='wait' style={{ display: 'block' }}>
                <div style={{ display: 'grid',  gridTemplateColumns: " repeat(auto-fill, 300px) " }}>
                    {
                        ticketData.filter(val => {
                            console.log(val.status)
                            if (val.status === 'Pending') {
                                return val
                            } 
                        }).map(val => (
                            <div style={{ margin: '2rem', }}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title style={{display:'flex'}}>
                                            <div>
                                                <h3>Tickets</h3>
                                            </div>
                                            <div style={{margin:'10px'}}>
                                            <div style={{paddingLeft:'5rem', color:'red'}}>
                                                <h6>{val.status}</h6>
                                            </div>
                                            </div>
                                            
                                        </Card.Title>
                                        <Card.Text>
                                            <h6>Name: <Span>{val.name}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Email: <Span>{val.email}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Mobile Number:  <Span>{val.phone}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Subject: {val.subject} <Span></Span></h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Message: <Span>{val.message}</Span> </h6>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                            </div>
                        ))

                    }

                </div>
            </div>

            <div id='completed' style={{ display: 'none' }}>
                <div style={{ display: 'grid',  gridTemplateColumns: " repeat(auto-fill, 300px) " }}>
                    {
                        ticketData.filter(val => {
                            console.log(val.status)
                            if (val.status === 'Resolve') {
                                return val
                            } 
                        }).map(val => (
                            <div style={{ margin: '2rem', }}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title style={{display:'flex'}}>
                                            <div>
                                                <h3>Tickets</h3>
                                            </div>
                                            <div style={{margin:'10px'}}>
                                            <div style={{paddingLeft:'5rem', color:'green'}}>
                                                <h6>{val.status}</h6>
                                            </div>
                                            </div>
                                            
                                        </Card.Title>
                                        <Card.Text>
                                            <h6>Name: <Span>{val.name}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Email: <Span>{val.email}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Mobile Number:  <Span>{val.phone}</Span> </h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Subject: {val.subject} <Span></Span></h6>
                                        </Card.Text>
                                        <Card.Text>
                                            <h6>Message: <Span>{val.message}</Span> </h6>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>

                            </div>
                        ))

                    }

                </div>
            </div>

            <Footer />
        </>
    )
}

export default ComplaintsSuggestions

const Span = styled.span`
color: gray;
`;