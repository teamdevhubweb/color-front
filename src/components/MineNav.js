import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Container, Row, Col,Stack, Button, Form } from 'react-bootstrap';
import { BiRupee } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const MineNav = ({ baseUrl }) => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState([])

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "userId": localStorage.getItem('token')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "showUserAdmin", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUserData(result)
                // console.log(result);
            })
            .catch(error => console.log('error', error));
    }, [])

    const logOutUser = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <>
            <div>
                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                    <Container>
                        <Row>
                            <Col>
                                <Navbar.Brand >Mine</Navbar.Brand>
                            </Col>
                        </Row>
                        <Stack direction="horizontal" >
                           
                            <div className="vr" />
                            <Button variant="outline-danger" style={{color:'white'}} onClick={(e) => logOutUser()}>Logout</Button>
                        </Stack>
                    </Container>
                </Navbar>
            </div>

            <div style={{ backgroundColor: '#DCDCDC	' }}>

                {
                  userData &&  userData?.map((val, index) => (
                        <div style={{ padding: '30px' }} key={index}>
                            <div>
                                <h6>ID: {val.userId}</h6>
                            </div>
                            <div>
                                <h6>Mobile: +91{val.userMobile}</h6>
                            </div>
                            <div>
                                <h6>Nick Name: {val.userNickName}</h6>
                            </div>
                            <div>
                                <h6>Available balance: <BiRupee /> {val.userBalance}</h6>
                            </div>
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default MineNav