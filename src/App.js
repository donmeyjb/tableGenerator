import React, { useState, useEffect, useContext } from 'react';
import StandarTable from './tables/StandarTable';
import StandarFooter from './tables/StandarFooter';

import './App.css';
import './css/tables.css'

function App() {
  const headers =[ "Name", "	LastName", "Email", "	Phone Number",  "Status", ""]
  const [dataTable, setDataTable] = useState([])
  const [page, setPage] = useState(1)

  useEffect(()=>{
      setDataTable((prev)=>{
            const old = [...prev]
            let boton = <button className='table-btn' onClick={()=> alert('Agregar función')}>Open</button>
               old[0] = {name:'Juan', lastname:'Rodríguez', mail: 'juan@rdz.com', number:'8888888', status:'onMove', button:boton}
            return old;
        })
  },[])

  return (
    <div className="container">
        <StandarTable headers={headers} rows={dataTable} complex={true}/>
        <StandarFooter 
            setPage={setPage} page={page} 
            elements={dataTable?.length}/>
    </div>
  );
}

export default App;
// 