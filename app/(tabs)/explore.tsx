import { GlassCard } from "@/components/ui/GlassCard";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// MET values for different exercise types
const MET_VALUES = {
  strength: 6.0,
  cardio: 8.0,
  hiit: 10.0,
  core: 4.5,
  stretching: 2.5,
  bodyweight: 5.0,
};

// Sample workout templates
const WORKOUT_TEMPLATES = [
  {
    id: 1,
    name: "Lower Body",
    duration: 45,
    exerciseCount: 6,
    difficulty: "Moderate",
    type: "strength",
    exercises: [
      { name: "Squats", sets: 4, reps: 12, restTime: 60, met: 6.0 },
      { name: "Lunges", sets: 3, reps: 10, restTime: 45, met: 5.5 },
      { name: "Romanian Deadlift", sets: 4, reps: 10, restTime: 90, met: 6.5 },
      {
        name: "Bulgarian Split Squats",
        sets: 3,
        reps: 8,
        restTime: 60,
        met: 6.0,
      },
      { name: "Calf Raises", sets: 3, reps: 15, restTime: 30, met: 4.0 },
      { name: "Wall Sit", sets: 3, reps: 30, restTime: 45, met: 5.0 },
    ],
  },
  {
    id: 2,
    name: "Upper Body Push",
    duration: 40,
    exerciseCount: 5,
    difficulty: "Intermediate",
    type: "strength",
    exercises: [
      { name: "Push-ups", sets: 4, reps: 12, restTime: 60, met: 6.0 },
      { name: "Overhead Press", sets: 4, reps: 8, restTime: 90, met: 6.5 },
      { name: "Dips", sets: 3, reps: 10, restTime: 60, met: 6.0 },
      { name: "Pike Push-ups", sets: 3, reps: 8, restTime: 45, met: 5.5 },
      { name: "Tricep Extensions", sets: 3, reps: 12, restTime: 45, met: 4.5 },
    ],
  },
  {
    id: 3,
    name: "Full Body HIIT",
    duration: 30,
    exerciseCount: 8,
    difficulty: "Advanced",
    type: "hiit",
    exercises: [
      { name: "Burpees", sets: 4, reps: 8, restTime: 30, met: 10.0 },
      { name: "Mountain Climbers", sets: 4, reps: 20, restTime: 30, met: 9.0 },
      { name: "Jump Squats", sets: 4, reps: 12, restTime: 30, met: 8.5 },
      { name: "High Knees", sets: 3, reps: 30, restTime: 30, met: 8.0 },
      { name: "Plank Jacks", sets: 3, reps: 15, restTime: 30, met: 7.5 },
      { name: "Russian Twists", sets: 3, reps: 20, restTime: 30, met: 6.0 },
      { name: "Jump Lunges", sets: 3, reps: 12, restTime: 30, met: 8.0 },
      { name: "Bear Crawl", sets: 3, reps: 10, restTime: 30, met: 7.0 },
    ],
  },
  {
    id: 4,
    name: "Core & Stability",
    duration: 25,
    exerciseCount: 6,
    difficulty: "Beginner",
    type: "core",
    exercises: [
      { name: "Plank", sets: 3, reps: 30, restTime: 45, met: 4.5 },
      { name: "Dead Bug", sets: 3, reps: 10, restTime: 30, met: 3.5 },
      { name: "Bird Dog", sets: 3, reps: 8, restTime: 30, met: 3.0 },
      { name: "Side Plank", sets: 2, reps: 20, restTime: 45, met: 4.0 },
      { name: "Glute Bridge", sets: 3, reps: 15, restTime: 30, met: 4.0 },
      { name: "Cat-Cow Stretch", sets: 2, reps: 10, restTime: 30, met: 2.5 },
    ],
  },
];

