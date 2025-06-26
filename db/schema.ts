import { sql } from 'drizzle-orm';
import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

// Users table for basic user information
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').unique(),
  level: integer('level').default(1).notNull(),
  totalXP: integer('total_xp').default(0).notNull(),
  currentStreak: integer('current_streak').default(0).notNull(),
  longestStreak: integer('longest_streak').default(0).notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text('updated_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

// Workouts table for tracking workout sessions
export const workouts = sqliteTable('workouts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  type: text('type').notNull(), // 'strength', 'cardio', 'flexibility', etc.
  duration: integer('duration'), // in minutes
  caloriesBurned: integer('calories_burned'),
  xpEarned: integer('xp_earned').default(0).notNull(),
  difficulty: text('difficulty').notNull(), // 'beginner', 'intermediate', 'advanced'
  isCompleted: integer('is_completed', { mode: 'boolean' }).default(false).notNull(),
  completedAt: text('completed_at'),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

// Exercises table for individual exercises
export const exercises = sqliteTable('exercises', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  category: text('category').notNull(), // 'push', 'pull', 'legs', 'core', 'cardio'
  muscleGroups: text('muscle_groups').notNull(), // JSON string of muscle groups
  instructions: text('instructions'),
  difficulty: text('difficulty').notNull(),
  xpValue: integer('xp_value').default(10).notNull(),
});

// Workout exercises junction table
export const workoutExercises = sqliteTable('workout_exercises', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  workoutId: integer('workout_id').notNull().references(() => workouts.id),
  exerciseId: integer('exercise_id').notNull().references(() => exercises.id),
  sets: integer('sets'),
  reps: integer('reps'),
  weight: real('weight'), // in kg
  duration: integer('duration'), // in seconds for time-based exercises
  restTime: integer('rest_time'), // in seconds
  isCompleted: integer('is_completed', { mode: 'boolean' }).default(false).notNull(),
});

// Daily goals/challenges
export const dailyChallenges = sqliteTable('daily_challenges', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  type: text('type').notNull(), // 'workout', 'steps', 'calories', 'water'
  target: integer('target').notNull(),
  xpReward: integer('xp_reward').default(50).notNull(),
  date: text('date').notNull(), // YYYY-MM-DD format
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
});

// User challenge progress
export const userChallenges = sqliteTable('user_challenges', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  challengeId: integer('challenge_id').notNull().references(() => dailyChallenges.id),
  progress: integer('progress').default(0).notNull(),
  isCompleted: integer('is_completed', { mode: 'boolean' }).default(false).notNull(),
  completedAt: text('completed_at'),
});

// Health metrics tracking
export const healthMetrics = sqliteTable('health_metrics', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  type: text('type').notNull(), // 'weight', 'body_fat', 'muscle_mass', 'water_intake', 'sleep', 'steps'
  value: real('value').notNull(),
  unit: text('unit').notNull(), // 'kg', 'lbs', '%', 'ml', 'hours', 'count'
  date: text('date').notNull(), // YYYY-MM-DD format
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

// Motivational quotes
export const motivationalQuotes = sqliteTable('motivational_quotes', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  text: text('text').notNull(),
  author: text('author'),
  category: text('category'), // 'fitness', 'motivation', 'success'
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
});

// Type exports for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Workout = typeof workouts.$inferSelect;
export type NewWorkout = typeof workouts.$inferInsert;
export type Exercise = typeof exercises.$inferSelect;
export type NewExercise = typeof exercises.$inferInsert;
export type WorkoutExercise = typeof workoutExercises.$inferSelect;
export type NewWorkoutExercise = typeof workoutExercises.$inferInsert;
export type DailyChallenge = typeof dailyChallenges.$inferSelect;
export type NewDailyChallenge = typeof dailyChallenges.$inferInsert;
export type UserChallenge = typeof userChallenges.$inferSelect;
export type NewUserChallenge = typeof userChallenges.$inferInsert;
export type HealthMetric = typeof healthMetrics.$inferSelect;
export type NewHealthMetric = typeof healthMetrics.$inferInsert;
export type MotivationalQuote = typeof motivationalQuotes.$inferSelect;
export type NewMotivationalQuote = typeof motivationalQuotes.$inferInsert; 