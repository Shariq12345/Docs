"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, RefreshCwIcon, HomeIcon } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const [isErrorDetailsVisible, setIsErrorDetailsVisible] = useState(false);

  const particlesInit = async (main: any) => {
    await loadSlim(main);
  };

  return (
    <div className="relative min-h-screen">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ff7f7f" },
            shape: { type: "circle" },
            opacity: {
              value: 0.5,
              random: true,
              anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
            },
            size: {
              value: 3,
              random: true,
              anim: { enable: true, speed: 4, size_min: 0.3, sync: false },
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ff7f7f",
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              out_mode: "out",
              bounce: false,
              attract: { enable: false, rotateX: 600, rotateY: 1200 },
            },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { particles_nb: 4 },
            },
          },
          retina_detect: true,
        }}
        className="absolute inset-0 z-0"
        style={{ position: "absolute", width: "100%", height: "100%" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="text-center space-y-6 max-w-md p-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl"
        >
          <motion.div className="flex justify-center">
            <div className="bg-rose-100 p-4 rounded-full animate-pulse">
              <AlertTriangleIcon className="size-12 text-rose-600" />
            </div>
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Oops! Something went wrong
            </h2>
            <p className="text-gray-600">
              Don't worry, technical hiccups happen. We're here to help you get
              back on track.
            </p>

            <motion.div
              className="cursor-pointer"
              onClick={() => setIsErrorDetailsVisible(!isErrorDetailsVisible)}
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-sm text-rose-600 font-medium hover:underline">
                {isErrorDetailsVisible ? "Hide" : "View"} Error Details
              </p>
            </motion.div>

            <AnimatePresence>
              {isErrorDetailsVisible && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 p-4 rounded-lg text-xs text-gray-700 font-mono break-words"
                >
                  {error.message}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-x-4 mt-6">
            <Button
              onClick={reset}
              className="group flex items-center font-semibold px-6 py-3 bg-rose-500 hover:bg-rose-600 transition-colors"
            >
              <RefreshCwIcon className="mr-2 size-4 group-hover:animate-spin" />
              Try Again
            </Button>

            <Button
              variant="ghost"
              className="group flex items-center font-semibold text-gray-600 hover:text-rose-600"
            >
              <Link href="/" className="flex items-center">
                <HomeIcon className="mr-2 size-4 group-hover:scale-110 transition-transform" />
                Go Home
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
