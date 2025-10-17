// import { useInView } from 'react-intersection-observer'
// import { Link as RouterLink } from 'react-router-dom'
// import './Hero.css'

// const Hero = () => {
//   const [badgeRef, badgeInView] = useInView({ triggerOnce: true, threshold: 0.1 })
//   const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
//   const [subtitleRef, subtitleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
//   const [buttonRef, buttonInView] = useInView({ triggerOnce: true, threshold: 0.1 })
//   const [visualRef, visualInView] = useInView({ triggerOnce: true, threshold: 0.1 })

//   return (
//     <section className="hero">
//       {/* Background Elements */}
//       <div className="hero-background">
//         {/* Gradient Mesh */}
//         <div className="gradient-mesh"></div>

//         {/* Animated Shapes */}
//         <div className="floating-shape shape-1"></div>
//         <div className="floating-shape shape-2"></div>
//       </div>

//       {/* Content Container */}
//       <div className="hero-container">
//         {/* Main Grid */}
//         <div className="hero-grid">
//           {/* Left Column - Text Content */}
//           <div className="hero-text">
//             {/* Badge */}
//             <div
//               ref={badgeRef}
//               className={`hero-badge ${badgeInView ? 'visible' : ''}`}
//             >
//               <div className="badge-content">
//                 <div className="badge-dot"></div>
//                 <span className="badge-text">SMART CAMPUS SOLUTION</span>
//               </div>
//             </div>

//             {/* Main Title */}
//             <div
//               ref={titleRef}
//               className={`hero-title-container ${titleInView ? 'visible' : ''}`}
//             >
//               <h1 className="hero-title">
//                 <span className="gradient-text">CampusHive</span>
//                 <span className="title-subtitle">Intelligent Campus Agents</span>
//               </h1>
//             </div>

//             {/* Description */}
//             <p
//               ref={subtitleRef}
//               className={`hero-description ${subtitleInView ? 'visible' : ''}`}
//             >
//               Empowering FAST University's Students and Faculty with AI-powered campus automation.
//               Streamline announcements, quizzes, timetables, compliance checks and more—all from one intelligent interface.
//             </p>

//             {/* CTA Section */}
//             <div
//               ref={buttonRef}
//               className={`hero-cta ${buttonInView ? 'visible' : ''}`}
//             >
//               <RouterLink to="/signup">
//                 <button className="btn-primary">
//                   <div className="btn-bg"></div>
//                   <div className="btn-glow"></div>
//                   <div className="btn-content">
//                     <span>Get Started</span>
//                     <svg className="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//                     </svg>
//                   </div>
//                 </button>
//               </RouterLink>

//               <button className="btn-secondary">
//                 Learn More
//               </button>
//             </div>
//           </div>

//           {/* Right Column - Visual Element */}
//           <div
//             ref={visualRef}
//             className={`hero-visual ${visualInView ? 'visible' : ''}`}
//           >
//             {/* Image Container */}
//             <div className="visual-container">
//               <div className="morphing-card">
//                 {/* Glass Card */}
//                 <div className="glass-card">
//                   <img
//                     src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1280&auto=format&fit=crop"
//                     alt="AI and Learning Interface"
//                     className="hero-image"
//                     loading="eager"
//                   />
//                   <div className="image-overlay"></div>
//                 </div>

//                 {/* Floating Elements */}
//                 <div className="floating-elements">
//                   <div className="element-group top">
//                     <div className="campus-icon"></div>
//                     <div className="line short"></div>
//                     <div className="line medium"></div>
//                   </div>
//                   <div className="element-group middle">
//                     <div className="feature-box">
//                       <div className="feature-icon"></div>
//                       <div className="feature-line"></div>
//                     </div>
//                     <div className="floating-dot"></div>
//                   </div>
//                   <div className="element-group bottom">
//                     <div className="progress-line full"></div>
//                     <div className="progress-line partial"></div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Hero

import { useInView } from "react-intersection-observer";
import { Link as RouterLink } from "react-router-dom";

