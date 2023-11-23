// in MessageParser.jsx

import React from 'react'
const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    // this bot will serve as a customer service bot on e-commerce website
    if (message.toLowerCase().includes('hello')) {
      actions.handleHello()
    }
    if (message.toLowerCase().includes('help')) {
      actions.handleHelp()
    }
    if (message.toLowerCase().includes('order')) {
      actions.handleOrder()
    }
    if (
      message.toLowerCase().includes('thanks') ||
      message.toLowerCase().includes('thank you')
    ) {
      actions.handleThanks()
    }
    if (
      message.toLowerCase().includes('shipping') ||
      message.toLowerCase().includes('delivery')
    ) {
      actions.handleShippingInfo()
    }
    if (message.toLowerCase().includes('product')) {
      actions.handleProductInquiry()
    }
    if (
      message.toLowerCase().includes('recommend') ||
      message.toLowerCase().includes('suggest')
    ) {
      actions.handleProductRecommendation()
    }
    if (
      message.toLowerCase().includes('return') ||
      message.toLowerCase().includes('exchange')
    ) {
      actions.handleReturns()
    }
    if (
      message.toLowerCase().includes('cart') ||
      message.toLowerCase().includes('checkout')
    ) {
      actions.handleCartAssistance()
    }
    if (
      message.toLowerCase().includes('discount') ||
      message.toLowerCase().includes('promo')
    ) {
      actions.handlePromotions()
    }
    if (
      message.toLowerCase().includes('contact') ||
      message.toLowerCase().includes('customer service')
    ) {
      actions.handleContactInfo()
    }

    // default message
    actions.handleDefault()
  }

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {},
        })
      })}
    </div>
  )
}

export default MessageParser
