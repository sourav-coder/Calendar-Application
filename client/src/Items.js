import React,{useEffect} from 'react'
import axios from "axios"

export default function Items(props) {
    const type=props.type;
    var date=props.date;
    var initialDate=date;
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var date=date.getDate()+" "+months[date.getMonth()]+" "+date.getFullYear()

    const [tName,settName]=React.useState(""); // teacher 
    const [bName,setbName]=React.useState(""); // batch

    const [fromDay,setfromDay]=React.useState(""); // from day
    const [toDay,settoDay]=React.useState(""); // to day

    const [year,setYear]=React.useState(""); // year
    const [month,setMonth]=React.useState(""); // month

    const [yearData,setYearData]=React.useState([]) // get year data
    const [monthData,setMonthData]=React.useState([]) // get month data
    const [dayData,setDayData]=React.useState([]) // get day data

    const [search,setSearch]=React.useState("");
    var [edit,setEdit]=React.useState(false);


    
    useEffect(()=>{
        
        function getDataYear(){
            axios.get("http://localhost:5000/getYear")
                .then(response=>{
                    console.log(response.data);
                    setYearData(response.data);
                    setEdit(false);
                })
                .catch(err=>{console.error(`Failed to get Year Data ${err.message}`)})
        }
        function getDataMonth(){
            axios.get("http://localhost:5000/getMonth")
                .then(response=>{
                    console.log(response.data);
                    setMonthData(response.data);                
                    setEdit(false);
                })
                .catch(err=>{console.error(`Failed to get Month Data ${err.message}`)})
        }
        function getDataDay(){
            axios.post(`http://localhost:5000/getDay/`,{
                date:date
            })
                .then(response=>{
                    console.log(response.data);
                    setDayData(response.data);                    
                    setEdit(false);
                })
                .catch(err=>{console.error(`Failed to get Day Data ${err.message}`)})
        }

        getDataYear()
        getDataMonth();
        getDataDay();
        
        
    },[date,edit])

    // change state 
    const onChange=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        console.log(name,value);
        name==="tName"?settName(value):name==="bName"?setbName(value):name==="fromDay"?(
            setfromDay(value)
        ):name==="toDay"?settoDay(value):name==="year"?setYear(value):name==="month"?setMonth(value):setSearch(value);
    
    }

    // submit data to backend
    const submit=(e)=>{
        if(type==="Day")
        {
            var submitItems={
                tName,bName,fromDay,toDay,date
            }
            if(fromDay==="" || toDay===""){
                var submitItems={
                    tName,bName,fromDay:"Monday",toDay:"Saturday",date
                }
    
            }
            

            console.log(submitItems);
            dayData.push(submitItems); // push data to display in  tasks
            // call
            axios.post("http://localhost:5000/Day",submitItems)
            .then(response=>{
                console.log(response.data);
            })
            .catch(err=>{console.log(err.message);})


            settName("");
            setbName("");
            setfromDay("");
            settoDay("");
        }
        else if(type==="Year")
        {
            var submitItems={
                tName,bName,year,date
            }
            yearData.push(submitItems); // push data to display in  tasks
            console.log(submitItems);
            axios.post("http://localhost:5000/Year",submitItems)
            .then(response=>{
                console.log(response.data);
            })
            .catch(err=>{console.log(err.message);})

            settName("");
            setbName("");
            setYear("");
        }  
        else{
            var newMonth=months[parseInt(month.slice(-2))-1]+" "+month.slice(0,4);
            console.log(newMonth);
            var submitItems={
                tName,bName,month:newMonth,date
            }
        
            console.log(submitItems);
            monthData.push(submitItems); // push data to display in  tasks

            axios.post("http://localhost:5000/Month",submitItems)
            .then(response=>{
                console.log(response.data);
            })
            .catch(err=>{console.log(err.message);})

            settName("");
            setbName("");
            setMonth("");


        }
        alert("Successfully Submitted");
        e.preventDefault();
    }


    
    const update=(e)=>{
        console.log(e.target);
        var edittName=e.target.getAttribute("tName");
        var editbName=e.target.getAttribute("bName");
        var type=e.target.getAttribute("type");
        var operation=e.target.getAttribute("operation");

        if(type==="year"){

            var editYear=e.target.getAttribute("year");
            var editItems={
                tName:edittName,bName:editbName,year:editYear
            }
        
            axios.post("http://localhost:5000/deleteYear",editItems)
            .then(response=>{console.log(response.data);})
            .catch(err=>{console.log(err.message);})

            if(operation==="update"){
                settName(edittName);
                setbName(editbName);
                setYear(editYear);
            }
            setEdit(true);

        }
        
        else if(type==="month"){
            var editMonth=e.target.getAttribute("month");
            var editItems={
                tName:edittName,bName:editbName,month:editMonth
            }
        
            axios.post("http://localhost:5000/deleteMonth",editItems)
            .then(response=>{console.log(response.data);})
            .catch(err=>{console.log(err.message);})
            
            if(operation==="update"){
                settName(edittName);
                setbName(editbName);
                setMonth(editMonth);
            }
            setEdit(true);
            

        }

        else if(type==="day"){
            var editFromDay=e.target.getAttribute("fromDay");
            var editToDay=e.target.getAttribute("toDay");

            var editItems={
                tName:edittName,bName:editbName,fromDay:editFromDay,toDay:editToDay
            }
        
            axios.post("http://localhost:5000/deleteDay",editItems)
            .then(response=>{console.log(response.data);})
            .catch(err=>{console.log(err.message);})
            
            if(operation==="update"){
                settName(edittName);
                setbName(editbName);
                setfromDay(editFromDay);
                settoDay(editToDay);
            }
            setEdit(true);
            

        }

        
        if(operation==="delete")alert("Successfully Deleted")

    }
    
    

    



    return (
        <div className="row">
            <div className="col-md-6 firstRow">
                <h3>Tasks</h3>
                <div className="searchBox">
                <input class="form-control me-2" type="search" placeholder="Search Teacher" aria-label="Search" name="search" value={search} onChange={onChange} autoComplete="off" ></input>
                </div>
                {type==="Year"?(
                    <ul>
                        {yearData.filter((value)=>{
                            if(search===""){
                                return value
                            }
                            else if(value.tName.toLowerCase().includes(search.toLowerCase())){
                                return value
                            }

                        }).map((value,index)=>{
                            return (
                            <li>{value.tName} ({value.bName}) {value.year} <br /> 

                            <i class="fas fa-pen-square" onClick={update} type="year" operation="update" tName={value.tName} bName={value.bName} year={value.year} ></i>
                            <i class="fas fa-trash-alt" onClick={update} type="year" operation="delete" tName={value.tName} bName={value.bName} year={value.year} ></i>

                            <small className="yearDate">{value.date}</small></li>
                            )
                        })}
                        
                
                    </ul>
                
                ):type==="Month"?(
                <ul>
                    {monthData.filter((value)=>{
                        if(search===""){
                            return value
                        }
                        else if(value.tName.toLowerCase().includes(search.toLowerCase())){
                            return value;
                        }
                    }).map((value,index)=>{
                        return (
                            <li>{value.tName} ({value.bName}) {value.month} <br /> 
                            <i class="fas fa-pen-square" onClick={update} operation="update" type="month" tName={value.tName} bName={value.bName} month={value.month} ></i>
                            <i class="fas fa-trash-alt" onClick={update} operation="delete" type="month" tName={value.tName} bName={value.bName} month={value.month} ></i>

                            <small className="yearDate">{value.date}</small></li>
                            )
                        })}
                </ul>
                ):(
                <ul>
                    {dayData.filter((value)=>{
                        if(search===""){
                            return value
                        }
                        else if(value.tName.toLowerCase().includes(search.toLowerCase())){
                            return value;
                        }
                    }).map((value,index)=>{
                        return (
                            <li>{value.tName} ({value.bName}) ({value.fromDay}-{value.toDay}) <br /> 
                            <i class="fas fa-pen-square" onClick={update} operation="update" type="day" tName={value.tName} bName={value.bName} fromDay={value.fromDay} 
                            toDay={value.toDay} ></i>
                            <i class="fas fa-trash-alt" onClick={update} operation="delete" type="day" tName={value.tName} bName={value.bName} fromDay={value.fromDay} 
                            toDay={value.toDay} ></i>
                             <small className="yearDate">{value.date}</small></li>
                            )
                        })}

                    
                    
                </ul>
                )}
            </div>

            <div className="col-md-6 secondRow">
                <form>
                    <h3>SCHEDULE</h3>
                    <input type="text" className="form-control mb-3 mt-3" required="true" name="tName" placeholder="Teacher Name" value={tName} onChange={onChange}  ></input>

                    <input type="text" className="form-control mb-3 mt-3" required="true" name="bName" placeholder="Batch Name" value={bName} onChange={onChange} ></input>

                    {type==="Day"?(
                    <div className="time">
                        <label className="form-label">From</label>
                        <input type="time" className="form-control"  name="fromDay" value={fromDay} onChange={onChange}  ></input>

                        <label className="form-label">To</label>
                        <input type="time" className="form-control"  name="toDay" value={toDay} onChange={onChange}  ></input>
                    </div>
                    ):type==="Month"?(

                    <div className="time">
                        <label className="form-label">MONTH</label>
                        <input type="month" className="form-control" required name="month" value={month} onChange={onChange}></input>


                    </div>

                    ):(
                    <div className="time">
                        <label className="form-label">Year</label>
                        <input type="year" className="form-control" required name="year" value={year} onChange={onChange} ></input>

                    </div>

                    )}
                    <button className="btn btn-primary" onClick={submit}>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}