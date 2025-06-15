import React, { useState, useRef, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaPlus } from 'react-icons/fa';

const NavigationButtons = ({ currentIndex, maxIndex, handlePrev, handleNext }) => (
  <div className="mt-6 pl-2 flex justify-start gap-4">
    <button
      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d462] focus-visible:ring-offset-2 disabled:pointer-events-none h-12 w-12 rounded-full disabled:opacity-50 bg-[#00d462] text-white shadow-md hover:shadow-[#00d462]/30 hover:scale-105 active:scale-95"
      disabled={currentIndex === 0}
      onClick={handlePrev}
      aria-label="Previous slide"
    >
      <FaArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </button>

    <button
      className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d462] focus-visible:ring-offset-2 disabled:pointer-events-none h-12 w-12 rounded-full disabled:opacity-50 bg-[#00d462] text-white shadow-md hover:shadow-[#00d462]/30 hover:scale-105 active:scale-95"
      disabled={currentIndex >= maxIndex}
      onClick={handleNext}
      aria-label="Next slide"
    >
      <FaArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </button>
  </div>
);

const CarouselItem = ({ item, onPlusClick }) => (
  <div className="group relative flex flex-col overflow-hidden rounded-xl text-white transition-all duration-500 hover:shadow-xl hover:shadow-[#00d462]/10 hover:-translate-y-1 bg-[#111111] border border-gray-800/50 h-full">
    <div className="relative flex transition-opacity duration-500 opacity-100 min-h-[300px] items-end overflow-hidden">
      <img
        alt={item.title}
        loading="lazy"
        width="900"
        height="600"
        decoding="async"
        className="h-full max-h-[300px] w-full origin-center object-cover transition-all duration-700 ease-out scale-105 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
        src={item.imageSrc}
      />
      <div className="absolute inset-0 h-1/3 bg-gradient-to-b from-[#00d462]/20 to-transparent pointer-events-none"></div>
    </div>

    <button
      className="absolute bottom-6 right-6 z-10 block rounded-full bg-[#00d462] p-4 shadow-lg shadow-[#00d462]/20 transition-all duration-300 hover:scale-110 hover:shadow-[#00d462]/30"
      onClick={(e) => onPlusClick(e, item)}
      aria-label="Open details"
    >
      <FaPlus className="h-4 w-4 transition-all duration-500 group-hover:rotate-90 text-white" />
    </button>

    <div className="flex flex-col gap-2 p-6">
      <p className="text-balance text-sm text-[#00d462] font-medium tracking-wider uppercase">
        {item.category}
      </p>
      <h3 className="text-lg font-semibold tracking-tight text-balance text-white">
        {item.title}
      </h3>
    </div>
  </div>
);

