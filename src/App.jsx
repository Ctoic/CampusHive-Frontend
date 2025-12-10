import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Signup from "./components/Signup";
import Login from "./components/Login";
import IntegratedChatbot from "./components/IntegratedChatbot";
import AdminDashboard from "./components/AdminDashboard";
import ContactInfo from "./components/contact-info";
import { AuthProvider } from "./contexts/AuthContext";
import { ChatProvider } from "./contexts/ChatContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";

import "./App.css";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";

function AppContent() {
	const location = useLocation();
	const isChatbotRoute = location.pathname === "/chatbot";
	const isAdminRoute = location.pathname === "/admin";

	return (
		<div className="min-h-screen bg-[#0A0A0A]">
			{!isChatbotRoute && !isAdminRoute && (
				<>
					<header className="absolute top-0 left-0 w-full z-50">
						<Navbar />
					</header>
					<main className="relative z-10 ">
						{/* <Navbar /> */}
						<Routes>
							<Route path="/" element={<LandingPage />} />
							<Route path="/about" element={<AboutPage />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/login" element={<Login />} />
							<Route 
								path="/chatbot" 
								element={
									<ProtectedRoute>
										<IntegratedChatbot />
									</ProtectedRoute>
								} 
							/>
							<Route 
								path="/admin" 
								element={
									<AdminProtectedRoute>
										<AdminDashboard />
									</AdminProtectedRoute>
								} 
							/>
							<Route
								path="/contact"
								element={
									<main className="container mx-auto px-4 py-16">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
											<ContactInfo />
										</div>
									</main>
								}
							/>
						</Routes>
						<Footer />
					</main>
				</>
			)}
			{isChatbotRoute && (
				<Routes>
					<Route 
						path="/chatbot" 
						element={
							<ProtectedRoute>
								<IntegratedChatbot />
							</ProtectedRoute>
						} 
					/>
				</Routes>
			)}
			{isAdminRoute && (
				<Routes>
					<Route 
						path="/admin" 
						element={
							<AdminProtectedRoute>
								<AdminDashboard />
							</AdminProtectedRoute>
						} 
					/>
				</Routes>
			)}
		</div>
	);
}

function App() {
	return (
		<AuthProvider>
			<ChatProvider>
				<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
					<AppContent />
				</Router>
			</ChatProvider>
		</AuthProvider>
	);
}

export default App;
