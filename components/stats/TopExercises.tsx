import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlassCard } from "../ui/GlassCard";
import { ProgressBar } from "../ui/ProgressBar";

interface ExercisePerformance {
  name: string;
  icon: string;
  volume: number;
  sessions: number;
  avgWeight: number;
  improvement: number;
  rank: number;
}

interface TopExercisesProps {
  exercises?: ExercisePerformance[];
}

export function TopExercises({ exercises }: TopExercisesProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const defaultExercises: ExercisePerformance[] = [
    {
      name: "Bench Press",
      icon: "🏋️",
      volume: 15420,
      sessions: 24,
      avgWeight: 95,
      improvement: 12,
      rank: 1,
    },
    {
      name: "Squat",
      icon: "🦵",
      volume: 18650,
      sessions: 20,
      avgWeight: 125,
      improvement: 18,
      rank: 2,
    },
    {
      name: "Deadlift",
      icon: "💪",
      volume: 12800,
      sessions: 16,
      avgWeight: 140,
      improvement: 15,
      rank: 3,
    },
    {
      name: "Overhead Press",
      icon: "🏋️‍♀️",
      volume: 8420,
      sessions: 18,
      avgWeight: 65,
      improvement: 8,
      rank: 4,
    },
    {
      name: "Pull-ups",
      icon: "💪",
      volume: 6250,
      sessions: 22,
      avgWeight: 85, // bodyweight + added weight
      improvement: 25,
      rank: 5,
    },
  ];

  const exerciseData = exercises || defaultExercises;
  const maxVolume = Math.max(...exerciseData.map((e) => e.volume));

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "#FFD700"; // Gold
      case 2:
        return "#C0C0C0"; // Silver
      case 3:
        return "#CD7F32"; // Bronze
      default:
        return colors.textSecondary;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `${rank}`;
    }
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toString();
  };

  const ExerciseCard = ({ exercise }: { exercise: ExercisePerformance }) => (
    <View
      style={[styles.exerciseCard, { backgroundColor: colors.backgroundCard }]}
    >
      <View style={styles.exerciseHeader}>
        <View style={styles.exerciseInfo}>
          <View style={styles.rankContainer}>
            <Text
              style={[styles.rankIcon, { color: getRankColor(exercise.rank) }]}
            >
              {getRankIcon(exercise.rank)}
            </Text>
          </View>
          <Text style={styles.exerciseIcon}>{exercise.icon}</Text>
          <View style={styles.exerciseDetails}>
            <Text style={[styles.exerciseName, { color: colors.textPrimary }]}>
              {exercise.name}
            </Text>
            <Text
              style={[styles.exerciseSessions, { color: colors.textSecondary }]}
            >
              {exercise.sessions} sessions
            </Text>
          </View>
        </View>
        <View style={styles.exerciseStats}>
          <Text style={[styles.improvement, { color: colors.success }]}>
            +{exercise.improvement}%
          </Text>
        </View>
      </View>

      <View style={styles.volumeSection}>
        <View style={styles.volumeHeader}>
          <Text style={[styles.volumeLabel, { color: colors.textSecondary }]}>
            Total Volume
          </Text>
          <Text style={[styles.volumeValue, { color: colors.primary }]}>
            {formatVolume(exercise.volume)}kg
          </Text>
        </View>
        <ProgressBar
          progress={(exercise.volume / maxVolume) * 100}
          height={6}
          color={colors.primary}
          backgroundColor="rgba(255, 255, 255, 0.1)"
        />
      </View>

      <View style={styles.metricsRow}>
        <View style={styles.metric}>
          <Text style={[styles.metricValue, { color: colors.textPrimary }]}>
            {exercise.avgWeight}kg
          </Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
            Avg Weight
          </Text>
        </View>
        <View style={styles.metric}>
          <Text style={[styles.metricValue, { color: colors.textPrimary }]}>
            {Math.round(exercise.volume / exercise.sessions)}kg
          </Text>
          <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>
            Per Session
          </Text>
        </View>
      </View>
    </View>
  );

  const totalVolume = exerciseData.reduce(
    (sum, exercise) => sum + exercise.volume,
    0
  );
  const totalSessions = exerciseData.reduce(
    (sum, exercise) => sum + exercise.sessions,
    0
  );
  const avgImprovement =
    exerciseData.reduce((sum, exercise) => sum + exercise.improvement, 0) /
    exerciseData.length;

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Top Exercises
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Performance rankings
        </Text>
      </View>

      <View style={styles.summaryStats}>
        <View style={styles.summaryStat}>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>
            {formatVolume(totalVolume)}kg
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Total Volume
          </Text>
        </View>
        <View style={styles.summaryStat}>
          <Text style={[styles.summaryValue, { color: colors.accent }]}>
            {totalSessions}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Sessions
          </Text>
        </View>
        <View style={styles.summaryStat}>
          <Text style={[styles.summaryValue, { color: colors.success }]}>
            +{avgImprovement.toFixed(1)}%
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Avg Growth
          </Text>
        </View>
      </View>

      <View style={styles.exercisesList}>
        {exerciseData.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: DesignTokens.spacing.lg,
    marginBottom: DesignTokens.spacing.lg,
  },
  header: {
    marginBottom: DesignTokens.spacing.lg,
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
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: DesignTokens.spacing.lg,
    paddingBottom: DesignTokens.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  summaryStat: {
    alignItems: "center",
  },
  summaryValue: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  summaryLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    marginTop: DesignTokens.spacing.xs,
  },
  exercisesList: {
    gap: DesignTokens.spacing.md,
  },
  exerciseCard: {
    borderRadius: DesignTokens.borderRadius,
    padding: DesignTokens.spacing.md,
    ...DesignTokens.shadows.sm,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.md,
  },
  exerciseInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rankContainer: {
    width: 24,
    alignItems: "center",
    marginRight: DesignTokens.spacing.sm,
  },
  rankIcon: {
    fontSize: 16,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  exerciseIcon: {
    fontSize: 20,
    marginRight: DesignTokens.spacing.sm,
  },
  exerciseDetails: {
    flex: 1,
  },
  exerciseName: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  exerciseSessions: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  exerciseStats: {
    alignItems: "flex-end",
  },
  improvement: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  volumeSection: {
    marginBottom: DesignTokens.spacing.md,
  },
  volumeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.xs,
  },
  volumeLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  volumeValue: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  metric: {
    alignItems: "center",
  },
  metricValue: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  metricLabel: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
    marginTop: DesignTokens.spacing.xs,
  },
});
