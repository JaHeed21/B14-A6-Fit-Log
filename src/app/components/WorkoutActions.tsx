"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { Workout } from "./WorkoutCard";
import {
  hasWorkout,
  PLAN_STORAGE_KEY,
  SAVED_STORAGE_KEY,
  toggleWorkout,
  WORKOUTS_UPDATED_EVENT,
} from "../lib/workoutStorage";

type WorkoutActionsProps = {
  workout: Workout;
};

export default function WorkoutActions({ workout }: WorkoutActionsProps) {
  const [isAdded, setIsAdded] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    function syncWorkoutState() {
      setIsAdded(hasWorkout(PLAN_STORAGE_KEY, workout.id));
      setIsSaved(hasWorkout(SAVED_STORAGE_KEY, workout.id));
    }

    syncWorkoutState();
    window.addEventListener(WORKOUTS_UPDATED_EVENT, syncWorkoutState);
    window.addEventListener("storage", syncWorkoutState);

    return () => {
      window.removeEventListener(WORKOUTS_UPDATED_EVENT, syncWorkoutState);
      window.removeEventListener("storage", syncWorkoutState);
    };
  }, [workout.id]);

  function togglePlan() {
    if (isAdded) return;

    const result = toggleWorkout(PLAN_STORAGE_KEY, workout, 5);
    const added = result.workouts.some((item) => item.id === workout.id);
    setIsAdded(added);

    if (added) {
      toast.success(`${workout.name} added to today's plan.`);
    } else {
      toast.error("Today's plan is full. Remove a workout before adding another.");
    }
  }

  function toggleSaved() {
    const result = toggleWorkout(SAVED_STORAGE_KEY, workout);
    const saved = result.workouts.some((item) => item.id === workout.id);
    setIsSaved(saved);
    toast.success(
      saved
        ? `${workout.name} saved for later.`
        : `${workout.name} removed from saved workouts.`,
    );
  }

  return (
    <div className="mt-7 flex flex-wrap gap-3">
      <button
        type="button"
        aria-pressed={isAdded}
        aria-label={
          isAdded
            ? `Remove ${workout.name} from today's plan`
            : `Add ${workout.name} to today's plan`
        }
        onClick={togglePlan}
        disabled={isAdded}
        className={`inline-flex h-9 items-center gap-2 rounded-[5px] px-4 text-[11px] font-bold transition-colors ${
          isAdded
            ? "cursor-not-allowed bg-[#39420f] text-[#c2f800] opacity-75"
            : "bg-[#c2f800] text-black hover:bg-[#d5ff4a]"
        }`}
      >
        <FontAwesomeIcon icon={faCalendarPlus} />
        {isAdded ? "Added to today's plan" : "Add to today's plan"}
      </button>

      <button
        type="button"
        aria-pressed={isSaved}
        aria-label={
          isSaved
            ? `Remove ${workout.name} from saved workouts`
            : `Save ${workout.name} for later`
        }
        onClick={toggleSaved}
        className={`inline-flex h-9 items-center gap-2 rounded-[5px] border px-4 text-[11px] font-bold transition-colors ${
          isSaved
            ? "border-[#c2f800] bg-[#39420f] text-[#c2f800]"
            : "border-[#3a3e47] bg-transparent text-[#e3e5e8] hover:border-[#c2f800] hover:text-[#c2f800]"
        }`}
      >
        <FontAwesomeIcon icon={faBookmark} />
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
