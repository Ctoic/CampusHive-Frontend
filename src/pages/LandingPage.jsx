import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import CTA from "../components/CTA";
import Team from "../components/Team";
import FAQ from "../components/FAQ";

const LandingPage = () => {
	return (
		<div className="relative min-h-screen">
			<main className="relative">
				<Hero />
				<Benefits />
				<CTA />
				<Team />
				<FAQ />

			</main>
		</div>
	);
};

export default LandingPage;
