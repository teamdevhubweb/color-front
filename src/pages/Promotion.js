import React, { useEffect, useState } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { BiRupee } from 'react-icons/bi';
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';

const Promotion = ({baseUrl, userBalance}) => {

    const [promo, setpromo] = useState([])
   

    useEffect(() => {

        showpromo();

    }, [])

    const showpromo = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl+"show/user/Promo", requestOptions)
            .then(response => response.json())
            .then(result => {
                setpromo(result)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <div>
                <Navbar bg="primary" expand="lg" variant="dark">
                    <Navbar.Brand href="#home" style={{ color: 'white' }}><Link to='/mine' style={{ marginLeft: '42px', color: 'white' }}><IoMdArrowRoundBack /></Link> <span style={{ marginLeft: '42px' }}>Promotion</span> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" style={{ padding: '20px' }}>
                        <Nav className="me-auto">
                            <Nav.Link >Promotion Record</Nav.Link>
                            <Nav.Link >Bonus Record</Nav.Link>
                            <Nav.Link >Apply Record</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>

            <div style={{ marginTop: '25px' }}>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div>
                        <h6 style={{ fontSize: '20px' }}>Balance: <BiRupee />{userBalance}</h6>
                    </div>
                    <div>
                        <Button style={{ width: '10rem', margin: '6px' }} variant="primary" type="submit">
                            Apply to Balance
                        </Button>
                    </div>
                </div>
            </div>
            <div style={{ marginBottom: '7rem' }}>
                {
                    promo.map((val, index) => {
                        return (
                            <>
                                <div style={{ margin: '25px', boxShadow: '1px 1px 30px 1px gray', borderRadius:'10px' }} key={index}>
                                    <div style={{ padding: '15px' }}>
                                        <div style={{ padding: '5px' }}>
                                            <p>My Promotion Code</p>
                                            <h6>{val.promoCode}</h6>
                                            <hr />
                                        </div>

                                        <div style={{ padding: '5px' }}>
                                            <p> Promotion Code Description</p>
                                            <p>{val.promoDes}</p>
                                            <hr />
                                        </div>
                                        <div style={{ padding: '5px' }}>
                                            <p>Promotion Code Validity</p>
                                            <p>{val.validity}</p>
                                            <hr />
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    })
                }
            </div>


            <Footer />
        </>
    )
}

export default Promotion