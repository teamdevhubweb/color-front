import React from 'react'
import AdminBackNav from '../adminComponent/AdminBackNav';
import TablePayment from '../adminComponent/TablePayment';

function Payments({baseUrl}) {
  return (
  <>
     <AdminBackNav/>
     <TablePayment baseUrl={baseUrl}/>
  </>
  )
}

export default Payments