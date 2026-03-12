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
	FaTrash,
	FaBars,
	FaExclamationTriangle,
	FaSync,
	FaClipboard,
	FaGraduationCap,
	FaTimes,
	FaMagic,
	FaBookOpen,
	FaClock,
	FaRegCopy,
} from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "./IntegratedChatbot.css";

const formatRelativeTime = (value) => {
	if (!value) return "";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	const diffMs = Date.now() - date.getTime();
	const diffMinutes = Math.round(diffMs / 60000);
	if (diffMinutes < 1) return "Just now";
	if (diffMinutes < 60) return `${diffMinutes}m ago`;
	const diffHours = Math.round(diffMinutes / 60);
	if (diffHours < 24) return `${diffHours}h ago`;
	return date.toLocaleDateString([], { month: "short", day: "numeric" });
};

const formatClockTime = (value) => {
	if (!value) return "";
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

const getSessionPreview = (session) => {
	if (!session) return "Ready for a new question";
	if (session.display_title && session.display_title !== session.session_name) {
		return session.display_title;
	}
	return session.session_name || "New Chat";
};

const IntegratedChatbot = () => {
	// Component for integrated chatbot interface
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
		deleteSession,
		sendMessage,
		clearError,
	} = useChat();

	const [input, setInput] = useState("");
	const [showErrorDetails, setShowErrorDetails] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const lastActionRef = useRef("");
	const textareaRef = useRef(null);
	const threadRef = useRef(null);

	useEffect(() => {
		loadSessions();
	}, [loadSessions]);

	useEffect(() => {
		if (!threadRef.current) return;
		threadRef.current.scrollTo({
			top: threadRef.current.scrollHeight,
			behavior: "smooth",
		});
	}, [messages]);

	useEffect(() => {
		const html = document.documentElement;
		const body = document.body;
		const root = document.getElementById("root");

		const previous = {
			htmlOverflow: html.style.overflow,
			htmlHeight: html.style.height,
			bodyOverflow: body.style.overflow,
			bodyHeight: body.style.height,
			rootHeight: root?.style.height || "",
		};

		window.scrollTo(0, 0);
		html.style.overflow = "hidden";
		html.style.height = "100%";
		body.style.overflow = "hidden";
		body.style.height = "100%";
		if (root) {
			root.style.height = "100%";
		}

		return () => {
			html.style.overflow = previous.htmlOverflow;
			html.style.height = previous.htmlHeight;
			body.style.overflow = previous.bodyOverflow;
			body.style.height = previous.bodyHeight;
			if (root) {
				root.style.height = previous.rootHeight;
			}
		};
	}, []);

	useEffect(() => {
		if (!textareaRef.current) return;
		textareaRef.current.style.height = "0px";
		textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
	}, [input]);

	const handleLogout = async () => {
		await logout();
		navigate("/");
	};

	const ensureActiveSession = async () => {
		if (currentSession?.id) return currentSession.id;
		const created = await createSession("New Chat");
		if (!created?.id) {
			throw new Error("Failed to create a new chat session");
		}
		await loadSession(created.id);
		return created.id;
	};

	const newChat = async () => {
		try {
			const created = await createSession("New Chat");
			if (created?.id) {
				await loadSession(created.id);
				setSidebarOpen(false);
			}
		} catch (error) {
			console.error("Failed to create new chat:", error);
		}
	};

	const handleLoadSession = async (sessionId) => {
		try {
			await loadSession(sessionId);
			setSidebarOpen(false);
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
		try {
			lastActionRef.current = action;
			const sessionId = await ensureActiveSession();
			await sendMessage(action, sessionId);
		} catch (error) {
			console.error("Failed to handle quick action:", error);
		}
	};

	const send = async () => {
		if (!input.trim()) return;
		const currentInput = input;
		setInput("");
		try {
			lastActionRef.current = currentInput;
			const sessionId = await ensureActiveSession();
			await sendMessage(currentInput, sessionId);
		} catch (error) {
			console.error("Failed to send message:", error);
		}
	};

	const copyErrorDetails = async () => {
		if (!error) return;
		try {
			await navigator.clipboard.writeText(String(error));
		} catch (_) {
			// no-op
		}
	};

	const retryLastAction = async () => {
		const last = lastActionRef.current?.trim();
		if (!last) {
			clearError();
			return;
		}
		try {
			const sessionId = await ensureActiveSession();
			await sendMessage(last, sessionId);
			clearError();
		} catch (err) {
			console.error("Retry failed:", err);
		}
	};

	const copyMessage = async (text) => {
		if (!text) return;
		try {
			await navigator.clipboard.writeText(text);
		} catch (_) {
			// no-op
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
			<div className="chatbot-panel rounded-[28px] p-6">
				<p className="mb-4 text-xs uppercase tracking-[0.22em] text-slate-400">Student Snapshot</p>
				<div className="flex items-center gap-4 rounded-3xl border border-white/8 bg-white/[0.03] p-4">
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-100">
						<FaUser className="text-base" />
					</div>
					<div className="flex-1 min-w-0">
						<p className="truncate font-semibold text-white">{fullName}</p>
						<div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-300">
							<span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">Role: Student</span>
							{email ? (
								<span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">{email}</span>
							) : null}
							{rollNumber ? (
								<span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">Roll: {rollNumber}</span>
							) : null}
							{program ? (
								<span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">{program}</span>
							) : null}
						</div>
					</div>
				</div>
			</div>
		);
	};

	const showTyping =
		loading && (messages.length === 0 || messages[messages.length - 1]?.message_type === "user");
	const hasMessages = messages.length > 0;

	const experienceCards = role === "faculty"
		? [
			{
				icon: FaGraduationCap,
				title: "Assessment Studio",
				description: "Build quizzes, exams, and rubrics with the right academic tone.",
			},
			{
				icon: FaBookOpen,
				title: "Course Alignment",
				description: "Map CLOs, PLOs, and content coverage without manual bookkeeping.",
			},
			{
				icon: FaClock,
				title: "Teaching Workflow",
				description: "Draft plans, summarize course material, and answer student-facing queries.",
			},
		]
		: [
			{
				icon: FaRegCalendarAlt,
				title: "Weekly Planner",
				description: "Build class schedules by course and section, then spot timing clashes quickly.",
			},
			{
				icon: FaUniversity,
				title: "Campus Knowledge",
				description: "Get grounded answers about faculty, admissions, scholarships, and policies.",
			},
			{
				icon: FaMagic,
				title: "Smart Follow-ups",
				description: "Ask natural follow-ups like 'Monday only' or 'compare the two options'.",
			},
		];

	const followUpPrompts = role === "faculty"
		? [
			"Generate a rubric for my operating systems presentation",
			"Summarize CLO coverage for this week",
			"Draft a short quiz announcement for LMS",
		]
		: [
			"Show Monday only",
			"Find faculty contact details",
			"Explain scholarship options",
		];

	const activeTitle = currentSession?.display_title || currentSession?.session_name || "Campus assistant";
	const activeSubtitle =
		hasMessages
			? role === "faculty"
				? "Focused academic thread"
				: "Focused campus conversation"
			: role === "faculty"
				? "Assessment planning, course support, and academic tooling"
				: "Schedules, faculty lookup, scholarships, and campus guidance";

	return (
		<div className="chatbot-shell fixed inset-0 flex overflow-hidden bg-[#07111f] text-white">
			<div className={`chatbot-overlay ${sidebarOpen ? "chatbot-overlay--open" : ""}`} onClick={() => setSidebarOpen(false)} />
			{/* Sidebar */}
			<aside className={`chatbot-sidebar ${sidebarOpen ? "chatbot-sidebar--open" : ""} flex h-full w-80 flex-col overflow-hidden`}>
				<div className="border-b border-white/10 px-5 pb-4 pt-4">
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="chatbot-brand-mark">
								<img src={logo} alt="CampusHive" className="h-11 w-11 rounded-2xl object-cover" />
							</div>
							<div>
								<p className="font-semibold tracking-wide text-white">CampusHive</p>
								<p className="text-xs text-slate-300/80">Academic copilot</p>
							</div>
						</div>
						<button
							onClick={() => setSidebarOpen(false)}
							className="chatbot-mobile-close rounded-full p-2 text-slate-300 hover:bg-white/10"
							type="button"
						>
							<FaTimes className="text-sm" />
						</button>
					</div>
					<div className="chatbot-sidebar-card rounded-3xl p-4">
						{hasMessages ? (
							<>
								<p className="text-[11px] uppercase tracking-[0.24em] text-cyan-200/70">Thread active</p>
								<p className="mt-2 text-sm leading-6 text-slate-300">
									Recent timetable and chat context are active for this conversation.
								</p>
							</>
						) : (
							<>
								<p className="text-[11px] uppercase tracking-[0.24em] text-cyan-200/70">Workspace ready</p>
								<h1 className="mb-1 mt-2 text-xl font-semibold text-white">Ask with context</h1>
								<p className="text-sm leading-relaxed text-slate-300">
									Use sections, days, or follow-ups. The assistant keeps your recent timetable context in view.
								</p>
							</>
						)}
					</div>
				</div>
				<div className="border-b border-white/10 p-4">
					<button
						onClick={newChat}
						className="chatbot-primary-button w-full justify-center gap-2 px-4 py-3 text-sm font-medium"
					>
						<FaPlus className="text-sm" />
						<span>New Conversation</span>
					</button>
				</div>

				{/* Sessions List */}
				<div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
					<div className="mb-3 px-2">
						<p className="text-xs uppercase tracking-[0.2em] text-slate-400">Recent Threads</p>
					</div>
					{sessions.length === 0 ? (
						<p className="py-8 text-center text-sm text-slate-400">
							No conversations yet
						</p>
					) : (
						<div className="space-y-2">
							{sessions.map((session) => (
								<div
									key={session.id}
									onClick={() => handleLoadSession(session.id)}
									className={`group relative cursor-pointer rounded-2xl border px-4 py-3 transition-all ${
										currentSession?.id === session.id
											? "border-cyan-400/40 bg-cyan-500/10 shadow-[0_8px_30px_rgba(34,211,238,0.08)]"
											: "border-white/5 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.05]"
										}`}
								>
									<div className="flex items-start justify-between gap-3">
										<div className="flex-1 min-w-0">
											<p className="truncate text-sm font-medium text-white">
												{session.display_title || session.session_name}
											</p>
											<p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400">
												{getSessionPreview(session)}
											</p>
											<div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
												<span>{session.message_count} messages</span>
												<span className="h-1 w-1 rounded-full bg-slate-600" />
												<span>{formatRelativeTime(session.updated_at || session.created_at)}</span>
											</div>
										</div>
										<button
											onClick={(e) => handleDeleteSession(session.id, e)}
											className="rounded-full p-2 text-slate-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-500/10 hover:text-red-300"
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
				<div className="border-t border-white/10 p-3">
					<div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3">
						<div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10">
							<span className="text-white text-sm font-semibold">
								{user?.username?.charAt(0).toUpperCase() || "U"}
							</span>
						</div>
						<div className="flex-1 min-w-0">
							<p className="truncate text-sm font-medium text-white">
								{user?.username || "User"}
							</p>
							<p className="truncate text-xs text-slate-400">
								{user?.email || ""}
							</p>
						</div>
						<button
							onClick={handleLogout}
							className="rounded-full p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
							title="Logout"
						>
							<FaSignOutAlt className="text-sm" />
						</button>
					</div>
				</div>
			</aside>

				<main className="chatbot-main relative flex min-h-0 flex-1 flex-col overflow-hidden">
				<div className="chatbot-main-bg" />
				<header className="relative z-10 border-b border-white/10 bg-slate-950/55 px-4 py-4 backdrop-blur-xl md:px-6">
					<div className="mx-auto flex max-w-6xl items-center gap-3">
						<button
							type="button"
							onClick={() => setSidebarOpen(true)}
							className="chatbot-mobile-toggle rounded-2xl border border-white/10 bg-white/[0.06] p-3 text-slate-200 hover:bg-white/[0.1]"
						>
							<FaBars className="text-sm" />
						</button>
						<div className="min-w-0 flex-1">
							<div className="flex items-center gap-3">
								<h2 className="truncate text-lg font-semibold text-white md:text-xl">{activeTitle}</h2>
								<span className="hidden rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-100 md:inline-flex">
									{role === "faculty" ? "Faculty Mode" : "Student Mode"}
								</span>
							</div>
							<p className="mt-1 truncate text-sm text-slate-400">{activeSubtitle}</p>
						</div>
						<div className="hidden items-center gap-2 lg:flex">
							<div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-slate-300">
								{sessions.length} saved threads
							</div>
							<div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-200">
								Knowledge connected
							</div>
						</div>
					</div>
				</header>

			{/* Error Display */}
			{error && (
				<div className="relative z-10 border-b border-red-900/40 bg-red-950/80 px-6 py-4 backdrop-blur">
					<div className="max-w-4xl mx-auto">
						<div className="flex items-start gap-3">
							<div className="mt-0.5">
								<FaExclamationTriangle className="text-red-400" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="text-red-200 text-sm font-semibold">Something went wrong</p>
								<p className="text-red-300/90 text-xs mt-1 truncate">
									{typeof error === "string" ? error : "An unexpected error occurred."}
								</p>
								{showErrorDetails && (
									<pre className="mt-3 text-[11px] leading-relaxed text-red-200/90 bg-red-900/30 border border-red-900/40 rounded-lg p-3 whitespace-pre-wrap break-words">
										{String(error)}
									</pre>
								)}
								<div className="mt-3 flex flex-wrap gap-2">
									<button
										onClick={() => setShowErrorDetails((v) => !v)}
										className="px-3 py-1.5 text-xs rounded-md border border-red-800/60 text-red-200 hover:bg-red-900/30"
									>
										{showErrorDetails ? "Hide details" : "Show details"}
									</button>
									<button
										onClick={copyErrorDetails}
										className="px-3 py-1.5 text-xs rounded-md border border-red-800/60 text-red-200 hover:bg-red-900/30 inline-flex items-center gap-1"
									>
										<FaClipboard className="text-[10px]" /> Copy details
									</button>
									<button
										onClick={retryLastAction}
										className="px-3 py-1.5 text-xs rounded-md bg-red-700 hover:bg-red-600 text-white inline-flex items-center gap-1"
										disabled={loading}
									>
										<FaSync className="text-[10px]" /> Retry last action
									</button>
									<button
										onClick={clearError}
										className="px-3 py-1.5 text-xs rounded-md text-red-200 hover:text-white"
									>
										Dismiss
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}

				{/* Chat Content */}
				{messages.length === 0 ? (
					<div className="relative z-10 flex-1 overflow-y-auto">
						<div className="mx-auto max-w-6xl px-6 py-10">
							<div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
								<div>
									<div className="chatbot-hero-card mb-8 rounded-[32px] p-8">
										<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs uppercase tracking-[0.26em] text-cyan-100">
											<FaMagic className="text-[10px]" />
											Campus support workspace
										</div>
										<div className="mb-4 flex h-16 w-16 items-center justify-center rounded-[24px] bg-white/10 shadow-[0_10px_30px_rgba(14,165,233,0.15)]">
											<FaGraduationCap className="text-3xl text-cyan-100" />
										</div>
										<h2 className="mb-3 text-4xl font-semibold tracking-tight text-white">
											Ask sharper questions, get cleaner answers.
										</h2>
										<p className="max-w-2xl text-base leading-7 text-slate-300">
											Use CampusHive for schedules, faculty lookup, policies, and academic guidance. The interface now supports follow-up prompts, recent context, and faster access to the most common campus tasks.
										</p>
										<div className="mt-8 flex flex-wrap gap-3">
											{followUpPrompts.map((prompt) => (
												<button
													key={prompt}
													type="button"
													onClick={() => handleQuickAction(prompt)}
													disabled={loading}
													className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-400/10 disabled:opacity-50"
												>
													{prompt}
												</button>
											))}
										</div>
									</div>

									<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
										{quickActions.map((item, index) => (
											<button
												key={index}
												onClick={() => handleQuickAction(item.action)}
												disabled={loading}
												className="chatbot-action-card group rounded-[28px] p-5 text-left disabled:opacity-50 disabled:cursor-not-allowed"
											>
												<div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
													<item.icon className="text-base text-cyan-100" />
												</div>
												<h3 className="mb-2 text-base font-semibold text-white">
													{item.title}
												</h3>
												<p className="mb-4 text-sm leading-6 text-slate-300">
													{item.description}
												</p>
												<div className="flex items-center text-xs font-medium uppercase tracking-[0.18em] text-cyan-100/90">
													Run prompt
													<FaChevronRight className="ml-2 text-xs transition-transform group-hover:translate-x-1" />
												</div>
											</button>
										))}
									</div>
								</div>

								<div className="space-y-4">
									<div className="chatbot-panel rounded-[28px] p-6">
										<p className="mb-4 text-xs uppercase tracking-[0.22em] text-slate-400">What Changed</p>
										<div className="space-y-4">
											{experienceCards.map((card) => (
												<div key={card.title} className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
													<div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-100">
														<card.icon className="text-base" />
													</div>
													<h3 className="mb-1 text-sm font-semibold text-white">{card.title}</h3>
													<p className="text-sm leading-6 text-slate-300">{card.description}</p>
												</div>
											))}
										</div>
									</div>

									<StudentSummary />
								</div>
							</div>
						</div>
					</div>
				) : (
					/* Chat Messages */
					<div className="chatbot-thread relative z-10 flex-1 overflow-y-auto">
						<div ref={threadRef} className="mx-auto h-full max-w-4xl overflow-y-auto px-4 pb-8 pt-6 md:px-6">
							<div className="mb-6 flex items-center justify-between gap-4 border-b border-white/6 pb-4">
								<div>
									<p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">Live thread</p>
									<p className="mt-1 text-sm text-slate-300">
										{currentSession?.display_title || currentSession?.session_name || "Current conversation"}
									</p>
								</div>
								<div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-400 md:inline-flex">
									{messages.length} message{messages.length === 1 ? "" : "s"}
								</div>
							</div>
							<div className="space-y-6">
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
											className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl shadow-sm ${
										message.message_type === "user"
											? "bg-cyan-500/20 border border-cyan-400/20"
													: "bg-white/[0.07] border border-white/10"
											}`}
										>
										{message.message_type === "user" ? (
											<FaUser className="text-cyan-100 text-sm" />
											) : (
												<img src={logo} alt="CampusHive" className="h-10 w-10 rounded-2xl object-cover" />
											)}
										</div>
										<div
										className={`message-card px-5 py-4 rounded-[24px] ${
											message.message_type === "user"
												? "bg-[linear-gradient(135deg,rgba(8,47,73,0.88),rgba(16,65,109,0.88))] text-white border border-cyan-400/15"
												: "bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(10,16,30,0.92))] text-gray-100 border border-white/10 shadow-sm"
										}`}
										>
											<div className="mb-3 flex items-center justify-between gap-4">
												<div>
													<p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400/80">
														{message.message_type === "user" ? "You" : "CampusHive"}
													</p>
													<p className="mt-1 text-[11px] text-slate-500">
														{formatClockTime(message.created_at)}
													</p>
												</div>
												{message.message_type === "agent" && message.content ? (
													<button
														type="button"
														onClick={() => copyMessage(message.content)}
														className="rounded-full border border-white/10 bg-white/[0.04] p-2 text-slate-400 transition hover:bg-white/[0.08] hover:text-white"
														title="Copy response"
													>
														<FaRegCopy className="text-xs" />
													</button>
												) : null}
											</div>
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
							{showTyping && (
								<div className="flex justify-start">
									<div className="flex items-start gap-3 max-w-[80%]">
										<div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] shadow-sm">
											<img src={logo} alt="CampusHive" className="h-10 w-10 object-cover" />
										</div>
										<div className="message-card rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(10,16,30,0.92))] px-5 py-4 shadow-sm">
											<div className="flex items-center gap-2">
											<div className="flex space-x-1">
												<div className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></div>
												<div className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse delay-75"></div>
												<div className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse delay-150"></div>
												</div>
												<span className="text-sm text-slate-300">
													Thinking through your request...
												</span>
											</div>
										</div>
									</div>
								</div>
							)}
							</div>
						</div>
					</div>
				)}

				{/* Chat Input */}
				<div className="relative z-10 shrink-0 border-t border-white/10 bg-slate-950/65 backdrop-blur-xl">
					<div className="mx-auto max-w-4xl px-4 py-4 md:px-6">
						<div className={`chatbot-composer rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.9),rgba(7,12,24,0.94))] p-3 shadow-[0_20px_60px_rgba(2,6,23,0.45)] ${hasMessages ? "chatbot-composer--compact" : ""}`}>
							{!hasMessages ? (
								<div className="mb-3 flex flex-wrap gap-2 px-1">
									{quickActions.map((item) => (
										<button
											key={item.title}
											type="button"
											onClick={() => handleQuickAction(item.action)}
											disabled={loading}
											className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300 transition hover:border-cyan-300/30 hover:bg-cyan-400/10 disabled:opacity-50"
										>
											{item.title}
										</button>
									))}
								</div>
							) : null}
							<div className="flex items-end gap-3">
								<textarea
									ref={textareaRef}
									rows={1}
									placeholder={role === "faculty" ? "Ask about exams, CLOs, outcomes, or course planning..." : "Ask about timetables, faculty, scholarships, or campus info..."}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										send();
									}
								}}
								disabled={loading}
									className="min-h-[52px] max-h-[180px] flex-1 resize-none bg-transparent px-3 py-2 text-sm leading-6 text-white placeholder:text-slate-500 focus:outline-none disabled:opacity-50"
							/>
							<button
								onClick={send}
								disabled={!input.trim() || loading}
									className="chatbot-primary-button flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl p-0 disabled:cursor-not-allowed disabled:opacity-50"
							>
									<FaPaperPlane className="text-sm" />
							</button>
							</div>
							<div className="mt-3 flex items-center justify-between px-2 text-[11px] text-slate-500">
								<p>{hasMessages ? "Continue the thread or ask a follow-up." : "Press Enter to send. Use Shift + Enter for a new line."}</p>
								<p>{input.trim().length} characters</p>
							</div>
						</div>
						<p className="mt-3 text-center text-xs text-slate-500">
							CampusHive AI can make mistakes. Please verify important information.
						</p>
					</div>
				</div>

			</main>
		</div>
	);
};

export default IntegratedChatbot;
