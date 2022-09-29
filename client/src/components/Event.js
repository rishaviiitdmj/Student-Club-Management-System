import React,{useContext,useEffect,useState} from 'react';
import {UserContext} from '../App';
const Event=()=>{
    const{state, dispatch}= useContext(UserContext);
    const[data,setData]=useState([])
  
    useEffect(()=>{
      fetch('/allevent',{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt") 
        }
      }).then(res=>res.json())
      .then(result=>{
        setData(result.events)
      })
    })
      const deleteEvent = (eventid)=>{
        fetch(`/deleteevent/${eventid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
  return (
    <>
    <center><h1 style={{textShadow:" 2px 2px red", backgroundColor:"yellow"}}>UPCOMING EVENTS</h1></center>
      <div className="eventcard" >
      
      {
          data.map(item=>{
            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            var time = today.getHours() + ":" + today.getMinutes() ;
            if(item.date>=today.toISOString())
            
              return(
                  <>
                  
                  <div class="card text-white bg-info mb-3" style={{minWidth: "18rem",display:"inline-block",maxWidth:"25rem",marginLeft:"15px",marginRight:"15px"}}>
  <div class="card-header" style={{fontWeight:"bold",textTransform:"uppercase"}}>{item.postedBy.name}{item.postedBy._id==localStorage.getItem("userid") && <i className="material-icons" style={{float:"right"}}
         onClick={()=>deleteEvent(item._id)}>delete</i>}</div>
  <div class="card-body">
  <h5>Event Name: {item.name}</h5>
      <h5>Venue: {item.venue}</h5>
      <h5>Date: {item.date}</h5>
      <h5>Time: {item.time}</h5>
  </div>
</div>
      </>
              )
          }) 
      }
      </div>
     </> 
  )
}
 
  export default Event