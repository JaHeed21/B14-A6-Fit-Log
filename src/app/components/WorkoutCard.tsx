"use client";

import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faFire, faStar } from "@fortawesome/free-solid-svg-icons";

export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link href={`/workouts/${workout.id}`} className="block">
      <article className="group overflow-hidden rounded-[10px] border border-[#292c33] bg-[#15171d] transition-colors hover:border-[#53610d]">
        <div className="relative aspect-[2.05/1] overflow-hidden bg-[#252b32]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
            className="object-cover object-[center_30%]  transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <div className="p-4">
          <div className="mb-3 flex min-h-5 gap-2 overflow-hidden">
            {workout.muscleGroups.map((muscleGroup) => (
              <span
                key={muscleGroup}
                className="rounded-full bg-[#c2f800] px-2 py-0.5 text-[13px] font-bold uppercase leading-4 text-black"
              >
                {muscleGroup}
              </span>
            ))}
          </div>

          <h2 className="font-oswald text-xl font-bold uppercase leading-tight text-white">
            {workout.name}
          </h2>
          <p className="mt-1 truncate text-[13px] text-[#8e939f]">
            {workout.equipment}
          </p>

          <div className="my-4 flex items-center gap-10 border-t border-[#25282f] pt-3 text-[15px] text-[#969ba7]">
            <span aria-label={`${workout.duration} minutes`}>
              <FontAwesomeIcon
                icon={faClock}
                className="hover:text-green-400"
              />{" "}
              {workout.duration} min
            </span>
            <span aria-label={`${workout.caloriesBurned} calories`}>
              <FontAwesomeIcon icon={faFire} /> {workout.caloriesBurned} kcal
            </span>
            <span aria-label={`Rating ${workout.rating}`}>
              <FontAwesomeIcon icon={faStar} /> {workout.rating}
              <FontAwesomeIcon icon={faStar} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
