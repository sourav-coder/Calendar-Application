import React from 'react'
import Modal from "./Modal"

export default function Calender(props) {
    
    
    const [current,setCurrent]=React.useState(new Date());


    const [slot,setSlot]=React.useState(new Date());

    function handleOpen(e){

        // console.log(props.year,props.month,a);
        const day=e.target.getAttribute("value");
        setSlot(new Date(props.year,props.month,day))


    }

    
    return (
        <>
        <div id="calender">

            {props.emptyCells.map((value,index)=>{
                return <div className="emptyBox"></div>;
            })}

            {props.cells.map((value,index)=>{
                if(current.getMonth()==props.month && value==current.getDate()){
                    return (

                    <div className="monthBox activate" data-bs-toggle="modal" data-bs-target="#exampleModal"   value={value} onClick={handleOpen}>{value}</div>
                
                    )}
                return <div className="monthBox" data-bs-toggle="modal" data-bs-target="#exampleModal"  value={value} onClick={handleOpen}>{value}</div>;
            })}

            {props.endCells.map((value,index)=>{
                return <div className="emptyBox"></div>;    
            })}

            <Modal  slot={slot}/>
        </div>
        </>
    )
}