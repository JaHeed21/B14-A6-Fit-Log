"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faClock,
  faFire,
  faStar,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { Workout } from "../components/WorkoutCard";
import {
  getPlanWorkouts,
  getSavedWorkouts,
  removeWorkout,
  PLAN_STORAGE_KEY,
  SAVED_STORAGE_KEY,
  WORKOUTS_UPDATED_EVENT,
} from "../lib/workoutStorage";

type PlanTab = "today" | "saved";
type SortOption = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<PlanTab>("today");
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [planWorkouts, setPlanWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  function refreshWorkouts() {
    setPlanWorkouts(getPlanWorkouts());
    setSavedWorkouts(getSavedWorkouts());
  }

  useEffect(() => {
    const requestedTab = new URLSearchParams(window.location.search).get("tab");

    if (requestedTab === "today" || requestedTab === "saved") {
      setActiveTab(requestedTab);
    }

    refreshWorkouts();
    window.addEventListener(WORKOUTS_UPDATED_EVENT, refreshWorkouts);
    window.addEventListener("storage", refreshWorkouts);

    return () => {
      window.removeEventListener(WORKOUTS_UPDATED_EVENT, refreshWorkouts);
      window.removeEventListener("storage", refreshWorkouts);
    };
  }, []);

  const visibleWorkouts = useMemo(() => {
    const workouts = activeTab === "today" ? planWorkouts : savedWorkouts;

    return [...workouts].sort((first, second) => {
      if (sortBy === "calories") {
        return second.caloriesBurned - first.caloriesBurned;
      }
      if (sortBy === "rating") {
        return second.rating - first.rating;
      }
      return second.duration - first.duration;
    });
  }, [activeTab, planWorkouts, savedWorkouts, sortBy]);

  const activeWorkouts = activeTab === "today" ? planWorkouts : savedWorkouts;
  const totalMinutes = activeWorkouts.reduce(
    (total, workout) => total + workout.duration,
    0,
  );
  const totalCalories = activeWorkouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0,
  );

  function removeVisibleWorkout(workoutId: number) {
    removeWorkout(
      activeTab === "today" ? PLAN_STORAGE_KEY : SAVED_STORAGE_KEY,
      workoutId,
    );
  }

  function toggleCompleted(workoutId: number) {
    setCompletedIds((current) =>
      current.includes(workoutId)
        ? current.filter((id) => id !== workoutId)
        : [...current, workoutId],
    );
  }

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[#090a0c] px-4 py-8 sm:px-6 lg:px-9 lg:py-9">
      <div className="mx-auto w-full">
        <header>
          <h1 className="font-oswald text-3xl font-bold uppercase leading-none text-white sm:text-4xl">
            My plan
          </h1>
          <p className="mt-2 text-sm text-[#9296a1]">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </header>

        <section className="mt-6 grid overflow-hidden rounded-[14px] border border-[#292c33] bg-[#15171d] sm:grid-cols-3">
          <PlanStat
            label="Exercises"
            value={String(activeWorkouts.length)}
            accent
          />
          <PlanStat label="Minutes" value={String(totalMinutes)} />
          <PlanStat label="Calories" value={String(totalCalories)} last />
        </section>

        <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="inline-flex w-fit rounded-[10px] border border-[#292c33] bg-[#15171d] p-1">
            <TabButton
              active={activeTab === "today"}
              onClick={() => setActiveTab("today")}
            >
              Today&apos;s plan
            </TabButton>
            <TabButton
              active={activeTab === "saved"}
              onClick={() => setActiveTab("saved")}
            >
              Saved
            </TabButton>
          </div>

          <label className="flex items-center gap-2 text-xs text-[#9296a1]">
            Sort by
            <span className="relative">
              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value as SortOption)
                }
                className="h-9 appearance-none rounded-lg border border-[#292c33] bg-[#15171d] py-0 pl-3 pr-8 text-xs text-[#e3e5e8] outline-none focus:border-[#c2f800]"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories</option>
                <option value="rating">Rating</option>
              </select>
              <FontAwesomeIcon
                icon={faChevronDown}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#9296a1]"
              />
            </span>
          </label>
        </div>

        {visibleWorkouts.length === 0 ? (
          <EmptyState activeTab={activeTab} />
        ) : (
          <div className="mt-6 space-y-4">
            {visibleWorkouts.map((workout) => (
              <PlanWorkoutRow
                key={workout.id}
                workout={workout}
                isCompleted={completedIds.includes(workout.id)}
                onRemove={() => removeVisibleWorkout(workout.id)}
                onComplete={() => toggleCompleted(workout.id)}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

type PlanWorkoutRowProps = {
  workout: Workout;
  isCompleted: boolean;
  onRemove: () => void;
  onComplete: () => void;
};

function PlanWorkoutRow({
  workout,
  isCompleted,
  onRemove,
  onComplete,
}: PlanWorkoutRowProps) {
  return (
    <article className="flex flex-col gap-4 rounded-[14px] border border-[#292c33] bg-[#15171d] p-4 sm:flex-row sm:items-center">
      <Image
        src={workout.image}
        alt={workout.name}
        width={135}
        height={76}
        className="h-19 w-33.75 rounded-lg object-cover"
      />

      <div className="min-w-0 flex-1">
        <h2 className="font-oswald text-base font-bold uppercase text-white">
          {workout.name}
        </h2>
        <p className="mt-1 truncate text-xs text-[#9296a1]">
          {workout.equipment}
        </p>
        <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-[#c2f800]">
          <span>
            <FontAwesomeIcon icon={faClock} /> {workout.duration} min
          </span>
          <span>
            <FontAwesomeIcon icon={faFire} /> {workout.caloriesBurned} kcal
          </span>
          <span>
            <FontAwesomeIcon icon={faStar} /> {workout.rating}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:ml-auto">
        <Link
          href={`/workouts/${workout.id}`}
          className="inline-flex h-9 items-center rounded-full border border-[#3a3e47] px-4 text-xs text-[#e3e5e8] transition-colors hover:border-[#c2f800] hover:text-[#c2f800]"
        >
          View details
        </Link>
        <button
          type="button"
          onClick={onComplete}
          aria-pressed={isCompleted}
          className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-xs font-bold transition-colors ${
            isCompleted
              ? "bg-[#39420f] text-[#c2f800]"
              : "bg-[#c2f800] text-black hover:bg-[#d5ff4a]"
          }`}
        >
          <FontAwesomeIcon icon={faCheck} />
          {isCompleted ? "Done" : "Mark as done"}
        </button>
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="grid size-9 place-items-center text-[#6d727d] transition-colors hover:text-white"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </div>
    </article>
  );
}

function EmptyState({ activeTab }: { activeTab: PlanTab }) {
  return (
    <section className="mt-6 flex min-h-70 flex-col items-center justify-center rounded-[14px] border border-dashed border-[#292c33] px-6 py-12 text-center">
      <h2 className="font-oswald text-xl font-bold uppercase text-white">
        Nothing here yet
      </h2>
      <p className="mt-2 text-xs text-[#9296a1]">
        {activeTab === "today"
          ? "Browse the library and add a lift to get today moving."
          : "Save a workout and it will appear here for later."}
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-9 items-center rounded-full bg-[#c2f800] px-5 text-xs font-bold text-black transition-colors hover:bg-[#d5ff4a]"
      >
        Go to workouts
      </Link>
    </section>
  );
}

type PlanStatProps = {
  label: string;
  value: string;
  accent?: boolean;
  last?: boolean;
};

function PlanStat({
  label,
  value,
  accent = false,
  last = false,
}: PlanStatProps) {
  return (
    <div
      className={`px-6 py-7 sm:px-6 ${
        last ? "" : "border-b border-[#22252c] sm:border-b-0 sm:border-r"
      }`}
    >
      <p className="text-xs text-[#9296a1]">{label}</p>
      <p
        className={`mt-1 font-oswald text-4xl font-bold leading-none ${
          accent ? "text-[#c2f800]" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

type TabButtonProps = {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

function TabButton({ active, onClick, children }: TabButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`h-7 rounded-md px-4 text-xs transition-colors ${
        active
          ? "bg-[#252a33] font-bold text-white"
          : "text-[#9296a1] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
