// import React from "react";
// import { FaCubes, FaChartLine, FaWallet, FaLightbulb } from "react-icons/fa";

// const benefitList = [
// 	{
// 		icon: <FaCubes className="w-8 h-8" />,
// 		title: "Smart Information Access",
// 		description:
// 			"Students can instantly access comprehensive information about courses, faculty, publications, and degree programs through an intelligent chatbot interface.",
// 	},
// 	{
// 		icon: <FaChartLine className="w-8 h-8" />,
// 		title: "Faculty Assistant",
// 		description:
// 			"Streamline daily academic tasks with automated assistance for creating exams, managing announcements, and tracking course compliance with CLOs and PLOs.",
// 	},
// 	{
// 		icon: <FaWallet className="w-8 h-8" />,
// 		title: "Efficient Course Management",
// 		description:
// 			"Faculty can easily manage class schedules, create and distribute quizzes, and monitor student progress through an integrated platform.",
// 	},
// 	{
// 		icon: <FaLightbulb className="w-8 h-8" />,
// 		title: "Personalized Support",
// 		description:
// 			"Get instant answers to queries about university policies, course requirements, and academic resources, tailored to both student and faculty needs.",
// 	},
// ];

// export default function Benefits() {
// 	return (
// 		<section
// 			id="benefits"
// 			className="relative pb-24 pt-24 md:pb-40 md:pt-40 w-full bg-[#0A0A0A]">
// 			<div className="container mx-auto px-4 max-w-7xl">
// 				{/* Background decorative elements */}
// 				<div className="absolute inset-0 -z-10">
// 					<div className="absolute top-0 left-1/4 w-72 h-72 bg-[#00d462]/5 rounded-full blur-3xl"></div>
// 					<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00d462]/5 rounded-full blur-3xl"></div>
// 				</div>

// 				<div className="grid lg:grid-cols-5 lg:gap-16 items-start">
// 					{/* Header Section - Takes 2 columns */}
// 					<div className="lg:col-span-2 text-start space-y-8 pb-12 lg:pb-0 lg:sticky lg:top-8">
// 						<div className="space-y-6">
// 							<span className="inline-block px-4 py-2 text-sm font-medium text-[#00d462] bg-[#00d462]/10 rounded-full">
// 								BENEFITS
// 							</span>
// 							<h2 className="text-5xl font-bold lg:text-7xl tracking-tight text-white leading-tight">
// 								Why Choose Campus Hive
// 							</h2>
// 							<p className="text-xl text-gray-400 leading-relaxed">
// 								Experience a smarter way of learning and teaching with our
// 								AI-powered platform designed to enhance academic excellence and
// 								streamline educational processes.
// 							</p>
// 						</div>

// 						{/* Decorative line */}
// 						<div className="flex items-center gap-4 pt-6">
// 							<div className="h-px bg-gradient-to-r from-[#00d462] to-transparent flex-1"></div>
// 							<div className="w-2 h-2 rounded-full bg-[#00d462]"></div>
// 						</div>
// 					</div>

// 					{/* Benefits Grid - Takes 3 columns */}
// 					<div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
// 						{benefitList.map(({ icon, title, description }, index) => (
// 							<div
// 								key={title}
// 								className="group relative bg-[#111111] border border-gray-800/50 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#00d462]/10 hover:border-[#00d462]/30 p-10 min-h-[380px] flex flex-col">
// 								{/* Card background gradient overlay */}
// 								<div className="absolute inset-0 bg-gradient-to-br from-[#00d462]/5 via-transparent to-[#00d462]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

// 								{/* Animated border */}
// 								<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#00d462]/20 via-[#00d462]/20 to-[#00d462]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>

// 								<div className="relative flex-1 flex flex-col">
// 									<div className="flex justify-between items-start mb-8">
// 										<div className="relative">
// 											<div className="relative">
// 												{/* Icon background glow */}
// 												<div className="absolute inset-0 bg-[#00d462]/20 rounded-2xl blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
// 												<div className="relative bg-[#0A0A0A] p-5 rounded-2xl border border-[#00d462]/20 group-hover:border-[#00d462]/40 transition-all duration-300">
// 													<div className="text-[#00d462] group-hover:scale-110 transition-transform duration-300">
// 														{icon}
// 													</div>
// 												</div>
// 											</div>
// 										</div>

// 										{/* Animated number */}
// 										<span className="text-8xl font-bold text-gray-800/40 group-hover:text-[#00d462]/20 transition-all duration-500 group-hover:scale-110 leading-none">
// 											0{index + 1}
// 										</span>
// 									</div>

// 									<div className="flex-1 flex flex-col justify-between">
// 										<h3 className="text-2xl font-bold mb-6 text-white group-hover:text-[#00d462] transition-colors duration-300 leading-tight">
// 											{title}
// 										</h3>

// 										<div className="relative">
// 											<p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-lg mb-8">
// 												{description}
// 											</p>

// 											{/* Bottom accent line */}
// 											<div className="h-1 bg-gradient-to-r from-[#00d462]/0 via-[#00d462]/50 to-[#00d462]/0 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>

// 				{/* Bottom decorative element */}
// 				<div className="flex justify-center mt-20">
// 					<div className="flex items-center gap-3">
// 						<div className="w-3 h-3 rounded-full bg-[#00d462] animate-pulse"></div>
// 						<div className="w-12 h-px bg-gradient-to-r from-[#00d462] to-transparent"></div>
// 						<div className="w-3 h-3 rounded-full bg-[#00d462]/60 animate-pulse delay-300"></div>
// 						<div className="w-12 h-px bg-gradient-to-r from-[#00d462]/60 to-transparent"></div>
// 						<div className="w-3 h-3 rounded-full bg-[#00d462]/30 animate-pulse delay-700"></div>
// 					</div>
// 				</div>
// 			</div>
// 		</section>
// 	);
// }

