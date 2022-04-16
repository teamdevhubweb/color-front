import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { IoMdArrowRoundBack } from 'react-icons/io';
import {Link} from 'react-router-dom'
import Footer from '../components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import firebase from '../firebase'


 const ResetPassword = ({baseUrl}) => {

    const [resetPassUser, setResetPassUser] = useState({
         userMobile:'', userPassword:'', verificationCode:''
    }) 
    const handShow = (e) => {
        const { name, value } = e.target

        setResetPassUser((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }
    
    const resetPassword = (e) =>{

        // e.preventDefault()
        const { userMobile, userPassword } = resetPassUser
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userMobile, userPassword
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"user/resetPassword", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    // alert('Successfully Reset Password')
                    toast.success('Successfully Reset Password', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    setResetPassUser({
                         userMobile:'', userPassword:''
                    }) 
                   
                } else {
                    toast.error('Not Reset Password', {
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
    const configureCaptcha = () => {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                onSignInSubmit();
                console.log("Recaptca varified")
            },
            defaultCountry: "IN"
        });
    }
    const onSignInSubmit = (e) => {
        e.preventDefault()
        configureCaptcha()
        const phoneNumber = "+91" + resetPassUser.userMobile
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                console.log("OTP has been sent")
                toast.success('OTP has been sent', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                // document.getElementById('form1').style.display = 'none';
                document.getElementById('form2').style.display = 'block';
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log(error);
                
                console.log("SMS not sent")
                toast.error('SMS not sent', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    }
      const onSubmitOTP = (e) =>{
        e.preventDefault()
        const code = resetPassUser.verificationCode
        console.log(code)
        window.confirmationResult.confirm(code).then((result) => {
          // User signed in successfully.
        //   const user = result.user;
        //   console.log(JSON.stringify(user))
          toast.success('User is verified', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                resetPassword()
          // ...
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          toast.error('User is not verified', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        });
      }

    return (
        <>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand ><Link to='/mine' style={{marginLeft:'42px', color:'white'}}><IoMdArrowRoundBack/></Link></Navbar.Brand>
                    <Navbar.Brand >Reset Password</Navbar.Brand>
                </Navbar>
            </div>

            <div style={{ padding: '30px' }}>
                <Form onSubmit={onSignInSubmit} style={{display:'block'}} id='form1'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control type="text" placeholder={'Mobile Number'} name='userMobile' value={resetPassUser.userMobile} onChange={handShow} required />
                        {/* <Form.Control type="text" placeholder={<FaMobileAlt/> + 'Mobile Number'} /> */}
                    </Form.Group>
                    {/* <div style={{ display: 'flex'}}>
                        <div style={{ width: '70rem' }}>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="text" placeholder="Verification Code"  required />
                            </Form.Group>
                        </div>

                        <div  style={{ width: '10rem', marginLeft:'10px' }}>
                            <Button variant="secondary" type="submit">
                                OTP
                            </Button>
                        </div>
                    </div> */}

                    <div id="sign-in-button"></div>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="New Password"name='userPassword' value={resetPassUser.userPassword} onChange={handShow} required />
                    </Form.Group>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{marginBottom:'6rem'}}>
                            {/* <Button style={{ width: '16rem' }} variant="primary" type="submit" onClick={(e)=>resetPassword(e)}>
                               Continue
                            </Button> */}
                            <Button style={{ width: '16rem' }} variant="primary" type="submit">
                               send otp
                            </Button>
                        </div>
                    </div>
                </Form>
                <Form onSubmit={onSubmitOTP} style={{display:'none', marginBottom:'5rem'}} id='form2'>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '70rem' }}>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Verification Code" name='verificationCode'  value={resetPassUser.verificationCode} onChange={handShow} required />
                            </Form.Group>
                        </div>

                        <div style={{ width: '10rem', marginLeft: '10px' }}>
                            <Button variant="secondary" type='submit'>
                            Submit
                            </Button>             
                        </div>
                    </div>
                </Form>
            </div>

            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default ResetPassword
