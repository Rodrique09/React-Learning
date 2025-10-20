import { useState} from 'react'
import './LoginForm.css'

function LoginForm(){

    const [showPassword, isShowPassword] = useState(false);

    function tooglePassword(){
        isShowPassword(!showPassword);
    }

    return (
        <>
            <div>
                <input className = "text-content" placeholder = "Email" type = "Email"/>
            </div>
            <div>
                <input className = "text-content" placeholder = "Password" type = {showPassword ? "text" : "password"} />
                <button className = "hide-button-style" onClick = {tooglePassword}>{showPassword ? "Hide" : "Show "}</button>
            </div>
            <button className = "button-style">Login</button>
            <button className = "button-style">Sign Up</button>
        </>
    )
}

export default LoginForm;