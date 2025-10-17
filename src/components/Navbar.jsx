import { useState, useEffect } from "react";
import { Link as ScrollLink, animateScroll } from "react-scroll";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";
import "./Navbar.css";

const NAV_HEIGHT = 64;

const Navbar = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { user, isAuthenticated, logout } = useAuth();

	const toggleMenu = () => setMenuOpen((o) => !o);
	const closeMenu = () => setMenuOpen(false);
	const scrollToTop = () => {
		animateScroll.scrollToTop({ duration: 400 });
		closeMenu();
	};

	const handleLogout = async () => {
		await logout();
		navigate("/");
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
							<img src={logo} alt="CampusHive logo" className="logo-img" />
							<span className="campus">campus</span>
							<span className="hive">hive</span>
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
								className="hover:text-[#60a5fa] transition-colors duration-300">
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
								className="hover:text-[#60a5fa] transition-colors duration-300">
											Home
										</RouterLink>
									</li>
									{navItems.map((item) => (
										<li key={item.id}>
											<RouterLink
												to={`/#${item.id}`}
												onClick={closeMenu}
								className="hover:text-[#60a5fa] transition-colors duration-300">
												{item.label}
											</RouterLink>
										</li>
									))}
								</>
							)}
							{isAuthenticated ? (
								<>
									<li>
										<RouterLink
											to="/chatbot"
											onClick={closeMenu}
											className="contact-btn">
											Chat
										</RouterLink>
									</li>
									{user?.role === 'admin' && (
										<li>
											<RouterLink
												to="/admin"
												onClick={closeMenu}
								className="flex items-center gap-2 text-sm hover:text-[#60a5fa] transition-colors duration-300">
												<FaCog />
												Admin
											</RouterLink>
										</li>
									)}
									<li className="flex items-center gap-2">
										<FaUser className="text-sm" />
										<span className="text-sm">{user?.username}</span>
									</li>
									<li>
										<button
											onClick={handleLogout}
								className="flex items-center gap-2 text-sm hover:text-[#60a5fa] transition-colors duration-300">
											<FaSignOutAlt />
											Logout
										</button>
									</li>
								</>
							) : (
								<>
									<li>
										<RouterLink
											to="/login"
											onClick={closeMenu}
								className="hover:text-[#60a5fa] transition-colors duration-300">
											Login
										</RouterLink>
									</li>
									<li>
										<RouterLink
											to="/signup"
											onClick={closeMenu}
											className="contact-btn">
											Sign Up
										</RouterLink>
									</li>
								</>
							)}
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
