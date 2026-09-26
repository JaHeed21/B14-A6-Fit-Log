export default function Loading() {
  return (
    <main
      className="min-h-screen bg-[#090a0c] px-4 pb-12 sm:px-6 lg:px-8"
      aria-busy="true"
      aria-label="Loading workouts"
    >
      <section className="mt-10 grid min-h-101.25 animate-pulse items-center gap-8 overflow-hidden rounded-[14px] border border-[#272a31] bg-[#15171d] px-8 py-10 sm:px-12 lg:grid-cols-[1fr_340px] lg:px-12">
        <div>
          <div className="h-3 w-28 rounded bg-[#343840]" />
          <div className="mt-6 h-12 max-w-xl rounded bg-[#343840] sm:h-16" />
          <div className="mt-3 h-12 max-w-md rounded bg-[#292c33] sm:h-16" />
          <div className="mt-6 h-4 max-w-lg rounded bg-[#292c33]" />
          <div className="mt-2 h-4 max-w-sm rounded bg-[#292c33]" />
          <div className="mt-7 h-9 w-40 rounded-[5px] bg-[#39420f]" />
        </div>
        <div className="mx-auto h-65 w-full max-w-75 rounded-lg bg-[#22252c] lg:h-75" />
      </section>

      <section className="mx-auto mt-10 w-auto">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-7 w-40 animate-pulse rounded bg-[#292c33]" />
          <div className="size-4 animate-spin rounded-full border-2 border-[#3a3e47] border-t-[#c2f800] motion-reduce:animate-none" />
          <span className="sr-only">Loading workout library</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-[10px] border border-[#292c33] bg-[#15171d]"
            >
              <div className="aspect-[2.05/1] animate-pulse bg-[#22252c]" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-24 animate-pulse rounded-full bg-[#39420f]" />
                <div className="h-6 w-3/4 animate-pulse rounded bg-[#292c33]" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-[#22252c]" />
                <div className="mt-5 h-8 animate-pulse rounded bg-[#22252c]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