const Hero = () => {
	const [badgeRef, badgeInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [titleRef, titleInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [subtitleRef, subtitleInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [buttonRef, buttonInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [visualRef, visualInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#121212] text-gray-200">
			{/* Background Elements */}
			<div className="absolute inset-0 z-[1]">
				{/* Gradient Mesh */}
				<div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa]/20 via-transparent to-[#60a5fa]/10 opacity-50"></div>

				{/* Animated Shapes */}
				<div className="absolute top-1/4 -left-10 w-80 h-80 rounded-full bg-gradient-to-br from-[#60a5fa]/30 to-[#3b82f6]/30 blur-[80px] animate-[float_12s_ease-in-out_infinite]"></div>
				<div className="absolute bottom-1/4 -right-10 w-80 h-80 rounded-full bg-gradient-to-br from-[#60a5fa]/20 to-[#3b82f6]/30 blur-[80px] animate-[float_12s_ease-in-out_infinite] animation-delay-[-6s]"></div>
			</div>

			{/* Content Container */}
			<div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 z-10">
				{/* Main Grid */}
				<div className="grid lg:grid-cols-2 gap-12 lg:gap-12 items-center">
					{/* Left Column - Text Content */}
					<div className="flex flex-col gap-8 text-center lg:text-left order-1">
						{/* Badge */}
						<div
							ref={badgeRef}
							className={`transition-all duration-700 ease-out delay-200 ${
								badgeInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-5"
							}`}>
							<div className="inline-flex items-center px-4 py-3 border border-white/10 rounded-full bg-white/5 backdrop-blur-2xl transform-origin-left transition-transform duration-300 hover:scale-105">
							<div className="w-2 h-2 rounded-full bg-[#60a5fa] animate-pulse"></div>
								<span className="ml-2 text-xs text-white/70 tracking-widest font-medium uppercase">
									SMART CAMPUS SOLUTION
								</span>
							</div>
						</div>

						{/* Main Title */}
						<div
							ref={titleRef}
							className={`transition-all duration-700 ease-out delay-400 ${
								titleInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-5"
							}`}>
							<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] m-0">
							<span className="inline-block bg-gradient-to-r from-[#60a5fa] via-[#3b82f6] to-[#60a5fa] bg-[length:200%_auto] bg-clip-text text-transparent animate-[gradient_8s_linear_infinite]">
									CampusHive
								</span>
								<span className="block mt-2 text-gray-200 text-2xl sm:text-3xl lg:text-4xl">
									Intelligent Campus Agents
								</span>
							</h1>
						</div>

						{/* Description */}
						<p
							ref={subtitleRef}
							className={`text-lg text-white/60 max-w-2xl leading-relaxed transition-all duration-700 ease-out delay-600 ${
								subtitleInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-5"
							}`}>
							Empowering FAST University's Students and Faculty with AI-powered
							campus automation. Streamline announcements, quizzes, timetables,
							compliance checks and more—all from one intelligent interface.
						</p>

						{/* CTA Section */}
						<div
							ref={buttonRef}
							className={`flex flex-col sm:flex-row gap-4 items-center lg:items-start transition-all duration-700 ease-out delay-700 ${
								buttonInView
									? "opacity-100 translate-y-0"
									: "opacity-0 translate-y-5"
							}`}>
							<RouterLink to="/signup" className="w-full sm:w-auto">
								<button className="group relative px-6 py-3 min-w-[160px] w-full sm:w-auto border-none rounded-lg cursor-pointer overflow-hidden bg-transparent transition-transform duration-300 hover:-translate-y-0.5">
									{/* Background */}
								<div className="absolute inset-0 bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] rounded-inherit"></div>

									{/* Glow Effect */}
								<div className="absolute inset-0 bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] rounded-inherit blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-60"></div>

									{/* Content */}
							<div className="relative flex items-center justify-center gap-2 text-[#0b1220] font-semibold z-10">
										<span>Get Started</span>
										<svg
											className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M13 7l5 5m0 0l-5 5m5-5H6"
											/>
										</svg>
									</div>
								</button>
							</RouterLink>

							<button className="px-6 py-3 min-w[160px] w-full sm:w-auto rounded-lg border border-white/10 bg-white/5 backdrop-blur-2xl text-white/70 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-[#60a5fa]/30">
								Learn More
							</button>
						</div>
					</div>

					{/* Right Column - Visual Element */}
					<div
						ref={visualRef}
						className={`relative h-[400px] lg:h-[500px] order-2 transition-all duration-700 ease-out delay-1000 ${
							visualInView
								? "opacity-100 translate-y-0"
								: "opacity-0 translate-y-5"
						}`}>
						{/* Visual Container */}
						<div className="absolute inset-0 flex items-center justify-center">
							{/* Morphing Card */}
							<div className="relative w-full max-w-md lg:max-w-lg h-full">
								{/* Glass Card */}
								<div className="group absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] overflow-hidden flex items-center justify-center">
									<img
										src="https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1280&auto=format&fit=crop"
										alt="AI and Learning Interface"
										className="w-full h-full object-cover rounded-inherit transition-transform duration-500 brightness-[0.8] contrast-[1.1] group-hover:scale-105 group-hover:brightness-[0.9] group-hover:contrast-[1.2]"
										loading="eager"
									/>
								<div className="absolute inset-0 bg-gradient-to-br from-[#60a5fa]/20 via-[#3b82f6]/10 to-[#60a5fa]/20 mix-blend-overlay pointer-events-none"></div>
								</div>

								{/* Floating Elements */}
								<div className="absolute inset-6 flex flex-col justify-between p-6 z-10 pointer-events-none">
									{/* Top Group */}
									<div className="flex flex-col items-start gap-3">
									<div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#60a5fa] to-[#3b82f6] animate-pulse"></div>
										<div className="h-0.5 w-24 bg-white/20 rounded-full"></div>
										<div className="h-0.5 w-32 bg-white/20 rounded-full"></div>
									</div>

									{/* Middle Group */}
									<div className="flex justify-between items-center">
										<div className="flex flex-col gap-2">
									<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#60a5fa]/20 to-[#3b82f6]/20"></div>
											<div className="w-16 h-0.5 bg-white/20 rounded-full"></div>
										</div>
									<div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#60a5fa]/30 to-[#3b82f6]/30 animate-[float_12s_ease-in-out_infinite]"></div>
									</div>

									{/* Bottom Group */}
									<div className="flex flex-col gap-2">
										<div className="w-full h-0.5 bg-white/10 rounded-full"></div>
										<div className="w-3/4 h-0.5 bg-white/10 rounded-full"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
				@keyframes float {
					0%,
					100% {
						transform: translateY(0) scale(1);
					}
					50% {
						transform: translateY(-20px) scale(1.05);
					}
				}

				@keyframes gradient {
					0% {
						background-position: 0% 50%;
					}
					100% {
						background-position: 100% 50%;
					}
				}

				.animation-delay-\[-6s\] {
					animation-delay: -6s;
				}
			`}</style>
		</section>
	);
};

export default Hero;