const DetailDialog = ({ isOpen, onOpenChange, selectedItem }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-[800px] bg-[#111111] border border-gray-800/50 rounded-xl shadow-2xl overflow-hidden">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {selectedItem && (
          <div className="flex flex-col md:flex-row">
            <div className="relative w-full md:w-1/2 h-80 md:h-auto overflow-hidden">
              <img
                src={selectedItem.imageSrc}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d462]/20 via-[#00d462]/10 to-transparent"></div>
            </div>

            <div className="p-6 md:p-8 w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <p className="text-sm text-[#00d462] font-medium tracking-wider uppercase mb-2">
                  {selectedItem.category}
                </p>
                <h3 className="text-2xl font-bold mb-4 text-white">{selectedItem.title}</h3>
                <p className="text-gray-400 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              <div className="flex justify-between items-center mt-8">
                <button className="px-4 py-2 bg-[#00d462] text-white rounded-lg shadow-md hover:shadow-[#00d462]/20 transition-all duration-300 hover:scale-105">
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [itemWidth, setItemWidth] = useState(100);
  const sliderRef = useRef(null);
  const itemsRef = useRef(null);

  const items = [
    {
      category: "Student Support",
      title: "Academic Information Hub",
      description:
        "Access comprehensive information about degree programs, course schedules, and faculty profiles. Get instant answers about university policies, course prerequisites, and program structures through our intelligent chatbot interface.",
      imageSrc: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=900",
    },
    {
      category: "Faculty Assistant",
      title: "Smart Teaching Tools",
      description:
        "Streamline your teaching workflow with automated tools for creating exams, managing class announcements, and tracking course compliance. Get daily schedule updates and manage your classroom activities efficiently.",
      imageSrc: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=900",
    },
    {
      category: "Research & Publications",
      title: "Academic Excellence",
      description:
        "Stay updated with faculty research and publications. Our system automatically tracks and displays research activities, publications, and academic achievements from Google Scholar and LinkedIn.",
      imageSrc: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=900",
    },
    {
      category: "Course Management",
      title: "Learning Analytics",
      description:
        "Monitor student progress and analyze learning outcomes with advanced analytics. Generate comprehensive reports for accreditation and ensure course outlines align with CLOs and PLOs.",
      imageSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=900",
    },
    {
      category: "Smart Communication",
      title: "Seamless Interaction",
      description:
        "Experience smooth communication between students and faculty. Make class announcements, share important updates, and get instant responses to academic queries through our integrated platform.",
      imageSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=900",
    },
  ];

  useEffect(() => {
    const calculateVisibleSlides = () => {
      if (!sliderRef.current) return;
      let slides = 1;
      if (window.innerWidth >= 1280) {
        slides = 2.8;
      } else if (window.innerWidth >= 1024) {
        slides = 1.8;
      } else if (window.innerWidth >= 640) {
        slides = 1.2;
      } else {
        slides = 1.2;
      }
      const width = 100 / slides;
      setItemWidth(width);
      setMaxIndex(items.length - Math.floor(slides) + (slides % 1 > 0 ? 0 : 1));
    };
    calculateVisibleSlides();
    window.addEventListener("resize", calculateVisibleSlides);
    return () => {
      window.removeEventListener("resize", calculateVisibleSlides);
    };
  }, [items.length]);

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handlePlusClick = (e, item) => {
    e.stopPropagation();
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const getTransformValue = () => {
    return `translate3d(-${currentIndex * itemWidth}%, 0px, 0px)`;
  };

  return (
    <section className="relative pb-20 pt-20 md:pb-32 md:pt-32 w-full bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#00d462]/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00d462]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="space-y-4 pb-16 max-w-4xl text-start">
          <span className="inline-block px-3 py-1 text-sm font-medium text-[#00d462] bg-[#00d462]/10 rounded-full">
            FEATURES
          </span>
          <h2 className="text-4xl font-bold sm:text-6xl tracking-tight text-white">
            Campus Hive Features
          </h2>
          <p className="text-xl text-gray-400 leading-relaxed">
            Discover how our AI-powered platform revolutionizes academic life for both students and faculty members. Experience seamless learning and teaching with intelligent assistance.
          </p>
        </div>

        <div className="mx-auto flex max-w-container flex-col items-start">
          <div
            className="relative w-full overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            ref={sliderRef}
          >
            <div className="relative">
              <div
                ref={itemsRef}
                className="flex transition-all duration-700 ease-out"
                style={{ transform: getTransformValue() }}
              >
                {items.map((item, index) => (
                  <div
                    key={index}
                    role="group"
                    aria-roledescription="slide"
                    className="min-w-0 shrink-0 grow-0 px-2"
                    style={{
                      width: `${itemWidth}%`,
                    }}
                  >
                    <CarouselItem item={item} onPlusClick={handlePlusClick} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <NavigationButtons
            currentIndex={currentIndex}
            maxIndex={maxIndex}
            handlePrev={handlePrev}
            handleNext={handleNext}
          />
        </div>
      </div>
      <DetailDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedItem={selectedItem}
      />
    </section>
  );
} 