import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  User,
  History,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const [openMenu, setOpenMenu] =
    useState(false);

  return (
    <div className="relative z-50 px-6 pt-8">

      <div className="flex justify-between items-start">

        {/* LEFT SIDE */}
        <div>
          <div className="flex items-center gap-5">

            {/* logo */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="h-20 w-20 rounded-[28px] bg-cyan-500/10 border border-cyan-400/20 backdrop-blur-xl flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.15)]"
            >
              <ShieldCheck
                size={38}
                className="text-cyan-400"
              />
            </motion.div>

            {/* title */}
            <div>
              <motion.h1
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                className="text-7xl md:text-8xl font-black tracking-[-0.04em] leading-none font-[Sora]"
              >
                <motion.span
                  animate={{
                    backgroundPosition: [
                      "0%",
                      "100%",
                      "0%",
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                  }}
className="font-[Sora] bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-[length:300%] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(34,211,238,0.12)]"                >
                  DeskGuard
                </motion.span>
              </motion.h1>

              <p className="text-slate-400 mt-2 text-sm">
                Real-time library occupancy &
                anti-hoarding system
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PROFILE */}
        <div className="relative">

          {/* profile button */}
          <motion.button
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              setOpenMenu(!openMenu)
            }
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[28px] px-5 py-4 flex items-center gap-4 hover:border-cyan-400/20 transition"
          >
            <div className="h-14 w-14 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-400/20">
              <User className="text-cyan-400" />
            </div>

            <div className="text-left">
              <h2 className="text-white font-semibold">
                Aashi
              </h2>

              <p className="text-slate-400 text-sm">
                Student Login
              </p>
            </div>

            <motion.div
              animate={{
                rotate: openMenu
                  ? 180
                  : 0,
              }}
            >
              <ChevronDown className="text-slate-400" />
            </motion.div>
          </motion.button>

          {/* dropdown */}
          <AnimatePresence>
            {openMenu && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute right-0 mt-3 w-[260px] bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-[30px] p-4 shadow-2xl"
              >
                <div className="space-y-2">

                  <MenuItem
                    icon={<User size={18} />}
                    text="Profile"
                  />

                  <MenuItem
                    icon={<History size={18} />}
                    text="Booking History"
                  />

                  <MenuItem
                    icon={<Settings size={18} />}
                    text="Settings"
                  />

                  <div className="h-px bg-white/10 my-2" />

                  <MenuItem
                    icon={<LogOut size={18} />}
                    text="Logout"
                    danger
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  text,
  danger,
}) {
  return (
    <button
      className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 transition
      ${
        danger
          ? "text-red-400 hover:bg-red-500/10"
          : "text-slate-300 hover:text-cyan-400 hover:bg-white/5"
      }`}
    >
      {icon}

      <span className="text-sm">
        {text}
      </span>
    </button>
  );
}