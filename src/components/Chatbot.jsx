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

const Sidebar = ({ categories, chats, selectedChat, onSelectChat, onNewChat }) => (
  <aside className="w-80 bg-[#111111] border-r border-gray-700/50 h-screen flex flex-col">
    {/* Logo/Header */}
    <div className="p-6 border-b border-gray-700/50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#00d462] rounded-lg flex items-center justify-center">
          <FaRobot className="text-black text-lg" />
        </div>
        <div>
          <h3 className="text-white font-semibold">CampusHive AI</h3>
          <p className="text-gray-400 text-sm">Your Campus Assistant</p>
        </div>
      </div>
    </div>

    {/* Categories */}
    <div className="p-4 flex-1 overflow-y-auto">
      <div className="mb-6">
        <h4 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">Categories</h4>
        <div className="space-y-1">
          {categories.map((cat) => (
            <div key={cat} className="group flex items-center justify-between p-3 rounded-lg hover:bg-[#1a1a1a] cursor-pointer transition-all duration-200">
              <span className="text-gray-300 group-hover:text-white">{cat}</span>
              <FaChevronRight className="text-gray-500 group-hover:text-[#00d462] text-sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Chats */}
      <div className="mb-6">
        <h4 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">Recent Chats</h4>
        <div className="space-y-1">
          {chats.map((chat) => (
            <div
              key={chat}
              className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedChat === chat 
                  ? 'bg-[#00d462]/10 border border-[#00d462]/20' 
                  : 'hover:bg-[#1a1a1a]'
              }`}
              onClick={() => onSelectChat(chat)}
            >
              <span className={`${
                selectedChat === chat ? 'text-[#00d462]' : 'text-gray-300 group-hover:text-white'
              }`}>
                {chat}
              </span>
              <FaChevronRight className={`text-sm ${
                selectedChat === chat ? 'text-[#00d462]' : 'text-gray-500 group-hover:text-[#00d462]'
              }`} />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* New Chat Button */}
    <div className="p-4 border-t border-gray-700/50">
      <button 
        className="w-full bg-[#00d462] hover:bg-[#00d462]/90 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-[1.02]"
        onClick={onNewChat}
      >
        <FaPlus className="text-sm" />
        New Chat
      </button>
    </div>
  </aside>
)

const Greeting = ({ onQuickAction }) => (
  <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0A0A0A]">
    {/* Welcome Message */}
    <div className="text-center mb-8">
      <div className="w-20 h-20 bg-[#00d462]/10 rounded-full flex items-center justify-center mb-4 mx-auto">
        <FaRobot className="text-[#00d462] text-3xl" />
      </div>
      <h2 className="text-4xl font-bold text-white mb-4">How can I help you today?</h2>
      <p className="text-gray-400 text-lg max-w-2xl">
        I'm your campus AI assistant, ready to help with timetables, faculty information, financial aid, and more!
      </p>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-4xl">
      <button 
        onClick={() => onQuickAction('Generate Timetable')}
        className="group bg-[#111111] border border-gray-700/50 rounded-xl p-6 hover:border-[#00d462]/30 hover:bg-[#111111]/80 transition-all duration-300 transform hover:scale-[1.02]"
      >
        <div className="w-12 h-12 bg-[#00d462]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00d462]/20 transition-colors">
          <FaRegCalendarAlt className="text-[#00d462] text-xl" />
        </div>
        <h3 className="text-white font-semibold mb-2">Generate Timetable</h3>
        <p className="text-gray-400 text-sm">Create your personalized class schedule</p>
      </button>

      <button 
        onClick={() => onQuickAction('Faculty Info')}
        className="group bg-[#111111] border border-gray-700/50 rounded-xl p-6 hover:border-[#00d462]/30 hover:bg-[#111111]/80 transition-all duration-300 transform hover:scale-[1.02]"
      >
        <div className="w-12 h-12 bg-[#00d462]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00d462]/20 transition-colors">
          <FaUniversity className="text-[#00d462] text-xl" />
        </div>
        <h3 className="text-white font-semibold mb-2">Faculty Information</h3>
        <p className="text-gray-400 text-sm">Get details about professors and staff</p>
      </button>

      <button 
        onClick={() => onQuickAction('Financial Aid Info')}
        className="group bg-[#111111] border border-gray-700/50 rounded-xl p-6 hover:border-[#00d462]/30 hover:bg-[#111111]/80 transition-all duration-300 transform hover:scale-[1.02]"
      >
        <div className="w-12 h-12 bg-[#00d462]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#00d462]/20 transition-colors">
          <FaMoneyBillWave className="text-[#00d462] text-xl" />
        </div>
        <h3 className="text-white font-semibold mb-2">Financial Aid</h3>
        <p className="text-gray-400 text-sm">Learn about scholarships and funding</p>
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
    <div className="flex-1 overflow-y-auto p-6 bg-[#0A0A0A] space-y-4">
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex items-start gap-3 max-w-[80%] ${m.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              m.sender === 'user' ? 'bg-[#00d462]' : 'bg-[#111111] border border-gray-700/50'
            }`}>
              {m.sender === 'user' ? (
                <FaUser className="text-black text-sm" />
              ) : (
                <FaRobot className="text-[#00d462] text-sm" />
              )}
            </div>
            <div className={`px-4 py-3 rounded-2xl ${
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
  <div className="p-6 border-t border-gray-700/50 bg-[#0A0A0A]">
    <div className="flex items-center gap-3 bg-[#111111] border border-gray-700/50 rounded-xl p-4 focus-within:border-[#00d462]/50 transition-colors">
      <input
        type="text"
        placeholder="Type your message here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && send()}
        className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none"
      />
      <button 
        onClick={send}
        disabled={!input.trim()}
        className="p-2 bg-[#00d462] hover:bg-[#00d462]/90 text-black rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        <FaPaperPlane className="text-sm" />
      </button>
    </div>
  </div>
)

export default function ChatbotPage() {
  const categories = ['Akhtar Jamil Info', 'Financial Aid', 'Warning Policy', 'Timetable']
  const chats = ['Trip Information', 'Course Info', 'PAST']
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')

  const newChat = () => {
    setSelectedChat(null)
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
      <Sidebar
        categories={categories}
        chats={chats}
        selectedChat={selectedChat}
        onSelectChat={(c) => {
          setSelectedChat(c)
          setMessages([
            { sender: 'bot', text: `Let's continue our conversation about ${c}. What would you like to know?` }
          ])
        }}
        onNewChat={newChat}
      />

      <main className="flex-1 flex flex-col">
        {!selectedChat && messages.length === 0 ? (
          <Greeting onQuickAction={handleQuickAction} />
        ) : (
          <ChatWindow messages={messages} />
        )}

        <ChatInput input={input} setInput={setInput} send={send} />
      </main>
    </div>
  )
}