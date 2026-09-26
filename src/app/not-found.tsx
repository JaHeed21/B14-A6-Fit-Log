import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-9rem)] items-center justify-center bg-[#090a0c] px-4 py-16">
      <section className="w-full max-w-xl border-y border-[#292c33] py-12 text-center sm:py-16">
        <p className="font-oswald text-7xl font-bold leading-none text-[#c2f800] sm:text-8xl">
          404
        </p>
        <h1 className="mt-5 font-oswald text-2xl font-bold uppercase text-white sm:text-3xl">
          Page not found
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#9296a1]">
          This page isn&apos;t in the workout plan. The address may be
          incorrect, or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex h-10 items-center gap-2 rounded-[5px] bg-[#c2f800] px-5 text-xs font-bold uppercase text-black transition-colors hover:bg-[#d5ff4a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2f800]"
        >
          <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" />
          Back to workouts
        </Link>
      </section>
    </main>
  );
}
