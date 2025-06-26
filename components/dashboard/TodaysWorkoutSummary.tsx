import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GlassCard } from "../ui/GlassCard";
import { ProgressBar } from "../ui/ProgressBar";

interface WorkoutSummaryProps {
  completedWorkouts: number;
  totalWorkouts: number;
  totalXPEarned: number;
  totalCaloriesBurned: number;
  onStartWorkout: () => void;
}

export function TodaysWorkoutSummary({
  completedWorkouts,
  totalWorkouts,
  totalXPEarned,
  totalCaloriesBurned,
  onStartWorkout,
}: WorkoutSummaryProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const completionPercentage =
    totalWorkouts > 0 ? (completedWorkouts / totalWorkouts) * 100 : 0;

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Today's Workout Summary
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {completedWorkouts} of {totalWorkouts} workouts completed
        </Text>
      </View>

      <ProgressBar
        progress={completionPercentage}
        height={12}
        showPercentage={true}
        label="Progress"
      />

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {totalXPEarned}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            XP Earned
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.accent }]}>
            {totalCaloriesBurned}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Calories
          </Text>
        </View>

        <View style={styles.statDivider} />

        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.success }]}>
            {Math.round(completionPercentage)}%
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Complete
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: colors.primary }]}
        onPress={onStartWorkout}
        activeOpacity={0.8}
      >
        <Text style={[styles.startButtonText, { color: colors.textPrimary }]}>
          Start Workout
        </Text>
      </TouchableOpacity>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DesignTokens.spacing.lg,
  },
  header: {
    marginBottom: DesignTokens.spacing.md,
  },
  title: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  subtitle: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: DesignTokens.spacing.lg,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: DesignTokens.fontSize.xl,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  statLabel: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: DesignTokens.spacing.sm,
  },
  startButton: {
    borderRadius: DesignTokens.borderRadius / 2,
    paddingVertical: DesignTokens.spacing.md,
    alignItems: "center",
    marginTop: DesignTokens.spacing.sm,
  },
  startButtonText: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
});
