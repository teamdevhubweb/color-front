
import React, { Component, useEffect, useState } from "react";
import { Card, Row, Form, Col, DropdownButton, Dropdown, Button } from "react-bootstrap"
import { toast, ToastContainer } from "react-toastify";
import AdminBackNav from '../adminComponent/AdminBackNav';

function Gamesetting({baseUrl}) {



  const [userEditData, setUserEditData] = useState({
    startid: '', endid: '', maxamountprobability: '', minamountprobability: ''
})




  const editUserData = () => {
    const { startid, endid, maxamountprobability, minamountprobability } = userEditData
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "startid": startid,
        "endid": endid,
        "maxamountprobability": maxamountprobability,
        "minamountprobability": minamountprobability,
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(baseUrl+"gamesetting", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.mess === 'Successfully') {
           
                toast.success('Successfully Add', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                // document.getElementById('editDiv').style.display = 'none';
                // document.getElementById('divTable').style.display = 'block';
                setUserEditData({ "startid": "",
                "endid": "",
                "maxamountprobability": "",
                "minamountprobability": "",})
            }
        })
        .catch(error => console.log('error', error));
}


const [status, setstatus] = useState(false)




useEffect(() => {
  getSetting();
}, [])





const getSetting =(()=>{
  // getgamesetting
  var myHeaders = new Headers();
  myHeaders.append("Cookie", "Cookie_1=value");

  var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow'
  };

  fetch(baseUrl+"getgamesetting", requestOptions)
      .then(response => response.json())
      .then(result => {
          // setuser(result)
          console.log(result);

          setstatus(result?.data?.status)
      })
      .catch(error => console.log('error', error));



})






  const settingActive = (e) => {

    setstatus(e)
    console.log(e);

    // const { startid, endid, maxamountprobability, minamountprobability } = userEditData
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
        "status": e,
       
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(baseUrl+"gamesettingactive", requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.mess === 'Successfully') {
           
                toast.success('Successfully Add', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
                // document.getElementById('editDiv').style.display = 'none';
                // document.getElementById('divTable').style.display = 'block';
               
            }
        })
        .catch(error => console.log('error', error));
}





console.log(userEditData);

const handShow = (e) => {
  const { name, value } = e.target

  setUserEditData((prastate) => ({
      ...prastate,
      [name]: value,
  }));
}

const handShowMax = (e) => {
  const { name, value } = e.target

const minvalue = 100 - value


  setUserEditData((prastate) => ({
      ...prastate,
      maxamountprobability: value,
  }));
  setUserEditData((prastate) => ({
      ...prastate,
      minamountprobability: minvalue,
  }));
}


const handShowMin = (e) => {
  const { name, value } = e.target

  const maxvalue = 100 - value
  
  
    setUserEditData((prastate) => ({
        ...prastate,
        maxamountprobability: maxvalue,
    }));
    setUserEditData((prastate) => ({
        ...prastate,
        minamountprobability: value,
    }));


}



  return (
    <>
        <AdminBackNav />
        <div style={{ marginTop: "6rem", display: "flex", justifyContent: "center" }}>
          <Card style={{ width: "50rem", height: "40rem", boxShadow: "5px 5px 5px gray" }} >
            <h4 style={{ textAlign: "center", color: "gray", marginTop: "2rem" }}>Game Settings</h4>
            <hr></hr>
            <Form style={{ margin: "auto", padding: "20px" }}>
              {['radio'].map((type) => (
                <div key={`inline-${type}`} className="mb-3">

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Row>

               

                      <div className="gameSetting">
                        <div>
                          <div>
                         
                          <Form.Check 
                              type="switch"
                              id="custom-switch"
                              checked={status}
                              onChange={(e)=>settingActive(e.target.checked)}
                              label="Check this switch"
                            />              
                      </div>
                          <h3>Set Period</h3>
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <h6>Start Period</h6>
                              <input type={"number"} name="startid" value={userEditData?.startid}  onChange={(e)=>{handShow(e)}} />
                            </div>
                            <div className="col-12 col-sm-6">
                              <h6>End Period</h6>
                              <input type={"number"}  name="endid" value={userEditData?.endid}   onChange={(e)=>{handShow(e)}}/>
                            </div>
                          </div>
                        </div>
                        <div>
                          <br/>
                          {/* <h3>Winning </h3> */}
                          <div className="row">
                            <div className="col-12 col-sm-6">
                              <h6>WIN Ratio</h6>
                              <input type={"number"}  name="maxamountprobability"  value={userEditData?.maxamountprobability}  onChange={(e)=>{handShowMax(e)}}/>
                            </div>
                            <div className="col-12 col-sm-6">
                              <h6>LOOSE Ratio</h6>
                              <input type={"number"} name="minamountprobability" value={userEditData?.minamountprobability}   onChange={(e)=>{handShowMin(e)}}/>
                            </div>
                          </div>
                        </div>


                      </div>
<br/>
                     







                      {/* <Row>
                        <Col>
                          <Form.Check
                            inline
                            onClick={this.check('first')}
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                          />
                        </Col>

                        <Col>
                          <div>
                            Select Winner
                          </div>
                        </Col>

                        <Col style={{ display: 'none' }} id='showDiv'>
                          <DropdownButton align="Center" title="Choose" id="dropdown-menu-align-Center">
                            <Dropdown.Item eventKey="1">A</Dropdown.Item>
                            <Dropdown.Item eventKey="2">B</Dropdown.Item>
                            <Dropdown.Item eventKey="3">T</Dropdown.Item>
                          </DropdownButton>
                        </Col>

                      </Row> */}

                      {/* <Row>
                        <Col>
                          <Form.Check
                            inline
                            onClick={this.check('sec')}
                            name="group1"
                            type={type}
                            id={`inline-${type}-1`}
                          />
                        </Col>

                        <Col>
                          <div>
                            Minimum winner
                          </div>
                        </Col>

                        <Col>

                        </Col>


                      </Row> */}

                      {/* 3rd */}
                      <Row style={{ marginTop: "8rem" }}>
                        <Col>

                        </Col>

                        <Col>
                          <Button variant="success" onClick={(e)=>{editUserData()}}>Save</Button>{' '}
                        </Col>

                        <Col >

                        </Col>


                      </Row>

                      {/* 3rdend */}


                    </Row>
                  </div>
                </div>

              )
              )}
            </Form>
          </Card>
        </div>
        <ToastContainer/>
      </>
  )
}

export default Gamesetting



// export default class Gamesetting extends Component {
//   constructor() {
//     super();
//     this.state = { checked: false };
//     this.handleChange1 = this.handleChange1.bind(this);
//     this.handleChange2 = this.handleChange2.bind(this);
//     this.handleChange3 = this.handleChange3.bind(this);
//   }

//   handleChange1(checked1) {
//     this.setState({ checked1 });
//   }

//   handleChange2(checked2) {
//     this.setState({ checked2 });
//   }

//   handleChange3(checked3) {
//     this.setState({ checked3 });
//   }

//   check = () => {
//     //  document.getElementById('showDiv').style.display= 'Block'
//   }

//   render() {
//     return (
     
//     );
//   }
// }