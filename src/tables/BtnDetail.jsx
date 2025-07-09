import React from 'react';
import { Link } from "react-router-dom";

export default function BtnDetail({link, title, hasOnClick}) {
    function getOnclick(){
        if(hasOnClick){
          hasOnClick()
        }
      }
    return   <Link className='table-btn'
    to={link} onClick={()=>getOnclick()}>
    {title ? title : 'Ver Detalle'}
</Link>
}