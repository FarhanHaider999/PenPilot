import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus("invalid");
      return;
    }

    // Simulate API call
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto p-10 text-center"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-center mb-4">
          <Mail className="w-10 h-10 text-gray-700" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Stay in the Loop 
        </h2>
        <p className="text-gray-500 mb-6">
          Subscribe to get the latest articles, trends, and insights delivered straight to your inbox.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent text-gray-700"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition disabled:opacity-70"
          >
            {status === "loading" ? (
              <span className="animate-pulse">Subscribing...</span>
            ) : (
              <>
                <Send className="w-5 h-5" /> Subscribe
              </>
            )}
          </button>
        </form>

        {status === "invalid" && (
          <p className="text-red-500 text-sm mt-3">Please enter a valid email.</p>
        )}
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-600 text-sm mt-3"
          >
            ✅ You're subscribed! Welcome to the community.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Newsletter;
