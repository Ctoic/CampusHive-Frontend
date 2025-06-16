// src/components/Team.jsx
import React from 'react'
import { useInView } from 'react-intersection-observer'
import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
} from 'react-icons/fa6'
import './Team.css'

const teamList = [
  {
    imageUrl: "/src/assets/profile/nibtahil.png",
    firstName: "NIBTAHIL",
    lastName: "NAFEES",
    positions: ["AI ENGINEER", "TEAM LEAD"],
    socialNetworks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/nibtahil-nafees/",
        icon: <FaLinkedin className="w-5 h-5" />
      },
      {
        name: "Github",
        url: "https://github.com/nibtahil",
        icon: <FaGithub className="w-5 h-5" />
      },
      {
        name: "X",
        url: "https://x.com/nibtahil",
        icon: <FaXTwitter className="w-5 h-5" />
      },
    ],
  },
  {
    imageUrl: "/src/assets/profile/faizan.png",
    firstName: "FAIZAN",
    lastName: "KARMAT",
    positions: ["AI ENGINEER", "Backend DEVELOPER"],
    socialNetworks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/faizan-karmat/",
        icon: <FaLinkedin className="w-5 h-5" />
      },
      {
        name: "Github",
        url: "https://github.com/faizankarmat",
        icon: <FaGithub className="w-5 h-5" />
      },
      {
        name: "X",
        url: "https://x.com/faizankarmat",
        icon: <FaXTwitter className="w-5 h-5" />
      },
    ],
  },
  {
    imageUrl: "/src/assets/profile/najam.png",
    firstName: "NAJAM",
    lastName: "ALI",
    positions: ["WEB DEVELOPER", "UI/UX DESIGNER"],
    socialNetworks: [
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ctoic/",
        icon: <FaLinkedin className="w-5 h-5" />
      },
      {
        name: "Github",
        url: "https://github.com/ctoic",
        icon: <FaGithub className="w-5 h-5" />
      },
      {
        name: "X",
        url: "https://x.com/najamali",
        icon: <FaXTwitter className="w-5 h-5" />
      },
    ],
  },
];

const Team = () => {
  const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="team" className="relative pb-20 pt-20 md:pb-32 md:pt-32 w-full bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#00d462]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00d462]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="text-center space-y-4 pb-16 max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 text-sm font-medium text-[#00d462] bg-[#00d462]/10 rounded-full">
            TEAM
          </span>
          <h2 className="text-4xl font-bold sm:text-6xl tracking-tight text-white">
            Meet Our Team
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            In a realm where imagination meets technology, our platform fosters
            innovation and inspires creativity
          </p>
        </div>

        {/* Centered grid container */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl">
            {teamList.map(({ imageUrl, firstName, lastName, positions, socialNetworks }, index) => (
              <div
                key={index}
                className="group relative bg-[#111111] border border-gray-700/50 rounded-xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-[#00d462]/20 hover:-translate-y-1 hover:border-[#00d462]/30"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={`${firstName} ${lastName}`}
                    className="w-full h-full object-cover saturate-0 transition-all duration-300 ease-linear group-hover:saturate-100 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-6 bg-[#111111] relative z-10">
                  <h3 className="text-xl font-bold mb-2">
                    <span className="text-white">{firstName}</span>
                    <span className="text-[#00d462] ml-2">{lastName}</span>
                  </h3>
                  
                  <div className="mb-4">
                    {positions.map((position, idx) => (
                      <p key={idx} className="text-gray-300 text-sm font-medium leading-relaxed">
                        {position}
                      </p>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {socialNetworks.map(({ name, url, icon }, idx) => (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#00d462] transition-colors duration-300 hover:scale-110 transform"
                        aria-label={`${firstName}'s ${name}`}
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team