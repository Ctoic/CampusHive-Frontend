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
	FaPlus,
	FaSignOutAlt,
	FaUserCircle,
	FaTrash,
	FaBars,
	FaGraduationCap,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const IntegratedChatbot = () => {
	const navigate = useNavigate();
	const { user, logout } = useAuth();
	const {
		sessions,
		currentSession,
		messages,
		loading,
		error,
		loadSessions,
		createSession,
		loadSession,
		updateSession,
		deleteSession,
		sendMessage,
		clearCurrentSession,
		clearError,
	} = useChat();

	const [input, setInput] = useState("");
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const endRef = useRef(null);

	useEffect(() => {
		loadSessions();
	}, [loadSessions]);

	useEffect(() => {
		endRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

  const newChat = async () => {
    try {
      const created = await createSession("New Chat");
      if (created?.id) {
        await loadSession(created.id);
      } else {
        clearCurrentSession();
      }
    } catch (error) {
      console.error("Failed to create new chat:", error);
    }
  };

	const handleLoadSession = async (sessionId) => {
		try {
			await loadSession(sessionId);
		} catch (error) {
			console.error("Failed to load session:", error);
		}
	};

	const handleDeleteSession = async (sessionId, e) => {
		e.stopPropagation();
		try {
			await deleteSession(sessionId);
		} catch (error) {
			console.error("Failed to delete session:", error);
		}
	};

  const handleQuickAction = async (action) => {
    if (!currentSession) {
      await newChat();
    }
    await sendMessage(action);
  };

  const send = async () => {
		if (!input.trim()) return;
		const currentInput = input;
		setInput("");
		try {
      // sendMessage will auto-create a session if none is selected
      await sendMessage(currentInput);
		} catch (error) {
			console.error("Failed to send message:", error);
		}
	};

	const markdownComponents = {
		p: ({ children }) => (
			<p className="mb-3 leading-relaxed last:mb-0">{children}</p>
		),
		strong: ({ children }) => (
			<strong className="text-gray-100 font-semibold">{children}</strong>
		),
		em: ({ children }) => <em className="text-gray-700 italic">{children}</em>,
		ol: ({ children }) => (
			<ol className="mb-4 space-y-2 last:mb-0 list-decimal list-inside">{children}</ol>
		),
		ul: ({ children }) => (
			<ul className="mb-4 space-y-2 last:mb-0">{children}</ul>
		),
		li: ({ children }) => (
			<li className="flex items-start">
				<span className="text-gray-400 mr-2 font-semibold">•</span>
				<span className="flex-1">{children}</span>
			</li>
		),
		h1: ({ children }) => (
			<h1 className="text-xl font-bold text-white mb-3 mt-4 first:mt-0">
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-lg font-bold text-white mb-3 mt-4 first:mt-0">
				{children}
			</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-md font-semibold text-white mb-2 mt-3 first:mt-0">
				{children}
			</h3>
		),
		table: ({ children }) => (
			<div className="mb-4 overflow-x-auto">
				<table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
					{children}
				</table>
			</div>
		),
		thead: ({ children }) => (
			<thead className="bg-gray-200">{children}</thead>
		),
		tbody: ({ children }) => (
			<tbody className="bg-white">{children}</tbody>
		),
		tr: ({ children }) => (
			<tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
				{children}
			</tr>
		),
		th: ({ children }) => (
			<th className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-900 text-sm">
				{children}
			</th>
		),
		td: ({ children }) => (
			<td className="border border-gray-300 px-4 py-2 text-gray-800 text-sm">
				{children}
			</td>
		),
		code: ({ inline, children }) =>
			inline ? (
				<code className="bg-gray-800 text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono">
					{children}
				</code>
			) : (
				<pre className="bg-gray-900 p-3 rounded-lg text-sm overflow-x-auto mb-3">
					<code className="text-gray-100 font-mono">{children}</code>
				</pre>
			),
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-gray-700 pl-4 italic text-gray-300 mb-3">
				{children}
			</blockquote>
		),
	};

	// Determine role (frontend-only fallback): default to student
	const role = (() => {
		if (!user) return "student";
		if (typeof user.is_faculty === "boolean") {
			return user.is_faculty ? "faculty" : "student";
		}
		if (typeof user.role === "string") {
			const r = user.role.toLowerCase();
			if (r.includes("faculty") || r === "teacher" || r === "instructor") return "faculty";
			if (r.includes("student")) return "student";
		}
		if (typeof user.user_type === "string") {
			const r = user.user_type.toLowerCase();
			if (r.includes("faculty")) return "faculty";
			if (r.includes("student")) return "student";
		}
		return "student";
	})();

	// Role-based quick actions (non-breaking: student defaults)
	const quickActions = role === "faculty"
		? [
			{
				action: "Generate a quiz for Data Structures covering stacks and queues with 10 MCQs",
				icon: FaRegCalendarAlt,
				title: "Quiz Generation",
				description: "Create quizzes by topic, difficulty, and format",
				gradient: "from-white to-gray-300",
			},
			{
				action: "Map course CLOs to PLOs for CS-201 and suggest improvements",
				icon: FaRobot,
				title: "CLO / PLO Mapping",
				description: "Align course outcomes with program learning outcomes",
				gradient: "from-purple-500 to-pink-500",
			},
			{
				action: "Generate a comprehensive final exam for Operating Systems with blueprint",
				icon: FaGraduationCap,
				title: "Exam Generation",
				description: "Design balanced exams with difficulty distribution",
				gradient: "from-amber-500 to-orange-500",
			},
		]
		: [
			{
				action:
					"Provide me timetable for information security cs section a ppit cs section c and pf cs section a",
				icon: FaRegCalendarAlt,
				title: "Class Timetables",
				description: "Get your personalized schedule with automatic conflict detection",
				gradient: "from-white to-gray-300",
			},
			{
				action: "What is email address of dr akhtar jamil?",
				icon: FaUniversity,
				title: "Faculty Directory",
				description: "Find professor contact info, office hours, and research areas",
				gradient: "from-purple-500 to-pink-500",
			},
			{
				action: "Tell me about the scholarships available.",
				icon: FaMoneyBillWave,
				title: "Financial Aid",
				description: "Explore scholarships, grants, and funding opportunities",
				gradient: "from-amber-500 to-orange-500",
			},
		];

	// Student info summary (shown for student role only, uses optional fields if present)
	const StudentSummary = () => {
		if (role !== "student") return null;
		const fullName = user?.full_name || user?.name || user?.username || "Student";
		const email = user?.email;
		const rollNumber = user?.roll_no || user?.registration_no || user?.reg_no;
		const program = user?.program || user?.department || user?.degree;
		return (
			<div className="max-w-2xl mx-auto mb-10">
				<div className="bg-[#0D0D0D] border border-gray-800 rounded-2xl p-5 flex items-center gap-4">
					<div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
						<FaUser className="text-gray-200" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-white font-semibold truncate">{fullName}</p>
						<div className="flex flex-wrap gap-3 text-xs text-gray-400 mt-1">
							<span className="px-2 py-0.5 bg-[#111111] border border-gray-800 rounded">Role: Student</span>
							{email ? (
								<span className="px-2 py-0.5 bg-[#111111] border border-gray-800 rounded">{email}</span>
							) : null}
							{rollNumber ? (
								<span className="px-2 py-0.5 bg-[#111111] border border-gray-800 rounded">Roll: {rollNumber}</span>
							) : null}
							{program ? (
								<span className="px-2 py-0.5 bg-[#111111] border border-gray-800 rounded">{program}</span>
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	};

		return (
			<div className="flex bg-black h-screen overflow-hidden">
			{/* Sidebar */}
			{/* please add the*/}
			<div
				className={`${
					sidebarOpen ? "w-72" : "w-0"
				} transition-all duration-300 bg-[#0D0D0D] border-r border-gray-800 flex flex-col overflow-hidden`}
			>
				<div className="p-6">
					<div className="flex items-center gap-2">
						<img src={logo} alt="CampusHive" className="w-10 h-10" />
						<h1 className="text-white font-semibold text-xl">CampusHive</h1>
						<button
							onClick={() => setSidebarOpen(false)}
						className="ml-auto p-2 text-gray-400 hover:bg-gray-800 rounded-lg transition-colors"
							title="Collapse sidebar"
						>
							<FaBars className="text-sm rotate-180" />
						</button>
					</div>
				</div>
				{/* Sidebar Header */}
				<div className="p-4 border-b border-gray-800">
					<button
						onClick={newChat}
						className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors shadow-sm"
					>
						<FaPlus className="text-sm" />
						<span className="text-sm font-medium">New Chat</span>
					</button>
				</div>

				{/* Sessions List */}
				<div className="flex-1 overflow-y-auto p-3">
					{sessions.length === 0 ? (
						<p className="text-gray-500 text-sm text-center py-8">
							No conversations yet
						</p>
					) : (
						<div className="space-y-1">
							{sessions.map((session) => (
								<div
									key={session.id}
									onClick={() => handleLoadSession(session.id)}
								className={`group relative px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
										currentSession?.id === session.id
											? "bg-gray-800"
											: "hover:bg-gray-800"
										}`}
								>
									<div className="flex items-center justify-between gap-2">
										<div className="flex-1 min-w-0">
											<p className="text-white text-sm font-medium truncate">
												{session.display_title || session.session_name}
											</p>
											<p className="text-gray-400 text-xs mt-0.5">
												{session.message_count} messages
											</p>
										</div>
										<button
											onClick={(e) => handleDeleteSession(session.id, e)}
										className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-400 hover:bg-red-500/10 transition-all rounded"
										>
											<FaTrash className="text-xs" />
										</button>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{/* User Info - Bottom */}
				<div className="p-3 border-t border-gray-800">
						<div className="flex items-center gap-3 p-3 bg-[#111111] rounded-lg border border-gray-800">
							<div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0">
							<span className="text-white text-sm font-semibold">
								{user?.username?.charAt(0).toUpperCase() || "U"}
							</span>
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-white text-sm font-medium truncate">
								{user?.username || "User"}
							</p>
							<p className="text-gray-400 text-xs truncate">
								{user?.email || ""}
							</p>
						</div>
						<button
							onClick={handleLogout}
							className="p-1.5 text-gray-400 hover:bg-gray-700 transition-colors rounded"
							title="Logout"
						>
							<FaSignOutAlt className="text-sm" />
						</button>
					</div>
				</div>
			</div>

			<main className="flex-1 flex flex-col bg-black">
				{/* Error Display */}
				{error && (
					<div className="bg-red-50 border-b border-red-200 px-6 py-3">
						<div className="flex items-center justify-between">
							<p className="text-red-700 text-sm">{error}</p>
							<button
								onClick={clearError}
								className="text-red-500 hover:text-red-700 font-bold"
							>
								×
							</button>
						</div>
					</div>
				)}

				{/* Chat Content */}
				{messages.length === 0 ? (
					<div className="flex-1 overflow-y-auto bg-black">
						<div className="max-w-4xl mx-auto px-6 py-12">
						{/* Minimal Welcome */}
						<div className="text-center mb-10">
							<div className="inline-flex w-14 h-14 bg-gray-800 rounded-2xl items-center justify-center mb-4 shadow-lg">
								<FaGraduationCap className="text-gray-200 text-2xl" />
							</div>
							<h2 className="text-2xl font-semibold text-white">New chat</h2>
							<p className="text-gray-500 text-sm mt-2">Ask a question to get started.</p>
						</div>

						{/* Quick Actions (monochrome) */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
								{quickActions.map((item, index) => (
									<button
										key={index}
										onClick={() => handleQuickAction(item.action)}
										disabled={loading}
									className="group bg-[#111111] border border-gray-800 hover:border-gray-600 hover:shadow-md rounded-xl p-5 transition-all duration-200 text-left disabled:opacity-50 disabled:cursor-not-allowed"
									>
									<div className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center mb-3 shadow-sm`}>
										<item.icon className="text-gray-200 text-base" />
										</div>
									<h3 className="text-white text-sm font-semibold mb-1">
											{item.title}
										</h3>
									<p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
											{item.description}
										</p>
									<div className="flex items-center text-xs text-gray-400 group-hover:text-gray-200 transition-colors font-medium">
										<span>Use</span>
											<FaChevronRight className="ml-2 text-xs group-hover:translate-x-1 transition-transform" />
										</div>
									</button>
								))}
							</div>

						</div>
					</div>
				) : (
					/* Chat Messages */
					<div className="flex-1 overflow-y-auto bg-black">
						<div className="max-w-3xl mx-auto px-6 py-6 space-y-6">
							{messages.map((message, i) => (
								<div
									key={message.id || i}
									className={`flex ${
										message.message_type === "user"
											? "justify-end"
											: "justify-start"
									}`}
								>
									<div
										className={`flex items-start gap-3 max-w-[85%] ${
											message.message_type === "user"
												? "flex-row-reverse"
												: "flex-row"
										}`}
									>
										<div
											className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
										message.message_type === "user"
											? "bg-gray-800"
													: "bg-[#111111] border border-gray-800"
											}`}
										>
										{message.message_type === "user" ? (
											<FaUser className="text-gray-200 text-xs" />
											) : (
												<img src={logo} alt="CampusHive" className="w-8 h-8 rounded-full object-cover" />
											)}
										</div>
										<div
										className={`px-4 py-3 rounded-2xl ${
											message.message_type === "user"
												? "bg-[#2A2A2A] text-white border border-gray-800"
												: "bg-[#1A1A1A] text-gray-100 border border-gray-800 shadow-sm"
										}`}
										>
											{message.message_type === "agent" ? (
												<div className="text-sm prose prose-gray max-w-none">
													<ReactMarkdown
														components={markdownComponents}
														remarkPlugins={[remarkGfm]}
													>
														{message.content}
													</ReactMarkdown>
												</div>
											) : (
												<p className="text-sm leading-relaxed">
													{message.content}
												</p>
											)}
										</div>
									</div>
								</div>
							))}

							{/* Loading indicator */}
							{loading && (
								<div className="flex justify-start">
									<div className="flex items-start gap-3 max-w-[80%]">
										<div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-[#111111] border border-gray-800 shadow-sm overflow-hidden">
											<img src={logo} alt="CampusHive" className="w-8 h-8 object-cover" />
										</div>
										<div className="px-4 py-3 rounded-2xl bg-[#111111] border border-gray-800 shadow-sm">
											<div className="flex items-center gap-2">
											<div className="flex space-x-1">
												<div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
												<div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
												<div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
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

				{/* Chat Input */}
				<div className="bg-[#0D0D0D]">
					<div className="max-w-3xl mx-auto px-6 py-4">
						<div className="flex items-center gap-3 bg-[#111111] border border-gray-800 rounded-xl py-3 px-4 focus-within:border-gray-600 focus-within:ring-2 focus-within:ring-gray-800 transition-all duration-200">
							<input
								type="text"
								placeholder="Ask me anything about your campus..."
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault();
										send();
									}
								}}
								disabled={loading}
								className="flex-1 bg-transparent text-white text-sm placeholder-gray-500 focus:outline-none disabled:opacity-50"
							/>
							<button
								onClick={send}
								disabled={!input.trim() || loading}
								className="p-2.5 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 shadow-sm"
							>
								<FaPaperPlane className="text-sm" />
							</button>
						</div>
						<p className="text-center text-xs text-gray-500 mt-3">
							CampusHive AI can make mistakes. Please verify important information.
						</p>
					</div>
				</div>

				{/* Floating expand button when sidebar is closed */}
				{!sidebarOpen && (
					<button
						onClick={() => setSidebarOpen(true)}
						className="fixed left-4 bottom-5 z-20 p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-white shadow-lg transition-colors"
						title="Expand sidebar"
					>
						<FaBars className="text-base" />
					</button>
				)}
			</main>
		</div>
	);
};

export default IntegratedChatbot;