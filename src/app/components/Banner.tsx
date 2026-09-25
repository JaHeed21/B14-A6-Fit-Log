import Image from "next/image";
import Link from "next/link";
import banner from "@/app/assets/banner.png";

export default function Banner() {
  return (
    <main className="bg-[#090a0c] mt-10">
      <section className="mx-auto grid  w-auto items-center overflow-hidden rounded-[14px] border border-[#272a31] bg-[#15171d] px-8 py-10 sm:px-12 lg:grid-cols-[1fr_340px] lg:px-12 lg:py-10">
        <div className="relative z-10 w-auto">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.08em] text-[#c2f800]">
            Workout library
          </p>

          <h1 className="font-oswald text-5xl font-bold uppercase leading-[0.98] text-white sm:text-6xl lg:text-[58px]">
            Train with intent. Log every set.
          </h1>

          <p className="mt-5 max-w-[510px] text-[15px] leading-6 text-[#9da1ad] sm:text-base">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="/workouts"
            className="mt-6 inline-flex h-9 items-center rounded-[5px] bg-[#c2f800] px-[22px] text-[11px] font-bold uppercase text-black transition-colors hover:bg-[#d5ff4a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2f800]"
          >
            Browse workouts
          </Link>
        </div>

        <div className="relative mx-auto mt-8 h-[285px] w-full max-w-[370px] lg:mt-0 lg:h-[350px]">
          <Image
            src={banner}
            alt="Person using a seated exercise bike"
            fill
            priority
            className="object-contain"
          />
        </div>
      </section>
    </main>
  );
}
