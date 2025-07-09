import React, {useContext} from 'react';
import { ConfigContext } from 'shell/context/ConfigContext';

export default function CsvExporter(props) {

  const { alertPopUp, isLoading, isLoaded} = useContext(ConfigContext)

  function getCsv() {
    isLoading()
    const updatedUrl = props.url.replace(/limit=(10|20|50|100)/, 'limit=10000000');
    const date = new Date();
    const file_name = props.filename + '_' + date.toISOString().split('T')[0];
    fetch(updatedUrl)
    .then(res => res.json())
    .then((result) => {
      isLoaded()
      const data = result[0]
      let rows = [];
      for(let i in data){
          if(rows.length == 0){
              rows.push(Object.keys(data[i]));
          }
          for(let j in data[i]){
            if(data[i][j] && data[i][j].toString().includes(',')) {
              data[i][j] = data[i][j].toString()?.replace(/\,/g, '')?.replace(/\#/g, '')
            }
            else {
              data[i][j] = data[i][j] !== null && data[i][j] !== undefined ? data[i][j].toString() : 'N/D';
            }
          }
        rows.push(Object.values(data[i]));
      }
      let csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", file_name + ".csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      alertPopUp('Se descargó adecuadamente')
    }).catch(err => {
      isLoaded()
      alertPopUp('Ocurrio un error con la descarga')
    });
  }
  
  return (
    <button
      onClick={() => getCsv()}  
      className="regular-btn">Exportar CSV
    </button>
  )
}