"use client";

import { ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const messages = [
  "Take a deep breath...",
  "It's okay to get lost sometimes.",
  "Let's find our way back together.",
  "The path is part of the journey.",
  "Pause. Reflect. Return.",
];

export default function NotFound() {
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(messages[Math.floor(Math.random() * messages.length)] || "");

    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex-1 flex flex-col items-center justify-center p-4 z-10">
        <div
          className={`text-center max-w-md transition-all duration-1000 transform ${
            showMessage
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <div className="mb-6 flex justify-center">
            <div className="text-4xl animate-pulse-slow">404</div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Page not found
          </h1>

          <p className="text-xl mb-8 opacity-80">{message}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all"
            >
              <Home size={20} />
              <span>Return Home</span>
            </Link>

            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg backdrop-blur-sm bg-black/20 hover:bg-black/30 transition-all"
            >
              <ArrowLeft size={20} />
              <span>Go Back</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 flex justify-between items-end overflow-hidden opacity-30 pointer-events-none">
        <div className="w-24 h-24 rounded-full bg-primary/20 animate-pulse-slow"></div>
        <div
          className="w-16 h-16 rounded-full bg-primary/20 animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="w-20 h-20 rounded-full bg-primary/20 animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="w-12 h-12 rounded-full bg-primary/20 animate-pulse-slow"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="w-28 h-28 rounded-full bg-primary/20 animate-pulse-slow"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <footer className="p-4 text-center text-sm opacity-50">
        <p>Take a moment to relax. Then find your way back.</p>
      </footer>
    </div>
  );
}
