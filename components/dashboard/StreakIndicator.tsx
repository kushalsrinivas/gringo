import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlassCard } from "../ui/GlassCard";

interface StreakIndicatorProps {
  currentStreak: number;
  longestStreak: number;
  streakGoal?: number;
}

export function StreakIndicator({
  currentStreak,
  longestStreak,
  streakGoal = 30,
}: StreakIndicatorProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const streakPercentage = (currentStreak / streakGoal) * 100;
  const isOnStreak = currentStreak > 0;
  const isRecord = currentStreak === longestStreak && currentStreak > 0;

  const getStreakEmoji = () => {
    if (currentStreak === 0) return "😴";
    if (currentStreak < 7) return "🔥";
    if (currentStreak < 14) return "💪";
    if (currentStreak < 30) return "🚀";
    return "👑";
  };

  const getStreakMessage = () => {
    if (currentStreak === 0) return "Start your streak today!";
    if (currentStreak === 1) return "Great start! Keep it up!";
    if (currentStreak < 7) return "Building momentum!";
    if (currentStreak < 14) return "You're on fire!";
    if (currentStreak < 30) return "Unstoppable force!";
    return "Legendary dedication!";
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Workout Streak
        </Text>
        {isRecord && (
          <View
            style={[styles.recordBadge, { backgroundColor: colors.warning }]}
          >
            <Text style={styles.recordText}>RECORD!</Text>
          </View>
        )}
      </View>

      <View style={styles.streakContainer}>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{getStreakEmoji()}</Text>
        </View>

        <View style={styles.streakInfo}>
          <Text style={[styles.streakNumber, { color: colors.primary }]}>
            {currentStreak}
          </Text>
          <Text style={[styles.streakLabel, { color: colors.textSecondary }]}>
            {currentStreak === 1 ? "Day" : "Days"}
          </Text>
        </View>
      </View>

      <Text style={[styles.streakMessage, { color: colors.textPrimary }]}>
        {getStreakMessage()}
      </Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(streakPercentage, 100)}%`,
                backgroundColor: colors.primary,
              },
            ]}
          />
        </View>
        <Text style={[styles.progressText, { color: colors.textSecondary }]}>
          {currentStreak} / {streakGoal} days goal
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.textSecondary }]}>
            {longestStreak}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Best Streak
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.accent }]}>
            {Math.max(0, streakGoal - currentStreak)}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Days to Goal
          </Text>
        </View>
      </View>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DesignTokens.spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.md,
  },
  title: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  recordBadge: {
    paddingHorizontal: DesignTokens.spacing.sm,
    paddingVertical: DesignTokens.spacing.xs,
    borderRadius: DesignTokens.borderRadius / 2,
  },
  recordText: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.bold,
    color: "#000",
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: DesignTokens.spacing.md,
  },
  emojiContainer: {
    marginRight: DesignTokens.spacing.md,
  },
  emoji: {
    fontSize: 48,
  },
  streakInfo: {
    alignItems: "center",
  },
  streakNumber: {
    fontSize: DesignTokens.fontSize.xxxl,
    fontWeight: DesignTokens.fontWeight.bold,
    lineHeight: DesignTokens.fontSize.xxxl * 1.2,
  },
  streakLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  streakMessage: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.medium,
    textAlign: "center",
    marginBottom: DesignTokens.spacing.lg,
  },
  progressContainer: {
    marginBottom: DesignTokens.spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: DesignTokens.spacing.xs,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  statLabel: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
});