import React from "react";
import { FaCubes, FaChartLine, FaWallet, FaLightbulb } from "react-icons/fa";

const benefitList = [
	{
		icon: <FaCubes className="w-8 h-8" />,
		title: "Smart Information Access",
		description:
			"Students can instantly access comprehensive information about courses, faculty, publications, and degree programs through an intelligent chatbot interface.",
	},
	{
		icon: <FaChartLine className="w-8 h-8" />,
		title: "Faculty Assistant",
		description:
			"Streamline daily academic tasks with automated assistance for creating exams, managing announcements, and tracking course compliance with CLOs and PLOs.",
	},
	{
		icon: <FaWallet className="w-8 h-8" />,
		title: "Efficient Course Management",
		description:
			"Faculty can easily manage class schedules, create and distribute quizzes, and monitor student progress through an integrated platform.",
	},
	{
		icon: <FaLightbulb className="w-8 h-8" />,
		title: "Personalized Support",
		description:
			"Get instant answers to queries about university policies, course requirements, and academic resources, tailored to both student and faculty needs.",
	},
];

export default function Benefits() {
	return (
		<section
			id="benefits"
			className="relative pb-24 pt-24 md:pb-40 md:pt-40 w-full bg-[#0A0A0A]">
			{/* Background decorative elements */}
			<div className="absolute inset-0 -z-10">
			<div className="absolute top-0 left-1/4 w-72 h-72 bg-[#60a5fa]/5 rounded-full blur-3xl"></div>
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#60a5fa]/5 rounded-full blur-3xl"></div>
			</div>

			{/* Main 5-column grid container */}
			<div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-18 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
				{/* Header Section - Takes 2 columns */}
				<div className="lg:col-span-2 flex flex-col justify-start text-start space-y-8 lg:sticky lg:top-8 lg:self-start">
					<div className="space-y-6">
					<span className="inline-block px-4 py-2 text-sm font-medium text-[#60a5fa] bg-[#60a5fa]/10 rounded-full">
							FEATURES
						</span>
						<h2 className="text-4xl font-bold lg:text-6xl xl:text-7xl tracking-tight text-white leading-tight">
							Why Choose Campus Hive
						</h2>
						<p className="text-lg lg:text-xl text-gray-400 leading-relaxed">
							Experience a smarter way of learning and teaching with our
							AI-powered platform designed to enhance academic excellence and
							streamline educational processes.
						</p>
					</div>

					{/* Decorative line */}
				<div className="flex items-center gap-4 pt-6">
					<div className="h-px bg-gradient-to-r from-[#60a5fa] to-transparent flex-1"></div>
					<div className="w-2 h-2 rounded-full bg-[#60a5fa]"></div>
					</div>
				</div>

				{/* Benefits Grid - Takes 3 columns */}
				<div className="lg:col-span-3 grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
					{benefitList.map(({ icon, title, description }, index) => (
						<div
							key={title}
						className="group relative bg-[#111111] border border-gray-800/50 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#60a5fa]/10 hover:border-[#60a5fa]/30 p-8 lg:p-10 min-h-[360px] lg:min-h-[400px] flex flex-col">
							{/* Card background gradient overlay */}
						<div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa]/5 via-transparent to-[#60a5fa]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

							{/* Animated border */}
						<div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#60a5fa]/20 via-[#60a5fa]/20 to-[#60a5fa]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>

							<div className="relative flex-1 flex flex-col">
								<div className="flex justify-between items-start mb-6 lg:mb-8">
									<div className="relative">
										<div className="relative">
											{/* Icon background glow */}
								<div className="absolute inset-0 bg-[#60a5fa]/20 rounded-2xl blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
								<div className="relative bg-[#0A0A0A] p-4 lg:p-5 rounded-2xl border border-[#60a5fa]/20 group-hover:border-[#60a5fa]/40 transition-all duration-300">
									<div className="text-[#60a5fa] group-hover:scale-110 transition-transform duration-300">
													{icon}
												</div>
											</div>
										</div>
									</div>

									{/* Animated number */}
						<span className="text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-800/40 group-hover:text-[#60a5fa]/20 transition-all duration-500 group-hover:scale-110 leading-none">
										0{index + 1}
									</span>
								</div>

								<div className="flex-1 flex flex-col justify-between">
						<h3 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6 text-white group-hover:text-[#60a5fa] transition-colors duration-300 leading-tight">
										{title}
									</h3>

									<div className="relative">
										<p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-base lg:text-lg mb-6 lg:mb-8">
											{description}
										</p>

										{/* Bottom accent line */}
						<div className="h-1 bg-gradient-to-r from-[#60a5fa]/0 via-[#60a5fa]/50 to-[#60a5fa]/0 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Bottom decorative element */}
			<div className="flex justify-center mt-16 lg:mt-20 px-4">
				<div className="flex items-center gap-3">
					<div className="w-3 h-3 rounded-full bg-[#60a5fa] animate-pulse"></div>
					<div className="w-12 h-px bg-gradient-to-r from-[#60a5fa] to-transparent"></div>
					<div className="w-3 h-3 rounded-full bg-[#60a5fa]/60 animate-pulse delay-300"></div>
					<div className="w-12 h-px bg-gradient-to-r from-[#60a5fa]/60 to-transparent"></div>
					<div className="w-3 h-3 rounded-full bg-[#60a5fa]/30 animate-pulse delay-700"></div>
				</div>
			</div>
		</section>
	);
}
