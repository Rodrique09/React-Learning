import {useState} from 'react';
import dayjs from 'dayjs';
import {Chatbot} from 'supersimpledev';
import './ChatInput.css';
import LoadingSpinner from '../assets/loading-spinner.gif';

export function ChatInput({chatMessages, setChatMessages}){
const [inputText, setInputText] = useState('');
const [isLoading, setIsLoading] = useState(false);

function saveInputText(event){
    setInputText(event.target.value);
}

async function SendMessage(){
    
    if(!inputText.trim() || isLoading){
        return;
    }

    setIsLoading(true);
    const messageToSend = inputText;
    setInputText('');

    const newChatMessages =[
        ...chatMessages,
        {
            message: messageToSend,
            sender: 'user',
            id: crypto.randomUUID(),
            time: dayjs().valueOf()
        }
    ]

    setChatMessages([
        ...newChatMessages,
        {
            message: <img className = "loading-image" src = {LoadingSpinner}/>,
            sender:'robot',
            id: crypto.randomUUID(),
            time: dayjs().valueOf()
        }
    ]
    );

    const response = await Chatbot.getResponseAsync(messageToSend);
    setChatMessages([
        ...newChatMessages,
        {
            message: response,
            sender: 'robot',
            id: crypto.randomUUID(),
            time: dayjs().valueOf()
        }
    ]);
    setIsLoading(false);
}
function handleKeyDown(event){
    if(event.key === 'Enter'){
        SendMessage();
    }
    else if(event.key === 'Escape'){
        setInputText('');
    }
}
function ClearMessage(){
    setChatMessages([]);
}

return (
    <div className = "chat-input-container">
    <input className = "chat-input" placeholder ={isLoading ? "Waiting for the response ..." :"Send a message to the ChatBot"} onChange ={saveInputText}
    value = {inputText} onKeyDown = {handleKeyDown} disabled={isLoading} 
    ></input>
    <button className = "send-button" onClick = {SendMessage} disabled = {!inputText.trim() || isLoading}>
    {isLoading ? 'Sending ...' : 'Send'}
    </button>
    <button className = "clear-button" onClick = {ClearMessage}>Clear</button>
    </div>
);
}