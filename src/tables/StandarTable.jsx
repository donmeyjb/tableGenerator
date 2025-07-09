import React from 'react';
import Rows from './Rows'

export default function StandarTable({headers, rows, complex}) {
  
  return (
          <div className="tables-container">
            <table>
              <thead>
                <tr>
                  {headers.map((x)=>
                  <th>{x}</th>)}
                </tr>
              </thead>
              <tbody>
                {rows.length == 0 ?
                  <tr>
                    <td colSpan={headers.length}>
                      No se encontraron resultados
                    </td>
                  </tr> :
                  <Rows tableceldas={rows} complexrow={complex} />
                }
              </tbody>
            </table>
          </div>
  )
}