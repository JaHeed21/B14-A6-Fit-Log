import Banner from "./components/Banner";

const workoutsUrl = "https://api.abcz.workers.dev/api/fitlog";

async function getWorksouts() {
  const response = await fetch(workoutsUrl, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error("Unable to load workouts");
  }

  return response.json();
}

export default async function Home() {
  return (
    <main className="bg-[#090a0c] px-4 pb-12 sm:px-6 lg:px-8">
      <Banner />
      <section className="mx-auto mt-10 w-auto">
        <div className="mb-5">
          <h1 className="font-oswald text-2xl font-bold uppercase text-white sm:text-3xl">
            The library
          </h1>
          <p className="mt-1 text-sm text-[#9296a1]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
      </section>
    </main>
  );
}
