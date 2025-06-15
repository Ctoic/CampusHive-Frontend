import { motion, AnimatePresence, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FaMousePointer, FaCode, FaArrowsAltV, FaCheckCircle, FaChevronRight } from "react-icons/fa";

const data = [
  {
    id: 1,
    title: "1. Data Collection & Processing",
    content:
      "Our system automatically collects and processes university data from multiple sources. This includes faculty profiles, course information, academic programs, and research publications. The data is cleaned, structured, and made ready for intelligent retrieval.",
    image: "/images/data-collection.svg",
    icon: <FaMousePointer className="w-6 h-6 text-[#00d462]" />,
    stat: "Real-time data updates",
    testimonial: {
      quote:
        "The automated data collection system ensures we always have the most up-to-date information available.",
      author: "Dr. Sarah K.",
      avatar: "https://i.pravatar.cc/500?img=11",
    },
  },
  {
    id: 2,
    title: "2. Intelligent Information Retrieval",
    content:
      "Using advanced RAG (Retrieval-Augmented Generation) technology, the chatbot retrieves relevant information from our comprehensive knowledge base. This includes university policies, faculty publications, course details, and academic programs.",
    image: "/images/retrieval.svg",
    icon: <FaArrowsAltV className="w-6 h-6 text-[#00d462]" />,
    stat: "95% accuracy in information retrieval",
    testimonial: {
      quote: "The chatbot's ability to find and present relevant information is impressive and saves us valuable time.",
      author: "Prof. Miguel L.",
      avatar: "https://i.pravatar.cc/500?img=11",
    },
  },
  {
    id: 3,
    title: "3. Faculty Assistant Features",
    content:
      "Faculty members can manage their daily tasks efficiently. Create and send class announcements, check schedules, create assessments, and verify course outline compliance with CLOs and PLOs. The system also tracks research publications automatically.",
    image: "/images/faculty-assistant.svg",
    icon: <FaCode className="w-6 h-6 text-[#00d462]" />,
    stat: "60% reduction in administrative tasks",
    testimonial: {
      quote: "The faculty assistant features have streamlined my daily routine significantly.",
      author: "Dr. Alex T.",
      avatar: "https://i.pravatar.cc/500?img=11",
    },
  },
  {
    id: 4,
    title: "4. Student Support System",
    content:
      "Students can access comprehensive information about courses, programs, and faculty. Get instant answers about degree requirements, course schedules, and academic policies. The system provides personalized assistance based on student queries.",
    image: "/images/student-support.svg",
    icon: <FaCheckCircle className="w-6 h-6 text-[#00d462]" />,
    stat: "24/7 student support availability",
    testimonial: {
      quote: "Having instant access to course information and faculty details has made my academic journey much smoother.",
      author: "Jamie W.",
      avatar: "https://i.pravatar.cc/500?img=11",
    },
  },
];

// Step Indicator Component
const StepIndicator = ({ currentStep, totalSteps, onStepClick }) => {
  return (
    <div className="flex items-center justify-center space-x-2 md:space-x-4 my-8">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <button
          key={index}
          onClick={() => onStepClick(index)}
          className="group flex flex-col items-center"
        >
          <div className="relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                currentStep === index
                  ? "border-[#00d462] bg-[#00d462] text-white"
                  : "border-gray-300 text-gray-500 group-hover:border-[#00d462]/50"
              }`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className="absolute top-1/2 left-full w-4 md:w-8 h-0.5 bg-gray-300">
                <div
                  className="h-full bg-[#00d462] transition-all duration-500"
                  style={{ width: currentStep > index ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
          <span
            className={`text-xs mt-2 hidden md:block transition-colors ${
              currentStep === index
                ? "text-[#00d462] font-medium"
                : "text-gray-500"
            }`}
          >
            Step {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

// Testimonial Component
const Testimonial = ({ testimonial }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="flex items-start space-x-3 p-4 bg-[#111111] rounded-lg border border-gray-800 mt-6"
    >
      <div className="flex-shrink-0">
        <img
          src={testimonial.avatar}
          alt={testimonial.author}
          className="h-8 w-8 rounded-full"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-300 italic mb-2">
          &quot;{testimonial.quote}&quot;
        </p>
        <p className="text-xs font-medium text-gray-400">
          — {testimonial.author}
        </p>
      </div>
    </motion.div>
  );
};

// Main Component
export default function HowItWorks() {
  const autoPlayDelay = 6000;
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  // Auto-advance steps
  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      setCurrentIndex(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, autoPlayDelay);

    return () => clearInterval(interval);
  }, [isInView, currentIndex]);

  // Handle manual step selection
  const handleStepClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="pb-20 pt-20 md:pb-32 md:pt-32 overflow-hidden bg-[#0A0A0A]"
    >
      <div className="container mx-auto">
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            className="w-full max-w-7xl mx-auto"
          >
            <div className="text-center space-y-4 mb-8">
              <motion.div>
                <span className="inline-block px-3 py-1 text-sm font-medium text-[#00d462] bg-[#00d462]/10 rounded-full">
                  HOW IT WORKS
                </span>
              </motion.div>
              <motion.div>
                <h2 className="text-3xl font-bold sm:text-5xl tracking-tight text-white">
                  Build forms in minutes, not hours
                </h2>
              </motion.div>
              <motion.div className="max-w-2xl mx-auto">
                <p className="text-lg text-gray-400 pt-1">
                  Our intuitive form builder simplifies the entire process, from
                  component selection to data collection.
                </p>
              </motion.div>
            </div>

            <StepIndicator
              currentStep={currentIndex}
              totalSteps={data.length}
              onStepClick={handleStepClick}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-12 relative">
              {/* Left Side - Step Content */}
              <div className="order-2 lg:order-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`content-${currentIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center mb-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-[#00d462]/10 rounded-full flex items-center justify-center mr-4">
                        {data[currentIndex].icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {data[currentIndex].title}
                      </h3>
                    </div>

                    <p className="text-lg text-gray-300 leading-relaxed">
                      {data[currentIndex].content}
                    </p>

                    <div className="bg-[#00d462]/5 rounded-lg p-4 flex items-center">
                      <div className="w-12 h-12 bg-[#00d462]/20 rounded-full flex items-center justify-center mr-4">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#00d462]"
                        >
                          <path
                            d="M16 8L8 16M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">
                          Pro Tip
                        </h4>
                        <p className="text-sm text-gray-300">
                          {data[currentIndex].stat}
                        </p>
                      </div>
                    </div>

                    <Testimonial testimonial={data[currentIndex].testimonial} />

                    <div className="pt-4">
                      <button className="inline-flex items-center space-x-2 text-[#00d462] font-medium hover:underline">
                        <span>Learn more about this feature</span>
                        <FaChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Side - Visual Demonstration */}
              <div className="order-1 lg:order-2 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`image-${currentIndex}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-lg"
                  >
                    <img
                      src={data[currentIndex].image}
                      alt={data[currentIndex].title}
                      className="w-full h-auto rounded-xl border border-gray-800 shadow-xl"
                    />

                    {/* Progress bar underneath the image */}
                    <div className="w-full h-1 bg-gray-800 rounded-full mt-6 overflow-hidden">
                      <motion.div
                        className="h-full bg-[#00d462]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        key={currentIndex}
                        transition={{
                          duration: autoPlayDelay / 1000,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 