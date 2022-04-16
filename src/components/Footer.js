import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import { GiMedal } from 'react-icons/gi';
import { FaGamepad, FaUserCircle, FaHistory } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom'
import './Footer.css';

const Footer = () => {

    const location = useLocation();
    const { pathname } = location;

    const splitLocation = pathname.split("/");


    useEffect(() => {
        if (localStorage.getItem('token')) {
            document.getElementById('history').style.display = 'block';
        }
    }, [])

    return (
        <>
            <div style={{ position: 'fixed', left: '0', bottom: '0', width: '100%', textAlign: 'center', backgroundColor: "#ffffff" }}>
                <div>
                    <Row>
                        <Col className={splitLocation[1] == "home" ? 'active activeNav' : "active"}>
                            <Link to='/home' style={{ textDecoration: 'none' }}>
                                <div style={{ courser: 'poniter', color: 'black' }} tabindex="1">
                                    <span><FaGamepad /></span>
                                    <p>Home</p>
                                </div>
                            </Link>
                        </Col>

                        <Col className={splitLocation[1] == "win" ? 'active activeNav' : "active"}>
                            <Link to='/win' style={{ textDecoration: 'none' }}>
                                <div style={{ courser: 'poniter', color: 'black' }} tabindex="2">
                                    <span><GiMedal /></span>
                                    <p>Period</p>
                                </div>
                            </Link>
                        </Col>

                        <Col style={{ display: 'none' }} id='history' className={splitLocation[2] == "history" ? 'active activeNav' : "active"}>
                            <Link to='/user/history' style={{ textDecoration: 'none' }}>
                                <div style={{ courser: 'poniter', color: 'black' }} tabindex="3">
                                    <span><FaHistory /></span>
                                    <p>History</p>
                                </div>
                            </Link>
                        </Col>

                        <Col className={splitLocation[1] == "mine" ? 'active activeNav' : "active"}>
                            <Link to='/mine' style={{ textDecoration: 'none' }}>
                                <div style={{ courser: 'poniter', color: 'black' }} tabindex="4">
                                    <span><FaUserCircle /></span>
                                    <p>Mine</p>
                                </div>
                            </Link>
                        </Col>

                    </Row>
                </div>
                <h4 id="demo" className='demoNone'></h4>
            </div>
        </>


    )
}

export default Footer