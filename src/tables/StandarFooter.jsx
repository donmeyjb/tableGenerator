import React from 'react';
import TablePagination from './TablePagination';
import "./pagination.css";

export default function StandarFooter({elements, page, setPage}) {
    return (
      <div className="table-footer-container">
        <div className="footer-info-table">
          <p className="results">{elements} resultados</p>
        </div>
        <TablePagination
        elements={elements}
        page={page}
        setPage={setPage}
        limit={10}/>
      </div>
    )
}
