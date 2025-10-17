import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactInfo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="bg-[#0A0A0A] text-white py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-gray-400 mt-3">We usually respond within 24 hours.</p>
          <div className="w-20 h-0.5 bg-[#60a5fa] mx-auto mt-5 rounded"></div>
        </div>

        <div className="rounded-2xl border border-gray-800 bg-[#101010] p-6 md:p-8">
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-gray-400 mb-8">
            <span className="inline-flex items-center gap-2"><Phone className="w-4 h-4 text-[#60a5fa]" />+1 (234) 567-8900</span>
            <span className="inline-flex items-center gap-2"><Mail className="w-4 h-4 text-[#60a5fa]" />contact@campushive.com</span>
            <span className="inline-flex items-center gap-2"><MapPin className="w-4 h-4 text-[#60a5fa]" />University City</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-300 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#151515] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#60a5fa] focus:border-[#60a5fa]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-300 mb-2">Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#151515] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#60a5fa] focus:border-[#60a5fa]"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">Your Message</label>
              <textarea
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-[#151515] border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#60a5fa] focus:border-[#60a5fa] resize-none"
                placeholder="How can we help?"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] hover:from-[#93c5fd] hover:to-[#60a5fa] text-black font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}


