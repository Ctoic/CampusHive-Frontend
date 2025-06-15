import { ChevronDown } from "lucide-react";
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

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative pb-20 pt-20 md:pb-32 md:pt-32 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#00d462]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00d462]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center space-y-4 pb-12 mx-auto">
          <Badge className="bg-[#00d462] text-black hover:bg-[#00d462]/90 transition-colors duration-300">
            FAQ
          </Badge>
          <h2 className="text-3xl font-bold sm:text-5xl tracking-tight text-white">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-400 pt-1">
            Everything you need to know about CampusHive
          </p>
        </div>

        <div className="mx-auto space-y-3">
          {FAQList.map((faq, index) => (
            <div
              key={index}
              className="group relative bg-[#111111] border border-gray-800/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#00d462]/30 hover:shadow-lg hover:shadow-[#00d462]/5"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00d462]/5 via-transparent to-[#00d462]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="flex flex-1 items-center justify-between py-5 px-6 font-medium transition-all hover:text-[#00d462] text-white group-hover:bg-[#111111]/80"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-all duration-300 ${
                      openIndex === index ? "rotate-180 text-[#00d462]" : "text-gray-400 group-hover:text-[#00d462]"
                    }`}
                  />
                </button>

{openIndex === index && (
                  <div className="px-6 pb-5 text-base text-gray-300 animate-in slide-in-from-top-2 duration-300">
                    <div className="h-px bg-gradient-to-r from-[#00d462]/20 via-[#00d462]/10 to-transparent mb-4"></div>
                    {faq.answer}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h4 className="text-sm font-medium tracking-tight text-gray-400">
            Still have questions? Email us at{" "}
            <a 
              href="mailto:support@campushive.com" 
              className="text-[#00d462] hover:text-[#00d462]/80 transition-colors duration-300 underline underline-offset-4"
            >
              support@campushive.com
            </a>
          </h4>
        </div>
      </div>
    </section>
  );
}