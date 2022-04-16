import React, { useState, useEffect } from 'react'
import { BiRupee, BiRefresh } from 'react-icons/bi';
import { AiFillTrophy } from 'react-icons/ai';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import ModalReadRule from './ModalReadRule';
import { Link, useLocation } from 'react-router-dom'
import coin1 from '../image/coins-img/coin-1.png'
import coin2 from '../image/coins-img/coin-2.png'
import coin3 from '../image/coins-img/coin-3.png'
import coin6 from '../image/coins-img/coin-6.png'
import coin10 from '../image/coins-img/coin-10.png'
import ModalRupesSelect from './ModalRupesSelect';
import styled from 'styled-components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from "socket.io-client";
import Countdown from 'react-countdown';
import { HiOutlineCurrencyRupee } from 'react-icons/hi';
import { FaWindowClose } from 'react-icons/fa';
// import { socket } from './CostomSocket';

const WinHeader = ({ baseUrl, userBalance, userName }) => {


    const location = useLocation();
    const [periodDemo, setperiodDemo] = useState();
    const [userDetails, setuserDetails] = useState("");


    const [modalShow1, setModalShow1] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [valueRupess, setValueRupess] = useState('10');
    const [cardValue, setCardValue] = useState('');
    const [messageList, setMessageList] = useState(1);
    const [periodTime, setperiodTime] = useState(0);
    const [periodDetails, setperiodDetails] = useState(0);
    const [disable, setDisable] = useState("false");
    const [socket, setSocket] = useState(null)

    const start = Date.now();
    const myRef = React.createRef()
    const { pathname } = location;
    const splitLocation = pathname.split("/");

    const [tievalue, settievalue] = useState(0);
    const [andarValue, setandarValue] = useState(0);
    const [baharValue, setbaharValue] = useState(0);


    const userID = localStorage.getItem("token")




    useEffect(() => {
        if (userID) {

            if (socket === null) {
                // setSocket(io("http://54.237.197.99:5000"))
                // setSocket(io("http://192.168.0.65:5000"))
                setSocket(io("http://localhost:5000"))

            }
            if (socket) {

                socket.on("receive_message", (data) => {
                    setMessageList(data?.endTime)
                })
                socket.on("receive_period", (data) => {
                    socket.emit("user_Details_Get", localStorage.getItem("token"));
                    setperiodTime(data?.period)
                    setperiodDetails(data)
                    showAddressDetails()
                })

                socket.emit("user_Details_Get", localStorage.getItem("token"));
                socket.on("user_Details", (data) => {
                    setuserDetails(data)
                })
            }
        }







    }, [socket])

    var nows = new Date().getTime();
    var distances = messageList - (nows + 10000);


    React.useEffect(() => {
        const leftTime = messageList - nows
        setTimeout(() => {
            if (leftTime < 10000) {
                setDisable("true")
            }
        }, 1000);

        setTimeout(() => {
            setDisable("true")
        }, distances);

    }, [messageList])


    const [userAddressDetails, setUserAddressDetails] = useState([])


    // console.log(userAddressDetails);


    const showAddressDetails = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            userId: localStorage.getItem('token')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl + "allGameHisory", requestOptions)
            .then(response => response.json())
            .then(result => {
                setUserAddressDetails(result.data);

            })
            .catch(error => console.log('error', error));
    }













    const existTime = messageList - Date.now()

    const [minute, setminute] = useState('');
    const [seconds, setseconds] = useState('');


    // console.log(minute);
    // console.log(seconds);

    React.useEffect(() => {

        var x = setInterval(function () {
            var now = new Date().getTime();
            var distance = messageList - now;
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // document.getElementById("demo").innerHTML = + minutes + ":" + seconds + "";
            document.getElementById("demo").innerHTML = seconds < 10 ? "0" + seconds : seconds;
            // setminute(minutes)
            // setseconds(seconds)


            if (distance < 0) {
                clearInterval(x);
                setDisable("false")
                document.getElementById("demo").innerHTML = "00";
                settievalue(0)
                setandarValue(0)
                setbaharValue(0)
                socket.emit("user_Details_Get", userID);
            }
        }, 1000);

    }, [messageList])


    const refreshPage = () => {
        window.location.reload();
    }



    const checkoutOrder = (val) => {


        if (parseFloat(userDetails?.userBalance) >= parseInt(valueRupess)) {
            // showModal2(val)
            if (val == "tie") {
                settievalue(tievalue + parseInt(valueRupess))
            }
            else if (val == "andar") {
                setandarValue(andarValue + parseInt(valueRupess))
            }
            else if (val == "bahar") {
                setbaharValue(baharValue + parseInt(valueRupess))
            }
            var now = new Date().getTime();
            var distance = messageList - now;
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            var myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json");
            var raw = JSON.stringify({ "userId": localStorage.getItem("token"), "userName": userDetails?.userName, "time": minutes + "." + seconds, "cardtype": val, "amount": valueRupess, "Period": periodTime /* 20220210208 */ });
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch(baseUrl + "orders", requestOptions)
                .then(response => response.json())
                .then(result => {
                    if (result === 'Successfully') {
                        toast.success('Successfully Add', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });

                    } else {
                        alert('Login Required')
                        toast.error('Login Required', {
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
        else {

            alert('balance insufficient')
            toast.error('balance insufficient', {
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


    const changePeriod = () => {
        const d = new Date()
        const p = d.toISOString().slice(0, 10)
        const startTime = p.replaceAll('-', '')
    }

    // const oldDate = "202203240001"

    // console.log(oldDate.substring(0, 9));
    useEffect(() => {
        document.getElementById("img10").style.boxShadow = "0px 0px 30px 2px green"
        const d = new Date()
        const p = d.toISOString().slice(0, 10)
        setperiodDemo(p.replaceAll('-', ''))
        changePeriod();
    }, [])

    const showModal2 = (val) => {

        setCardValue(val)
        setModalShow2(true)

        if (val === 'tie') {
            document.getElementById('tie').style.boxShadow = '0px 0px 30px 2px  green';
        } else {
            document.getElementById('tie').style.boxShadow = '1px 1px gray';
        }

        if (val === 'andar') {
            document.getElementById('andar').style.boxShadow = '0px 0px 30px 2px  blue';
        } else {
            document.getElementById('andar').style.boxShadow = '1px 1px gray';
        }

        if (val === 'bahar') {
            document.getElementById('bahar').style.boxShadow = '0px 0px 30px 2px  red';
        } else {
            document.getElementById('bahar').style.boxShadow = '1px 1px gray';
        }


    }
    const showDiv = (val) => {

        setValueRupess(val)

        if (val === "10") {
            document.getElementById("img10").style.boxShadow = "0px 0px 30px 2px #ACA44C"
        }
        else {
            document.getElementById("img10").style.boxShadow = "1px  1px grey"

        }
        if (val === "100") {
            document.getElementById("img100").style.boxShadow = "0px 0px 30px 2px #f4b424"
        } else {
            document.getElementById("img100").style.boxShadow = "1px  1px grey"

        } if (val === "500") {
            document.getElementById("img500").style.boxShadow = "0px 0px 30px 2px #EC1C54"
        } else {
            document.getElementById("img500").style.boxShadow = "1px  1px grey"

        } if (val === "1000") {
            document.getElementById("img1000").style.boxShadow = "0px 0px 30px 2px #BC4C9C"
        } else {
            document.getElementById("img1000").style.boxShadow = "1px  1px grey"

        } if (val === "10000") {
            document.getElementById("img10000").style.boxShadow = "0px 0px 30px 2px #14BC9C"
        } else {
            document.getElementById("img10000").style.boxShadow = "1px  1px grey"

        }
        /*  if (val === "green") {
            document.getElementById("green").style.boxShadow = "0px 0px 30px 2px green"
        } else {
            document.getElementById("green").style.boxShadow = "1px  1px grey"

        } */
    }




    const detailsHide = (() => {
        document.querySelector("#detailsId").style.display = "none";
    })

    return (
        <>
            <div style={{ backgroundColor: '#1E90FF', color: 'white' }}>
                <div>
                    <h6 style={{ color: 'red', textAlign: 'center', paddingTop: '15px' ,paddingBottom:'15px' }}>
                        Live : {/* 200 */} {Math.floor(Math.random() * (Math.floor(200) - Math.ceil(50) + 1)) + Math.ceil(50)} {/* {getRandomInt(50,200)} */}
                    </h6>
                </div>
                <div id='detailsId'>
                    
                    <TopMessage style={{ padding: '30px' }}><div onClick={()=>{detailsHide()}} className="detailsIdClose"> <FaWindowClose/></div> You can only withdraw cash after your bet amount recharge the top-up amount. For example, if you recharge 200rs, you can withdraw money only after your accumulated bet amountreaches 200rs. Our withdrawal time is 10:00-22:00, other time will not provide withdrawal services. </TopMessage>
                </div>
            </div>
            <div style={{ backgroundColor: '#6495ED', color: 'white', marginTop: '-16px' }}>
                <div>
                    <h6 style={{ padding: '20px' }}>Available balance: {userDetails?.userBalance}{/* {userBalance} */} <BiRupee /></h6>
                </div>

                <div style={{ display: 'flex', padding: '10px', justifyContent: 'center' }}>
                    <div >
                        <Link to='/recharge'><HeaderButton variant="primary">Recharge</HeaderButton></Link>
                    </div>
                    <div style={{ marginLeft: '20px' }}>
                        <HeaderButton variant="light" onClick={() => setModalShow1(true)}>Read Rule</HeaderButton>
                    </div>

                    <div style={{ marginLeft: '20px' }}>
                        <HeaderButton variant="dark" onClick={refreshPage}>Reload<BiRefresh /></HeaderButton>
                    </div>
                </div>
            </div>

            <div style={{ backgroundColor: '#DCDCDC	' }}>
                <div style={{ display: 'flex', padding: '10px', justifyContent: 'space-around' }}>


                    <div>
                        <Row>
                            <Col style={{ marginRight: "-25px" }}>

                                < AiFillTrophy />

                            </Col>
                            <Col>
                                <div style={{ marginLeft: '10px' }}>
                                    <HeaderCount>Period</HeaderCount>
                                    <h5>{periodTime}{/* 20220210208 */}</h5>
                                    <h5>{/* {periodDemo} */} {/* 20220210208 */}</h5>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    <div style={{ marginLeft: '55px' }}>
                        <HeaderCount>Count Down</HeaderCount>
                        {/* <h4 >02:49</h4> */}
                        {/* <h4 >{minute <= 0 ? "00" : minute < 10 ? "0" + minute : minute}:{seconds <= 0 ? "00" : seconds < 10 ? "0" + seconds : seconds}</h4> */}


                        <h4 id="demo"></h4>


                        {/* <h4  ref={myRef} id="demos"></h4> */}

                        {/* <Countdown date={messageList} /> */}

                    </div>
                </div>


                <div style={{ display: "flex", justifyContent: 'center', borderRadius: "25px" }}>



                    <CardDiv id="tie" className={disable == "true" ? "disable" : ''} onClick={() => checkoutOrder('tie')} style={{
                        width: '58rem', backgroundColor: "green", borderRadius: "25px",
                        border: "5px solid #e4d00a", marginBottom: "5px"
                    }}><div className='main1' style={{ height: "1.5rem", borderRadius: "25px 26px 0px 0px", backgroundColor: "darkgreen", display: "flex", justifyContent: "space-between" }} >
                        </div>




                        <FontSize >TIE</FontSize>
                        <div>
                            <span style={{ color: 'white', alignSelf: `flex-end`, border: '1px solid yellow', borderRadius: '10px', padding: '1px 5px', marginLeft: '10px' }}><HiOutlineCurrencyRupee /> :{tievalue}</span>
                        </div>
                        <Card.Img variant="top" src="" />
                        {/* <div className='tieCount'>
                            <p> {tievalue}</p>
                        </div> */}
                    </CardDiv>

                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <CardDiv id="andar" className={disable == "true" ? "disable" : ''} onClick={() => checkoutOrder('andar')} style={{
                        width: '29rem', borderRadius: "25px 25px 25px 180px", backgroundColor: "blue",
                        border: "5px solid #e4d00a", marginRight: "4px", marginBottom: "10px"
                    }}>
                        <div style={{ height: "1.5rem", borderRadius: "10px 10px 5px 4px", backgroundColor: "darkblue", display: "flex", justifyContent: "space-between" }}>
                        </div>
                        <FontSize >Andar</FontSize>
                        <div>

                            <span style={{ color: 'white', alignSelf: `flex-end`, border: '1px solid yellow', borderRadius: '10px', padding: '1px 5px', marginLeft: '50px' }}><HiOutlineCurrencyRupee /> :{andarValue}</span>
                        </div>
                        <Card.Img variant="top" src="" />
                        {/* <div className='tieCount'>
                            <p> {andarValue}</p>
                        </div> */}
                    </CardDiv>
                    <CardDiv id="bahar" className={disable == "true" ? "disable" : ''} onClick={() => checkoutOrder('bahar')} style={{
                        width: '29rem', borderRadius: "25px 25px 180px 25px",
                        backgroundColor: "red",
                        border: "5px solid #e4d00a"
                    }}><div style={{ height: "1.5rem", borderRadius: "10px 10px 5px 0px", backgroundColor: "darkred", display: "flex", justifyContent: "space-between" }}>
                        </div>
                        <FontSize >Bahar</FontSize>
                        <div>

                            <span style={{ color: 'white', alignSelf: `flex-end`, border: '1px solid yellow', borderRadius: '10px', padding: '1px 5px', marginLeft: '10px' }}><HiOutlineCurrencyRupee /> :{baharValue}</span>
                        </div>
                        <Card.Img variant="top" src="" />
                        {/* <div className='baharCount'>
                            <p> {baharValue}</p>
                        </div> */}
                    </CardDiv>
                </div>


            </div>

            <CoinDiv>
                <Container>
                    <CoinCnterDiv>
                        <div >
                            <img id='img10' className={disable == "true" ? "disable" : ''} src={coin10} style={{ boxShadow: '1px 1px gray', width: '5rem', borderRadius: '50rem', background: '#AAA64D' }} alt='coin10' onClick={() => showDiv('10')} />
                        </div>
                        <div >
                            <img id="img100" className={disable == "true" ? "disable" : ''} src={coin1} style={{ boxShadow: '1px 1px gray', width: '5rem', borderRadius: '50rem', background: '#F6B527' }} alt='coin1' onClick={() => showDiv('100')} />
                        </div>
                        <div >
                            <img id="img500" className={disable == "true" ? "disable" : ''} src={coin2} style={{ boxShadow: '1px 1px gray', width: '5rem', borderRadius: '50rem', background: '#ED1F57' }} alt='coin2' onClick={() => showDiv('500')} />
                        </div>
                        <div >
                            <img id="img1000" className={disable == "true" ? "disable" : ''} src={coin3} style={{ boxShadow: '1px 1px gray', width: '5rem', borderRadius: '50rem', background: '#BB4D9D' }} alt='coin3' onClick={() => showDiv('1000')} />
                        </div>


                        <div >
                            <img id="img10000" className={disable == "true" ? "disable" : ''} src={coin6} style={{ boxShadow: '1px 1px gray', width: '5rem', borderRadius: '50rem', background: '#10B99D' }} alt='coin6' onClick={() => showDiv('10000')} />
                        </div>

                    </CoinCnterDiv>
                </Container>
            </CoinDiv>





            <div style={{ display: 'flex', justifyContent: 'center', color: 'black', marginBottom: '8rem' }}>
                {/* <div style={{ marginLeft: '2rem' }}>
                    <h6>| A |</h6>
                </div> */}
                {
                    userAddressDetails && userAddressDetails?.map((data, i) => {
                        // console.log(data);


                        return (

                            data?.win?.length > 0 && i < 21 && <div style={{ marginLeft: '1rem' }} key={i}>
                                <h6>|{data?.win == "andar" ? " A " : data?.win == "bahar" ? " B " : " T "}|</h6>
                            </div>

                        )
                    })
                }
                {/* <div style={{ marginLeft: '1rem' }}>
                    <h6>| B |</h6>
                </div>
                <div style={{ marginLeft: '1rem' }}>
                    <h6>| A |</h6>
                </div>
                <div style={{ marginLeft: '1rem' }}>
                    <h6>| T |</h6>
                </div>

                <div style={{ marginLeft: '1rem' }}>
                    <h6>| A |</h6>
                </div>
                <div style={{ marginLeft: '1rem' }}>
                    <h6>| T |</h6>
                </div> */}
            </div>

            <ModalReadRule
                show={modalShow1}
                onHide={() => setModalShow1(false)}
            />

            <ModalRupesSelect
                show={modalShow2}
                onHide={() => setModalShow2(false)}
                value={valueRupess}
                cardValue={cardValue}
            />

            <ToastContainer />
        </>
    )
}

export default WinHeader


const CardDiv = styled.div`
margin: 0.4rem;
cursor:pointer;
height: 7rem;
@media screen and (min-width: 767px) {
    height: 10rem;
  }

`;

const TopMessage = styled.p`
 @media screen and (max-width: 626px) {
    font-size: 11px;
  }
`;

const HeaderCount = styled.h4`
 @media screen and (max-width: 626px) {
    font-size: 16px;
    font-weight: 700;
  }

`;

const HeaderButton = styled(Button)`
 @media screen and (max-width: 626px) {
    font-size: 10px;
    
  }

`;

const FontSize = styled.div`
display: flex;
justify-content: center;
 align-items: center;
 color: white;
 font-size: 40px;

 @media screen and (max-width: 426px) {
    font-size: 30px;
  }

`;

const CoinDiv = styled.div`
display: block;
`;

const CoinCnterDiv = styled.div`
cursor:pointer;
display: grid; 
grid-template-columns: repeat(auto-fill, 70px); 
justify-items: center; 
grid-gap: 35px; 
padding: 1rem;
margin-bottom:2rem;
@media screen and (min-width: 968px) {
    display: flex;
    justify-content: center;
  }

  @media screen and (max-width: 440px) {
    grid-gap: 26px;
    margin-left:30px
  }

  @media screen and (max-width: 335px) {
    grid-gap: 20px;
  }

`
