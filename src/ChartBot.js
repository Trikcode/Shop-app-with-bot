import React from 'react'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'

import config from './Helpers/config'
import ActionProvider from './Helpers/ActionProvider'
import MessageParser from './Helpers/MessageParser'

const ChatbotComponent = () => {
  return (
    <Chatbot
      config={config}
      actionProvider={ActionProvider}
      messageParser={MessageParser}
    />
  )
}

export default ChatbotComponent
