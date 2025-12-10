import React from "react";

const highlights = [
	{ label: "Campuses", value: "12+", detail: "Pilots across departments and faculties" },
	{ label: "Questions answered", value: "180k", detail: "Realtime support for students & faculty" },
	{ label: "Automations", value: "40+", detail: "From scheduling to assessments" },
	{ label: "Satisfaction", value: "98%", detail: "CSAT across last 10k sessions" },
];

const pillars = [
	{
		title: "Human-first AI",
		desc: "Assistive, transparent workflows that keep faculty and students in control.",
	},
	{
		title: "Trust & security",
		desc: "Role-aware access, audit trails, and privacy-by-default for academic data.",
	},
	{
		title: "Speed at scale",
		desc: "Optimized retrieval and caching so answers stay instant, even at peak usage.",
	},
	{
		title: "Partnership mindset",
		desc: "We co-design with campuses to fit accreditation, policies, and culture.",
	},
];

const milestones = [
	{
		year: "2023",
		title: "Prototype",
		body: "Launched our first faculty assistant that automated announcements and quizzes.",
	},
	{
		year: "2024",
		title: "Campus-wide rollout",
		body: "Expanded to student services with timetable planning, research discovery, and compliance checks.",
	},
	{
		year: "Today",
		title: "Multi-agent platform",
		body: "Purpose-built agents for teaching, learning, accreditation, and operations—continuously improved with partner campuses.",
	},
];

const AboutPage = () => {
	return (
		<div className="relative min-h-screen bg-[#0A0A0A] text-gray-200 overflow-hidden">
			{/* Background glows */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-10 top-10 h-72 w-72 rounded-full bg-[#60a5fa]/10 blur-3xl"></div>
				<div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#3b82f6]/10 blur-3xl"></div>
			</div>

			<main className="relative z-10">
				<section className="max-w-6xl mx-auto px-4 sm:px-8 pt-32 pb-16">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div className="space-y-6">
							<span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#60a5fa]/10 border border-[#60a5fa]/30 text-[#60a5fa] text-xs font-semibold tracking-widest">
								ABOUT CAMPUSHIVE
							</span>
							<h1 className="text-4xl sm:text-5xl font-bold leading-tight text-white">
								Building the AI assistant your campus can trust
							</h1>
							<p className="text-lg text-gray-400 leading-relaxed">
								CampusHive brings purpose-built agents to faculty and students so every class, timetable, and accreditation task moves faster—with transparency, security, and measurable outcomes.
							</p>
							<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
								{highlights.map((item) => (
									<div
										key={item.label}
										className="rounded-xl border border-gray-800 bg-[#0F1012] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
										<div className="text-2xl font-bold text-white">{item.value}</div>
										<div className="text-xs uppercase tracking-wide text-gray-500 mt-1">
											{item.label}
										</div>
										<p className="text-[11px] text-gray-500 mt-1 leading-snug">{item.detail}</p>
									</div>
								))}
							</div>
						</div>

						<div className="relative">
							<div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-[#60a5fa]/20 via-transparent to-[#3b82f6]/10 blur-3xl"></div>
							<div className="relative rounded-3xl bg-[#0F0F10] border border-gray-800 shadow-2xl overflow-hidden">
								<div className="px-6 py-5 border-b border-gray-800/60 flex items-center gap-3">
									<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] flex items-center justify-center text-black font-semibold">
										AI
									</div>
									<div>
										<p className="text-sm text-gray-400">Multi-agent workspace</p>
										<p className="text-base font-semibold text-white">Faculty + Student Assist</p>
									</div>
								</div>
								<div className="p-6 space-y-4">
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 rounded-full bg-[#60a5fa] mt-2"></div>
										<div>
											<p className="text-sm text-gray-400">Real-time guidance</p>
											<p className="text-white font-medium">Policy-aware answers for every course and department.</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 rounded-full bg-[#60a5fa] mt-2"></div>
										<div>
											<p className="text-sm text-gray-400">Automated reporting</p>
											<p className="text-white font-medium">CLO/PLO alignment, accreditation evidence, and analytics.</p>
										</div>
									</div>
									<div className="flex items-start gap-3">
										<div className="w-2 h-2 rounded-full bg-[#60a5fa] mt-2"></div>
										<div>
											<p className="text-sm text-gray-400">Secure by default</p>
											<p className="text-white font-medium">Role-based access, data isolation, and auditability.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
					<div className="rounded-3xl border border-gray-800 bg-[#0F0F10]/70 px-6 sm:px-10 py-10 shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
						<div className="grid lg:grid-cols-2 gap-12 items-start">
							<div className="space-y-4">
								<h2 className="text-3xl font-semibold text-white">Our Pillars</h2>
								<p className="text-gray-400 leading-relaxed">
									Every feature we ship is anchored on these principles, co-developed with our partner campuses.
								</p>
								<div className="grid sm:grid-cols-2 gap-4">
									{pillars.map((pillar) => (
										<div key={pillar.title} className="rounded-2xl border border-gray-800 bg-[#0C0C0D] p-4">
											<h3 className="text-white font-semibold mb-1">{pillar.title}</h3>
											<p className="text-sm text-gray-500 leading-relaxed">{pillar.desc}</p>
										</div>
									))}
								</div>
							</div>
							<div className="space-y-6">
								<h3 className="text-xl font-semibold text-white">How we got here</h3>
								<div className="space-y-4">
									{milestones.map((item, index) => (
										<div key={item.year} className="flex gap-4 items-start">
											<div className="flex flex-col items-center">
												<div className="w-12 h-12 rounded-full bg-[#111213] border border-gray-800 flex items-center justify-center text-[#60a5fa] font-semibold">
													{item.year}
												</div>
												{index < milestones.length - 1 && (
													<div className="w-px flex-1 bg-gradient-to-b from-[#60a5fa]/30 to-transparent"></div>
												)}
											</div>
											<div className="flex-1">
												<p className="text-sm text-gray-400">{item.title}</p>
												<p className="text-white font-medium leading-relaxed">{item.body}</p>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
};

export default AboutPage;
