import type { Workout } from "../components/WorkoutCard";

export const PLAN_STORAGE_KEY = "fitlog-todays-plan";
export const SAVED_STORAGE_KEY = "fitlog-saved-workouts";
export const WORKOUTS_UPDATED_EVENT = "fitlog-workouts-updated";

function readWorkouts(key: string): Workout[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as Workout[]) : [];
  } catch {
    return [];
  }
}

function writeWorkouts(key: string, workouts: Workout[]) {
  localStorage.setItem(key, JSON.stringify(workouts));
  window.dispatchEvent(new Event(WORKOUTS_UPDATED_EVENT));
}

export function getPlanWorkouts() {
  return readWorkouts(PLAN_STORAGE_KEY);
}

export function getSavedWorkouts() {
  return readWorkouts(SAVED_STORAGE_KEY);
}

export function hasWorkout(key: string, workoutId: number) {
  return readWorkouts(key).some((workout) => workout.id === workoutId);
}

export function toggleWorkout(key: string, workout: Workout, limit?: number) {
  const workouts = readWorkouts(key);
  const exists = workouts.some((item) => item.id === workout.id);
  const nextWorkouts = exists
    ? workouts.filter((item) => item.id !== workout.id)
    : limit && workouts.length >= limit
      ? workouts
      : [...workouts, workout];

  writeWorkouts(key, nextWorkouts);
  return {
    workouts: nextWorkouts,
    changed: exists || nextWorkouts.length > workouts.length,
  };
}

export function removeWorkout(key: string, workoutId: number) {
  writeWorkouts(
    key,
    readWorkouts(key).filter((workout) => workout.id !== workoutId),
  );
}
