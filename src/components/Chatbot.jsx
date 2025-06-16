import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // This enables table support
import {
	FaChevronRight,
	FaRegCalendarAlt,
	FaUniversity,
	FaMoneyBillWave,
	FaPaperPlane,
	FaRobot,
	FaUser,
} from "react-icons/fa";
import Sidebar from "./Sidebar";

const ChatbotPage = () => {
	// State management
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [userId, setUserId] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const endRef = useRef(null);

	// Generate user ID when component mounts
	useEffect(() => {
		const generateUserId = () => {
			return (
				"user_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
			);
		};
		setUserId(generateUserId());
	}, []);

	// Auto-scroll to bottom when messages change
	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// API call function
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

	// Handler functions
	const newChat = () => {
		setMessages([]);
		// Generate new user ID for new chat
		const generateUserId = () => {
			return (
				"user_" + Math.random().toString(36).substr(2, 9) + "_" + Date.now()
			);
		};
		setUserId(generateUserId());
	};

	const handleQuickAction = async (action) => {
		newChat();
		const userMessage = { sender: "user", text: action };
		setMessages([userMessage]);
		setIsLoading(true);

		try {
			const apiResponse = await sendMessageToAPI(action);
			const botMessage = {
				sender: "bot",
				text:
					apiResponse.response ||
					`I'd be happy to help you with ${action}! Let me gather the most up-to-date information for you.`,
				isMarkdown: true,
			};
			setMessages((prev) => [...prev, botMessage]);
		} catch (error) {
			const errorMessage = {
				sender: "bot",
				text: `Sorry, I'm having trouble connecting to the server. Please try again later.`,
				isMarkdown: false,
			};
			setMessages((prev) => [...prev, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	const send = async () => {
		if (!input.trim()) return;

		const userMessage = { sender: "user", text: input };
		setMessages((m) => [...m, userMessage]);
		const currentInput = input;
		setInput("");
		setIsLoading(true);

		try {
			const apiResponse = await sendMessageToAPI(currentInput);
			const botMessage = {
				sender: "bot",
				text:
					apiResponse.response ||
					"Thanks for your question! I'm processing your request and will provide you with accurate information.",
				isMarkdown: true,
			};
			setMessages((m) => [...m, botMessage]);
		} catch (error) {
			const errorMessage = {
				sender: "bot",
				text: "Sorry, I'm having trouble connecting to the server. Please try again later.",
				isMarkdown: false,
			};
			setMessages((m) => [...m, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	// Custom components for react-markdown with table support
	const markdownComponents = {
		// Paragraph styling
		p: ({ children }) => (
			<p className="mb-3 leading-relaxed last:mb-0">{children}</p>
		),
		// Strong/Bold text styling
		strong: ({ children }) => (
			<strong className="text-[#00d462] font-semibold">{children}</strong>
		),
		// Emphasis/Italic text styling
		em: ({ children }) => <em className="text-gray-200 italic">{children}</em>,
		// Ordered list styling
		ol: ({ children }) => (
			<ol className="mb-4 space-y-2 last:mb-0">{children}</ol>
		),
		// Unordered list styling
		ul: ({ children }) => (
			<ul className="mb-4 space-y-2 last:mb-0">{children}</ul>
		),
		// List item styling
		li: ({ children }) => (
			<li className="flex items-start">
				<span className="text-[#00d462] mr-2 font-semibold">•</span>
				<span className="flex-1">{children}</span>
			</li>
		),
		// Heading styles
		h1: ({ children }) => (
			<h1 className="text-xl font-bold text-[#00d462] mb-3 mt-4 first:mt-0">
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-lg font-bold text-[#00d462] mb-3 mt-4 first:mt-0">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-md font-semibold text-[#00d462] mb-2 mt-3 first:mt-0">
				{children}
			</h3>
		),
		// Table styling
		table: ({ children }) => (
			<div className="mb-4 overflow-x-auto">
				<table className="min-w-full border-collapse border border-gray-600 rounded-lg overflow-hidden">
					{children}
				</table>
			</div>
		),
		thead: ({ children }) => (
			<thead className="bg-[#00d462]/10">{children}</thead>
		),
		tbody: ({ children }) => (
			<tbody className="bg-[#1A1A1A]/50">{children}</tbody>
		),
		tr: ({ children }) => (
			<tr className="border-b border-gray-600 hover:bg-[#00d462]/5 transition-colors">
				{children}
			</tr>
		),
		th: ({ children }) => (
			<th className="border border-gray-600 px-4 py-2 text-left font-semibold text-[#00d462] text-sm">
				{children}
			</th>
		),
		td: ({ children }) => (
			<td className="border border-gray-600 px-4 py-2 text-white text-sm">
				{children}
			</td>
		),
		// Code block styling
		code: ({ inline, children }) =>
			inline ? (
				<code className="bg-gray-800 text-[#00d462] px-1 py-0.5 rounded text-sm">
					{children}
				</code>
			) : (
				<pre className="bg-gray-800 p-3 rounded-lg text-sm overflow-x-auto mb-3">
					<code className="text-gray-200">{children}</code>
				</pre>
			),
		// Blockquote styling
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-[#00d462] pl-4 italic text-gray-300 mb-3">
				{children}
			</blockquote>
		),
	};

	return (
		<div className="flex bg-[#0A0A0A] h-screen overflow-hidden">
			<Sidebar onNewChat={newChat} />
			<main className="flex-1 flex flex-col">
				{/* Greeting Section */}
				{messages.length === 0 ? (
					<div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0A0A0A]">
						<div className="max-w-4xl mx-auto text-center">
							{/* Clean Welcome Message */}
							<div className="mb-12">
								<div className="w-16 h-16 bg-[#00d462]/10 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-[#00d462]/20">
									<FaRobot className="text-[#00d462] text-2xl" />
								</div>
								<h2 className="text-3xl font-bold text-white mb-4">
									Welcome to{" "}
									<span className="text-[#00d462]">CampusHive AI</span>
								</h2>
								<p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
									Your intelligent campus companion. Get instant help with
									timetables, faculty information, academic resources, and
									everything you need for your university journey.
								</p>
							</div>

							{/* Clean Quick Actions */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
								{[
									{
										action: "Generate Timetable",
										icon: FaRegCalendarAlt,
										title: "Generate Timetable",
										description:
											"Create your personalized class schedule with conflict detection",
									},
									{
										action: "Faculty Info",
										icon: FaUniversity,
										title: "Faculty Directory",
										description:
											"Explore professor profiles, research areas, and office hours",
									},
									{
										action: "Financial Aid Info",
										icon: FaMoneyBillWave,
										title: "Financial Aid",
										description:
											"Discover scholarships, grants, and funding opportunities",
									},
								].map((item, index) => (
									<button
										key={index}
										onClick={() => handleQuickAction(item.action)}
										disabled={isLoading}
										className="group bg-[#111111] border border-gray-800/50 hover:border-gray-700/50 rounded-xl p-6 transition-all duration-200 hover:bg-[#151515] text-left disabled:opacity-50 disabled:cursor-not-allowed">
										<div className="w-12 h-12 bg-[#00d462]/10 rounded-xl flex items-center justify-center mb-4">
											<item.icon className="text-[#00d462] text-lg" />
										</div>
										<h3 className="text-white text-lg font-semibold mb-2">
											{item.title}
										</h3>
										<p className="text-gray-400 text-sm leading-relaxed mb-4">
											{item.description}
										</p>
										<div className="flex items-center text-xs text-gray-500 group-hover:text-[#00d462] transition-colors">
											<span>Get started</span>
											<FaChevronRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
										</div>
									</button>
								))}
							</div>

							{/* Helper text */}
							<div className="text-center">
								<p className="text-gray-500 text-sm">
									Or simply type your question below to get started
								</p>
							</div>
						</div>
					</div>
				) : (
					/* Chat Window Section */
					<div className="flex-1 overflow-y-auto bg-[#0A0A0A]">
						{/* Clean Empty Header */}
						<div className="sticky top-0 bg-[#0A0A0A] border-b border-gray-800/50 p-6 z-10">
							{/* Keep empty for now or add minimal content */}
						</div>

						{/* Messages */}
						<div className="p-6 space-y-4">
							{messages.map((m, i) => (
								<div
									key={i}
									className={`flex ${
										m.sender === "user" ? "justify-end" : "justify-start"
									}`}>
									<div
										className={`flex items-start gap-3 max-w-[90%] ${
											m.sender === "user" ? "flex-row-reverse" : "flex-row"
										}`}>
										<div
											className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
												m.sender === "user"
													? "bg-[#00d462]"
													: "bg-[#1A1A1A] border border-gray-800/50"
											}`}>
											{m.sender === "user" ? (
												<FaUser className="text-black text-xs" />
											) : (
												<FaRobot className="text-[#00d462] text-xs" />
											)}
										</div>
										<div
											className={`px-4 py-3 rounded-xl ${
												m.sender === "user"
													? "bg-[#00d462] text-black"
													: "bg-[#1A1A1A] text-white border border-gray-800/50"
											}`}>
											{m.isMarkdown && m.sender === "bot" ? (
												<div className="text-sm prose prose-invert max-w-none">
													<ReactMarkdown
														components={markdownComponents}
														remarkPlugins={[remarkGfm]} // This enables table support
													>
														{m.text}
													</ReactMarkdown>
												</div>
											) : (
												<p className="text-sm leading-relaxed">{m.text}</p>
											)}
										</div>
									</div>
								</div>
							))}

							{/* Loading indicator */}
							{isLoading && (
								<div className="flex justify-start">
									<div className="flex items-start gap-3 max-w-[80%]">
										<div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-[#1A1A1A] border border-gray-800/50">
											<FaRobot className="text-[#00d462] text-xs" />
										</div>
										<div className="px-4 py-3 rounded-xl bg-[#1A1A1A] text-white border border-gray-800/50">
											<div className="flex items-center gap-2">
												<div className="flex space-x-1">
													<div className="w-2 h-2 bg-[#00d462] rounded-full animate-pulse"></div>
													<div className="w-2 h-2 bg-[#00d462] rounded-full animate-pulse delay-75"></div>
													<div className="w-2 h-2 bg-[#00d462] rounded-full animate-pulse delay-150"></div>
												</div>
												<span className="text-sm text-gray-400">
													Thinking...
												</span>
											</div>
										</div>
									</div>
								</div>
							)}

							<div ref={endRef} />
						</div>
					</div>
				)}

				{/* Chat Input Section */}
				<div className="border-t border-gray-800/50 bg-[#0A0A0A] h-[100px] max-h-[100px] flex items-center">
					<div className="p-6 w-full">
						<div className="max-w-4xl mx-auto">
							{/* Fixed Input with Proper Sizing and Left Alignment */}
							<div className="flex items-center gap-3 bg-[#111111] border border-gray-800/50 rounded-xl py-3 px-4 focus-within:border-[#00d462]/50 transition-all duration-200">
								<input
									type="text"
									placeholder="Ask me anything about your campus experience..."
									value={input}
									onChange={(e) => setInput(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault();
											send();
										}
									}}
									disabled={isLoading}
									className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none disabled:opacity-50"
								/>
								<button
									onClick={send}
									disabled={!input.trim() || isLoading}
									className="p-2 bg-[#00d462] hover:bg-[#00d462]/90 text-black rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0">
									<FaPaperPlane className="text-sm" />
								</button>
							</div>

							{/* Disclaimer Text */}
							<p className="text-center text-xs text-gray-500 mt-3">
								CampusHive AI can make mistakes. Consider checking important
								information.
							</p>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
};

export default ChatbotPage;
