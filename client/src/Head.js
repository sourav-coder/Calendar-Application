import React from 'react'
import Calender from './Calender'

export default function Head() {



  const [dt,setDate]=React.useState(new Date());


  function handlePrev() {
    console.log(dt.getMonth());
    setDate(new Date(dt.getFullYear(),dt.getMonth()-1));

  }

  function handleNext() {
    console.log(dt.getMonth());
    setDate(new Date(dt.getFullYear(),dt.getMonth()+1));
    
  }




    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const presentMonth = months[dt.getMonth()];
    const presentYear = dt.getFullYear();
    const presentDay = dt.getDate();
    const daysInMonth = new Date(presentYear, dt.getMonth() + 1, 0).getDate();

    dt.setDate(1);
    const startingDay = dt.getDay();
    // console.log("starting day:" + startingDay);
    dt.setDate(daysInMonth);
    const endDay = dt.getDay();
    // console.log("starting day:" + endDay);

    var emptyCells = [];
    for (let j = 1; j <= startingDay; j++) {
      emptyCells.push(" ");
    }

    var cells = [];
    for (var i = 1; i <= daysInMonth; i++) {
      cells.push(i);
    }

    var endCells = [];
    for (let j = 1; j <= 6 - endDay; j++) {
      endCells.push(" ");
    }





  return (
    <div id="container">
      <div id="header">
        <div id="monthDisplay">{presentMonth} {presentYear} </div>
        <div>
          <button id="backButton" onClick={handlePrev}>Back</button>
          <button id="nextButton" onClick={handleNext}>Next</button>
        </div>
      </div>

      <div id="weekdays">
        <div>Sunday</div>
        <div>Monday</div>
        <div>Tuesday</div>
        <div>Wednesday</div>
        <div>Thursday</div>
        <div>Friday</div>
        <div>Saturday</div>
      </div>
      <Calender cells={cells} emptyCells={emptyCells} endCells={endCells} month={dt.getMonth()} year={presentYear} presentDay={presentDay} />
    </div>
  )
}