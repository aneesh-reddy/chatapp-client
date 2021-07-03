import React from 'react'
import {Button} from "@material-ui/core"
import "./login.css";
import auth, {provider} from "./firebase";
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';



function Login() {
    
    const [{},dispatch] = useStateValue();
    const signIn = (e) =>{
        e.preventDefault();
        console.log(provider);
     
    //    auth.signIn=()=>{
           
            auth.signInWithPopup(provider)
            .then(result=>{
            
                
                dispatch({
                    type:actionTypes.SET_USER,
                    user:result.user,
                    name:result.additionalUserInfo.profile.name,
                    email:result.additionalUserInfo.profile.email,
                    isNewUser:result.additionalUserInfo.isNewUser
                });
            })
            .catch((error)=>alert(error.message));
        
      
    }
    return (
        <div className="login">
           <div className="login_container">
               <img src="https://png.pngtree.com/png-vector/20190912/ourlarge/pngtree-chatting-logo-icon-with-gradation-of-gray-and-white-color-the-png-image_1727922.jpg" alt="Chat_application" />
               <div className="login_text">
                  <h1> Sign in to ChatApp</h1>
               </div>

               <Button type="submit" onClick={signIn}>
                   Sign in With Google
               </Button>
           </div>
        </div>
    )
}
export let userDet
export default Login
