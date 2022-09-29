import React ,{useContext, useState} from 'react';
import { NavLink,useHistory } from 'react-router-dom';
import image from '../images/signin-image.jpg';
import {UserContext} from '../App';

const Login=()=>{
    const {state,dispatch} = useContext(UserContext)
const[email,setEmail]= useState('');
const[password,setPassword]=useState('');
const History=useHistory();
const PostData=()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        window.alert("Invalid email entered")
        return
    }
 fetch('/signin',{
    method :"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({
        password,
        email
    })
}).then(res=>res.json())
.then(data=>{
    console.log(data)
   if(data.error){
      window.alert(data.error);
   }
   else{
       localStorage.setItem("jwt",data.token)
       localStorage.setItem("username",data.user.name)
       localStorage.setItem("userid",data.user._id)
       localStorage.setItem("useremail",data.user.email)
       dispatch({type:"USER",payload:true})
       window.alert("SignedIn successfully")
       History.push('/')
   }
}).catch(err=>{
    console.log(err)
})
}



return (

    <section className="sign-in">
            <div className="container">
                <div className="signin-content">
                    <div className="signin-image">
                        <figure><img src={image} alt="sign in "/></figure>
                        <NavLink to="/signup" className="signup-image-link">Create an account</NavLink>
                    </div>

                    <div className="signin-form">
                        <h2 className="form-title">Login</h2>
                        <div method="POST" className="register-form" id="login-form">
                            <div className="form-group">
                                <label for="email"><i className="zmdi zmdi-email material-icons-name"></i></label>
                                <input type="email" name="email" id="email" autoComplete="off" value={email} onChange={(e) =>setEmail(e.target.value)} placeholder="Your College Email"/>
                            </div>
                            <div className="form-group">
                                <label for="your_pass"><i className="zmdi zmdi-lock"></i></label>
                                <input type="password" name="your_pass" id="your_pass" autoComplete="off" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder="Password"/>
                            </div>
                            <div className="form-group form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" onClick={()=>PostData()} value="Log in"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

)
}

export default Login