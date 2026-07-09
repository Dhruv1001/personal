"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type GardenButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  "aria-label"?: string;
};

export default function GardenButton({
  children,
  onClick,
  disabled,
  className = "",
  type = "button",
  ...aria
}: GardenButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      {...aria}
      className={`ripple group relative flex items-center gap-2 px-7 py-3 text-base font-semibold text-[#4a2f3d] shadow-lg transition disabled:cursor-not-allowed disabled:opacity-50 sm:text-lg ${className}`}
      style={{
        background: "linear-gradient(135deg, #FFF8F0, #F8D7E6 55%, #E9C46A)",
        border: "1px solid rgba(233,196,106,0.7)",
        borderRadius: "50% 18% 50% 18% / 18% 50% 18% 50%",
      }}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
    >
      <motion.span
        className="inline-block text-lg"
        whileHover={{ rotate: 90, scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        🌸
      </motion.span>
      {children}
    </motion.button>
  );
}
