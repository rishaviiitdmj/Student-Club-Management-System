import React,{useState}from 'react';
import signup from '../images/signup-image.jpg';
import {NavLink,useHistory} from 'react-router-dom';
import M from 'materialize-css'
const Signup=()=>{
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const [email,setEmail] = useState("")
  const History= useHistory();

const PostData= ()=>{

    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        window.alert("Invalid email entered")
        return
    }
    fetch('/signup',{
       method:"POST",
       headers:{
           "Content-Type" :"application/json"
       },
       body:JSON.stringify({
        name,
        email,
        password
       })
   }).then(res=>res.json())
   .then(data=>{
      if(data.error){
         window.alert('Invalid data or user already exist with same email')
      }
      else{
         window.alert("Registered Successfully!! Please SignIn")
          History.push('/signin')
      }
   }).catch(err=>{
       console.log(err)
   })
}



 return (

    // <!-- Sign up form -->


    <section className="signup">
    <div className="container">
        <div className="signup-content">
            <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <div method="POST" className="register-form" id="register-form">
                    <div className="form-group">
                        <label for="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                        <input type="text" name="name" id="name" placeholder="Your FullName"  value={name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label for="email"><i className="zmdi zmdi-email"></i></label>
                        <input type="email" name="email" id="email" placeholder="Your College Email"  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label for="password"><i className="zmdi zmdi-lock"></i></label>
                        <input type="password" name="password" id="pass" placeholder="Password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className="form-group form-button">
                        <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={()=>PostData()}/>
                    </div>
                </div>
            </div>
            <div className="signup-image">
                <figure><img src={signup} alt="sign up"/></figure>
                <NavLink to="/signin" className="signup-image-link">I am already a member</NavLink>
            </div>
        </div>
    </div>
</section>

)
}

export default Signup;