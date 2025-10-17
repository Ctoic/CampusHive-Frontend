import { ChevronDown, Sparkles, HelpCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const FAQList = [
  {
    question: "What is CampusHive?",
    answer: "CampusHive is a comprehensive platform designed to connect students, faculty, and campus resources in one place. It helps streamline campus life and enhance the overall university experience.",
  },
  {
    question: "How can I get started with CampusHive?",
    answer: "Getting started is easy! Simply sign up for an account, verify your student email, and you'll have access to all CampusHive features. You can then customize your profile and start exploring the platform.",
  },
  {
    question: "Is CampusHive free to use?",
    answer: "Yes, CampusHive is completely free for students. We believe in making campus resources accessible to everyone in the university community.",
  },
  {
    question: "Can I use CampusHive on my mobile device?",
    answer: "Absolutely! CampusHive is fully responsive and works seamlessly on all devices, including smartphones, tablets, and desktop computers.",
  },
  {
    question: "How secure is my data on CampusHive?",
    answer: "We take data security very seriously. All your information is encrypted and protected using industry-standard security measures. We never share your personal data with third parties without your consent.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="relative pb-20 pt-20 md:pb-32 md:pt-32 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Enhanced Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#60a5fa]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#60a5fa]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#60a5fa]/20 rounded-full blur-3xl"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#60a5fa]/30 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-[#60a5fa]/40 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-[#60a5fa]/25 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-6 pb-16">
          <div className="relative inline-block">
            <Badge className="bg-[#60a5fa] text-black hover:bg-[#60a5fa]/90 transition-all duration-300 px-4 py-2 text-sm font-semibold tracking-wide shadow-lg shadow-[#60a5fa]/20">
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQ
            </Badge>
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-[#60a5fa] animate-pulse" />
          </div>
          
          <h2 className="text-4xl font-bold sm:text-6xl tracking-tight text-white bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Frequently asked questions
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about CampusHive to get started on your journey
          </p>
          
          {/* Decorative line */}
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#60a5fa] to-transparent mx-auto rounded-full"></div>
        </div>

        <div className="space-y-4">
          {FAQList.map((faq, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-r from-[#111111] to-[#0f0f0f] border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#60a5fa]/40 hover:shadow-2xl hover:shadow-[#60a5fa]/10 hover:scale-[1.02] transform"
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#60a5fa]/5 via-transparent to-[#60a5fa]/5 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#60a5fa]/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
              
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="relative w-full px-8 py-6 text-left flex justify-between items-center transition-all duration-300 hover:bg-[#111111]/50 group-hover:text-[#60a5fa]"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-[#60a5fa] rounded-full opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125"></div>
                  <span className="font-semibold text-lg text-white group-hover:text-[#60a5fa] transition-colors duration-300">
                    {faq.question}
                  </span>
                </div>
                
                <div className="relative">
                  <ChevronDown
                    className={`w-6 h-6 transition-all duration-500 ${
                      openIndex === index 
                        ? "rotate-180 text-[#60a5fa] scale-110" 
                        : "text-gray-400 group-hover:text-[#60a5fa] group-hover:scale-110"
                    }`}
                  />
                  {/* Subtle glow around icon */}
                  <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                    openIndex === index ? "shadow-lg shadow-[#60a5fa]/50" : ""
                  }`}></div>
                </div>
              </button>

              {openIndex === index && (
                <div className="relative">
                  {/* Animated divider */}
                  <div className="mx-8 h-px bg-gradient-to-r from-transparent via-[#60a5fa]/30 to-transparent"></div>
                  
                  <div className="px-8 py-6 relative">
                    {/* Content background glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#60a5fa]/5 to-transparent rounded-b-2xl"></div>
                    
                    <p className="text-gray-300 leading-relaxed text-base relative z-10">
                      {faq.answer}
                    </p>
                    
                    {/* Subtle accent dot */}
                    <div className="absolute bottom-4 right-8 w-1 h-1 bg-[#60a5fa]/40 rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Enhanced footer section */}
        <div className="mt-16 text-center">
          <div className="relative inline-block p-8 rounded-2xl bg-gradient-to-r from-[#111111]/50 to-[#0f0f0f]/50 border border-gray-800/30 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-[#60a5fa]/5 to-transparent rounded-2xl"></div>
            
            <h4 className="text-lg font-semibold text-white mb-2 relative z-10">
              Still have questions?
            </h4>
            <p className="text-gray-400 mb-4 relative z-10">
              We're here to help! Reach out to our support team
            </p>
            
            <a 
              href="mailto:support@campushive.com" 
              className="relative z-10 inline-flex items-center px-6 py-3 bg-[#60a5fa] text-black font-semibold rounded-lg hover:bg-[#60a5fa]/90 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#60a5fa]/30"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              support@campushive.com
            </a>
            
            {/* Decorative elements */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-[#60a5fa]/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-2 left-2 w-1 h-1 bg-[#60a5fa]/40 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}