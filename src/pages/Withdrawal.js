import React, { useEffect, useState } from 'react'
import { Navbar, Form, Dropdown, Button } from 'react-bootstrap';
import { BiRupee } from 'react-icons/bi';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import Footer from '../components/Footer';

const Withdrawal = ({ userBalance, baseUrl, userName }) => {


    const Id = localStorage.getItem('token')


    const [userBankDetails, setUserBankDetails] = useState([])
    const [userDetails, setuserDetails] = useState("");



    const [userBankInfo, setUserBankInfo] = useState({
        reqamount: '', BankId: "", userPassword: ""
    })

    const [socket, setSocket] = useState(null)
    useEffect(() => {
        showBankDetails();

    }, [])




    const commission = 2 / 100 * userBankInfo?.reqamount
    const payableAmount = userBankInfo?.reqamount - commission




    useEffect(() => {
        if (Id) {
            if (socket === null) {
                setSocket(io(baseUrl))
            }
            if (socket) {
                socket.emit("user_Details_Get", Id);
                socket.on("user_Details", (data) => {
                    setuserDetails(data)
                })
            }
        }




    }, [socket])






    const showBankDetails = () => {
        // document.getElementById('addDiv').style.display = 'none';
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




    const withdrawalRequest = () => {

        if (userBankInfo?.reqamount == "") {
            toast.error('Amount  input required', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (userBankInfo?.BankId == "") {
            toast.error('Bank  card required', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        else if (userBankInfo?.userPassword == "") {
            toast.error('Password required', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {



            if (userDetails?.userBalance >= userBankInfo?.reqamount) {









                var myHeadersChack = new Headers();
                myHeadersChack.append("Content-Type", "application/json");

                var rawdata = JSON.stringify({
                    userId: Id,

                });

                var requestOptionsChack = {
                    method: 'POST',
                    headers: myHeadersChack,
                    body: rawdata,
                    redirect: 'follow'
                };

                // setUserBankInfo({ reqamount: "",BankId: "", userPassword: "" })

                fetch(baseUrl + "withdralpaymentchack", requestOptionsChack)
                    .then(response => response.json())
                    .then(result => {
                        // console.log(result);



                        if (result?.status == "400") {
                            toast.error(result?.mess, {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        } else {

                            // socket.emit("user_Details_Get", Id);
                    

                            if (result?.data >= userBankInfo?.reqamount) {



                                var myHeaders = new Headers();
                                myHeaders.append("Content-Type", "application/json");

                                var raw = JSON.stringify({
                                    userId: Id,
                                    BankId: userBankInfo?.BankId,
                                    requestPayment: userBankInfo?.reqamount,
                                    current_balance: userDetails?.userBalance,
                                    userName: userName,
                                    userPassword: userBankInfo?.userPassword,
                                    fee: commission.toFixed(2),
                                    payableAmount: payableAmount.toFixed(2)
                                });

                                var requestOptions = {
                                    method: 'POST',
                                    headers: myHeaders,
                                    body: raw,
                                    redirect: 'follow'
                                };

                                setUserBankInfo({ reqamount: "", BankId: "", userPassword: "" })

                                fetch(baseUrl + "withdrawal", requestOptions)
                                    .then(response => response.json())
                                    .then(result => {
                                        // console.log(result);

                                        if (result?.status == "400") {
                                            toast.error(result?.mess, {
                                                position: "top-right",
                                                autoClose: 2000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                        } else {

                                            socket.emit("user_Details_Get", Id);
                                            toast.success(result?.mess, {
                                                position: "top-right",
                                                autoClose: 2000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                pauseOnHover: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                        }


                                        // setUserBankDetails(result.data)
                                    }
                                    )
                                    .catch(error => {

                                        toast.error(error?.mess, {
                                            position: "top-right",
                                            autoClose: 2000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                        });

                                        // console.log('error', error)
                                    }
                                    );




                            } else {
                                toast.error("Withdawal must be less than gamePlay", {
                                    position: "top-right",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }






                        }


                        // setUserBankDetails(result.data)
                    }
                    )
                    .catch(error => {

                        toast.error(error?.mess, {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                        // console.log('error', error)
                    }
                    );








































            } else {
                toast.error('balance insufficients', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }

        }

    }

    const HandlShow = (e) => {
        const { name, value } = e.target

        setUserBankInfo((prastate) => ({
            ...prastate,
            [name]: value,
        }))
    }





    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand ><Link to='/mine' style={{ marginLeft: '42px', color: 'white' }}><IoMdArrowRoundBack /></Link></Navbar.Brand>
                    <Navbar.Brand >Withdrawal</Navbar.Brand>
                </Navbar>
            </div>

            <div>
                <div style={{ backgroundColor: '#fb8c00', color: 'white' }}>
                    <p style={{ padding: '15px' }}>Please assure the bank details are correct otherwise company will not be responsible for any missing withdraw.. </p>
                </div>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <h6 style={{ color: 'red' }}>Any problem? Contact <span style={{ color: '#0288d1' }}>WhatsApp</span></h6>
                </div>
            </div>

            <div style={{ marginTop: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <h6 style={{ fontSize: '30px' }}>Balance: <BiRupee /> {userDetails?.userBalance} </h6>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <div>
                        <Form>
                            <Form.Group style={{ width: '15rem' }} className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="number" placeholder='Enter withdrawal amount' name='reqamount' value={userBankInfo.reqamount} onChange={HandlShow} /></Form.Group>
                        </Form>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div>
                        <p>Fee:{commission.toFixed(2)}, to account {payableAmount.toFixed(2)}</p>
                    </div>
                </div>

                <div style={{ padding: '20px' }}>
                    <div >
                        <h6>Payout</h6>
                    </div>
                    <div>
                        <h6>Use bank to withdraw (EK)</h6>
                    </div>

                    <div>
                        <div style={{ marginTop: '15px' }}>

                            <Form.Select name="BankId" aria-label="Default select example" value={userBankInfo?.BankId} onChange={HandlShow}>
                                <option value={""}> Select Bank Card</option>
                                {
                                    userBankDetails && userBankDetails?.map((data, i) => {



                                        return (
                                            <option value={data?.id}>{data?.bankName}</option>
                                        )


                                    })
                                }

                            </Form.Select>


                            {/* <Dropdown>
                                <Dropdown.Toggle style={{ width: '88vw', textAlign: 'inherit' }} id="dropdown-button-dark-example1" variant="light">
                                    Select Bank Card
                                </Dropdown.Toggle>

                                <Dropdown.Menu variant="light" style={{ width: '88vw' }}>
                                    <Dropdown.Item href="#/action-1" active>
                                        Add Bank Card
                                    </Dropdown.Item>
                                    {
                                        userBankDetails && userBankDetails?.map((data, i) => {

                                            console.log(data);

                                            return (

                                                <Dropdown.Item href="#/action-1" active key={i}>
                                                    {data?.bankName}
                                                </Dropdown.Item>

                                            )


                                        })
                                    }


                                </Dropdown.Menu>



                            </Dropdown> */}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <div>
                        <Form>
                            <Form.Group style={{ width: '15rem' }} className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="password" placeholder='Enter your login password' name="userPassword" onChange={HandlShow} value={userBankInfo?.userPassword} /></Form.Group>
                        </Form>
                    </div>

                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ margin: '4rem' }}>
                        <Button style={{ width: '10rem', marginBottom: '26px' }} variant="primary" onClick={() => { withdrawalRequest() }} type="submit">
                            Withdrawal
                        </Button>
                    </div>

                </div>
            </div>
            <ToastContainer />
            <Footer />
        </>
    )
}

export default Withdrawal