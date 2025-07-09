import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown} from '@fortawesome/free-solid-svg-icons';


export default function TableFilters(props) {
    const [filtersArray, setFiltersArray] = useState([]);
    const [filterOpen, setFilterOpen]= useState(null);
    const [datePickerOpen, setDatePickerOpen]= useState(false);
    const filterRef = useRef(null);

    useEffect(() => {
      typeFilters();
    },[]);
    function typeFilters(){
      if (props.hasFilters && props.filtersArray) {
        realFilters()
      }else{
        fakeFiltes()
      }
    }
    function getArrayFilter(array){
     var newArray = []
      array.map((data)=>{
        newArray.push(data.nombre)
      })

      return(newArray)
    }
    function getArrayFilterIds(array){
      var newArray = []
       array.map((data)=>{
         newArray.push(data.id)
       })
  
       return(newArray)
     }
     function fixTextFilters(text){
      switch (text) {
        case 'concesion':
         text = 'concesión'
          break;
        case 'metodos_pago':
          text = 'métodos de pago'
        break;
        case 'cupon':
          text = 'cupón'
        break;
        case 'status':
          text = 'estatus'
        break;
        case 'velozconlider':
          text = 'veloz con lider'
        break;
        case 'categoria_cupones':
          text = 'categoría de cupones'
        break;
        case 'categoria':
          text = 'categoría'
        break;
        case 'suscripcion':
          text = 'suscripción'
        break;
        case 'calif':
          text = 'calificación'
        break;
       }
        return text
     }
    function realFilters(){
     
      var arrayAll = [];
      Object.keys(props.filtersArray).map((key)=>{
        var title = key
        if(key == 'concesion' || key == 'metodos_pago' || key == 'cupon' || key == 'status' || key == 'velozconlider' || key == 'categoria_cupones' || key == 'categoria' || key == 'suscripcion' || key == 'calif'){
          title = fixTextFilters(key)
        }
        var arrayOptions = getArrayFilter(props.filtersArray[key]);
        var arrayIdOptions = getArrayFilterIds(props.filtersArray[key]);
        if (key == 'concesion' || key == 'zona' || key == 'credenciales' || key == 'categoria') {
          arrayOptions = ['Todas', ...arrayOptions];
          arrayIdOptions = [-1, ...arrayIdOptions];
        } else if(key == 'transporte' || key == 'status' || key == 'metodos_pago'){
          arrayOptions = ['Todos', ...arrayOptions];
          arrayIdOptions = [-1, ...arrayIdOptions];
        }

        var todas = 0;
        var objectFilter = {name:title, key:key, isUsed:todas, array:arrayOptions, arrayIds:arrayIdOptions};
        arrayAll.push(objectFilter);
      })
 
      
      setFiltersArray(arrayAll);
    }
    function fakeFiltes(){
      if (filtersArray.length == 0) {
        var arrayAll = [{name:"Concesión", key:"conces", isUsed:0, array:["todas","a XD","b","c"]},
        {name:"Transporte", key:"transp", isUsed:0, array:["todas","a","b","c"]},
        {name:"Status", key:"status", isUsed:2, array:["bloqueado", "desbloqueado","todos"]},
        {name:"Credenciales", key:"creden", isUsed:0, array:["todas","a","b","c"]},
        {name:"Terminal", key:"termin", isUsed:0, array:["todas","a","b","c"]},
        {name:"Aceptar Mandados Automaticos", key:"mandauto", isUsed:0, array:["todas","a","b","c"]},
        {name:"Visible", key:"visi", isUsed:0, array:["todas","a","b","c"]},
        {name:"MÉTODOS DE PAGO", key:"metodo", isUsed:0, array:["todas","a","b","c"]},
        {name:"MEMBERSHIP", key:"member", isUsed:0, array:["todas","a","b","c"]},
        {name:"PREPAGO", key:"prepago", isUsed:0, array:["todas","a","b","c"]},
        {name:"CUPÓN", key:"cupon", isUsed:0, array:["todas","a","b","c"]},
        {name:"LIBERADOS", key:"liberado", isUsed:0, array:["todas","a","b","c"]},
        {name:"TIPO DE CLIENTE", key:"cliente", isUsed:0, array:["todas","a","b","c"]},
        {name:"VERIFICADOS", key:"verificado", isUsed:0, array:["todos","sí","no"]},
        {name:"VIP", key:"vip", isUsed:0, array:["todos","sí","no"]},
        {name:"VELOZ CON LÍDER", key:"velozconlider", isUsed:0, array:["todas","a","b","c"]},
        {name:"LÍDER", key:"lider", isUsed:0, array:["todas","a","b","c"]},
        {name:"CALIFICACIÓN", key:"calif", isUsed:0, array:["todas","a","b","c"]},
        {name:"LÍMITE", key:"limit", isUsed:0, array:["todas","a","b","c"]},
        {name:"Zona", key:"zona", isUsed:0, array:["todas","a","b","c"]},
        {name:"VIGENTE", key:"vigente", isUsed:0, array:["todas","a","b","c"]},
        {name:"CATEGORÍA", key:"catego", isUsed:0, array:["todas","a","b","c"]},
        {name:"tipo", key:"type", isUsed:0, array:["todas","a","b","c"]},
        {name:"SUSCRIPCIÓN", key:"suscrip", isUsed:0, array:["todas","a","b","c"]}];
        var array = [];
        props.filters.map((data) => {
          var filterTrue = arrayAll.filter(word => word.key == data);
          if (filterTrue.length == 1) {
            array.push(filterTrue[0])
          }
        });
        setFiltersArray(array);
      }
    }
    function openFilter(nombre){
      var respuesta = nombre;
      if (nombre == filterOpen) {
        respuesta = null;
      }
      setFilterOpen(respuesta)
    }
    function slectOption( filter, option) {
      var filterChange = filtersArray.filter(word => word.key == filter);
      filterChange[0].isUsed = option
      setFiltersArray(filtersArray);
      props.setFiltros(prev=>{
        let obj = {...prev};
        obj[filter][0] = option;
        obj[filter][1] = filterChange[0].arrayIds[option];
        return obj
      });  
    }
    function resetFilters(){
      filtersArray.map((data) => {
        data.isUsed = 0
      });
      setFiltersArray(filtersArray);
      openFilter("");
    }
    function SelectorCont(props){      
      return(
        <div className="filter-indiv">
          <h3>{props.data.name}</h3>
          <div className="selector-relative" onClick={() => openFilter(props.data.key)}>
            <p className="selector-btn">{props.data.array[props.filtros[props.data.key][0]]} <FontAwesomeIcon icon={faCaretDown} /></p>
            <ul className={filterOpen == props.data.key ? "selector-cont isShow" : "selector-cont" }>
              {Object.keys(props.data.array).map((key)=>(
                <li key={key} className={key == props.data.isUsed ? "select-option": ""} onClick={() => slectOption(props.data.key, key)}>{props.data.array[key]}</li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
 
    function SingleDateSelector(props){
      return(<div className="filter-indiv">
        <h3>{props.singleDate}</h3>
        <div className="selector-relative">
          <input className="selector-relative-date" type='date'/>
        </div>
      </div>)
    }
    function FilterComponent(props){
        var filterCont = <SelectorCont data={props.data} setFiltros={props.setFiltros} filtros={props.filtros}/>
        return filterCont
    }
    return (
      <div className="tables-filter-container">
        <div className="filters-container">
          {filtersArray.length == 0 ? null : Object.keys(filtersArray).map((key)=>(
            <FilterComponent data={filtersArray[key]} key={key} setFiltros={props.setFiltros} filtros={props.filtros}/>
          ))}
        {props.hiddeDate ? null : null}{/*<DateSelector/>*/}
        {props.singleDate ? <SingleDateSelector singleDate={props.singleDate}/> : null }
        </div>
      </div>
    )
}
