import { useState, useEffect } from "react";
import { Link as ScrollLink, animateScroll } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const NAV_HEIGHT = 64;

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();

	const toggleMenu = () => setMenuOpen((o) => !o);
	const closeMenu = () => setMenuOpen(false);
	const scrollToTop = () => {
		animateScroll.scrollToTop({ duration: 400 });
		closeMenu();
	};

	useEffect(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > NAV_HEIGHT);
		};
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const isHome = location.pathname === "/";

	const navItems = [
		{ id: "features", label: "Features" },
		{ id: "benefits", label: "Benefits" },
		{ id: "faq", label: "FAQ" },
		{ id: "team", label: "Team" },
	];

	return (
		<>
			<nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
				<div className="container navbar-container">
					<div className="logo" onClick={scrollToTop}>
						<RouterLink to="/">
							<span className="campus">Campus</span>
							<span className="hive">Hive</span>
						</RouterLink>
					</div>

					<div className={`nav-links ${menuOpen ? "active" : ""}`}>
						<ul>
							{isHome ? (
								navItems.map((item) => (
									<li key={item.id}>
										<ScrollLink
											to={item.id}
											spy={true}
											smooth={true}
											offset={-NAV_HEIGHT + 1}
											duration={500}
											activeClass="active"
											onClick={closeMenu}
											className="hover:text-[#00d462] transition-colors duration-300">
											{item.label}
										</ScrollLink>
									</li>
								))
							) : (
								<>
									<li>
										<RouterLink
											to="/"
											onClick={closeMenu}
											className="hover:text-[#00d462] transition-colors duration-300">
											Home
										</RouterLink>
									</li>
									{navItems.map((item) => (
										<li key={item.id}>
											<RouterLink
												to={`/#${item.id}`}
												onClick={closeMenu}
												className="hover:text-[#00d462] transition-colors duration-300">
												{item.label}
											</RouterLink>
										</li>
									))}
								</>
							)}
							<li>
								<RouterLink
									to="/chatbot"
									onClick={closeMenu}
									className="contact-btn">
									Demo
								</RouterLink>
							</li>
						</ul>
					</div>

					<div className="mobile-menu-btn" onClick={toggleMenu}>
						{menuOpen ? <FaTimes /> : <FaBars />}
					</div>
				</div>
			</nav>

			{/* push content below fixed navbar */}
			<div style={{ height: NAV_HEIGHT }} />
		</>
	);
};

export default Navbar;
