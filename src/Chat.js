import React from 'react';
import {Avatar,IconButton} from "@material-ui/core";
import { AttachFile,InsertEmoticon,MoreVert,SearchOutlined} from '@material-ui/icons';
import MicIcon from "@material-ui/icons/Mic"
import {useState} from "react"
import instance from "./axios"
import ScrollableFeed from "react-scrollable-feed";
import { useParams } from 'react-router';
import {useEffect} from "react";
import Pusher from "pusher-js";
import "./chat.css";
import { StateProvider, useStateValue } from './StateProvider';


function Chat(props) {
  
     const [input,setInput]=useState("");
     const { roomId } = useParams();
     const [roomName,setRoomName]=useState("");
     const [roomMessages,setRoomMessages] = useState([]);
     const [thisroom,setThisRoom]=useState(roomId)
     const [cond,setCond]= useState(false);
     
   
    
   
    const [{user},dispatch]=useStateValue();
     useEffect(()=>{
        instance.get("/rooms/messages/"+roomId).
        then(response=>{
          console.log(typeof(response.data));
          setRoomMessages(response.data);
          // setCond(true);
        })
       setThisRoom(roomId);
     
      },[roomId])


     useEffect(()=>{

      
    
      var pusher = new Pusher('c198e52dedc998546e92', {
        cluster: 'eu'
      });
  
        console.log("channel is created");
    
        const channel = pusher.subscribe('rooms');
        
        channel.bind('updated', function(data) {
        
          const one=data.roomid;
         
          if(one===roomId){
    
           setRoomMessages((prev)=>{
            return [...prev, data.doc]
          });
          
        }
          return ()=>{
            channel.unbind_all()
            pusher.unsubscribe('rooms');
          }
           });
      },[roomId]);

  

     useEffect(()=>{
         if(roomId)
         { 
             props.rooms.every(items=>{
                if(items._id===roomId)
                {       
                    setRoomName(items.roomname);
                    return false;
                }
                return true;
             })
            //  console.log("73");
         }
     },[roomId,props.rooms])

     const sendMessage=(e)=>{
        e.preventDefault();
        var x = new Date()
        var ampm = x.getHours( ) >= 12 ? ' PM' : ' AM';
       let hours = x.getHours( ) % 12;
        hours = hours ? hours : 12;
        var x1=x.getMonth() + 1+ "/" + x.getDate() + "/" + x.getFullYear(); 
        x1 = x1 + " - " +  hours + ":" +  x.getMinutes() + ":" +  x.getSeconds() + ":" + ampm;
        console.log("this message is being posted to id"+roomId);
        const mesdata={
          message:input,
          name:user.email,
          timestamp:x1,
          received:false,
        }

  
       instance.post("/messages/new/"+roomId,mesdata).then(function(response){
         console.log(response.data);
       }).catch(function(error){
         console.log(error);
       })
        setInput("");
       
    }
  
    return (
        <div className="chat">
            <div className="chat_header" >
             <div className="chat_header_info">
                 <h3> {roomName} </h3>
             </div>

             <div className="chat_header_right">
              <IconButton>
                  <SearchOutlined />
              </IconButton>
              <IconButton>
                  <AttachFile />
              </IconButton>
              <IconButton>
                  <MoreVert />
              </IconButton>
             </div>
            </div>
            
            <div className="chat_body" >
            <ScrollableFeed>
           
            {
          (roomId)&&(roomMessages.length!=0)&&roomMessages.map((msgs)=>{
                  return (
                    <div>
                              <p className={`chat_message ${ (msgs.name===user.email)&& "chat_receiver"}`} autoFocus>
                              <span className="chat_name">{msgs.name} </span>
                             
                                { msgs.message}
                               <span className="chat_timestamp">
                                   {
                                      msgs.timestamp
                                  }
                            </span>
                              </p>
                              </div>
                          )
                  
                  })}
              </ScrollableFeed>
            </div>

            <div className="chat_footer">
             <InsertEmoticon />
             <form action="/message/new" >
                 <input value={input} placeholder="type a message " type="text" onChange={(e)=>{setInput(e.target.value)}} />
                 <button onClick={sendMessage} type="submit"> Send </button> 
             </form>
             <MicIcon />
            </div>

        </div>
    )
}

export default Chat
