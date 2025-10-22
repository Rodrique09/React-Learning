import { useState, useEffect} from 'react'
import { ChatInput } from './components/ChatInput'
import ChatMessages from './components/ChatMessages'
import './App.css'
import { Chatbot } from 'supersimpledev';

function App(){
        const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('messages')) || []);

        useEffect( () => {
          localStorage.setItem('messages',JSON.stringify(chatMessages))
        },[chatMessages])

        useEffect(()=>{
          Chatbot.addResponses({
            'goodbye':'Goodbye. have a great day',
            'give me a unique id': () => {
              return `Sure! Here is a unique id:${crypto.randomUUID()}`; 
            }
          });
        }, []);

        return (
          <div className = "app-container">
            <p className = "welcome-message">{chatMessages.length === 0 ? "Welcome to the chatbot project! Send a message using the textbox below" : ""}</p>
            <ChatMessages 
                chatMessages = {chatMessages}
            />
            <ChatInput 
                chatMessages = {chatMessages}
                setChatMessages = {setChatMessages}
            />
          </div>
        )
      }

export default App;