import React from "react";
import {useEffect} from "react";
import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";
import {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Login";
import {useStateValue} from "./StateProvider";


function App() {

  const [{user,name,email,isNewUser},dispatch] = useStateValue();
  const [messages,setMessages] =useState([]);
  const [rooms,setRooms] =useState([]);
  const [userRooms,setUserRooms]=useState([]);

  useEffect(()=>{
     axios.get("/messages/sync").
     then(response=>{
      setMessages(response.data);
     })
  },[])

  useEffect(()=>{
    axios.get("/rooms/sync").
    then(response=>{
      setRooms(response.data);
    })
  },[])

  useEffect(() => {
    axios.post("rooms/user",{user:email}).then(response=>{
      // console.log(response.data);
       setUserRooms(response.data);
    })
  }, [user])

  useEffect(()=>{
    var pusher = new Pusher('98f4565f0f93c4a6621e', {
      cluster: 'ap2'
    });


    const channel = pusher.subscribe('rooms');
    channel.bind('inserted', function(data) {
      setRooms((prevData)=>{
        // console.log(data);
        return [...prevData, data]
      })

      return ()=>{
        channel.unbind_all()
        channel.unsubscribe('rooms');
      }
    });
  },[]);

  useEffect(()=>{
   
    var pusher = new Pusher('81bb5776e0598a40551b', {
      cluster: 'eu'
    });


    const channel = pusher.subscribe('users');
    channel.bind('updated', function(data) {
      
      // console.log(data.name);
      // console.log(email);
      if(data.name===email){
        setUserRooms((prevrooms)=>{
         return [...prevrooms,data.document];
     });
      }
      
    //  console.log("updated users ");
       
      return ()=>{
        channel.unbind_all();
        channel.unsubscribe('users');
      }
    });
  },[email]);



   useEffect(() => {
    if(isNewUser)
    {
      console.log("new user");
      axios.post("/users/new",{
        name:name,
        email:email
     })   //.then(function(response){
      //   // console.log(response);
      //   isNewUser=false
      // })
    }
     return () => {
     
     }
   }, [isNewUser])

 
 

  //  console.log(userRooms.length);
  //  console.log(rooms.length);
 
  return (
    
    <div className="app">
     { !user ?(
      <Login />
     ):
     <div className="app_body">
    
    <Router>
      <Switch>
        {/* <Sidebar  rooms={rooms} /> */}
        <Route path="/rooms/:roomId" >
          <Sidebar rooms={rooms} userrooms={userRooms} />
           <Chat  messages={messages} userrooms={userRooms} rooms={rooms}/>
        </Route>
        
         <Route path="/">

         <Sidebar rooms={rooms} userrooms={userRooms} />
           <Chat rooms={rooms} userrooms={userRooms}/>
        </Route> 
       
      </Switch>
    </Router>
   
   </div>    }
    </div> 
  );
}

export default App;
