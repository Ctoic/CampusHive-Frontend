import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
	FaChevronRight,
	FaRegCalendarAlt,
	FaUniversity,
	FaMoneyBillWave,
	FaPaperPlane,
	FaRobot,
	FaUser,
	FaCopy,
	FaCheck,
	FaThumbsUp,
	FaThumbsDown,
	FaEllipsisV,
	FaDownload,
	FaSearch,
	FaTimes,
	FaMicrophone,
	FaPaperclip,
} from "react-icons/fa";

const Sidebar = ({ onNewChat, conversations, onSelectConversation, currentConversationId }) => {
	const [searchQuery, setSearchQuery] = useState("");
	
	const filteredConversations = conversations.filter(conv =>
		conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<aside className="w-64 bg-[#0D0D0D] border-r border-gray-800/40 flex flex-col">
			<div className="p-4 border-b border-gray-800/40">
				<button
					onClick={onNewChat}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] text-black font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-[#60a5fa]/20 transition-all duration-200"
				>
					<span className="text-xl">+</span>
					<span>New Chat</span>
				</button>
			</div>

			<div className="p-3">
				<div className="relative">
					<input
						type="text"
						placeholder="Search chats..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#1A1A1A] text-white text-sm py-2 pl-9 pr-3 rounded-lg border border-gray-700 focus:border-[#60a5fa] focus:outline-none transition-colors"
					/>
					<FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs" />
				</div>
			</div>

			<div className="flex-1 overflow-y-auto px-3 pb-3 space-y-2">
				<h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
					{conversations.length === 0 ? "No chat history yet" : "Recent Chats"}
				</h3>
				{filteredConversations.map((conv) => (
					<button
						key={conv.id}
						onClick={() => onSelectConversation(conv.id)}
						className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
							currentConversationId === conv.id
                                ? "bg-[#60a5fa]/10 border border-[#60a5fa]/30"
								: "hover:bg-[#1A1A1A] border border-transparent"
						}`}
					>
						<div className="flex items-start justify-between gap-2">
							<div className="flex-1 min-w-0">
								<p className="text-sm text-white font-medium truncate mb-1">
									{conv.preview}
								</p>
								<p className="text-xs text-gray-500">{conv.timestamp}</p>
							</div>
							<FaEllipsisV className="text-gray-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
						</div>
					</button>
				))}
			</div>

			<div className="p-4 border-t border-gray-800/40">
				<div className="flex items-center gap-3 p-3 bg-[#1A1A1A] rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] rounded-full flex items-center justify-center text-black font-bold">
						R
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-sm text-white font-medium truncate">reena</p>
						<p className="text-xs text-gray-500 truncate">ali@gmail.com</p>
					</div>
				</div>
			</div>
		</aside>
	);
};

const MessageActions = ({ message, onCopy, onRate }) => {
	const [copied, setCopied] = useState(false);
	const [rated, setRated] = useState(null);

	const handleCopy = () => {
		onCopy(message.text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleRate = (rating) => {
		setRated(rating);
		onRate(message.id, rating);
	};

	return (
		<div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
			<button
				onClick={handleCopy}
				className="p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors"
				title="Copy message"
			>
				{copied ? (
                    <FaCheck className="text-[#60a5fa] text-xs" />
				) : (
					<FaCopy className="text-gray-500 text-xs" />
				)}
			</button>
			{message.sender === "bot" && (
				<>
					<button
						onClick={() => handleRate("up")}
						className={`p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors ${
                            rated === "up" ? "text-[#60a5fa]" : "text-gray-500"
						}`}
						title="Helpful"
					>
						<FaThumbsUp className="text-xs" />
					</button>
					<button
						onClick={() => handleRate("down")}
						className={`p-2 hover:bg-[#2A2A2A] rounded-lg transition-colors ${
							rated === "down" ? "text-red-500" : "text-gray-500"
						}`}
						title="Not helpful"
					>
						<FaThumbsDown className="text-xs" />
					</button>
				</>
			)}
		</div>
	);
};

const ChatbotPage = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [userId, setUserId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
	const [currentConversationId, setCurrentConversationId] = useState(null);
	const [showScrollButton, setShowScrollButton] = useState(false);
	const endRef = useRef(null);
	const chatContainerRef = useRef(null);

	useEffect(() => {
		const generateUserId = () => {
			return "user_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
		};
		setUserId(generateUserId());
	}, []);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	useEffect(() => {
		const handleScroll = () => {
			if (chatContainerRef.current) {
				const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
				setShowScrollButton(scrollHeight - scrollTop - clientHeight > 200);
			}
		};

		const container = chatContainerRef.current;
		container?.addEventListener("scroll", handleScroll);
		return () => container?.removeEventListener("scroll", handleScroll);
	}, []);

	const sendMessageToAPI = async (message) => {
		try {
			const response = await fetch("http://localhost:8000/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					user_id: userId,
					message: message,
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("Error sending message to API:", error);
			throw error;
		}
	};

	const formatTimestamp = () => {
		const now = new Date();
		return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
	};

	const newChat = () => {
		if (messages.length > 0) {
			const newConversation = {
				id: Date.now().toString(),
				preview: messages[0].text.substring(0, 40) + "...",
				timestamp: formatTimestamp(),
				messages: messages,
			};
			setConversations((prev) => [newConversation, ...prev]);
		}
		setMessages([]);
		setCurrentConversationId(null);
		const generateUserId = () => {
			return "user_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now();
		};
		setUserId(generateUserId());
	};

	const selectConversation = (convId) => {
		const conversation = conversations.find((c) => c.id === convId);
		if (conversation) {
			setMessages(conversation.messages);
			setCurrentConversationId(convId);
		}
	};

	const handleQuickAction = async (action) => {
		newChat();
		const userMessage = {
			id: Date.now().toString(),
			sender: "user",
			text: action,
			timestamp: formatTimestamp(),
		};
		setMessages([userMessage]);
		setIsLoading(true);

		try {
			const apiResponse = await sendMessageToAPI(action);
			const botMessage = {
				id: (Date.now() + 1).toString(),
				sender: "bot",
				text:
					apiResponse.response ||
					`I'd be happy to help you with ${action}! Let me gather the most up-to-date information for you.`,
				isMarkdown: true,
				timestamp: formatTimestamp(),
			};
			setMessages((prev) => [...prev, botMessage]);
		} catch (error) {
			const errorMessage = {
				id: (Date.now() + 1).toString(),
				sender: "bot",
				text: `Sorry, I'm having trouble connecting to the server. Please try again later.`,
				isMarkdown: false,
				timestamp: formatTimestamp(),
				isError: true,
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	const send = async () => {
		if (!input.trim()) return;

		const userMessage = {
			id: Date.now().toString(),
			sender: "user",
			text: input,
			timestamp: formatTimestamp(),
		};
		setMessages((m) => [...m, userMessage]);
		const currentInput = input;
		setInput("");
		setIsLoading(true);

		try {
			const apiResponse = await sendMessageToAPI(currentInput);
			const botMessage = {
				id: (Date.now() + 1).toString(),
				sender: "bot",
				text:
					apiResponse.response ||
					"Thanks for your question! I'm processing your request and will provide you with accurate information.",
				isMarkdown: true,
				timestamp: formatTimestamp(),
			};
			setMessages((m) => [...m, botMessage]);
		} catch (error) {
			const errorMessage = {
				id: (Date.now() + 1).toString(),
				sender: "bot",
				text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
				isMarkdown: false,
				timestamp: formatTimestamp(),
				isError: true,
			};
			setMessages((m) => [...m, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	const handleCopy = (text) => {
		navigator.clipboard.writeText(text);
	};

	const handleRate = (messageId, rating) => {
		console.log(`Message ${messageId} rated: ${rating}`);
	};

	const scrollToBottom = () => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const markdownComponents = {
		p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
		strong: ({ children }) => (
            <strong className="text-[#60a5fa] font-semibold">{children}</strong>
		),
		em: ({ children }) => <em className="text-gray-300 italic">{children}</em>,
		ol: ({ children }) => <ol className="mb-4 space-y-2 last:mb-0 list-decimal list-inside">{children}</ol>,
		ul: ({ children }) => <ul className="mb-4 space-y-2 last:mb-0">{children}</ul>,
		li: ({ children }) => (
			<li className="flex items-start">
            <span className="text-[#60a5fa] mr-2 font-semibold">•</span>
				<span className="flex-1">{children}</span>
			</li>
		),
		h1: ({ children }) => (
            <h1 className="text-xl font-bold text-[#60a5fa] mb-3 mt-4 first:mt-0">
				{children}
			</h1>
		),
		h2: ({ children }) => (
            <h2 className="text-lg font-bold text-[#60a5fa] mb-3 mt-4 first:mt-0">
				{children}
			</h2>
		),
		h3: ({ children }) => (
            <h3 className="text-md font-semibold text-[#60a5fa] mb-2 mt-3 first:mt-0">
				{children}
			</h3>
		),
		table: ({ children }) => (
			<div className="mb-4 overflow-x-auto rounded-lg">
				<table className="min-w-full border-collapse border border-gray-600 rounded-lg overflow-hidden">
					{children}
				</table>
			</div>
		),
        thead: ({ children }) => <thead className="bg-[#60a5fa]/10">{children}</thead>,
		tbody: ({ children }) => <tbody className="bg-[#1A1A1A]/50">{children}</tbody>,
		tr: ({ children }) => (
            <tr className="border-b border-gray-600 hover:bg-[#60a5fa]/5 transition-colors">
				{children}
			</tr>
		),
		th: ({ children }) => (
            <th className="border border-gray-600 px-4 py-2 text-left font-semibold text-[#60a5fa] text-sm">
				{children}
			</th>
		),
		td: ({ children }) => (
			<td className="border border-gray-600 px-4 py-2 text-white text-sm">
				{children}
			</td>
		),
		code: ({ inline, children }) =>
			inline ? (
                <code className="bg-gray-800 text-[#60a5fa] px-1.5 py-0.5 rounded text-sm font-mono">
					{children}
				</code>
			) : (
				<pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto mb-3 border border-gray-700">
					<code className="text-gray-200 font-mono">{children}</code>
				</pre>
			),
		blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-[#60a5fa] pl-4 italic text-gray-300 mb-3 py-2">
				{children}
			</blockquote>
		),
	};

	return (
		<div className="flex bg-[#0A0A0A] h-screen overflow-hidden flex-col">
			<div className="flex items-center justify-between h-14 border-b border-gray-800/40 bg-[#121212] px-6">
				<div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#60a5fa]/20 rounded-lg flex items-center justify-center">
                        <FaRobot className="text-[#60a5fa] text-sm" />
					</div>
					<h1 className="text-white font-semibold tracking-wide text-lg">
						CampusHive AI
					</h1>
				</div>
				<div className="flex items-center gap-2">
					<button className="px-3 py-2 text-gray-400 hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-all text-sm">
						<FaDownload className="inline mr-2" />
						Export
					</button>
				</div>
			</div>

			<div className="flex flex-1 overflow-hidden">
				<Sidebar
					onNewChat={newChat}
					conversations={conversations}
					onSelectConversation={selectConversation}
					currentConversationId={currentConversationId}
				/>

				<main className="flex-1 flex flex-col relative">
					{messages.length === 0 ? (
						<div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
							<div className="max-w-4xl mx-auto text-center">
								<div className="mb-12 animate-fade-in">
                                    <div className="w-20 h-20 bg-gradient-to-br from-[#60a5fa]/20 to-[#3b82f6]/20 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-[#60a5fa]/30 shadow-lg shadow-[#60a5fa]/10 animate-pulse">
                                        <FaRobot className="text-[#60a5fa] text-3xl" />
									</div>
									<h2 className="text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
										Welcome to{" "}
                                        <span className="text-[#60a5fa] bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] bg-clip-text text-transparent">
											CampusHive AI
										</span>
									</h2>
									<p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
										Your intelligent campus companion. Get instant help with
										timetables, faculty information, academic resources, and
										everything you need for your university journey.
									</p>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
									{[
										{
											action:
												"Provide me timetable for information security cs section a ppit cs section c and pf cs section a",
											icon: FaRegCalendarAlt,
											title: "Generate Timetable",
											description:
												"Create your personalized class schedule with conflict detection",
											gradient: "from-blue-500/10 to-purple-500/10",
											iconColor: "text-blue-400",
										},
										{
											action: "What is email address of dr akhtar jamil?",
											icon: FaUniversity,
											title: "Faculty Directory",
											description:
												"Explore professor profiles, research areas, and office hours",
                                            gradient: "from-blue-500/10 to-indigo-500/10",
                                            iconColor: "text-blue-400",
										},
										{
											action: "Tell me about the scholarships available.",
											icon: FaMoneyBillWave,
											title: "Financial Aid",
											description:
												"Discover scholarships, grants, and funding opportunities",
											gradient: "from-amber-500/10 to-orange-500/10",
											iconColor: "text-amber-400",
										},
									].map((item, index) => (
										<button
											key={index}
											onClick={() => handleQuickAction(item.action)}
											disabled={isLoading}
                                            className="group bg-gradient-to-br from-[#111111] to-[#0D0D0D] border border-gray-800/50 hover:border-[#60a5fa]/30 rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#60a5fa]/10 text-left disabled:opacity-50 disabled:cursor-not-allowed transform-gpu"
										>
											<div
												className={`w-14 h-14 bg-gradient-to-br ${item.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
											>
												<item.icon className={`${item.iconColor} text-xl`} />
											</div>
                                            <h3 className="text-white text-lg font-semibold mb-2 tracking-wide group-hover:text-[#60a5fa] transition-colors">
												{item.title}
											</h3>
											<p className="text-gray-400 text-sm leading-relaxed mb-4">
												{item.description}
											</p>
                                            <div className="flex items-center text-xs text-gray-500 group-hover:text-[#60a5fa] transition-all duration-200">
												<span className="font-medium">Get started</span>
												<FaChevronRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
											</div>
										</button>
									))}
								</div>

								<div className="text-center space-y-3">
									<p className="text-gray-500 text-sm">
										Or simply type your question below to get started
									</p>
									<div className="flex items-center justify-center gap-2 text-xs text-gray-600">
										<kbd className="px-2 py-1 bg-[#1A1A1A] border border-gray-700 rounded">
											Ctrl
										</kbd>
										<span>+</span>
										<kbd className="px-2 py-1 bg-[#1A1A1A] border border-gray-700 rounded">
											K
										</kbd>
										<span className="ml-2">for new chat</span>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div
							ref={chatContainerRef}
							className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
						>
							{messages.map((m, i) => (
								<div
									key={m.id || i}
									className={`flex ${
										m.sender === "user" ? "justify-end" : "justify-start"
									} animate-fade-in`}
								>
									<div
										className={`flex gap-3 max-w-[85%] ${
											m.sender === "user" ? "flex-row-reverse" : "flex-row"
										}`}
									>
										<div
											className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
												m.sender === "user"
													? "bg-gradient-to-br from-[#60a5fa] to-[#3b82f6]"
													: "bg-gradient-to-br from-purple-500 to-pink-500"
											}`}
										>
											{m.sender === "user" ? (
												<FaUser className="text-black text-sm" />
											) : (
												<FaRobot className="text-white text-sm" />
											)}
										</div>

										<div className="flex flex-col group">
											<div
												className={`p-4 rounded-2xl shadow-lg transition-all duration-200 ${
													m.sender === "user"
														? "bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] text-black rounded-tr-md"
														: m.isError
														? "bg-red-900/20 border border-red-500/30 text-gray-100 rounded-tl-md"
														: "bg-[#1A1A1A] border border-gray-800/50 text-gray-100 rounded-tl-md hover:border-gray-700/50"
												}`}
											>
												{m.isMarkdown && m.sender === "bot" ? (
													<div className="prose prose-invert max-w-none text-gray-100">
														<ReactMarkdown
															components={markdownComponents}
															remarkPlugins={[remarkGfm]}
														>
															{m.text}
														</ReactMarkdown>
													</div>
												) : (
													<p className="text-base leading-relaxed">{m.text}</p>
												)}
											</div>

											<div className="flex items-center justify-between mt-1 px-1">
												<span className="text-xs text-gray-500">{m.timestamp}</span>
												{m.sender === "bot" && (
													<MessageActions
														message={m}
														onCopy={handleCopy}
														onRate={handleRate}
													/>
												)}
											</div>
										</div>
									</div>
								</div>
							))}

							{isLoading && (
								<div className="flex justify-start animate-fade-in">
									<div className="flex gap-3 max-w-[85%]">
										<div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
											<FaRobot className="text-white text-sm" />
										</div>
										<div className="p-4 rounded-2xl rounded-tl-md shadow-lg bg-[#1A1A1A] border border-gray-800/50 flex items-center gap-3">
											<div className="flex space-x-1">
												<div className="w-2 h-2 bg-[#60a5fa] rounded-full animate-bounce"></div>
												<div className="w-2 h-2 bg-[#60a5fa] rounded-full animate-bounce delay-100"></div>
												<div className="w-2 h-2 bg-[#60a5fa] rounded-full animate-bounce delay-200"></div>
											</div>
											<span className="text-sm text-gray-400">
												Thinking...
											</span>
										</div>
									</div>
								</div>
							)}

							<div ref={endRef} />
						</div>
					)}

					{showScrollButton && (
						<button
							onClick={scrollToBottom}
							className="absolute bottom-24 right-8 w-10 h-10 bg-[#60a5fa] hover:bg-[#3b82f6] text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-10"
						>
							<FaChevronRight className="rotate-90" />
						</button>
					)}

					<div className="border-t border-gray-800/40 bg-[#0D0D0D] p-4">
						<div className="max-w-4xl mx-auto">
							<div className="flex items-end gap-3 bg-[#1A1A1A] border border-gray-700 rounded-2xl p-3 focus-within:border-[#60a5fa] transition-all duration-200 shadow-lg">
								<button className="p-2 text-gray-400 hover:text-[#60a5fa] transition-colors rounded-lg hover:bg-[#2A2A2A]">
									<FaPaperclip className="text-lg" />
								</button>
								<textarea
									placeholder="Ask me anything about your campus experience..."
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter" && !e.shiftKey) {
											e.preventDefault();
											send();
										}
									}}
									disabled={isLoading}
									rows={1}
									className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none resize-none max-h-32 disabled:opacity-50"
									style={{ minHeight: "24px" }}
								/>
								<div className="flex items-center gap-2">
									<button className="p-2 text-gray-400 hover:text-[#60a5fa] transition-colors rounded-lg hover:bg-[#2A2A2A]">
										<FaMicrophone className="text-lg" />
									</button>
									<button
										onClick={send}
										disabled={!input.trim() || isLoading}
										className="p-3 bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] hover:from-[#3b82f6] hover:to-[#60a5fa] text-black rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-[#60a5fa]/30 hover:scale-105"
									>
										<FaPaperPlane className="text-sm" />
									</button>
								</div>
							</div>
							<p className="text-xs text-gray-600 text-center mt-2">
								Press <kbd className="px-1 py-0.5 bg-[#1A1A1A] border border-gray-700 rounded text-xs">Enter</kbd> to send, <kbd className="px-1 py-0.5 bg-[#1A1A1A] border border-gray-700 rounded text-xs">Shift+Enter</kbd> for new line
							</p>
						</div>
					</div>
				</main>
			</div>

			<style jsx>{`
				@keyframes fade-in {
					from {
						opacity: 0;
						transform: translateY(10px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				.animate-fade-in {
					animation: fade-in 0.3s ease-out;
				}
				.animate-bounce {
					animation: bounce 1.4s infinite;
				}
				.delay-100 {
					animation-delay: 0.2s;
				}
				.delay-200 {
					animation-delay: 0.4s; 
				}
				.delay-300 {
					animation-delay: 0.6s;
				}
			`}</style>
		</div>
	);
};

export default ChatbotPage;
