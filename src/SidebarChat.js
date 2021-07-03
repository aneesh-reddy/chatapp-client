import React from 'react'
import {Avatar} from "@material-ui/core";
import "./SidebarChat.css"
import instance from "./axios"
import {Link} from "react-router-dom";
import {useStateValue} from "./StateProvider";
import {useState} from "react";
function SidebarChat(props) {
  // const [arr,setArr]=useState([]);
  // setArr(props.arrayrooms?(props.arrayrooms):[]);
  
  const [{user},dispatch] = useStateValue();
   const createChat = () => {
        const roomName = prompt("please enter name for chat ");
        if(roomName)
        {
          
            instance.post('/rooms/new',{
             name:roomName,
             user:user.email,

          }).then((response)=>{
            let Id="";
            Id=response.data;
            alert("your new room Id is "+ Id);
          })
  
        }
   };
   
  
  //  console.log(props.arrayrooms);

   const joinChat=()=>{
     
      const room_id =prompt("please enter room id");
    
      if(room_id){
        let cond=false;
        // console.log(arr);
       console.log(props.arrayrooms);
        if(props.arrayrooms&&props.arrayrooms.length!=0){ 
        props.arrayrooms.every(items=>{
          if(room_id===items){
            cond=true;
            console.log("found");
            return false;
          }
          else
          {
            return true;
          }
        })
       

        if(cond){
          const id="";
          console.log("poste");
        instance.post("/rooms/join",{
          user:user.email,
          roomid:room_id
        })
        }
        else
        {
          alert("Sorry it is not a valid room ID");
        }
        console.log(cond);
      }}
    
   }

 
       
    return (props.head!=="addNewChat"&&props.head!=="joinChat")?(
    
        <Link to={`/rooms/${props.id}`} style={{textDecoration:"none"}}>
             <div className="sidebar_chat">
             <Avatar />
             <div className="sidebar_chat_info"> 
               <h2>{props.head}</h2>
               <p> {props.last_message} </p> 
             </div>
        </div>
       </Link>
    ) : (
      (props.head==="addNewChat") ?(
      <div onClick={createChat} className="sidebar_chat">
        <h2 >Add new Chat </h2>
      </div>):(
        <div onClick= {joinChat} className="sidebar_chat">
           <h2>Join Chat Room</h2>
        </div>
      )
    );
};
export default SidebarChat
