import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { AiFillTrophy } from 'react-icons/ai';
import { io } from "socket.io-client";
// import { RiCheckboxBlankCircleLine } from 'react-icons/ri';

const AllTableWin = ({ baseUrl }) => {
  
    const [userAddressDetails, setUserAddressDetails] = useState([])


    useEffect(() => {
        showAddressDetails();
    }, [])





    const userID = localStorage.getItem("token")

    
    const [socket, setSocket] = useState(null)



     useEffect(()=>{

        if (userID) {
            if(socket === null)
            {
                setSocket(io(baseUrl))
            }
            if(socket)
            {
                socket.on("receive_period", (data) => {
                    showAddressDetails();
                })
        }  
        }
      
},[socket])
    
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


    const filterPeriod = userAddressDetails && userAddressDetails?.filter((data)=>{
        return data?.win !== ""
    })
   
    // const HandlShow = (e) => {
    //     const { name, value } = e.target

    //     setUserAddressInfo((prastate) => ({
    //         ...prastate,
    //         [name]: value,
    //     }))
    // }
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <div>
                    < AiFillTrophy />
                </div>
                <div>
                    <h6>Partiy Record</h6>
                </div>
            </div>

            <div style={{ padding: '30px', display: 'block' }} id='divTable' >

<MaterialTable
    title="Periods"
    columns={[
        { title: 'Result id', field: 'Id' },
        { title: 'Period Is', field: 'period' },
        { title: 'Win', field: 'win' },
        // { title: 'Date', field: 'date' },
        {
            title: "Win Color",
            field: "win",
            editable: false,
            render: (rowData) =>
                rowData && (
                    <div
                    className={rowData?.win== "andar" ?'yourSelecta':rowData?.win == "bahar" ? "yourSelectB" : "yourSelectt" }

                    >
                        {/* {(rowData?.date).split('T')[0]} */}


                

                    </div>
                )
        }

    ]}

    data={filterPeriod}

/>
</div>
            <div style={{ marginBottom: '6rem', textAlign: 'center' }}>
                {/* <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>Period</th>
                           
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            userAddressDetails && userAddressDetails?.map((data, i) => {

                                return (
                                    data?.win?.length > 0 && <tr key={i}>
                                        <td>{data?.period}</td>
                                       
                                        <td> <div className={data?.win== "andar" ?'yourSelecta':data?.win == "bahar" ? "yourSelectB" : "yourSelectt" }></div></td>
                                    </tr>


                                )
                            })
                        }




                       
                    </tbody>
                </Table> */}
                <h4 id="demo" className='demoNone'></h4>
            </div>
        </>
    )
}

export default AllTableWin