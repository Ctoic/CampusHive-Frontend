import React from "react";
import {
	FaPlus,
	FaRobot,
	FaGraduationCap,
	FaRegCalendarAlt,
	FaBookOpen,
	FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ onNewChat }) => (
	<aside className="w-80 bg-[#0F0F0F] border-r border-gray-800/50 h-screen flex flex-col">
		{/* Clean Header Section */}
		<div className="p-6 border-b border-gray-800/50">
			<div className="flex flex-col gap-4">
				{/* Logo and Title */}
				<div className="flex items-center gap-4">
					<div className="w-10 h-10 bg-[#00d462] rounded-lg flex items-center justify-center">
						<FaRobot className="text-black text-sm" />
					</div>
					<div className="flex flex-col">
						<h1 className="text-white text-lg font-semibold">
							<span className="text-[#00d462]">Campus</span>Hive
						</h1>
						<p className="text-gray-500 text-sm">AI Assistant</p>
					</div>
				</div>

				{/* Clean New Chat Button */}
				<button
					className="w-full bg-[#00d462] hover:bg-[#00d462]/90 text-black text-sm font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
					onClick={onNewChat}>
					<FaPlus className="text-xs" />
					Start New Conversation
				</button>
			</div>
		</div>

		{/* Quick Actions */}
		<div className="flex-1 p-6">
			<div className="space-y-4">
				<h3 className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-4">
					Quick Actions
				</h3>
				<div className="space-y-2">
					{[
						{
							icon: FaGraduationCap,
							label: "Academic Info",
							desc: "Courses & Programs",
						},
						{
							icon: FaRegCalendarAlt,
							label: "Timetables",
							desc: "Class Schedules",
						},
						{ icon: FaBookOpen, label: "Resources", desc: "Study Materials" },
					].map((item, index) => (
						<button
							key={index}
							className="w-full p-3 rounded-lg bg-[#1A1A1A] hover:bg-[#222222] transition-all duration-200 text-left group border border-gray-800/30 hover:border-gray-700/50">
							<div className="flex items-center gap-3">
								<div className="w-8 h-8 bg-[#00d462]/10 rounded-lg flex items-center justify-center">
									<item.icon className="text-[#00d462] text-sm" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="text-white text-sm font-medium">{item.label}</p>
									<p className="text-gray-500 text-xs">{item.desc}</p>
								</div>
							</div>
						</button>
					))}
				</div>
			</div>
		</div>

		{/* Fixed Bottom Section with Set Max Height */}
		<div className="border-t border-gray-800/50 h-[100px] max-h-[100px] flex items-center">
			<div className="p-6 w-full">
				<button className="w-full p-3 rounded-lg hover:bg-[#1A1A1A] transition-all duration-200 text-left flex items-center gap-3 group">
					<FaSignOutAlt className="text-gray-500 text-sm" />
					<span className="text-gray-500 text-sm">Sign Out</span>
				</button>
			</div>
		</div>
	</aside>
);

export default Sidebar;
