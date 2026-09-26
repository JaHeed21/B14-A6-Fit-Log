import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-[#1c1f24] bg-[#090a0c] px-5 py-10 sm:px-6">
      <div className="mx-auto flex w-auto flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="FitLog home"
        >
          <Image src={logo} alt="" width={18} height={18} />
          <span className="font-oswald text-sm font-bold uppercase text-white">
            FitLog
          </span>
        </Link>

        <p className="text-xs text-[#6d727d]">
          © 2026 FitLog — Workout Library. Train hard. Log honest.
        </p>
      </div>
    </footer>
  );
}
