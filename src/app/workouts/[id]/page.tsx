import Image from "next/image";
import { notFound } from "next/navigation";
import type { Workout } from "../../components/WorkoutCard";
import WorkoutActions from "../../components/WorkoutActions";

const workoutUrl = "https://api.abcz.workers.dev/api/fitlog";

async function getWorkout(id: string): Promise<Workout> {
  const response = await fetch(`${workoutUrl}/${id}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function WorkoutDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);
  const stats = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ];

  return (
    <main className="min-h-screen bg-[#090a0c] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-278.5">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
          <div className="relative aspect-[0.92] overflow-hidden rounded-[10px] border border-[#292c33] bg-[#15171d] lg:aspect-auto lg:min-h-137.5">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="py-1">
            <h1 className="font-oswald text-4xl font-bold uppercase leading-none text-white sm:text-5xl">
              {workout.name}
            </h1>
            <p className="mt-4 max-w-140 text-sm leading-6 text-[#9da1ad]">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map((muscleGroup) => (
                <span
                  key={muscleGroup}
                  className="rounded-full bg-[#c2f800] px-3 py-1 text-[10px] font-bold uppercase text-black"
                >
                  {muscleGroup}
                </span>
              ))}
            </div>

            <dl className="mt-5 overflow-hidden rounded-[10px] border border-[#292c33] bg-[#15171d]">
              {stats.map((stat, index) => (
                <DetailStat
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  last={index === stats.length - 1}
                />
              ))}
            </dl>

            <div className="mt-7">
              <h2 className="font-oswald text-sm font-bold uppercase text-white">
                Instructions
              </h2>
              <ol className="mt-3 space-y-3 text-xs leading-5 text-[#a0a4ae]">
                {workout.instructions.map((instruction, index) => (
                  <li key={instruction} className="flex gap-3">
                    <span className="text-[#6e7480]">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
            <WorkoutActions workout={workout} />
          </div>
        </section>
      </div>
    </main>
  );
}

type DetailStatProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  last?: boolean;
};

function DetailStat({ label, value, icon, last = false }: DetailStatProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 px-5 py-3 text-xs ${
        last ? "" : "border-b border-[#22252c]"
      }`}
    >
      <dt className="text-[10px] font-bold uppercase tracking-wide text-[#8e939f]">
        {label}
      </dt>
      <dd className="flex items-center gap-2 text-right text-[#e3e5e8]">
        {icon}
        {value}
      </dd>
    </div>
  );
}
