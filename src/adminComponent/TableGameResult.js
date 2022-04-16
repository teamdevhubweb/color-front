import React, { useState, useEffect } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import MaterialTable from "material-table";
const TableGameResult = ({ baseUrl }) => {
    const [result, setresult] = useState([])
    const [updatere, setupdatere] = useState({
        resultId: '', record: '', updateResult: ''
    })

    const showUpdate = (rowData) => {
        console.log(rowData);

        document.querySelector("#table").style.display = "none";
        document.querySelector("#edit").style.display = "block";

        setupdatere({
            resultId: rowData.Id, record: rowData.record, updateResult: rowData.result
        })

    }

    const showTable = () => {
        document.querySelector("#table").style.display = "block";
        document.querySelector("#edit").style.display = "none";

    }

    const handleShow = (e) => {
        const { name, value } = e.target

        setupdatere((prastate) => ({
            ...prastate,
            [name]: value,
        }));
    }

    useEffect(() => {

        // showResult();
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://54.237.197.99:5000/showResult", requestOptions)
            .then(response => response.json())
            .then(result => {
                setresult(result)
            })
            .catch(error => console.log('error', error));

    }, [])

    // const showResult = () => {
    //     var myHeaders = new Headers();
    //     myHeaders.append("Cookie", "Cookie_1=value");

    //     var requestOptions = {
    //         method: 'POST',
    //         headers: myHeaders,
    //         redirect: 'follow'
    //     };

    //     fetch(baseUrl+"showResult", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             setresult(result)
    //         })
    //         .catch(error => console.log('error', error));
    // }

    const updatedata = (e) => {
        e.preventDefault()
        const { resultId, record, updateResult } = updatere
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "Cookie_1=value");

        var raw = JSON.stringify({
            "resultID": resultId,
            "record": record,
            "updateResult": updateResult
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"updateResult", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully Edit', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    document.getElementById('edit').style.display = 'none';
                    document.getElementById('table').style.display = 'block';
                    // showResult()
                }
            })
            .catch(error => console.log('error', error));
    }

    const remove = (Id) => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "Cookie_1=value");

        var raw = JSON.stringify({
            "Id": Id
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(baseUrl+"remove/admin/result", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result.mess === 'Successfully') {
                    toast.success('Successfully Remove', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    // showResult()
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <>
            <div style={{ padding: '30px', display: "block" }} id="table" >

                <MaterialTable
                    title="Game Result"
                    columns={[
                        { title: 'ResultID', field: 'Id' },
                        { title: 'Recode', field: 'record'  },
                        { title: 'Result', field: 'result' },
                    ]}
                    data={result}
                    actions={[
                        {
                            icon: 'remove',
                            tooltip: 'Remove Result',
                            onClick: (event, rowData) => remove(rowData.Id)
                        },
                        {
                            icon: 'edit',
                            tooltip: 'Edit Result',
                            onClick: (event, rowData) => showUpdate(rowData)
                        }
                    ]}
                />
            </div>

            <div id='edit' style={{ display: 'none', border: "0.4px solid white", borderRadius: "10px", boxShadow: "1px 1px 5px 1px #888888", margin: "30px" }}>
                <Container style={{ padding: "20px" }}>
                    <Form >
                        <Form.Group className="mb-3">
                            <Form.Label>Record</Form.Label>
                            <Form.Control type="text" onChange={(e) => handleShow(e)} name='record' value={updatere.record} placeholder="Enter Record" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Result </Form.Label>
                            <Form.Control type="text" name='updateResult' value={updatere.updateResult} onChange={(e) => handleShow(e)} placeholder="Enter Result" />
                        </Form.Group>
                        <Button variant="secondary" onClick={() => showTable('cancel')}>Cancel</Button>
                        <Button variant="success" type="submit" onClick={(e) => updatedata(e)}>Submit</Button>
                    </Form>
                </Container>
            </div>

            <ToastContainer/>


        </>
    )
}

export default TableGameResult
