import './App.css';
import {Route, Switch, useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Club1 from './components/Club1';
import Club2 from './components/Club2';
import Club3 from './components/Club3';
import Club4 from './components/Club4';
import Logout from './components/logout';
import Event from './components/Event';
import CreateEvent  from './components/CreateEvent';
import Errorpage from './components/Errorpage';
import CreatePost from './components/CreatePost';
import { createContext, useEffect,useContext,useReducer } from 'react';
import {initialState, reducer} from './reducer/useReducer';


export const UserContext = createContext();
const Routing=()=>{
  // const history=useHistory();
  // const {state,dispatch}=useContext(UserContext)
  // useEffect(()=>{
  //   const user =JSON.parse(localStorage.getItem('user'))
  //   if(user){
  //     dispatch({type:"USER",payload:user})
  //     history.push('/')
  //   }
  //   else{
  //     history.push('/signin')
  //   }
  // })
  return(
  <Switch>
        <Route exact path="/">
          <Home/>
        </Route>

        <Route path="/Club1">
          <Club1/>
        </Route>

        <Route path="/Club2">
          <Club2/>
        </Route>
        <Route path="/Event">
          <Event/>
        </Route>
        <Route path="/createEvent">
          <CreateEvent/>
        </Route>

        <Route path="/Club3">
          <Club3/>
        </Route>

        <Route path="/Club4">
          <Club4/>
        </Route>

        <Route path="/signin">
          <Login/>
        </Route>

        <Route path="/signup">
          <Signup/>
        </Route>
        <Route path="/createPost">
          <CreatePost/>
        </Route>
       <Route path="/logout">
       <Logout/>
       </Route>
        <Route >
          <Errorpage/>
        </Route>
      </Switch>
  )
}
const App=()=>{

  const [state, dispatch]= useReducer(reducer, initialState)

  return (

    <>
<UserContext.Provider value={{state , dispatch}}>

    <Navigation></Navigation>
    <Routing/>
      </UserContext.Provider>
         </>
  )
}
export default App;
