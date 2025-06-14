"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Safari from "./safari";
import {
  MousePointerClick,
  Code,
  ArrowUpDown,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data = [
  {
    id: 1,
    title: "1. Choose Your Components",
    content:
      "Select from a rich library of pre-built form components. Customize and combine them effortlessly to create forms tailored to your needs.",
    image: "/dummy-image.svg",
    icon: <MousePointerClick className="w-6 h-6 text-primary" />,
    stat: "80% faster form setup",
    testimonial: {
      quote:
        "The component selection was incredibly intuitive. I built my form in minutes!",
      author: "Sarah K.",
      avatar: "https://i.pravatar.cc/500?img=11",
    },
  },
  {
    id: 2,
    title: "2. Add or Reorder Fields",
    content:
      "Easily add new form fields or rearrange existing ones. Our intuitive drag-and-drop interface lets you structure your form exactly the way you want.",
    image: "/dummy-image.svg",
    icon: <ArrowUpDown className="w-6 h-6 text-primary" />,
    stat: "100% customizable layouts",
    testimonial: {
      quote: "The reordering feature saved me hours of development time.",
      author: "Miguel L.",
      avatar: "https://i.pravatar.cc/500?img=11",
    },
  },
  {
    id: 3,
    title: "3. Set Up Form Generation Options",
    content:
      "Define how your form should behave. Configure validation rules, set SSR options, and choose your validation library for maximum flexibility.",
    image: "/dummy-image.svg",
    icon: <Code className="w-6 h-6 text-primary" />,
    stat: "50% fewer validation bugs",
    testimonial: {
      quote: "The validation options are comprehensive yet easy to implement.",
      author: "Alex T.",
      avatar: "https://i.pravatar.cc/500?img=11",
    },
  },
  {
    id: 4,
    title: "4. Deploy and Collect Submissions",
    content:
      "Launch your form and start collecting data immediately. Track submissions in real-time and export data in multiple formats.",
    image: "/dummy-image.svg",
    icon: <CheckCircle className="w-6 h-6 text-primary" />,
    stat: "95% submission completion rate",
    testimonial: {
      quote: "From creation to deployment, the whole process was seamless.",
      author: "Jamie W.",
      avatar: "https://i.pravatar.cc/500?img=11",
    },
  },
];

// Step Indicator Component
interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (index: number) => void;
}
const StepIndicator = ({
  currentStep,
  totalSteps,
  onStepClick,
}: StepIndicatorProps) => {
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
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                currentStep === index
                  ? "border-primary bg-primary text-white"
                  : "border-neutral-300 text-neutral-500 group-hover:border-primary/50"
              )}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className="absolute top-1/2 left-full w-4 md:w-8 h-0.5 bg-neutral-300">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: currentStep > index ? "100%" : "0%" }}
                />
              </div>
            )}
          </div>
          <span
            className={cn(
              "text-xs mt-2 hidden md:block transition-colors",
              currentStep === index
                ? "text-primary font-medium"
                : "text-neutral-500"
            )}
          >
            Step {index + 1}
          </span>
        </button>
      ))}
    </div>
  );
};

// Testimonial Component
interface TestimonialData {
  quote: string;
  author: string;
  avatar: string;
}

interface TestimonialProps {
  testimonial: TestimonialData;
}
const Testimonial = ({ testimonial }: TestimonialProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="flex items-start space-x-3 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 mt-6"
    >
      <div className="flex-shrink-0">
        <Avatar className="h-8 w-8">
          <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
          <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <p className="text-sm text-neutral-700 dark:text-neutral-300 italic mb-2">
          &quot;{testimonial.quote}&quot;
        </p>
        <p className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
          — {testimonial.author}
        </p>
      </div>
    </motion.div>
  );
};

// Main Component
export default function HowItWorks01() {
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
  const handleStepClick = (index: number) => {
    setCurrentIndex(index);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      ref={ref}
      id="features"
      className="pb-20 pt-20 md:pb-32 md:pt-32 overflow-hidden"
    >
      <div className="container mx-auto">
        <div className="flex justify-center">
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="w-full max-w-7xl mx-auto"
          >
            <div className="text-center space-y-4 mb-8">
              <motion.div variants={itemVariants}>
                <Badge>HOW IT WORKS</Badge>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">
                  Build forms in minutes, not hours
                </h2>
              </motion.div>
              <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
                <p className="text-lg text-neutral-600 dark:text-neutral-400 pt-1">
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
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                        {data[currentIndex].icon}
                      </div>
                      <h3 className="text-2xl font-bold">
                        {data[currentIndex].title}
                      </h3>
                    </div>

                    <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      {data[currentIndex].content}
                    </p>

                    <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 flex items-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-primary"
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
                        <h4 className="font-semibold text-neutral-900 dark:text-white">
                          Pro Tip
                        </h4>
                        <p className="text-sm text-neutral-700 dark:text-neutral-300">
                          {data[currentIndex].stat}
                        </p>
                      </div>
                    </div>

                    <Testimonial testimonial={data[currentIndex].testimonial} />

                    <div className="pt-4">
                      <button className="inline-flex items-center space-x-2 text-primary font-medium hover:underline">
                        <span>Learn more about this feature</span>
                        <ChevronRight className="w-4 h-4" />
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
                    <Safari
                      src={data[currentIndex].image}
                      className="w-full h-auto rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-xl"
                    />

                    {/* Progress bar underneath the Safari window */}
                    <div className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded-full mt-6 overflow-hidden">
                      <motion.div
                        className="h-full bg-primary"
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
