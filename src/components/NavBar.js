import React from 'react'
import { Navbar } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';

const NavBar = ({page}) => {

   
    return (
        <>  
        {
            page?
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand  style={{ marginLeft: '30px' }}><IoMdArrowRoundBack /></Navbar.Brand>
                    <Navbar.Brand >Login</Navbar.Brand>
                </Navbar>
            </div>
            :
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="/"  style={{ marginLeft: '30px' }}><IoMdArrowRoundBack /></Navbar.Brand>
                    <Navbar.Brand>Register</Navbar.Brand>
                </Navbar>
            </div>
        }   
        </>
    )
}

export default NavBar