import { Mail, Phone, MapPin, Send, Sparkles, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ContactInfo() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <section className="relative bg-[#0A0A0A] text-white py-20 md:py-32 overflow-hidden min-h-screen flex items-center">
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/6 w-80 h-80 bg-[#00d462]/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-[#00d462]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#00d462]/3 rounded-full blur-3xl"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-16 w-2 h-2 bg-[#00d462]/30 rounded-full animate-bounce"></div>
        <div className="absolute top-32 right-24 w-1 h-1 bg-[#00d462]/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-40 left-32 w-1.5 h-1.5 bg-[#00d462]/25 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-[#00d462]/35 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="container mx-auto px-4 w-full">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="relative inline-block mb-6">
              <Badge className="bg-[#00d462] text-black hover:bg-[#00d462]/90 transition-all duration-300 px-6 py-3 text-sm font-semibold tracking-wide shadow-lg shadow-[#00d462]/20">
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact Us
              </Badge>
              <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-[#00d462] animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight">
              Get in Touch
            </h1>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Have questions about CampusHive? We'd love to hear from you and help you get started.
            </p>
            
            {/* Decorative line */}
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#00d462] to-transparent mx-auto mt-8 rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Contact Info - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <div className="group bg-gradient-to-r from-[#111111] to-[#0f0f0f] p-8 rounded-2xl border border-gray-800/50 hover:border-[#00d462]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00d462]/10 hover:scale-105 transform">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d462]/5 via-transparent to-[#00d462]/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="p-4 bg-gradient-to-r from-[#00d462]/20 to-[#00d462]/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-7 h-7 text-[#00d462]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#00d462] transition-colors duration-300">Our Location</h3>
                    <p className="text-gray-400 text-base leading-relaxed">123 Campus Street<br />University City, State 12345</p>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-r from-[#111111] to-[#0f0f0f] p-8 rounded-2xl border border-gray-800/50 hover:border-[#00d462]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00d462]/10 hover:scale-105 transform">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d462]/5 via-transparent to-[#00d462]/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="p-4 bg-gradient-to-r from-[#00d462]/20 to-[#00d462]/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-7 h-7 text-[#00d462]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#00d462] transition-colors duration-300">Phone Number</h3>
                    <p className="text-gray-400 text-base">+1 (234) 567-8900</p>
                  </div>
                </div>
              </div>

              <div className="group bg-gradient-to-r from-[#111111] to-[#0f0f0f] p-8 rounded-2xl border border-gray-800/50 hover:border-[#00d462]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00d462]/10 hover:scale-105 transform">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d462]/5 via-transparent to-[#00d462]/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl"></div>
                
                <div className="flex items-center gap-6 relative z-10">
                  <div className="p-4 bg-gradient-to-r from-[#00d462]/20 to-[#00d462]/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-7 h-7 text-[#00d462]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-[#00d462] transition-colors duration-300">Email Address</h3>
                    <p className="text-gray-400 text-base">contact@campushive.com</p>
                  </div>
                </div>
              </div>

              {/* Additional info card */}
              <div className="bg-gradient-to-r from-[#00d462]/10 to-[#00d462]/5 p-6 rounded-2xl border border-[#00d462]/20">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-white mb-2">Quick Response</h4>
                  <p className="text-sm text-gray-300">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>

            {/* Contact Form - Takes 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-[#111111] to-[#0a0a0a] p-10 rounded-3xl border border-gray-800/50 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                {/* Form background effects */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#00d462]/5 via-transparent to-[#00d462]/5 opacity-50"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d462]/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#00d462]/5 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-3">Send us a Message</h2>
                    <p className="text-gray-400">Fill out the form below and we'll get back to you soon</p>
                  </div>

                  <div className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-6 py-4 bg-[#1a1a1a]/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d462] focus:border-[#00d462]/50 transition-all duration-300 hover:border-gray-600 backdrop-blur-sm"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-3">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-6 py-4 bg-[#1a1a1a]/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d462] focus:border-[#00d462]/50 transition-all duration-300 hover:border-gray-600 backdrop-blur-sm"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-3">
                        Your Message
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        rows={6}
                        className="w-full px-6 py-4 bg-[#1a1a1a]/80 border border-gray-700/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00d462] focus:border-[#00d462]/50 transition-all duration-300 hover:border-gray-600 resize-none backdrop-blur-sm"
                        placeholder="Tell us about your question or how we can help you..."
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-[#00d462] to-[#00c455] hover:from-[#00c455] hover:to-[#00b548] text-black font-bold py-5 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#00d462]/30 hover:shadow-xl hover:shadow-[#00d462]/40 flex items-center justify-center gap-3 text-lg"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom decorative section */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-2 text-gray-400">
              <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#00d462]/50"></div>
              <span className="text-sm">Trusted by thousands of students</span>
              <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#00d462]/50"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}