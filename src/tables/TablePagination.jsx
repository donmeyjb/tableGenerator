
import React, { useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

export default function TablePagination(props) {
    const [pages, setPages] = useState([]);
    const [backBtn, setBackBtn] = useState(false);
    const [lastExtra, setLastExtra] = useState(false);
    const [nextBtn, setNextBtn] = useState(false);
    useEffect(() => {
            gettAllBtns(); 
    }, [props.elements])

    function specialBtns(newPages){
            var count = Math.ceil(props.elements / props.limit)
            var haslast = newPages.find(e => e == count)
            var hasfirst = newPages.find(e => e == 1)

            if(haslast){
                setLastExtra(false)
                setNextBtn(false)
            }else{
                setLastExtra(count)
                setNextBtn(true)
            }

            if(hasfirst){
                setBackBtn(false)
            }else{
                setBackBtn(true)
            }
    }
    function getTheOtherPages(array, count){   
        var newPages = []
        var haslast = array.find(e => e == count)
        if(count > 3){
            if(haslast){
                newPages = [(haslast-2), (haslast-1), haslast]
            }else{
                var pageInit = array[0]
                newPages = [pageInit, (pageInit + 1), (pageInit + 2)] 
            }
        }else {
            for (let i = 1; i < count+1; i++) { 
                newPages.push(i)
            }
        }
      
        return newPages
    }
    function gettAllBtns(){
        var newPages = []
        var startPage = props.page
        var count =  Math.ceil(props.elements / props.limit)
        for (let i = 1; i < 4; i++) {
            if(startPage > 0 && startPage <= count){
                newPages.push(startPage)
                startPage = startPage + 1
            }
        }
        if(count > 3){
            specialBtns(newPages)
        }
        if(newPages.length < 3){
            newPages = getTheOtherPages(newPages, count)
        }
        setPages(prev => newPages);
    }

    function getBackBtns(){
        var newPages = []
        var firstshowed  = pages[0]
        
        for (let i = 1; i < 4; i++) {
            if(firstshowed > 0){
                newPages.push(firstshowed)
            }
            firstshowed = firstshowed - 1
        }
        newPages = newPages.reverse()
        if(newPages.length < 3){
            newPages = getTheOtherPages(newPages, 0)
        }
        specialBtns(newPages)
        setPages((prev) => newPages);  
    }

    function getNextBtns(){
        var newPages = []
        var lastShowed  = pages[2]
        var limit = lastShowed + 3
        var count = Math.ceil(props.elements / props.limit)
        for (let i = lastShowed; i < limit; i++) {
            if(i < count + 1){
                newPages.push(i)
            }
        }
        specialBtns(newPages)
        console.log("nrepages",newPages)
        setPages((prev) => newPages);  
    }
    
    function ButtonNum(props){
        return   <button
                    key={props.num}
                    className={props.page === props.num ? "activeButton" : "" }
                    onClick={() => props.setPage(props.num)}>
                    {props.num}
                 </button>
    }
    function ExtraBtn(props){
        return  <div className='footer-extra-btn'>
                <span>...</span>
                <button
                    key={props.num}
                    className={props.page === props.num ? "activeButton" : "" }
                    onClick={() => props.setPage(props.num)}>
                    {props.num}
                 </button>
        </div> 
    }

    return (
        <div className="footer-btns-container">
        {backBtn && <button>
            <FontAwesomeIcon
            icon={faChevronLeft} 
            onClick={() => getBackBtns()}/>
        </button>}
        {pages.length > 0 && pages.map((num) => {
            return(
            <ButtonNum
            num={num}
            page={props.page}
            setPage={props.setPage}/>
        )})}
        {lastExtra && <ExtraBtn
         num={lastExtra}
         page={props.page}
         setPage={props.setPage}/>
         }
        {nextBtn && <button>
            <FontAwesomeIcon
            icon={faChevronRight}
            onClick={()=>getNextBtns()}/>
        </button>}
    </div>
    )
}
