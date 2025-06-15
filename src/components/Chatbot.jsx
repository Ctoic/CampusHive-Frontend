import React, { useState, useRef, useEffect } from 'react'
import {
  FaChevronRight,
  FaRegCalendarAlt,
  FaUniversity,
  FaMoneyBillWave,
  FaPaperPlane,
  FaPlus,
  FaRobot,
  FaUser,
} from 'react-icons/fa'

const Sidebar = ({ onNewChat }) => (
  <aside className="w-64 bg-[#111111] border-r border-gray-700/50 h-screen flex flex-col">
    {/* Logo/Header with New Chat Button */}
    <div className="p-4 border-b border-gray-700/50">
      <div className="flex flex-col gap-3">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#00d462] rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#00d462]/10">
            <FaRobot className="text-black text-sm" />
          </div>
          <div className="flex flex-col -space-y-0.5">
            <h3 className="text-white text-sm font-semibold tracking-wide">CampusHive AI</h3>
          </div>
        </div>

        {/* New Chat Button */}
        <button 
          className="w-full bg-[#00d462] hover:bg-[#00d462]/90 text-black text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-[1.02]"
          onClick={onNewChat}
        >
          <FaPlus className="text-xs" />
          New Chat
        </button>
      </div>
    </div>

    {/* Empty State */}
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-12 h-12 bg-[#00d462]/10 rounded-full flex items-center justify-center mb-3 mx-auto">
          <FaRobot className="text-[#00d462] text-lg" />
        </div>
        <p className="text-gray-400 text-sm">Start a new conversation</p>
      </div>
    </div>
  </aside>
)

const Greeting = ({ onQuickAction }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-6 bg-[#0A0A0A]">
    {/* Welcome Message */}
    <div className="text-center mb-6">
      <div className="w-16 h-16 bg-[#00d462]/10 rounded-full flex items-center justify-center mb-3 mx-auto">
        <FaRobot className="text-[#00d462] text-2xl" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">How can I help you today?</h2>
      <p className="text-gray-400 text-sm max-w-xl">
        I'm your campus AI assistant, ready to help with timetables, faculty information, financial aid, and more!
      </p>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6 w-full max-w-3xl">
      <button 
        onClick={() => onQuickAction('Generate Timetable')}
        className="group bg-[#111111] border border-gray-700/50 rounded-lg p-4 hover:border-[#00d462]/30 hover:bg-[#111111]/80 transition-all duration-300 transform hover:scale-[1.02]"
      >
        <div className="w-10 h-10 bg-[#00d462]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#00d462]/20 transition-colors">
          <FaRegCalendarAlt className="text-[#00d462] text-lg" />
        </div>
        <h3 className="text-white text-sm font-medium mb-1">Generate Timetable</h3>
        <p className="text-gray-400 text-xs">Create your personalized class schedule</p>
      </button>

      <button 
        onClick={() => onQuickAction('Faculty Info')}
        className="group bg-[#111111] border border-gray-700/50 rounded-lg p-4 hover:border-[#00d462]/30 hover:bg-[#111111]/80 transition-all duration-300 transform hover:scale-[1.02]"
      >
        <div className="w-10 h-10 bg-[#00d462]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#00d462]/20 transition-colors">
          <FaUniversity className="text-[#00d462] text-lg" />
        </div>
        <h3 className="text-white text-sm font-medium mb-1">Faculty Information</h3>
        <p className="text-gray-400 text-xs">Get details about professors and staff</p>
      </button>

      <button 
        onClick={() => onQuickAction('Financial Aid Info')}
        className="group bg-[#111111] border border-gray-700/50 rounded-lg p-4 hover:border-[#00d462]/30 hover:bg-[#111111]/80 transition-all duration-300 transform hover:scale-[1.02]"
      >
        <div className="w-10 h-10 bg-[#00d462]/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-[#00d462]/20 transition-colors">
          <FaMoneyBillWave className="text-[#00d462] text-lg" />
        </div>
        <h3 className="text-white text-sm font-medium mb-1">Financial Aid</h3>
        <p className="text-gray-400 text-xs">Learn about scholarships and funding</p>
      </button>
    </div>
  </div>
)

const ChatWindow = ({ messages }) => {
  const endRef = useRef(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#0A0A0A] space-y-3">
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-start gap-2 max-w-[80%] ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              m.sender === 'user' ? 'bg-[#00d462]' : 'bg-[#111111] border border-gray-700/50'
            }`}>
              {m.sender === 'user' ? (
                <FaUser className="text-black text-xs" />
              ) : (
                <FaRobot className="text-[#00d462] text-xs" />
              )}
            </div>
            <div className={`px-3 py-2 rounded-lg ${
              m.sender === 'user' 
                ? 'bg-[#00d462] text-black rounded-br-sm' 
                : 'bg-[#111111] text-white border border-gray-700/50 rounded-bl-sm'
            }`}>
              <p className="text-sm leading-relaxed">{m.text}</p>
            </div>
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  )
}

const ChatInput = ({ input, setInput, send }) => (
  <div className="p-4 border-t border-gray-700/50 bg-[#0A0A0A]">
    <div className="flex items-center gap-2 bg-[#111111] border border-gray-700/50 rounded-lg p-2 focus-within:border-[#00d462]/50 transition-colors">
      <input
        type="text"
        placeholder="Type your message here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
        className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none"
      />
      <button 
        onClick={send}
        disabled={!input.trim()}
        className="p-1.5 bg-[#00d462] hover:bg-[#00d462]/90 text-black rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <FaPaperPlane className="text-xs" />
      </button>
    </div>
  </div>
)

export default function ChatbotPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const newChat = () => {
    setMessages([])
  }

  const handleQuickAction = (action) => {
    newChat()
    setMessages([
      { sender: 'user', text: action },
      { sender: 'bot', text: `I'd be happy to help you with ${action}! Let me gather the information you need...` }
    ])
  }

  const send = () => {
    if (!input.trim()) return
    setMessages((m) => [...m, { sender: 'user', text: input }])
    setInput('')
    // Simulate bot reply with typing delay
    setTimeout(() => {
      setMessages((m) => [...m, { 
        sender: 'bot', 
        text: `Thanks for your message! I'm processing your request and will provide you with accurate information shortly. How else can I assist you today?` 
      }])
    }, 1000)
  }

  return (
    <div className="flex bg-[#0A0A0A] h-screen">
      <Sidebar onNewChat={newChat} />

      <main className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <Greeting onQuickAction={handleQuickAction} />
        ) : (
          <ChatWindow messages={messages} />
        )}

        <ChatInput input={input} setInput={setInput} send={send} />
      </main>
    </div>
  )
}