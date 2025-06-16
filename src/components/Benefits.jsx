import React from 'react';
import { FaCubes, FaChartLine, FaWallet, FaLightbulb } from 'react-icons/fa';

const benefitList = [
  {
    icon: <FaCubes className="w-7 h-7" />,
    title: "Smart Information Access",
    description:
      "Students can instantly access comprehensive information about courses, faculty, publications, and degree programs through an intelligent chatbot interface.",
  },
  {
    icon: <FaChartLine className="w-7 h-7" />,
    title: "Faculty Assistant",
    description:
      "Streamline daily academic tasks with automated assistance for creating exams, managing announcements, and tracking course compliance with CLOs and PLOs.",
  },
  {
    icon: <FaWallet className="w-7 h-7" />,
    title: "Efficient Course Management",
    description:
      "Faculty can easily manage class schedules, create and distribute quizzes, and monitor student progress through an integrated platform.",
  },
  {
    icon: <FaLightbulb className="w-7 h-7" />,
    title: "Personalized Support",
    description:
      "Get instant answers to queries about university policies, course requirements, and academic resources, tailored to both student and faculty needs.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative pb-20 pt-20 md:pb-32 md:pt-32 w-full bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#00d462]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00d462]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="grid lg:grid-cols-2 lg:gap-24 items-start">
          {/* Header Section */}
          <div className="text-start space-y-6 pb-8 mx-auto lg:sticky lg:top-8">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 text-sm font-medium text-[#00d462] bg-[#00d462]/10 rounded-full">
                BENEFITS
              </span>
              <h2 className="text-4xl font-bold sm:text-6xl tracking-tight text-white">
                Why Choose Campus Hive
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                Experience a smarter way of learning and teaching with our AI-powered platform designed to enhance academic excellence and streamline educational processes.
              </p>
            </div>

            {/* Decorative line */}
            <div className="flex items-center gap-4 pt-4">
              <div className="h-px bg-gradient-to-r from-[#00d462] to-transparent flex-1"></div>
              <div className="w-2 h-2 rounded-full bg-[#00d462]"></div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid lg:grid-cols-2 gap-6 w-full">
            {benefitList.map(({ icon, title, description }, index) => (
              <div
                key={title}
                className="group relative bg-[#111111] border border-gray-800/50 rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#00d462]/10 hover:border-[#00d462]/30 p-6"
              >
                {/* Card background gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00d462]/5 via-transparent to-[#00d462]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00d462]/20 via-[#00d462]/20 to-[#00d462]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>

                <div className="relative pb-4">
                  <div className="flex justify-between items-start">
                    <div className="relative">
                      <div className="relative">
                        {/* Icon background glow */}
                        <div className="absolute inset-0 bg-[#00d462]/20 rounded-xl blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                        <div className="relative bg-[#111111] p-3 rounded-xl border border-[#00d462]/20 group-hover:border-[#00d462]/40 transition-all duration-300">
                          <div className="text-[#00d462] group-hover:scale-110 transition-transform duration-300">
                            {icon}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Animated number */}
                    <span className="text-6xl font-bold text-gray-800 group-hover:text-[#00d462]/20 transition-all duration-500 group-hover:scale-110">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mt-4 text-white group-hover:text-[#00d462] transition-colors duration-300">
                    {title}
                  </h3>
                </div>

                <div className="relative">
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-1 bg-gradient-to-r from-[#00d462]/0 via-[#00d462]/50 to-[#00d462]/0 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom decorative element */}
        <div className="flex justify-center mt-16">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00d462] animate-pulse"></div>
            <div className="w-8 h-px bg-gradient-to-r from-[#00d462] to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-[#00d462]/60 animate-pulse delay-300"></div>
            <div className="w-8 h-px bg-gradient-to-r from-[#00d462]/60 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-[#00d462]/30 animate-pulse delay-700"></div>
          </div>
        </div>
      </div>
    </section>
  );
} 