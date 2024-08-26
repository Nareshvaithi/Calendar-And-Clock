import { useEffect, useState } from 'react';
import lefticon from "./assets/left-icon.png";
import righticon from "./assets/right-icon.png";
import "./app.css";

const weekdays = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const Months = ['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGEST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER']; 

const Timedate = ()=>{
  const [currenttime,setcurrenttime]=useState(new Date())
  function addzero(num){
    return num <= 9 ?`0${num}`:num;
  }
  function formatehour(hour){
    return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
  }
  function dates(current){
    const modify = {weekday:"long",year:"numeric",month:"long",day:"numeric"}
    return current.toLocaleString(undefined,modify)
  }
  useEffect(()=>{
    const timer = setInterval(()=>{
      setcurrenttime(new Date())
    },1000)
  
  },[])
  return(
    <div className='clock-container'>
      <div className='time-date-container'>
        <h1>{addzero(formatehour(currenttime.getHours()))}:{addzero(currenttime.getMinutes())}:{addzero(currenttime.getSeconds())}</h1>
        <h3>{dates(currenttime)}</h3>
      </div>
    </div>
  )
}

function App() {
  const [selectedDate,setselectedDate] = useState(new Date());
   function daysInMonth(){
    const DaysArray = [];
    const firstdate = new Date(selectedDate.getFullYear(),selectedDate.getMonth(),1);
    const lastdate = new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,0);
    for(let i=0;i<firstdate.getDay();i++){
      DaysArray.push(null)
    }
    for(let i=1;i<lastdate.getDate();i++){
      DaysArray.push(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),i));
    }
    return DaysArray;
  
  }
  function handlemonth(event){
    const Newmonth = parseInt(event.target.value,10);
    setselectedDate(new Date(selectedDate.getFullYear(),Newmonth,1))

  }
  function handleyear(event){
    const newYear = parseInt(event.target.value,10);
    setselectedDate(new Date(newYear,selectedDate.getMonth(),1))
  }
  function previous(){
    setselectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1,1));
  }
  function next(){
    setselectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,1));
  }
  function isCurrentday(day1,day2){
    return day1.getDate()===day2.getDate()&&
           day1.getFullYear()===day2.getFullYear()&&
           day1.getMonth()===day2.getMonth(); 

  }
  return (
    <div className='app-container'>
      <h1 className='title'>Calender And Clock</h1>
      <Timedate/>
      <div className='calender'>
        <div className='calender-head'>
          <button className='previous' onClick={previous}>
            <img src={lefticon} width={"20px"} alt="" />
          </button>
          <select value={selectedDate.getMonth()} onChange={handlemonth}>
            {Months.map((month,index)=>(
              <option value={index} key={index}>{month}</option>
            ))}
          </select>
          <select value={selectedDate.getFullYear()} onChange={handleyear}>
            {Array.from({length:10},(_,i)=>selectedDate.getFullYear() - 5 + i).map(year =>(
              <option value={year} key={year}>{year}</option>
            ))}
          </select>
          <button className='next' onClick={next}>
            <img src={righticon} width={"20px"} alt="" />
          </button>
        </div>
          <div className='weekdays'>
            {weekdays.map((week,index)=>(
              <div key={index}>{week}</div>
            ))}
          </div>
          <div className='dates'>
            {daysInMonth().map((days)=>(
              <div key={days} className={days?(isCurrentday(days,new Date())?"partic-day current":"partic-day"):"empty"}>{days ? days.getDate():""}</div>
            ))}
          </div>
      </div>
    </div>
  )
}

export default App
