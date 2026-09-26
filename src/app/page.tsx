import Banner from "./components/Banner";
import WorkoutCard, { type Workout } from "./components/WorkoutCard";

const workoutsUrl = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(workoutsUrl, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error("Unable to load workouts");
  }

  return response.json();
}

export default async function Home() {
  const workouts = await getWorkouts();

  return (
    <main className="bg-[#090a0c] px-4 pb-12 sm:px-6 lg:px-8">
      <Banner />

      <section className="mx-auto mt-10 w-auto">
        <div className="mb-5">
          <h1 className="font-oswald text-2xl font-bold uppercase text-white sm:text-3xl">
            The library
          </h1>
          <p className="mt-1 text-xs text-[#9296a1]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      </section>
    </main>
  );
}
