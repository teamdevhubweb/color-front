import React, { useState } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap';
import TableWin from '../components/TableWin';
import { Link } from 'react-router-dom'
import { IoMdArrowRoundBack } from 'react-icons/io';
import Footer from '../components/Footer';
import AllTableWin from '../components/AllTableWin';

const History = ({ baseUrl }) => {

  const [tab, setTab] = useState("allHistory");

  return (
    <>
      <div>
        <Navbar bg="primary" expand="lg" variant="dark">
          <Navbar.Brand href="#home" style={{ color: 'white' }}><Link to='/mine' style={{ marginLeft: '42px', color: 'white' }}><IoMdArrowRoundBack /></Link> <span style={{ marginLeft: '42px' }}>{/* My History */}</span> </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          {/* <Navbar.Collapse id="basic-navbar-nav" style={{ padding: '20px' }}>
                        <Nav className="me-auto">
                            <Nav.Link >All History</Nav.Link>
                            
                        </Nav>
                        
                    </Navbar.Collapse> */}

        </Navbar>
      </div>
      <div className='container-fluid allhistory'>
        <div className='row '>
       
        <div className='col-6'>
          <p onClick={() => { setTab("allHistory") }} className={tab == "allHistory" ? "active" : ""}>All History </p>
        </div>
        <div className='col-6'>
          <p onClick={() => { setTab("myHistory") }} className={tab == "myHistory" ? "active" : ""}>My History</p>
        </div>
        </div>
      </div>


      {
        tab == "allHistory" ? <AllTableWin baseUrl={baseUrl}/> :
          <TableWin baseUrl={baseUrl} />
      }

      <Footer />
    </>
  )
}

export default History