import React, { useState, useEffect } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap';
import { IoMdAddCircle } from 'react-icons/io';

import MaterialTable from "material-table";
const TableSetting = ({baseUrl}) => {
    const [Addsettings, setaddsettings] = useState({
        settingId: '', callNumber: '', wpNumber: '', name: '', email:'', upiId: ''
    })
    
    const [settings, setsettings] = useState([])

    useEffect(() => {

        // showsettings();
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://54.237.197.99:5000/show/admin/setting", requestOptions)
            .then(response => response.json())
            .then(result => {
                setsettings(result)
            })
            .catch(error => console.log('error', error));

    }, [])

    const showSettings = () => {
        document.querySelector("#addSetting").style.display = "block";
        document.querySelector("#settingTable").style.display = "none";
    };
    const hideSettings = () => {
        document.querySelector("#addSetting").style.display = "none";
        document.querySelector("#settingTable").style.display = "block";
    };

    const handleShow = (e) => {
        const { name, value } = e.target

        setaddsettings((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }

    // const showsettings = async () => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Cookie", "Cookie_1=value");

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };

    //     fetch(baseUrl+"show/admin/setting", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             setsettings(result)
    //         })
    //         .catch(error => console.log('error', error));
    // }

    const addSetting = (e) => {
        e.preventDefault()
        const { callNumber, wpNumber, name, email, upiId } = Addsettings
        console.log(callNumber);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "Cookie_1=value");

        var raw = JSON.stringify({
            callNumber, wpNumber, name, email, upiId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"settings", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result === 'Successfully') {
                    alert('Successfully')
                    hideSettings()
                }
            })
            .catch(error => console.log('error', error));
    }

    const editSettings = (val, rowData) => {

        if (val === 'edit') {
            document.getElementById('editDiv').style.display = 'block';
            document.getElementById('settingTable').style.display = 'none';
        }

        if (val === 'cencel') {
            document.getElementById('editDiv').style.display = 'none';
            document.getElementById('settingTable').style.display = 'block';
        }
        setaddsettings({
            settingId: rowData.Id, callNumber: rowData.callNumber, wpNumber: rowData.wpNumber, name: rowData.name, email: rowData.email, upiId: rowData.upiId
        })
        console.log(rowData);
    }

    const editSettingData = (e) => {
        e.preventDefault()
        const { settingId,callNumber, wpNumber, name, email, upiId} = Addsettings
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            settingId,callNumber, wpNumber, name, email, upiId        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"edit/settings", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    alert('Successfully edit')
                    document.getElementById('editDiv').style.display = 'none';
                    document.getElementById('settingTable').style.display = 'block';
                    // showsettings()
                } else {
                console.log(result)
                }
            })
            .catch(error => console.log('error', error));
    }

    const removeSettings = (settingsId) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            settingsId
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"remove/settings", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    alert('Successfully Remove')
                    // showsettings()
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <div style={{ marginLeft: "2rem", marginTop: "2rem", display: "flex" }}>
                <IoMdAddCircle style={{ width: "2rem", height: "2rem" }} onClick={() => showSettings()} />
                <span style={{ marginLeft: "0.7rem", fontSize: "1.5rem" }}>Add Setting</span>
            </div>


            <div style={{ padding: '30px', display: "block" }} id="settingTable">

                <MaterialTable
                    title="Settings"
                    columns={[
                        { title: 'Calling Number', field: 'callNumber' },
                        { title: 'Whatsapp Number', field: 'wpNumber' },
                        { title: 'Name', field: 'name' },
                        { title: 'Email', field: 'email' },
                        { title: 'UPI Id', field: 'upiId' },

                    ]}
                    data={settings}
                    actions={[
                      
                        {
                            icon: 'edit',
                            tooltip: 'Edit Settings',
                            onClick: (event, rowData) => editSettings('edit', rowData)
                        },
                        {
                            icon: 'remove',
                            tooltip: 'Remove Settings',
                            onClick: (event, rowData) => removeSettings(rowData.Id)
                        }
                    ]}
                />
            </div>

            <div id='addSetting' style={{ display: "none" }} >
                <div style={{ border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 29px 1px #888888", margin: "30px" }}>
                    <Container style={{ padding: "20px" }}>
                        <Form>
                        <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" value={Addsettings.name} onChange={(e) => handleShow(e)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={Addsettings.email} onChange={(e) => handleShow(e)} />
                                    </Form.Group>
                            <Form.Group className="mb-3"    >
                                <Form.Label>Calling Number</Form.Label>
                                <Form.Control type="text" name="callNumber" value={Addsettings.callNumber} placeholder="Enter NUmber For calling" onChange={(e) => handleShow(e)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Whatsapp Number</Form.Label>
                                <Form.Control type="text" name="wpNumber" placeholder="Enter Whatsapp Number" value={Addsettings.wpNumber} onChange={(e) => handleShow(e)} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                        <Form.Label>UPI Id</Form.Label>
                                        <Form.Control type="text" name="upiId" value={Addsettings.upiId} onChange={(e) => handleShow(e)} />
                                    </Form.Group> 
                            <Row>
                                <Col>
                                    <Button variant="secondary" onClick={() => hideSettings()}>Back</Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit" onClick={(e) => addSetting(e)}>Submit</Button>
                                </Col>
                            </Row>
                        </Form>

                    </Container>
                </div>
            </div>

            <div id='editDiv' style={{ display: 'none', border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 5px 1px #888888", margin: "30px" }}>
                <Container style={{ padding: "20px" }}>
                <Form>
                        <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text" name="name" value={Addsettings.name} onChange={(e) => handleShow(e)} />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="email" value={Addsettings.email} onChange={(e) => handleShow(e)} />
                                    </Form.Group>
                            <Form.Group className="mb-3"    >
                                <Form.Label>Calling Number</Form.Label>
                                <Form.Control type="text" name="callNumber" value={Addsettings.callNumber} placeholder="Enter NUmber For calling" onChange={(e) => handleShow(e)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Whatsapp Number</Form.Label>
                                <Form.Control type="text" name="wpNumber" placeholder="Enter Whatsapp Number" value={Addsettings.wpNumber} onChange={(e) => handleShow(e)} />
                            </Form.Group>
                            
                            <Form.Group className="mb-3">
                                        <Form.Label>UPI Id</Form.Label>
                                        <Form.Control type="text" name="upiId" value={Addsettings.upiId} onChange={(e) => handleShow(e)} />
                                    </Form.Group> 
                            <Row>
                                <Col>
                                    <Button variant="secondary" onClick={() => hideSettings()}>Back</Button>
                                </Col>
                                <Col>
                                    <Button variant="primary" type="submit" onClick={(e) =>editSettingData(e)}>Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                </Container>
            </div>
        </>
    )
}


export default TableSetting