interface WorkoutItemProps {
  workout: (typeof WORKOUT_TEMPLATES)[0];
  onPress: () => void;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, onPress }) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "#22C55E";
      case "intermediate":
        return "#F59E0B";
      case "advanced":
        return "#EF4444";
      default:
        return colors.textSecondary;
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "🌱";
      case "intermediate":
        return "💪";
      case "advanced":
        return "🔥";
      default:
        return "⚡";
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <GlassCard style={styles.workoutCard}>
        <View style={styles.workoutHeader}>
          <View style={styles.workoutTitleContainer}>
            <Text style={[styles.workoutTitle, { color: colors.textPrimary }]}>
              {workout.name}
            </Text>
            <View style={styles.workoutMeta}>
              <View style={styles.metaItem}>
                <IconSymbol
                  name="clock"
                  size={16}
                  color={colors.textSecondary}
                />
                <Text
                  style={[styles.metaText, { color: colors.textSecondary }]}
                >
                  {workout.duration} min
                </Text>
              </View>
              <View style={styles.metaItem}>
                <IconSymbol
                  name="dumbbell"
                  size={16}
                  color={colors.textSecondary}
                />
                <Text
                  style={[styles.metaText, { color: colors.textSecondary }]}
                >
                  {workout.exerciseCount} exercises
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              styles.difficultyBadge,
              {
                backgroundColor: getDifficultyColor(workout.difficulty) + "20",
              },
            ]}
          >
            <Text style={styles.difficultyIcon}>
              {getDifficultyIcon(workout.difficulty)}
            </Text>
            <Text
              style={[
                styles.difficultyText,
                { color: getDifficultyColor(workout.difficulty) },
              ]}
            >
              {workout.difficulty}
            </Text>
          </View>
        </View>
        <View style={styles.workoutFooter}>
          <IconSymbol
            name="play.circle.fill"
            size={24}
            color={colors.primary}
          />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
};

