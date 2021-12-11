import React, { useEffect } from 'react';

import './App.css';
import HomeScreen from './Components/HomeScreen';
import { Routes, Route, Link } from "react-router-dom";
import Login from './Components/Login';
import { auth } from './firebase';
import {useDispatch, useSelector} from "react-redux";
import { login, logout, selectUser } from './features/userSlice';
import Profile from './Components/Profile';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth){
        //logged In
        console.log(userAuth);
        //store user data in a global store
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email,
        }))
      }else{
        //logged Out
        dispatch(logout());
      }
    })
    //clean up function to detach listener
    return unsubscribe;
  },[dispatch])

 
  return (
    <div className="app">
      
      {!user ? <Login /> : (
      <Routes>
            <Route  path="/profile" element={<Profile/>}/>
            <Route exact path="/" element={ <HomeScreen/>} />
        
      
       
      </Routes>
      )}
     
    </div>
  );
}

export default App;
