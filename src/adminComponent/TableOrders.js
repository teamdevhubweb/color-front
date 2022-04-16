import React, {useState, useEffect} from 'react'
import MaterialTable from "material-table";
const TableOrders = ({baseUrl}) => {

    const [order, setorder] = useState([])

    useEffect(() => {
        // showOrder();
        var myHeaders = new Headers();
        myHeaders.append("Cookie", "Cookie_1=value");
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("http://54.237.197.99:5000/showOrder", requestOptions)
          .then(response => response.json())
          .then(result => {
            setorder(result)
          })
          .catch(error => console.log('error', error));
    
      },[])
    
//       const showOrder = async () => {
//         var myHeaders = new Headers();
// myHeaders.append("Cookie", "Cookie_1=value");

// var requestOptions = {
//   method: 'POST',
//   headers: myHeaders,
//   redirect: 'follow'
// };

// fetch(baseUrl+"showOrder", requestOptions)
//   .then(response => response.json())
//   .then(result => {
//     setorder(result)
//   })
//   .catch(error => console.log('error', error));
//       }

      const removeOrder = (Id) => {
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

fetch("http://localhost:5000/remove/admin/order", requestOptions)
  .then(response => response.json())
  .then(result => {
    // showOrder()
  })
  .catch(error => console.log('error', error));

      }

    return (
        <>
        <div style={{padding:'30px'}}>

            <MaterialTable
                title="Orders"
                columns={[
                    { title: 'OrderID',field:'Id', type: 'numeric' },
                    { title: 'UserID',field:'UserId' },
                    { title: 'Time',field:'time' },
                    { title: 'CardType', field: 'cardtype'},
                    { title: 'Amount', field: 'amount'},
                    { title: 'Period',field:'Period' },
                    { title: 'UserName',field:'userName'},
                ]}
                data={order}
                actions={[
                    {
                        icon: 'remove',
                        tooltip: 'Remove Order',
                        onClick: (event, rowData) => removeOrder(rowData.Id)
                    }
                ]}
            />
        </div>
               
        </>
    )
}

export default TableOrders
