import RobotProfileImage from '../assets/Robot.png'
// import HumanProfileImage from '../assets/Human.png'
import ProfileImage from '../assets/profile-1.jpeg'
import "./ChatMessage.css"

export function ChatMessage(props){
    const {message, sender} = props;

    return(
        <div className = {sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
        {sender === "robot" && <img src = {RobotProfileImage} className="chat-message-profile" alt="Robot" />}
        <div className = "chat-message-text">
            {message}
        </div>
        {sender === "user" && <img src = {ProfileImage} className="chat-message-profile" alt="Human" />}
        </div>
    );
}