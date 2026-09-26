"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "@/app/assets/logo.png";
import {
  getPlanWorkouts,
  getSavedWorkouts,
  WORKOUTS_UPDATED_EVENT,
} from "../lib/workoutStorage";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isMyPlan = pathname === "/my-plan";
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    function refreshCounts() {
      setPlanCount(getPlanWorkouts().length);
      setSavedCount(getSavedWorkouts().length);
    }

    refreshCounts();
    window.addEventListener(WORKOUTS_UPDATED_EVENT, refreshCounts);
    window.addEventListener("storage", refreshCounts);

    return () => {
      window.removeEventListener(WORKOUTS_UPDATED_EVENT, refreshCounts);
      window.removeEventListener("storage", refreshCounts);
    };
  }, []);

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
                isHome ? "bg-[#4b5235] text-[#C2F800]" : "btn-ghost"
              }`}
            >
              Workouts
            </Link>
          </li>

          <li>
            <Link
              href="/my-plan"
              className={`btn btn-sm rounded-full px-5 ${
                isMyPlan ? "bg-[#4b5235] text-[#C2F800]" : "btn-ghost"
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
            {planCount}
          </span>
        </Link>

        <Link
          href="/my-plan?tab=saved"
          className="flex items-center gap-2 text-base-content hover:text-white"
        >
          <span className="text-sm">Saved</span>
          <span className="text-sm font-semibold text-base-content">
            {savedCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}
