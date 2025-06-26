import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { openDatabaseSync } from 'expo-sqlite';
import * as schema from './schema';
import {
    dailyChallenges,
    exercises,
    healthMetrics,
    motivationalQuotes,
    userChallenges,
    users,
    workouts
} from './schema';

// Open the database
const expo = openDatabaseSync('fitness_tracker.db');
export const db = drizzle(expo, { schema });

// Database initialization function
export async function initializeDatabase() {
  try {
    // Create tables if they don't exist (Drizzle handles this with migrations)
    console.log('Database initialized successfully');
    
    // Check if we need to seed initial data
    await seedInitialData();
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Seed initial data
async function seedInitialData() {
  try {
    // Check if user exists
    const existingUser = await db.select().from(users).limit(1);
    
    if (existingUser.length === 0) {
      // Create default user
      await db.insert(users).values({
        name: 'Jobayer Mahbub',
        email: 'jobayer@example.com',
        level: 1,
        totalXP: 0,
        currentStreak: 0,
        longestStreak: 0,
      });
      console.log('Default user created');
    }

    // Check if exercises exist
    const existingExercises = await db.select().from(exercises).limit(1);
    
    if (existingExercises.length === 0) {
      // Seed initial exercises
      await db.insert(exercises).values([
        {
          name: 'Push Up',
          category: 'push',
          muscleGroups: JSON.stringify(['chest', 'shoulders', 'triceps']),
          instructions: 'Start in plank position, lower body to ground, push back up',
          difficulty: 'intermediate',
          xpValue: 15,
        },
        {
          name: 'Sit Up',
          category: 'core',
          muscleGroups: JSON.stringify(['abs', 'core']),
          instructions: 'Lie on back, sit up bringing chest to knees',
          difficulty: 'beginner',
          xpValue: 10,
        },
        {
          name: 'Squats',
          category: 'legs',
          muscleGroups: JSON.stringify(['quadriceps', 'glutes', 'hamstrings']),
          instructions: 'Stand with feet hip-width apart, lower down as if sitting, return to standing',
          difficulty: 'beginner',
          xpValue: 12,
        },
        {
          name: 'Plank',
          category: 'core',
          muscleGroups: JSON.stringify(['abs', 'core', 'shoulders']),
          instructions: 'Hold body in straight line from head to heels',
          difficulty: 'intermediate',
          xpValue: 20,
        },
      ]);
      console.log('Initial exercises seeded');
    }

    // Check if motivational quotes exist
    const existingQuotes = await db.select().from(motivationalQuotes).limit(1);
    
    if (existingQuotes.length === 0) {
      // Seed motivational quotes
      await db.insert(motivationalQuotes).values([
        {
          text: 'The only bad workout is the one that didn\'t happen.',
          author: 'Unknown',
          category: 'motivation',
        },
        {
          text: 'Your body can do it. It\'s your mind you need to convince.',
          author: 'Unknown',
          category: 'motivation',
        },
        {
          text: 'Strength doesn\'t come from what you can do. It comes from overcoming the things you once thought you couldn\'t.',
          author: 'Rikki Rogers',
          category: 'strength',
        },
        {
          text: 'Success isn\'t always about greatness. It\'s about consistency.',
          author: 'Dwayne Johnson',
          category: 'success',
        },
        {
          text: 'The groundwork for all happiness is good health.',
          author: 'Leigh Hunt',
          category: 'fitness',
        },
      ]);
      console.log('Motivational quotes seeded');
    }

    // Seed today's daily challenges
    const today = new Date().toISOString().split('T')[0];
    const existingChallenges = await db.select().from(dailyChallenges).where(eq(dailyChallenges.date, today));
    
    if (existingChallenges.length === 0) {
      await db.insert(dailyChallenges).values([
        {
          title: 'Push Up Challenge',
          description: 'Complete 100 push-ups today',
          type: 'workout',
          target: 100,
          xpReward: 100,
          date: today,
        },
        {
          title: 'Sit Up Challenge',
          description: 'Complete 30 sit-ups today',
          type: 'workout',
          target: 30,
          xpReward: 50,
          date: today,
        },
        {
          title: 'Water Intake',
          description: 'Drink 2000ml of water today',
          type: 'water',
          target: 2000,
          xpReward: 30,
          date: today,
        },
      ]);
      console.log('Daily challenges seeded for today');
    }

    // Seed some health metrics for demo
    const existingMetrics = await db.select().from(healthMetrics).limit(1);
    
    if (existingMetrics.length === 0) {
      await db.insert(healthMetrics).values([
        {
          userId: 1,
          type: 'steps',
          value: 2390,
          unit: 'count',
          date: today,
        },
        {
          userId: 1,
          type: 'water_intake',
          value: 1000,
          unit: 'ml',
          date: today,
        },
        {
          userId: 1,
          type: 'weight',
          value: 70,
          unit: 'kg',
          date: today,
        },
      ]);
      console.log('Health metrics seeded');
    }

  } catch (error) {
    console.error('Error seeding initial data:', error);
  }
}

// Helper functions for common database operations
export async function getCurrentUser() {
  const user = await db.select().from(users).limit(1);
  return user[0] || null;
}

export async function getTodaysWorkouts() {
  const today = new Date().toISOString().split('T')[0];
  return await db.select().from(workouts).where(eq(workouts.createdAt, today));
}

export async function getTodaysChallenges() {
  const today = new Date().toISOString().split('T')[0];
  return await db.select().from(dailyChallenges).where(eq(dailyChallenges.date, today));
}

export async function getRandomQuote() {
  const quotes = await db.select().from(motivationalQuotes).where(eq(motivationalQuotes.isActive, true));
  if (quotes.length === 0) return null;
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export async function getTodaysMetrics() {
  const today = new Date().toISOString().split('T')[0];
  return await db.select().from(healthMetrics).where(eq(healthMetrics.date, today));
}

export async function getUserChallengeProgress(userId: number) {
  const today = new Date().toISOString().split('T')[0];
  
  return await db
    .select({
      challenge: dailyChallenges,
      progress: userChallenges.progress,
      isCompleted: userChallenges.isCompleted,
    })
    .from(dailyChallenges)
    .leftJoin(userChallenges, eq(userChallenges.challengeId, dailyChallenges.id))
    .where(eq(dailyChallenges.date, today));
}

// Get user workout statistics
export async function getUserWorkoutStats(userId: number) {
  const completedWorkouts = await db
    .select()
    .from(workouts)
    .where(and(eq(workouts.userId, userId), eq(workouts.isCompleted, true)));

  const totalWorkouts = completedWorkouts.length;
  const totalMinutes = completedWorkouts.reduce((sum, workout) => sum + (workout.duration || 0), 0);
  const totalVolume = await getTotalVolumeLifted(userId);

  return {
    totalWorkouts,
    totalMinutes,
    totalVolume,
  };
}

// Get total volume lifted (sum of weight * reps * sets)
export async function getTotalVolumeLifted(userId: number) {
  const userWorkouts = await db
    .select({ id: workouts.id })
    .from(workouts)
    .where(and(eq(workouts.userId, userId), eq(workouts.isCompleted, true)));

  if (userWorkouts.length === 0) return 0;

  const workoutIds = userWorkouts.map(w => w.id);
  
  // This is a simplified calculation - in a real app you'd join with workout_exercises
  // For now, return mock data based on number of workouts
  return userWorkouts.length * 445.5; // Average volume per workout
}

// Update user with realistic demo data
export async function updateUserWithDemoData() {
  const user = await getCurrentUser();
  if (!user) return;

  // Update user with more realistic fitness data
  await db.update(users)
    .set({
      level: 12,
      totalXP: 18500,
      currentStreak: 8,
      longestStreak: 15,
    })
    .where(eq(users.id, user.id));

  console.log('User updated with demo data');
} 