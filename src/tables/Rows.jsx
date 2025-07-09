import React from 'react';

export default function Rows({tableceldas,complexrow}) {
    
    return <>  
    { complexrow == true ? 
        tableceldas.map((datarow, index)=>(
            <tr key={index}>
                { Object.keys(datarow).map((x)=>(
                 <td key={x}>{datarow[x] ? datarow[x] : '--'}</td>
                ))}
            </tr>
        )) 
        : 
        tableceldas.map((datarow, index)=>(
            <tr key={index}>
                {datarow.map((x, i)=>(
                    <td key={i}>
                        {x ? x : '--' }
                    </td>
                ))}
            </tr>
        ))
    }
    </>
}