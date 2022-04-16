import React, { useState } from 'react'
import { Navbar, Container } from "react-bootstrap"
import { IoMdArrowRoundBack } from 'react-icons/io';
import { Link } from 'react-router-dom'
import { RiWallet3Fill } from 'react-icons/ri'
import Footer from '../components/Footer'

// function onScriptLoad(){
//   var config = {
//     "root": "",
//     "flow": "DEFAULT",
//     "data": {
//     "orderId": "", /* update order id */
//     "token": "", /* update token value */
//     "tokenType": "TXN_TOKEN",
//     "amount": "" /* update amount */
//     },
//     "handler": {
//       "notifyMerchant": function(eventName,data){
//         console.log("notifyMerchant handler function called");
//         console.log("eventName => ",eventName);
//         console.log("data => ",data);
//       } 
//     }
//   };

//   if(window.Paytm && window.Paytm.CheckoutJS){
//       window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
//           // initialze configuration using init method 
//           window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
//               // after successfully updating configuration, invoke JS Checkout
//               window.Paytm.CheckoutJS.invoke();
//           }).catch(function onError(error){
//               console.log("error => ",error);
//           });
//       });
//   } 
// }


function Recharge() {

const [money,setmoney] = useState('');

const sendMoney = (value)=> {
  setmoney(value)

}


  return (
    <>
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand ><Link to='/mine' style={{ marginLeft: '42px', color: 'white' }}><IoMdArrowRoundBack /></Link></Navbar.Brand>
          <Navbar.Brand >Recharge</Navbar.Brand>
        </Navbar>
      </div>
      <div style={{ boxShadow: "1px 1px 5px 1px #888888", paddingBottom: "5rem", width: "100%" }}>

        <Navbar style={{ backgroundColor: "#fc8d38", height: "5%", marginTop: "0px" }}>
          <p style={{ color: "white", fontSize: "1rem", padding: "0.4rem" }}>!  Note: If the recharge amount is deducted but amountis not added to the account, please send a detailed screenshot of payment and game ID to the mailbox for processing </p>
        </Navbar>
        <h3 style={{ color: "#fc8d38", textAlign: "center" }}>Any Problem? Contact:<span style={{ color: "#0288d1" }} onClick={event =>  window.location.href='https://api.whatsapp.com/send?phone=917877444069'}>Whatsapp</span></h3>
        <h2 style={{ textAlign: "center" }}>Balance: 0.00</h2>
        <div style={{ borderRadius: "0.5rem", boxShadow: "0px 5px 8px 0px #888888", width: "80%", margin: "2rem", paddingLeft: "2rem" }}>
          <RiWallet3Fill style={{ color: "gray" }} />
          <input value={money} placeholder='Please select recharge amount' style={{ width: "80%", height: "3rem", border: "none" }} /></div>
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            <button onClick={ ()=>sendMoney("100")} class="btn btn-light" style={{ marginLeft: "0.5rem", marginBottom: "0.5rem", boxShadow: "1px 1px 4px 1px #888888", textAlign: "center" }}>100</button>
            <button onClick={ ()=>sendMoney("500")}  class="btn btn-light" style={{ marginLeft: "0.5rem", marginBottom: "0.5rem", boxShadow: "1px 1px 4px 1px #888888", textAlign: "center" }}>500</button>
            <button onClick={ ()=>sendMoney("1000")}  class="btn btn-light" style={{ marginLeft: "0.5rem", marginBottom: "0.5rem", boxShadow: "1px 1px 4px 1px #888888", textAlign: "center" }}>1000</button>
            <button onClick={ ()=>sendMoney("3000")} class="btn btn-light" style={{ marginLeft: "0.5rem", marginBottom: "0.5rem", boxShadow: "1px 1px 4px 1px #888888", textAlign: "center" }}>3000</button>
            <button onClick={ ()=>sendMoney("5000")} class="btn btn-light" style={{ marginLeft: "0.5rem", marginBottom: "0.5rem", boxShadow: "1px 1px 4px 1px #888888", textAlign: "center" }}>5000</button>
            <button onClick={ ()=>sendMoney("10000")} class="btn btn-light" style={{ marginLeft: "0.5rem", marginBottom: "0.5rem", boxShadow: "1px 1px 4px 1px #888888", textAlign: "center" }}>10000</button>
            <button onClick={ ()=>sendMoney("20000")} class="btn btn-light" style={{ marginLeft: "0.5rem", marginBottom: "0.5rem", boxShadow: "1px 1px 4px 1px #888888", textAlign: "center" }}>20000</button>
            <button onClick={ ()=>sendMoney("50000")} class="btn btn-light" style={{ marginLeft: "0.5rem", marginBottom: "0.5rem", boxShadow: "1px 1px 4px 1px #888888", textAlign: "center" }}>50000</button>
          </div>
        </Container>
        <div style={{ margin: "2rem", color: "#888888" }}>
          {/* <p>Payment</p>
          <p> <input type="checkbox" id="payment" name="payment" value="Payment" style={{ marginRight: "0.5rem", color: "#888888" }} />
            EK</p> */}

            </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={event =>  window.location.href='https://upi://pay?pa=7877444069@paytm&amp;amp;pn=Abhinav Kumar&amp;amp;cu=INR'} class="btn btn-primary" style={{ width: "30%", height: "2.7rem", borderRadius: "0px" }}>Recharge</button></div>
      </div>
      <Footer /></>
  )
}

export default Recharge