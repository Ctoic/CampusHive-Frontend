import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export default function CTA() {
  return (
    <section className="relative pb-20 pt-20 md:pb-32 md:pt-32 bg-[#0A0A0A] text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#00d462]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00d462]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex w-full flex-col gap-16 overflow-hidden rounded-xl bg-[#111111] border border-gray-800/50 p-8 md:p-16 lg:flex-row lg:items-center">
          <div className="flex-1 space-y-4">
            <Badge className="bg-[#00d462] text-black hover:bg-[#00d462]/90 transition-colors duration-300">
              Get Started
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl lg:text-4xl/none text-white">
              Ready to Transform Your Campus Experience?
            </h2>
            <p className="text-xl text-gray-400 pt-1">
              Join thousands of students and faculty members who are already using CampusHive to enhance their academic journey.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-4 sm:flex-row">
            <Button 
              variant="outline" 
              className="border-[#00d462]/20 text-white hover:bg-[#00d462]/10 hover:text-[#00d462] transition-all duration-300"
            >
              Learn More
            </Button>
            <Link to="/signup">
              <Button 
                className="bg-[#00d462] text-black hover:bg-[#00d462]/90 transition-all duration-300"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 