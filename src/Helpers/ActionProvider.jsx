// in ActionProvider.jsx
import React from 'react'

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. How may we assist you?')
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleHelp = () => {
    const botMessage = createChatBotMessage(
      'Sure, I can help! What do you need assistance with?'
    )
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleOrder = () => {
    const botMessage = createChatBotMessage(
      'Please provide your order number, so I can assist you better.'
    )
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleThanks = () => {
    const botMessage = createChatBotMessage(
      "You're welcome! Is there anything else I can help you with?"
    )
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleProductInquiry = () => {
    const botMessage = createChatBotMessage(
      'Are you looking for a specific product? Please provide more details.'
    )
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleShippingInfo = () => {
    const botMessage = createChatBotMessage(
      'Please provide your order number, so I can assist you better.'
    )
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleProductRecommendation = () => {
    const botMessage = createChatBotMessage(
      'What kind of product are you looking for?'
    )
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleReturns = () => {
    const botMessage = createChatBotMessage(
      'Please visit our returns page for more information.'
    )
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleCartAssistance = () => {
    const botMessage = createChatBotMessage(
      'Are you having trouble with your cart?'
    )
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handlePromotions = () => {
    const botMessage = createChatBotMessage(
      'Please visit our promotions page for more information.'
    )
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleContactInfo = () => {
    const botMessage = createChatBotMessage(
      'Please visit our contact page for more information.'
    )
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  const handleDefault = () => {
    const botMessage = createChatBotMessage('...')
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }))
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleHelp,
            handleOrder,
            handleThanks,
            handleProductInquiry,
            handleShippingInfo,
            handleProductRecommendation,
            handleReturns,
            handleCartAssistance,
            handlePromotions,
            handleContactInfo,
            handleDefault,
          },
        })
      })}
    </div>
  )
}

export default ActionProvider
