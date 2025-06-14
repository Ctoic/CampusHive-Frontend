"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface FAQProps {
  question: string;
  answer: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Is this template free?",
    answer: "Yes. It is a free NextJS Shadcn template.",
  },
  {
    question: "Duis aute irure dolor in reprehenderit in voluptate velit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint labore quidem quam consectetur sapiente, iste rerum reiciendis animi nihil nostrum sit quo, modi quod.",
  },
  {
    question:
      "Lorem ipsum dolor sit amet Consectetur natus dolor minus quibusdam?",
    answer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore qui nostrum reiciendis veritatis.",
  },
  {
    question: "Excepteur sint occaecat cupidata non proident sunt?",
    answer: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
  },
  {
    question:
      "Enim ad minim veniam, quis nostrud exercitation ullamco laboris?",
    answer: "consectetur adipisicing elit. Sint labore.",
  },
];

export default function FAQ03() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="pb-20 pt-20 md:pb-32 md:pt-32 container mx-auto md:w-[700px]">
      <div className="text-center space-y-4 pb-8 mx-auto">
        <Badge>FAQ</Badge>
        <h2 className="text-3xl font-bold sm:text-5xl tracking-tight">
          Frequently asked questions
        </h2>
        <p className="text-xl text-muted-foreground pt-1">
          Startups & Corporations sharing our vision at Fazier
        </p>
      </div>

      <div className="mx-auto mb-12 md:max-w-[800px]">
        {FAQList.map((faq, index) => (
          <div
            key={index}
            className="w-full border rounded-lg overflow-hidden mt-2"
          >
            <h3 className="flex">
              <button
                type="button"
                onClick={() => toggleAccordion(index)}
                className="flex flex-1 items-center justify-between py-4 px-4 font-medium transition-all hover:underline"
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
              <div className="px-4 pb-4 text-sm text-foreground transition-all">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <h4 className="text-center text-sm font-medium tracking-tight text-foreground/80">
        Still have questions? Email us at{" "}
        <a href="mailto:support@example.com" className="underline text-primary">
          support@example.com
        </a>
      </h4>
    </section>
  );
}
