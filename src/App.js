import './App.css';
import 'moment-timezone';
 import { BarChart, XAxis, YAxis, Bar } from 'recharts'
import { useState, useEffect } from 'react';
import data from './dateData.js'
function App() {

  const [userYear, setUserYear] = useState("");
  const [userMonth, setUserMonth] = useState("");
  const [userDate, setUserDate] = useState("");
  const [dt, setDt] = useState("");
  const[result,setResult]=useState([]);
  const [finalval , setFinalval] = useState([]);

  var myMap = new Map();
  var finalArr = new Array();
  useEffect(()=>{
    console.log("resultdt",dt);
    let quickResult=[];
    quickResult = data.filter(
      function (a) {
        return (new Date(a.item_date).getFullYear() == new Date(dt).getFullYear() && new Date(a.item_date).getDate() == new Date(dt).getDate() && new Date(a.item_date).getMonth() == new Date(dt).getMonth());
      });
       
       quickResult = quickResult.map((d)=> (
       {
         schedule_time : d.schedule_time.split(" ")[0],
         slot : d.slot,
         item_date : d.item_date
        }
     )
     )
     if(quickResult) { setResult(quickResult) };
   quickResult.forEach((val)=>{
        
        if(myMap.has(val.schedule_time.split(" ")[0])){
          let quickVal=myMap.get(val.schedule_time.split(" ")[0])
          myMap.set(val.schedule_time.split(" ")[0],quickVal+1)
        }
        else{
          myMap.set(val.schedule_time.split(" ")[0],1);
        }
        
    })
    let earr = myMap.keys();
    for(let i=0 ; i< myMap.size; i++){
      let arrval = earr.next().value;
      let occ = myMap.get(arrval);
      let cobj = {schedule_time : arrval , occr : occ}
      finalArr.push(cobj);
    }
    setFinalval(finalArr);  
  },[dt]);
  function filterDate() {
    setDt(userYear); 
  }
  
  return (
    <div className="App">
      <h1>graph</h1>
      <div>
        <p> Date:</p>
        
        {/* input form */}
        <input type="date" value={userYear} onChange={(e) => {
          setUserYear(e.target.value);
        }}>

        </input>
        
        <button type='button' onClick={filterDate}>Submit</button>
      </div>
     
      { result.length!==0 && <BarChart width={1000} height={800} data={finalval}  > 
       <XAxis dataKey="schedule_time"  interval={0}/> 
         <YAxis type="number"  />
         <Bar dataKey='occr' fill="green"></Bar>
       </BarChart>} 

    </div>
  );
}

export default App;