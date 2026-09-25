"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar w-auto bg-base-200 border-t border-base-300 px-6">
      {/* Left: Logo */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="FitLog Logo" priority />
          <h1 className="font-oswald font-bold text-xl uppercase text-white">
            FITLOG
          </h1>
        </Link>
      </div>

      {/* Center: Nav links */}
      <div className="navbar-center">
        <ul className="flex items-center gap-1">
          <li>
            <Link
              href="/"
              className={`btn rounded-full px-5 ${
                1 ? "bg-[#4b5235] text-[#C2F800]" : "btn-ghost"
              }`}
            >
              Workouts
            </Link>
          </li>

          <li>
            <Link
              href="/my-plan"
              className={`btn btn-sm rounded-full px-5 ${
                0 ? "bg-[#4b5235] text-[#C2F800]" : "btn-ghost"
              }`}
            >
              My Plan
            </Link>
          </li>
        </ul>
      </div>

      {/* Right: Plan & Saved counters */}
      <div className="navbar-end gap-4">
        <Link
          href="/my-plan?tab=today"
          className="flex items-center gap-2 text-base-content hover:text-white"
        >
          <span className="text-sm">Plan</span>
          <span className="badge bg-[#C2F800] text-black badge-sm font-bold">
            0
          </span>
        </Link>

        <Link
          href="/my-plan?tab=saved"
          className="flex items-center gap-2 text-base-content hover:text-white"
        >
          <span className="text-sm">Saved</span>
          <span className="text-sm font-semibold text-base-content">0</span>
        </Link>
      </div>
    </nav>
  );
}
