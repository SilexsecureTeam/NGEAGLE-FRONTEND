import React, { useEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'
import { IoMdPaperPlane } from 'react-icons/io'
import Messages from './Messages/Messages'
import { BsFillChatFill } from 'react-icons/bs'
import './chatbot.css'
import useRequest from '../../hooks/useRequest'

const Chatbot = () => {
  const [openChat, setOpenChat] = useState(false)
  const [, setFaqData] = useState([])
  const [messages, setMessages] = useState([
    {
      text: 'Welcome to the airline chatbot! How can I assist you?',
      user: 'bot',
    },
  ])
  const { data: faqs, fetchData, error, loading } = useRequest('Faq', 'POST')

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFAQSelection = (selectedQuestion) => {
    // Find the selected question in FAQs and get its answer
    const selectedFAQ = faqs?.find((faq) => faq.question === selectedQuestion)
    if (selectedFAQ) {
      // Display the user's question and then the bot's answer after a delay
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: selectedQuestion, user: 'user' },
      ])
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: selectedFAQ.answer, user: 'bot' },
        ])
      }, 2000) // Delay of 2000 milliseconds (2 seconds)
    }
  }

  const displayFaq = (data) => (
    <div className="questionsContainer">
      {data?.map((question, index) => (
        <button
          className="questions"
          key={index}
          onClick={() => handleFAQSelection(question?.question)}
        >
          {question?.question}
        </button>
      ))}
    </div>
  )

  useEffect(() => {
    if (faqs && !loading && !error) {
      setFaqData(faqs)
      setMessages([
        {
          user: 'bot',
          text: "Welcome to Kira bot! I'm here to assist you with any questions or information you need about our airline services.",
        },
        {
          text: 'To get started, you can type your question or choose from the FAQs below',
          user: 'bot',
        },
        {
          text: displayFaq(faqs),
          list: true,
          user: 'bot',
        },
      ])
    }
  }, [error, faqs, loading])

  const addToMessages = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <BsFillChatFill onClick={() => setOpenChat((openChat) => !openChat)} size={40} />

      {openChat ? (
        <div
          className="chatBotContainer"
          style={{
            display: openChat && 'block',
            animation: `${openChat ? 'fadeIn' : 'fadeOut'} 0.3s linear`,
          }}
        >
          <div className="chatBotHeader">
            <span style={{ fontSize: 25 }}>Kira</span>
            <BsChevronDown
              onClick={() => setOpenChat(false)}
              style={{ cursor: 'pointer' }}
              size={20}
            />
          </div>

          <div className="chatBotBody">
            <Messages messages={messages} />
          </div>
          <form className="chatBotFooter" onSubmit={addToMessages}>
            <input
              className="footerInput"
              autoFocus
              placeholder="Type your question here..."
            // value={message}
            // onChange={(e) => setMessage(e.target.value)}
            />
            <div>
              <button
                className="sendButton"
                type="submit"
              // disabled={message.trim().length === 0}
              >
                <IoMdPaperPlane />
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  )
}

export default Chatbot