export default function WorkoutScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Workout state
  const [activeWorkout, setActiveWorkout] = useState<
    (typeof WORKOUT_TEMPLATES)[0] | null
  >(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  const [exerciseStartTime, setExerciseStartTime] = useState<Date | null>(null);
  const [isResting, setIsResting] = useState(false);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<
    (typeof WORKOUT_TEMPLATES)[0] | null
  >(null);

  // Timer refs
  const workoutTimerRef = useRef<NodeJS.Timeout>();
  const restTimerRef = useRef<NodeJS.Timeout>();

  // Mock user weight for calorie calculation
  const userWeight = 70; // kg

  // Calculate remaining workouts for the week (mock data)
  const remainingWorkouts = 3;

  // Timer effects
  useEffect(() => {
    if (activeWorkout && !isPaused) {
      workoutTimerRef.current = setInterval(() => {
        if (workoutStartTime && !isResting) {
          const now = new Date();
          const elapsedMinutes =
            (now.getTime() - workoutStartTime.getTime()) / (1000 * 60);
          const currentExercise = activeWorkout.exercises[currentExerciseIndex];
          const calories =
            (currentExercise.met * userWeight * elapsedMinutes) / 60;
          setTotalCaloriesBurned(Math.round(calories));
        }
      }, 1000);
    }

    return () => {
      if (workoutTimerRef.current) {
        clearInterval(workoutTimerRef.current);
      }
    };
  }, [
    activeWorkout,
    isPaused,
    isResting,
    workoutStartTime,
    currentExerciseIndex,
    userWeight,
  ]);

  useEffect(() => {
    if (isResting && restTimeRemaining > 0 && !isPaused) {
      restTimerRef.current = setInterval(() => {
        setRestTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (restTimerRef.current) {
        clearInterval(restTimerRef.current);
      }
    };
  }, [isResting, restTimeRemaining, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getElapsedTime = () => {
    if (!workoutStartTime) return "00:00";
    const now = new Date();
    const elapsed = Math.floor(
      (now.getTime() - workoutStartTime.getTime()) / 1000
    );
    return formatTime(elapsed);
  };

  const getCurrentExerciseTime = () => {
    if (!exerciseStartTime) return "00:00";
    const now = new Date();
    const elapsed = Math.floor(
      (now.getTime() - exerciseStartTime.getTime()) / 1000
    );
    return formatTime(elapsed);
  };

  const handleWorkoutSelect = (workout: (typeof WORKOUT_TEMPLATES)[0]) => {
    setSelectedWorkout(workout);
    setShowConfirmModal(true);
  };

  const startWorkout = () => {
    if (selectedWorkout) {
      setActiveWorkout(selectedWorkout);
      setWorkoutStartTime(new Date());
      setExerciseStartTime(new Date());
      setCurrentExerciseIndex(0);
      setCurrentSet(1);
      setTotalCaloriesBurned(0);
      setIsPaused(false);
      setIsResting(false);
    }
    setShowConfirmModal(false);
    setSelectedWorkout(null);
  };

  const pauseResumeWorkout = () => {
    setIsPaused(!isPaused);
  };

  const completeSet = () => {
    if (!activeWorkout) return;

    const currentExercise = activeWorkout.exercises[currentExerciseIndex];

    if (currentSet < currentExercise.sets) {
      // Start rest period
      setIsResting(true);
      setRestTimeRemaining(currentExercise.restTime);
      setCurrentSet(currentSet + 1);
    } else {
      // Move to next exercise
      nextExercise();
    }
  };

  const nextExercise = () => {
    if (!activeWorkout) return;

    if (currentExerciseIndex < activeWorkout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentSet(1);
      setExerciseStartTime(new Date());
      setIsResting(false);
    } else {
      // Workout complete
      completeWorkout();
    }
  };

  const skipExercise = () => {
    nextExercise();
  };

  const endWorkout = () => {
    Alert.alert(
      "End Workout",
      "Are you sure you want to end this workout? Your progress will be saved.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "End Workout", style: "destructive", onPress: completeWorkout },
      ]
    );
  };

  const completeWorkout = () => {
    // Here you would save workout data to database
    Alert.alert(
      "Workout Complete! 🎉",
      `Great job! You burned ${totalCaloriesBurned} calories in ${getElapsedTime()}.`,
      [{ text: "Awesome!", onPress: resetWorkout }]
    );
  };

  const resetWorkout = () => {
    setActiveWorkout(null);
    setCurrentExerciseIndex(0);
    setCurrentSet(1);
    setWorkoutStartTime(null);
    setExerciseStartTime(null);
    setIsResting(false);
    setRestTimeRemaining(0);
    setTotalCaloriesBurned(0);
    setIsPaused(false);

    if (workoutTimerRef.current) clearInterval(workoutTimerRef.current);
    if (restTimerRef.current) clearInterval(restTimerRef.current);
  };

  if (activeWorkout) {
    // Live Workout View
    const currentExercise = activeWorkout.exercises[currentExerciseIndex];
    const progress =
      ((currentExerciseIndex * currentExercise.sets + currentSet) /
        activeWorkout.exercises.reduce((sum, ex) => sum + ex.sets, 0)) *
      100;

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />

        <LinearGradient
          colors={[
            colors.gradientStart,
            colors.gradientMiddle,
            colors.gradientEnd,
          ]}
          style={styles.gradientBackground}
        />

        <View style={styles.liveWorkoutContainer}>
          {/* Header */}
          <View style={styles.liveWorkoutHeader}>
            <TouchableOpacity onPress={endWorkout} style={styles.endButton}>
              <IconSymbol name="xmark" size={20} color={colors.textPrimary} />
            </TouchableOpacity>
            <Text style={[styles.workoutName, { color: colors.textPrimary }]}>
              {activeWorkout.name}
            </Text>
            <TouchableOpacity
              onPress={pauseResumeWorkout}
              style={styles.pauseButton}
            >
              <IconSymbol
                name={isPaused ? "play.fill" : "pause.fill"}
                size={20}
                color={colors.textPrimary}
              />
            </TouchableOpacity>
          </View>

          {/* Timer and Stats */}
          <GlassCard style={styles.statsCard}>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  Elapsed
                </Text>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                  {getElapsedTime()}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  Exercise
                </Text>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                  {getCurrentExerciseTime()}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text
                  style={[styles.statLabel, { color: colors.textSecondary }]}
                >
                  Calories
                </Text>
                <Text style={[styles.statValue, { color: colors.primary }]}>
                  {totalCaloriesBurned}
                </Text>
              </View>
            </View>
          </GlassCard>

          {/* Progress */}
          <GlassCard style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text
                style={[styles.progressTitle, { color: colors.textPrimary }]}
              >
                Exercise {currentExerciseIndex + 1} of{" "}
                {activeWorkout.exercises.length}
              </Text>
              <Text style={[styles.progressPercent, { color: colors.primary }]}>
                {Math.round(progress)}%
              </Text>
            </View>
            <View
              style={[
                styles.progressBar,
                { backgroundColor: colors.textSecondary + "20" },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: colors.primary, width: `${progress}%` },
                ]}
              />
            </View>
          </GlassCard>

          {/* Current Exercise */}
          <GlassCard style={styles.exerciseCard}>
            <Text style={[styles.exerciseName, { color: colors.textPrimary }]}>
              {currentExercise.name}
            </Text>
            <View style={styles.setInfo}>
              <Text style={[styles.setLabel, { color: colors.textSecondary }]}>
                Set {currentSet} of {currentExercise.sets}
              </Text>
              <Text style={[styles.repsLabel, { color: colors.textPrimary }]}>
                {currentExercise.reps} reps
              </Text>
            </View>

            {isResting && (
              <View style={styles.restContainer}>
                <Text style={[styles.restLabel, { color: colors.accent }]}>
                  Rest Time
                </Text>
                <Text style={[styles.restTimer, { color: colors.accent }]}>
                  {formatTime(restTimeRemaining)}
                </Text>
              </View>
            )}
          </GlassCard>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.skipButton,
                { backgroundColor: colors.textSecondary + "20" },
              ]}
              onPress={skipExercise}
            >
              <Text
                style={[
                  styles.actionButtonText,
                  { color: colors.textSecondary },
                ]}
              >
                Skip Exercise
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionButton,
                styles.completeButton,
                { backgroundColor: colors.primary },
              ]}
              onPress={completeSet}
              disabled={isResting}
            >
              <Text style={[styles.actionButtonText, { color: "#FFFFFF" }]}>
                {isResting ? "Resting..." : "Complete Set"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Workout Library View
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
      />

      <LinearGradient
        colors={[
          colors.gradientStart,
          colors.gradientMiddle,
          colors.gradientEnd,
        ]}
        style={styles.gradientBackground}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Workouts
            </Text>
            {remainingWorkouts > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.primary }]}>
                <Text style={styles.badgeText}>{remainingWorkouts}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Choose your workout for today
          </Text>
        </View>

        {/* Workout List */}
        <View style={styles.workoutList}>
          {WORKOUT_TEMPLATES.map((workout) => (
            <WorkoutItem
              key={workout.id}
              workout={workout}
              onPress={() => handleWorkoutSelect(workout)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <GlassCard style={styles.modalCard}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
                Start Workout?
              </Text>
              {selectedWorkout && (
                <>
                  <Text
                    style={[styles.modalWorkoutName, { color: colors.primary }]}
                  >
                    {selectedWorkout.name}
                  </Text>
                  <Text
                    style={[
                      styles.modalDetails,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {selectedWorkout.duration} minutes •{" "}
                    {selectedWorkout.exerciseCount} exercises
                  </Text>
                  <Text
                    style={[
                      styles.modalDescription,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Make sure you have enough space and are ready to begin your
                    workout.
                  </Text>
                </>
              )}
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.cancelButton,
                    { backgroundColor: colors.textSecondary + "20" },
                  ]}
                  onPress={() => setShowConfirmModal(false)}
                >
                  <Text
                    style={[
                      styles.modalButtonText,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.startButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={startWorkout}
                >
                  <Text style={[styles.modalButtonText, { color: "#FFFFFF" }]}>
                    Start Workout
                  </Text>
                </TouchableOpacity>
              </View>
            </GlassCard>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: DesignTokens.spacing.lg,
  },
  header: {
    marginBottom: DesignTokens.spacing.xl,
    paddingTop: DesignTokens.spacing.md,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.xs,
  },
  title: {
    fontSize: DesignTokens.fontSize.xxxl,
    fontWeight: DesignTokens.fontWeight.bold,
    marginRight: DesignTokens.spacing.sm,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  subtitle: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  workoutList: {
    gap: DesignTokens.spacing.md,
  },
  workoutCard: {
    padding: DesignTokens.spacing.lg,
  },
  workoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: DesignTokens.spacing.md,
  },
  workoutTitleContainer: {
    flex: 1,
  },
  workoutTitle: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.semibold,
    marginBottom: DesignTokens.spacing.xs,
  },
  workoutMeta: {
    flexDirection: "row",
    gap: DesignTokens.spacing.md,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: DesignTokens.spacing.xs,
  },
  metaText: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  difficultyBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: DesignTokens.spacing.sm,
    paddingVertical: DesignTokens.spacing.xs,
    borderRadius: DesignTokens.borderRadius / 2,
    gap: DesignTokens.spacing.xs,
  },
  difficultyIcon: {
    fontSize: 14,
  },
  difficultyText: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  workoutFooter: {
    alignItems: "flex-end",
  },

  // Live Workout Styles
  liveWorkoutContainer: {
    flex: 1,
    padding: DesignTokens.spacing.lg,
  },
  liveWorkoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.lg,
    paddingTop: DesignTokens.spacing.md,
  },
  endButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  workoutName: {
    fontSize: DesignTokens.fontSize.xl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  pauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  statsCard: {
    padding: DesignTokens.spacing.lg,
    marginBottom: DesignTokens.spacing.lg,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    marginBottom: DesignTokens.spacing.xs,
  },
  statValue: {
    fontSize: DesignTokens.fontSize.xl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  progressCard: {
    padding: DesignTokens.spacing.lg,
    marginBottom: DesignTokens.spacing.lg,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.md,
  },
  progressTitle: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  progressPercent: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  exerciseCard: {
    padding: DesignTokens.spacing.xl,
    marginBottom: DesignTokens.spacing.lg,
    alignItems: "center",
  },
  exerciseName: {
    fontSize: DesignTokens.fontSize.xxl,
    fontWeight: DesignTokens.fontWeight.bold,
    textAlign: "center",
    marginBottom: DesignTokens.spacing.md,
  },
  setInfo: {
    alignItems: "center",
    marginBottom: DesignTokens.spacing.lg,
  },
  setLabel: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.medium,
    marginBottom: DesignTokens.spacing.xs,
  },
  repsLabel: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  restContainer: {
    alignItems: "center",
    padding: DesignTokens.spacing.lg,
    backgroundColor: "rgba(107, 114, 255, 0.1)",
    borderRadius: DesignTokens.borderRadius,
  },
  restLabel: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.medium,
    marginBottom: DesignTokens.spacing.xs,
  },
  restTimer: {
    fontSize: DesignTokens.fontSize.xxl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  actionButtons: {
    flexDirection: "row",
    gap: DesignTokens.spacing.md,
  },
  actionButton: {
    flex: 1,
    paddingVertical: DesignTokens.spacing.lg,
    borderRadius: DesignTokens.borderRadius,
    alignItems: "center",
  },
  skipButton: {
    // backgroundColor handled dynamically
  },
  completeButton: {
    // backgroundColor handled dynamically
  },
  actionButtonText: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: width - 40,
    maxWidth: 400,
  },
  modalCard: {
    padding: DesignTokens.spacing.xl,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: DesignTokens.fontSize.xl,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.md,
  },
  modalWorkoutName: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.semibold,
    marginBottom: DesignTokens.spacing.xs,
  },
  modalDetails: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.medium,
    marginBottom: DesignTokens.spacing.md,
  },
  modalDescription: {
    fontSize: DesignTokens.fontSize.sm,
    textAlign: "center",
    marginBottom: DesignTokens.spacing.xl,
  },
  modalButtons: {
    flexDirection: "row",
    gap: DesignTokens.spacing.md,
    width: "100%",
  },
  modalButton: {
    flex: 1,
    paddingVertical: DesignTokens.spacing.md,
    borderRadius: DesignTokens.borderRadius,
    alignItems: "center",
  },
  cancelButton: {
    // backgroundColor handled dynamically
  },
  startButton: {
    // backgroundColor handled dynamically
  },
  modalButtonText: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
});
