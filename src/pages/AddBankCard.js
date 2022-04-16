import React, { useEffect, useState } from 'react'
import { Navbar, Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
// import ModalWin from '../components/ModalEditAdd';

const AddBankCard = ({ baseUrl }) => {

    const Id =localStorage.getItem('token')
    const [userBankInfo, setUserBankInfo] = useState({
        userId: Id , actualName: '', ifseCode: '', bankName: '', accountNumber: '', state: '', city: '', address: '', mobileNumber: '', email: '', upiAccount: '', userStatus: 0, userDelete: 1, val: ''
    })

    const [userBankDetails, setUserBankDetails] = useState([])
    // const [modalShow, setModalShow] = useState(false);

    console.log(userBankDetails);

    useEffect(() => {
        showBankDetails();
    }, [])

    const showBankDetails = () => {
        document.getElementById('addDiv').style.display = 'none';
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userId: Id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "showBankDetails", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUserBankDetails(result.data)
            }
            )
            .catch(error => console.log('error', error));
    }

    const HandlShow = (e) => {
        const { name, value } = e.target

        setUserBankInfo((prastate) => ({
            ...prastate,
            [name]: value,
        }))
    }

    const AddBankCardDetails = (e) => {

        e.preventDefault()

        const { userId, actualName, ifseCode, bankName, accountNumber, state, city, address, mobileNumber, email, upiAccount, userStatus, userDelete } = userBankInfo

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userId, actualName, ifseCode, bankName, accountNumber, state, city, address, mobileNumber, email, upiAccount, userStatus, userDelete
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "blankDetails", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Add Successfully', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    showBankDetails();
                    window.location.reload();

                } else {
                    toast.error('Not Add', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            })
            .catch(error => console.log('error', error));
    }

    const removeBankCard = (val) => {
        console.log(val.id);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "userId": val.id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "remove/BankDetails", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Remove', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    showBankDetails();
                } else {
                    toast.error('Not Remove', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            })
            .catch(error => console.log('error', error));
    }

    const editBankCard = (val) => {

        document.getElementById('editDiv').style.display = 'block'
        document.getElementById('bankDiv').style.display = 'none'

        setUserBankInfo({
            userId: val.userId
            , actualName: val.actualName, ifseCode: val.ifseCode, bankName: val.bankName,
            accountNumber: val.accountNumber, state: val.state, city: val.city, address: val.address,
            mobileNumber: val.mobileNumber, email: val.email, upiAccount: val.upiAccount,
        })
    }

    const updateBank = (e) => {
        e.preventDefault()

        const { userId, actualName, ifseCode, bankName, accountNumber, state, city, address, mobileNumber, email, upiAccount} = userBankInfo

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userId, actualName, ifseCode, bankName, accountNumber, state, city, address, mobileNumber, email, upiAccount
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "edit/BankDetails", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Edit Successfully', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    document.getElementById('bankDiv').style.display = 'block'
                    document.getElementById('editDiv').style.display = 'none'
                    showBankDetails();
                } else {
                    toast.error('Not Edit', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            })
            .catch(error => console.log('error', error));

    }

    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand ><Link to='/mine' style={{ marginLeft: '42px', color: 'white' }}><IoMdArrowRoundBack /></Link></Navbar.Brand>
                    <Navbar.Brand >Add Bank Card</Navbar.Brand>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '85vw' }}>
                        <div style={{ color: 'white', marginRight: '30px', cursor: 'pointer' }}>
                            <span onClick={() => {
                                if(!userBankDetails){

                                    document.getElementById('addDiv').style.display = 'block'
                                    document.getElementById('bankDiv').style.display = 'none'
                                    document.getElementById('editDiv').style.display = 'none'
                                } else {
                                    toast.error('Already Added', {
                                        position: "top-right",
                                        autoClose: 2000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        });
                                }
                            }}><AiOutlinePlus /></span>
                        </div>
                    </div>
                </Navbar>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ margin: '2rem', display: 'block' }} id='bankDiv'>
                    {
                        userBankDetails ?
                            userBankDetails.map((val, index) => {
                                return (
                                    <Card style={{ width: '18rem' }} key={index}>
                                        <Card.Body>
                                            <Card.Title>Bank Details</Card.Title>
                                            <Card.Text>
                                                <h6>Bank Name: <span>{val.bankName}</span></h6>
                                            </Card.Text>
                                            <Card.Text>
                                                <h6>Account Number:  <span>{val.accountNumber}</span> </h6>
                                            </Card.Text>
                                            <Card.Text>
                                                <h6>IFSE Code:  <span>{val.ifseCode}</span> </h6>
                                            </Card.Text>
                                            <Card.Text>
                                                <h6>Upi Account:  <span>{val.upiAccount}</span> </h6>
                                            </Card.Text>
                                            <Card.Text>
                                                <h6>Mobile Number:  <span>{val.mobileNumber}</span> </h6>
                                            </Card.Text>
                                            <Card.Text>
                                                <h6>State:  <span>{val.state}</span> </h6>
                                            </Card.Text>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <div style={{ marginRight: '12px' }} >
                                                    <Button variant="primary" onClick={() => editBankCard(val)}>Edit</Button>
                                                </div>
                                                <div>
                                                    <Button variant="danger" onClick={() => removeBankCard(val)}>Remove</Button>
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                )
                            })
                            :
                            <p>Not Add Bank detailes</p>
                    }

                </div>
            </div>
            <div style={{ display: 'none' }} id='addDiv'>
                <div style={{ padding: '30px' }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Actual Name" name='actualName' value={userBankInfo.actualName} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="IFSC Code" name='ifseCode' value={userBankInfo.ifseCode} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Bank Name" name='bankName' value={userBankInfo.bankName} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Account Number" name='accountNumber' value={userBankInfo.accountNumber} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="State/Territory" name='state' value={userBankInfo.state} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="City" name='city' value={userBankInfo.city} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Address" name='address' value={userBankInfo.address} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Mobile Number" name='mobileNumber' value={userBankInfo.mobileNumber} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Email" name='email' value={userBankInfo.email} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="UPI Account" name='upiAccount' value={userBankInfo.upiAccount} onChange={HandlShow} required />
                        </Form.Group>


                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div style={{ marginBottom: '6rem' }}>
                                <Row>
                                    <Col>
                                        <Button variant="secondary" onClick={() => {
                                            document.getElementById('addDiv').style.display = 'none'
                                            document.getElementById('bankDiv').style.display = 'block'
                                            document.getElementById('editDiv').style.display = 'none'
                                        }} >Cencel</Button>
                                    </Col>
                                    <Col>
                                        <Button variant="primary" style={{ width: '13rem' }} type="submit" onClick={(e) => AddBankCardDetails(e)}>
                                            Continue
                                        </Button>
                                    </Col>
                                </Row>

                            </div>
                        </div>
                    </Form>
                </div>
            </div>

            <div id='editDiv' style={{ display: 'none', border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 5px 1px #888888", margin: "30px", marginBottom: '5rem' }}>
                <Container style={{ padding: "20px" }}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Actual Name" name='actualName' value={userBankInfo.actualName} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="IFSC Code" name='ifseCode' value={userBankInfo.ifseCode} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Bank Name" name='bankName' value={userBankInfo.bankName} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Account Number" name='accountNumber' value={userBankInfo.accountNumber} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="State/Territory" name='state' value={userBankInfo.state} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="City" name='city' value={userBankInfo.city} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Address" name='address' value={userBankInfo.address} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Mobile Number" name='mobileNumber' value={userBankInfo.mobileNumber} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Email" name='email' value={userBankInfo.email} onChange={HandlShow} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="UPI Account" name='upiAccount' value={userBankInfo.upiAccount} onChange={HandlShow} required />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button variant="secondary" onClick={() => {
                                    document.getElementById('addDiv').style.display = 'none'
                                    document.getElementById('bankDiv').style.display = 'block'
                                    document.getElementById('editDiv').style.display = 'none'
                                }} >Cencel</Button>
                            </Col>
                            <Col>
                                <Button variant="primary" onClick={(e) => updateBank(e)} >Save</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </div>

            {/* <ModalWin
                show={modalShow}
                onHide={() => setModalShow(false)}
                val={userBankInfo.val}
                userId={localStorage.getItem('token')}
            /> */}
            <Footer />
            <ToastContainer />
        </>
    )
}

export default AddBankCard