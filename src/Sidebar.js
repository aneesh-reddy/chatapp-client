import React from "react";
import "./sidebar.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import {Avatar,IconButton} from "@material-ui/core";
import Chat from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {SearchOutlined} from "@material-ui/icons";
import SidebarChat from  "./SidebarChat";
import {useStateValue} from "./StateProvider";
function Sidebar(props)
{
    
  const [{user},dispatch] = useStateValue();

  const roomArray=[];
  props.rooms.forEach(items=>{
      roomArray.push(items._id)

  });
//   console.log(roomArray);

    return (
        

        <div className="sidebar">

        <div className="sidebar_header">

         <Avatar src={user?.photoURL}  alt="avatar"/>
        <div className="sidebar_header_right">
             <IconButton>
                 <DonutLargeIcon />
             </IconButton>
             <IconButton>
                 <Chat />
             </IconButton>
             <IconButton>
                 <MoreVertIcon />
             </IconButton>
        </div>

        </div>

        <div className="sidebar_search">

          <div className="sidebar_search_container">

               <SearchOutlined />
               <input placeholder="search or start new chat" type="text" />

          </div>   
        </div>
        

        <div className="sidebar_chats">
            <SidebarChat head="addNewChat" />
            <SidebarChat head="joinChat" arrayrooms={roomArray}/>
            {(props.userrooms&&props.userrooms!=="")&&props.userrooms.map((items)=>{
                {/* console.log(items); */}
                let lastmessage="";
                if(items.messages&&items.messages.length!==0){
                lastmessage=items.messages[items.messages.length-1].message;
                let dup=lastmessage;
                lastmessage= dup.substring(0,Math.min(dup.length,10))+"...";
                }
                return <SidebarChat head={items.roomname} key={items._id}  id={items._id} last_message={lastmessage} />
            })}
        </div> 
          
          
        </div>
        
    )
}

export default Sidebar;