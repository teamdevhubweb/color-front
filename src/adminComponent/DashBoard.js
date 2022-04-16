import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

function DashBoard({ baseUrl }) {
    const [allDate, setAllDeta] = useState({})
    const [socket, setSocket] = useState(null)
    const [liveUser, setLiveUser] = useState("0")

    const userID = localStorage.getItem("token")



    useEffect(() => {
        if (userID) {
            if (socket === null) {
                setSocket(io(baseUrl))
            }
            if (socket) {
                socket.on("user_Live", (data) => {
                    setLiveUser(data)
                })
            }
        }
    }, [socket])







    useEffect(() => {
        showUser();
    }, [])


    console.log(allDate);

    const showUser = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch(baseUrl + "gameCommission", requestOptions)
            .then(response => response.json())
            .then(result => {
                setAllDeta(result)
            })
            .catch(error => console.log('error', error));
    }






    return (
        <div>
            <div class="container"><div><div class="roportsHeader"></div>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="reportCard desB">
                            <h3>GAME PLAY</h3>
                            <div class="row "><div class="col-12">
                                <h5>Total game play</h5>
                                <p>{allDate?.totalGamePlay}</p></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="reportCard desB">
                            <h3>ACTIVE USER </h3>
                            <div class="row ">
                                <div class="col-12">
                                    <h5>Live Active user</h5>
                                    <p>{liveUser}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="reportCard desB">
                            <h3>RECHARGE </h3>
                            <div class="row ">
                                <div class="col-6">

                                    <h5>Total Rechage</h5>
                                    <p>{allDate?.TotalRechage}</p>
                                </div>
                                <div class="col-6">
                                    <h5>Total Rechage Amount</h5>
                                    <p>{allDate?.TotalRechageAmount}</p></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="reportCard desB">
                            <h3>COMMISSION</h3>
                            <div class="row ">
                                <div class="col-12">
                                    <h5>Total commission</h5>
                                    <p>{allDate?.withdawalCommission + allDate?.gameCommission}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>

        </div>

    )
}

export default DashBoard