import React, { useEffect, useRef, useState } from 'react';
import DatePicker from "react-multi-date-picker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays} from '@fortawesome/free-solid-svg-icons';

export default function DatePickerSelector({ from = undefined, to = undefined,
   editableDateInputs = true, 
   handleDateChange, 
   text='Fecha'}){
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
  const weekDays = ["DO", "LU", "MA", "MIE", "JU", "VI", "SA"]
  const [date, setDate] = useState([from, to])

   const onChange = e => {
    if(!e){
      handleDateChange(null)
    }else if(e?.length == 2){
      let startDate =  (e[0].month.number+ '-' + e[0].day + '-' + e[0].year)
      let endDate =  (e[1].month.number+ '-' + e[1].day + '-' + e[1].year)
      handleDateChange(startDate, endDate)
     
    }
  }

   return (
    <div className='tables-filter-container'
    style={{ display: 'flex', flexDirection: 'column', marginBottom: '20px '}}>
      <div className="filter-indiv">
        <h3 >{text}</h3>
        <div className='daterange-filter'>
           <DatePicker value={date} 
           months={months}
           weekDays={weekDays}
           format={"MM-DD-YYYY"}
           range={true} 
           onChange={onChange}
           className='daterange-filter-input'/>
           <FontAwesomeIcon icon={faCalendarDays}/>
        </div>
      </div>
      </div>
   )
}
