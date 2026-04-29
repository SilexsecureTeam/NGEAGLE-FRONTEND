import React, { memo } from 'react'
import Message from './Message'

const Messages = ({ messages }) => {
  return (
    <div className="messagesContainer">
      {messages?.map(({ user, text, list, question }, index) => (
        <Message
          message={text}
          sender={user}
          list={list}
          question={question}
          key={index}
        />
      ))}
    </div>
  )
}

export default memo(Messages)
