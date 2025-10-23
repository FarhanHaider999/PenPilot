import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Facebook, Twitter, Github, ArrowUp } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const [showScroll, setShowScroll] = useState(false);

  // Show button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 bg-gradient-to-b from-blue-50 via-white to-white text-gray-800 overflow-hidden">
      {/* Soft radial glow */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.15),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-20 xl:px-32 py-16">
        {/* Top Section */}
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <h1
            onClick={() => navigate("/")}
            className="text-4xl font-extrabold tracking-tight text-gray-900 cursor-pointer"
          >
            <span className="text-blue-600">Pen</span>Pilot
          </h1>

          {/* Description */}
          <p className="mt-4 text-gray-600 max-w-md leading-relaxed">
            Where ideas take flight — explore inspiring blogs, tutorials, and
            stories crafted by creators for creators.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-8">
            {[
              { icon: Mail, link: "mailto:hello@penpilot.com" },
              { icon: Facebook, link: "https://facebook.com" },
              { icon: Twitter, link: "https://twitter.com" },
              { icon: Github, link: "https://github.com" },
            ].map(({ icon: Icon, link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full bg-white shadow-sm border border-gray-100 text-gray-600 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-100 transform hover:-translate-y-1 transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PenPilot. All rights reserved.</p>
          <p className="mt-2">
            Built with ❤️ by{" "}
            <span className="text-blue-600 font-semibold">Farhan Haider</span>
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-blue-300 transition-all duration-300 transform hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
