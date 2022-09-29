import React,{useContext,useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {NavLink} from 'react-router-dom';
import logo from '../images/logo1.JPG'
import {UserContext} from '../App';
const navStyle={
  backgroundColor:"#34495e"
}
const imgstyle={
  width:50,
   height:30
}
const Navigation=()=>{

  const{state, dispatch}= useContext(UserContext);
  const RenderMenu =()=>{
    if(state){
      if(localStorage.getItem("useremail") ==="club1@gmail.com"|| localStorage.getItem("useremail") ==="club2@gmail.com"||localStorage.getItem("useremail") ==="club3@gmail.com"||localStorage.getItem("useremail") ==="club4@gmail.com"){
      return[
      <>
      <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
      </li>
      
      <li className="nav-item">
        <NavLink className="nav-link" to="/createpost">Create Post</NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink className="nav-link dropdown-toggle"  id="navbarDropdown" to="#club"role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Clubs
        </NavLink>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown" >
          <li><NavLink className="dropdown-item" to="/Club1">Club1</NavLink></li>
          <li><NavLink className="dropdown-item" to="/Club2">Club2</NavLink></li>
          <li><NavLink className="dropdown-item" to="/Club3">Club3</NavLink></li>
          <li><NavLink className="dropdown-item" to="/Club4">Club4</NavLink></li>
        </ul>
      </li>
      
      <li className="nav-item">
        <NavLink className="nav-link" to="/createEvent">Schedule Event</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Event">Upcoming Events</NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink className="nav-link dropdown-toggle"  id="navbarDropdown" to="#club" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class='fas fa-user-check'></i>
      
        </NavLink>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li> Hello! {localStorage.getItem("username")}!!!</li>
          <li><NavLink className="dropdown-item" to="/logout">Logout</NavLink></li>
        </ul>
      </li>
      </>]
      }
      else{
        return[
          <>
      <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/Event">Upcoming Events</NavLink>
      </li>
      <li className="nav-item dropdown">
        <NavLink className="nav-link dropdown-toggle"  id="navbarDropdown" to="#club"role="button" data-bs-toggle="dropdown" aria-expanded="false">
        Clubs
        </NavLink>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown" >
          <li><NavLink className="dropdown-item" to="/Club1">Club1</NavLink></li>
          <li><NavLink className="dropdown-item" to="/Club2">Club2</NavLink></li>
          <li><NavLink className="dropdown-item" to="/Club3">Club3</NavLink></li>
          <li><NavLink className="dropdown-item" to="/Club4">Club4</NavLink></li>
        </ul>
      </li>
      
      <li className="nav-item dropdown">
        <NavLink className="nav-link dropdown-toggle"  id="navbarDropdown" to="#club" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class='fas fa-user-check'></i>
      
        </NavLink>
        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
          <li> Hello! {localStorage.getItem("username")}!!!</li>
          <li><NavLink className="dropdown-item" to="/logout" >Logout</NavLink></li>
        </ul>
      </li>
      </>
        ]
      }
    }
    else{
      return[
      <>
      <li className="nav-item">
        <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signin">Login</NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">Signup</NavLink>
      </li>
      </>
      ]
    }
  }
    return(
  

<nav className="navbar navbar-expand-lg navbar-dark  custom " style={navStyle}>
<div className="container-fluid ">
  <NavLink className="navbar-brand" to="/"><img src={logo} alt="logo" style={imgstyle}></img></NavLink>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse " id="navbarSupportedContent" >
    <ul className="navbar-nav ms-auto  mb-2 mb-lg-0" style={{marginLeft:'auto'}}  >
      <RenderMenu/>
    </ul>
  </div>
</div>
</nav>
    )

}
export default Navigation;