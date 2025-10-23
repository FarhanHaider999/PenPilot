import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus("invalid");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1500);
  };

  return (
    <section className="relative w-full py-24 overflow-hidden bg-white">
      {/* Decorative background shapes */}
      <div className="absolute -top-24 -right-32 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute -bottom-24 -left-32 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto text-center px-6"
      >
        {/* Title Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-2xl shadow-sm">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Be the First to Know
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Be part of a growing network of innovators and creators exploring
            the future of AI. Fresh articles and updates, straight to your
            inbox.
          </p>
        </motion.div>

        {/* Email Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-3 justify-center"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full sm:w-2/3 px-5 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={status === "loading"}
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition disabled:opacity-60"
          >
            {status === "loading" ? (
              <span className="animate-pulse">Subscribing...</span>
            ) : (
              <>
                <Send className="w-5 h-5" /> Subscribe
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Status messages */}
        <div className="mt-4">
          {status === "invalid" && (
            <p className="text-red-500 text-sm">Please enter a valid email.</p>
          )}
          {status === "success" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-green-600 text-sm"
            >
              ✅ You’re subscribed!
            </motion.p>
          )}
        </div>

        {/* Subtle bottom divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 mx-auto w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full origin-left"
        />
      </motion.div>
    </section>
  );
};

export default Newsletter;
