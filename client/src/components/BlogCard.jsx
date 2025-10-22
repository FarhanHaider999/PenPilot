import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  if (!blog) return null;

  const { _id, title, description, category, image } = blog;

  // ✨ Clean description
  const cleanHTML = DOMPurify.sanitize(description);
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = cleanHTML;
  const previewText = tempDiv.textContent?.slice(0, 220) + "...";

  // Hover 3D Motion
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  // 🌀 Scroll-triggered animation
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"], // triggers as card enters viewport
  });

  // Smooth spring transforms for scroll reveal
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.8,
  });

  const opacity = useTransform(springProgress, [0, 1], [0, 1]);
  const translateY = useTransform(springProgress, [0, 1], [80, 0]);
  const scale = useTransform(springProgress, [0, 1], [0.95, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        opacity,
        y: translateY,
        scale,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => navigate(`/blog/${_id}`)}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="relative cursor-pointer w-full max-w-6xl mx-auto my-10"
    >
      {/* Background light orb */}
      <motion.div
        animate={
          isHovered ? { scale: [1, 1.2, 1], opacity: [0.15, 0.35, 0.15] } : {}
        }
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute -inset-8 bg-gradient-to-r from-blue-400 via-violet-500 to-cyan-400 rounded-3xl blur-3xl opacity-0 group-hover:opacity-40 transition-all pointer-events-none"
      />

      {/* Main Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative bg-gradient-to-br from-slate-100 via-zinc-50 to-white rounded-3xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row h-[480px]"
      >
        {/* Image */}
        <div className="relative md:w-1/2 h-full overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs text-white font-semibold uppercase tracking-wide">
            {category}
          </div>

          {/* Subtle light sweep */}
          <motion.div
            initial={{ x: "-150%" }}
            animate={isHovered ? { x: "150%" } : {}}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent transform rotate-12"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between p-10 md:w-1/2">
          <div>
            <h3 className="text-3xl font-bold text-zinc-800 mb-4 leading-tight">
              {title}
            </h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed line-clamp-5">
              {previewText}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6 border-t border-zinc-200 pt-4">
            <motion.button
              whileHover={{ x: 6 }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-zinc-600 to-blue-800 text-white text-sm font-semibold shadow-md flex items-center gap-2"
            >
              Read More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </motion.button>

            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>⏱ 5 min</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full" />
              <span>12.5K views</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BlogCard;
