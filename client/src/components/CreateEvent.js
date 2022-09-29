import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

const CreateEvent = ()=>{
    
    const history = useHistory()
    const [venue,setVenue] = useState("")
    const [name,setName] = useState("")
    const [date,setDate] = useState("")
    const [time,setTime] = useState("")
    const eventDetails=()=>{
        fetch("/createEvent",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                name,
                venue,
                date,
                time
            })
        }).then(res=>res.json())
        .then(data=>{
    
           if(data.error){
              window.alert(data.error)
           }
           else{
               window.alert("Scheduled successfully")
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return(
       <div className="card input-filed"
       style={{
           margin:"30px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}
       >
           <input 
           type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
           <input
            type="text"
             placeholder="venue"
             value={venue}
            onChange={(e)=>setVenue(e.target.value)}
             />
             <input
            type="date"
             placeholder="Event Date"
             id="date"
             min="Date.now()"
             value={date}
            onChange={(e)=>setDate(e.target.value)}
             />
             <input
            type="time"
             placeholder="Event Time"
             value={time}
            onChange={(e)=>setTime(e.target.value)}
             />
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"  onClick={()=>eventDetails()}
            >Schedule
            </button>

       </div>
   )
}


export default CreateEvent