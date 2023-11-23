// in config.js
import React from 'react'
import { createChatBotMessage, createCustomMessage } from 'react-chatbot-kit'

const botName = 'Brenda'

const config = {
  initialMessages: [
    createChatBotMessage(`Hi I'm ${botName}. How may I assist you?`),
  ],
  state: {
    gist: '',
    infoBox: '',
  },
  customComponents: {},
  widgets: [],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
    // .appChatbotContainer_3u5t {
    //     border-radius: 5px;
    //     bottom: 40px;
    //     box-shadow: 5px 5px 13px rgba(91,81,81,.4);
    //     display: flex;
    //     justify-content: center;
    //     margin: 40px 0;
    //     position: fixed;
    //     right: 40px;
    //     z-index: 6;
    // }
  },
}

export default config
