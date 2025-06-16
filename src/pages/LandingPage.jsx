import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Carousel from "../components/Carousel";
import CTA from "../components/CTA";
import Team from "../components/Team";
import FAQ from "../components/FAQ";
import Navbar from "../components/Navbar";

const LandingPage = () => {
	return (
		<div className="relative min-h-screen">
			<header className="absolute top-0 left-0 w-full z-50">
				<Navbar />
			</header>
			<main className="relative">
				<Hero />
				<Carousel />
				<Benefits />
				<CTA />
				<FAQ />
				<Team />
			</main>
		</div>
	);
};

export default LandingPage;
