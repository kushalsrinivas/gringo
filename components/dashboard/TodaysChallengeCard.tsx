import { ProgressBar } from "@/components/ui/ProgressBar";
import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Challenge {
  id: number;
  title: string;
  description: string;
  progress: number;
  target: number;
  xpReward: number;
  type: string;
}

interface TodaysChallengeCardProps {
  challenge: Challenge;
  onPress?: () => void;
}

export function TodaysChallengeCard({
  challenge,
  onPress,
}: TodaysChallengeCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const progressPercentage = Math.min(
    (challenge.progress / challenge.target) * 100,
    100
  );
  const isCompleted = progressPercentage >= 100;

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case "workout":
        return "💪";
      case "water":
        return "💧";
      case "steps":
        return "👟";
      case "calories":
        return "🔥";
      default:
        return "🎯";
    }
  };

  const getMotivationalPrompt = () => {
    if (isCompleted) {
      return "Amazing! Challenge completed! 🎉";
    } else if (progressPercentage > 75) {
      return "Almost there! You've got this! 💪";
    } else if (progressPercentage > 50) {
      return "Great progress! Keep pushing! 🚀";
    } else if (progressPercentage > 25) {
      return "Good start! Stay consistent! ⭐";
    } else {
      return "Ready to crush today's challenge? 🔥";
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.backgroundCard }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={
          isCompleted ? ["#10B981", "#059669"] : [colors.primary, colors.accent]
        }
        style={styles.iconContainer}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.icon}>{getChallengeIcon(challenge.type)}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            {challenge.title}
          </Text>
          <View
            style={[styles.xpBadge, { backgroundColor: colors.primary + "20" }]}
          >
            <Text style={[styles.xpText, { color: colors.primary }]}>
              +{challenge.xpReward} XP
            </Text>
          </View>
        </View>

        <Text style={[styles.description, { color: colors.textSecondary }]}>
          {challenge.description}
        </Text>

        <Text style={[styles.motivationalText, { color: colors.accent }]}>
          {getMotivationalPrompt()}
        </Text>

        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text
              style={[styles.progressText, { color: colors.textSecondary }]}
            >
              {challenge.progress} / {challenge.target}
            </Text>
            <Text
              style={[styles.progressPercentage, { color: colors.textPrimary }]}
            >
              {Math.round(progressPercentage)}%
            </Text>
          </View>
          <ProgressBar
            progress={progressPercentage}
            height={8}
            backgroundColor={colors.textSecondary + "20"}
            progressColor={isCompleted ? "#10B981" : colors.primary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: DesignTokens.borderRadius,
    padding: DesignTokens.spacing.lg,
    marginBottom: DesignTokens.spacing.lg,
    flexDirection: "row",
    alignItems: "flex-start",
    ...DesignTokens.shadows.md,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: DesignTokens.spacing.md,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: DesignTokens.spacing.xs,
  },
  title: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    flex: 1,
  },
  xpBadge: {
    paddingHorizontal: DesignTokens.spacing.sm,
    paddingVertical: DesignTokens.spacing.xs,
    borderRadius: 12,
    marginLeft: DesignTokens.spacing.sm,
  },
  xpText: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  description: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
    marginBottom: DesignTokens.spacing.sm,
  },
  motivationalText: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    fontStyle: "italic",
    marginBottom: DesignTokens.spacing.md,
  },
  progressSection: {
    marginTop: DesignTokens.spacing.sm,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.xs,
  },
  progressText: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  progressPercentage: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.bold,
  },
});
