import React,{useContext,useEffect,useState} from 'react';
import {Zoom} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import image1 from '../images/index1.jpg';
import image2 from '../images/index2.jpg';
import {UserContext} from '../App';
const images = [
    image1,
    image2
  ];
  
  const Slideshow = () => {
      return (
        <div className="slide-container">
          <Zoom scale={0.4}>
            {
              images.map((each, index) => <img key={index} style={{width: "100%"}} src={each} />)
            }
          </Zoom>
        </div>
      )
  }
  
const Home=()=>{
  const{state, dispatch}= useContext(UserContext);
  const[data,setData]=useState([])

  useEffect(()=>{
    fetch('/allpost',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt") 
      }
    }).then(res=>res.json())
    .then(result=>{
      setData(result.posts)
    })
  })
  const likePost=(id)=>{
    fetch('/like',{
      method:"put",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          postId:id
      })
  }).then(res=>res.json())
  .then(result=>{
    const newData = data.map(item=>{
        if(item._id==result._id){
            return result
        }else{
            return item
        }
    })
    setData(newData)
  }).catch(err=>{
      console.log(err)
  })
  }
  const unlikePost=(id)=>{
    fetch('/unlike',{
      method:"put",
      headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
          postId:id
      })
  }).then(res=>res.json())
  .then(result=>{
    const newData = data.map(item=>{
        if(item._id==result._id){
            return result
        }else{
            return item
        }
    })
    setData(newData)
  }).catch(err=>{
      console.log(err)
  })
  }
  const makeComment = (text,postId)=>{
    fetch('/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId,
            text
        })
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
       })
      setData(newData)
    }).catch(err=>{
        console.log(err)
    })
  }
    const deletePost = (postid)=>{
      fetch(`/deletepost/${postid}`,{
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
  if(state){
return (
    <>
    <div><Slideshow/></div>
    <div className="home">
    {
      data.map(item=>{
        if(item.link==""){
        return(
        <div className="card-home-card" key={item._id}>
        <div className="Name-bar">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDqY8flpg0BMqJ0qy1ISjuLX948FJooqnWdA&usqp=CAU" alt="profile"></img>
        <h5 style={{display:"inline", marginLeft:"10px"}}>{item.postedBy.name} {item.postedBy._id==localStorage.getItem("userid") && <i className="material-icons" style={{float:"right"}}
         onClick={()=>deletePost(item._id)}>delete</i>}</h5>
        </div>
        <div className="card-image">
           <center><img src={item.img} alt="could-not-upload"/></center>
        </div> 
        <div className="card-content">
                            {item.likes.includes(localStorage.getItem("userid"))
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(item._id)}}
                              >thumb_down</i>
                          :
                          <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            
                            }
                            
        <h6>{item.likes.length} likes</h6>
            <h6>{item.title}</h6>
            <p>{item.body}</p>
            {
                                    item.comments.map(record=>{
                                        return(<>
                                          
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{}</span> {record.text}</h6>
                                        </>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
        </div>
        </div>
        )
        }
         else{
          return(
             <>
            {/* <div className="card-home-card" key={item._id}>
        <div className="Name-bar">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDqY8flpg0BMqJ0qy1ISjuLX948FJooqnWdA&usqp=CAU" alt="profile"></img>
        <h5 style={{display:"inline", marginLeft:"10px"}}>{item.postedBy.name} {item.postedBy._id==localStorage.getItem("userid") && <i className="material-icons" style={{float:"right"}}
         onClick={()=>deletePost(item._id)}>delete</i>}</h5>
        </div>
        <div className="card-image">
           <center><img src={item.img} alt="could-not-upload"/></center>
        </div> 
        <center><a href={item.link} target="_blank" style={{textDecoration:"none"}}>Register</a></center>
        <div className="card-content">
                            {item.likes.includes(localStorage.getItem("userid"))
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(item._id)}}
                              >thumb_down</i>
                          :
                          <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >thumb_up</i>
                            
                            }
        <h6>{item.likes.length} likes</h6>
            <h6>{item.title}</h6>
            <p>{item.body}</p>
           
            {
                                    item.comments.map(record=>{
                                        return(<>
                                          
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{}</span>{item.comments.postedBy.name} {record.text}</h6>
                                        </>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
        </div>
        </div> */}
        </> 
          )
        } 
      })
    }
        </div>
    </>
)
}
else{
  return(
    <div><Slideshow/></div>
  )
}
}
export default Home