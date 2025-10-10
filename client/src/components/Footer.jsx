import React from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Facebook, Twitter, Github } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-8 sm:px-20 xl:px-32 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          {/* Logo */}
          <div>
            <h1
              onClick={() => navigate("/")}
              className="text-3xl font-extrabold tracking-tight text-gray-900 cursor-pointer"
            >
              <span className="text-blue-600">Pen</span>Pilot
            </h1>
            <p className="text-gray-500 mt-3 max-w-sm">
              A place where ideas take flight — explore inspiring blogs,
              tutorials, and stories crafted by creators for creators.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-10">
            <div>
              <h3 className="text-gray-900 font-semibold mb-3">Explore</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-blue-600 transition"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-blue-600 transition"
                  >
                    Blogs
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-blue-600 transition"
                  >
                    About
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-gray-900 font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-gray-600">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-blue-600 transition"
                  >
                    Contact
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-blue-600 transition"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-blue-600 transition"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Connect</h3>
            <div className="flex gap-4">
              <a
                href="mailto:hello@penpilot.com"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} PenPilot. All rights reserved.</p>
          <p>
            Built with ❤️ by{" "}
            <span className="text-blue-600 font-semibold">Farhan Haider</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
