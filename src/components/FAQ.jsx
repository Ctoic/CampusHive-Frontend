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
    <section className="pb-20 pt-20 md:pb-32 md:pt-32 bg-[#0A0A0A] text-white">
      <div className="container mx-auto md:w-[700px]">
        <div className="text-center space-y-4 pb-8 mx-auto">
          <Badge className="bg-primary text-white">FAQ</Badge>
          <h2 className="text-3xl font-bold sm:text-5xl tracking-tight text-white">
            Frequently asked questions
          </h2>
          <p className="text-xl text-gray-400 pt-1">
            Everything you need to know about CampusHive
          </p>
        </div>

        <div className="mx-auto mb-12 md:max-w-[800px]">
          {FAQList.map((faq, index) => (
            <div
              key={index}
              className="w-full border border-gray-800 rounded-lg overflow-hidden mt-2 bg-[#111111]"
            >
              <h3 className="flex">
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="flex flex-1 items-center justify-between py-4 px-4 font-medium transition-all hover:text-primary text-white"
                  aria-expanded={openIndex === index}
                >
                  {faq.question}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </h3>
              {openIndex === index && (
                <div className="px-4 pb-4 text-sm text-gray-300 transition-all">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <h4 className="text-center text-sm font-medium tracking-tight text-gray-400">
          Still have questions? Email us at{" "}
          <a href="mailto:support@campushive.com" className="underline text-primary hover:text-primary/80">
            support@campushive.com
          </a>
        </h4>
      </div>
    </section>
  );
} 