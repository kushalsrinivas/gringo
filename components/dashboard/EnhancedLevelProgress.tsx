import { ProgressBar } from "@/components/ui/ProgressBar";
import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface EnhancedLevelProgressProps {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
}

export function EnhancedLevelProgress({
  currentLevel,
  currentXP,
  xpToNextLevel,
  totalXP,
}: EnhancedLevelProgressProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const progressPercentage = (currentXP / xpToNextLevel) * 100;
  const xpRemaining = xpToNextLevel - currentXP;

  const getLevelTitle = (level: number) => {
    if (level < 5) return "Beginner";
    if (level < 10) return "Intermediate";
    if (level < 20) return "Advanced";
    if (level < 30) return "Expert";
    return "Master";
  };

  const getLevelIcon = (level: number) => {
    if (level < 5) return "🌱";
    if (level < 10) return "💪";
    if (level < 20) return "🔥";
    if (level < 30) return "⚡";
    return "👑";
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundCard }]}
    >
      <LinearGradient
        colors={[colors.primary + "20", colors.accent + "20"]}
        style={styles.headerGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.levelHeader}>
          <View style={styles.levelInfo}>
            <Text style={styles.levelIcon}>{getLevelIcon(currentLevel)}</Text>
            <View style={styles.levelText}>
              <Text style={[styles.levelTitle, { color: colors.textPrimary }]}>
                Level {currentLevel}
              </Text>
              <Text
                style={[styles.levelSubtitle, { color: colors.textSecondary }]}
              >
                {getLevelTitle(currentLevel)}
              </Text>
            </View>
          </View>
          <View style={styles.totalXPContainer}>
            <Text
              style={[styles.totalXPLabel, { color: colors.textSecondary }]}
            >
              Total XP
            </Text>
            <Text style={[styles.totalXPValue, { color: colors.primary }]}>
              {totalXP.toLocaleString()}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressTitle, { color: colors.textPrimary }]}>
            Level Progress
          </Text>
          <Text style={[styles.progressPercentage, { color: colors.accent }]}>
            {Math.round(progressPercentage)}%
          </Text>
        </View>

        <View style={styles.xpDisplay}>
          <Text style={[styles.currentXP, { color: colors.textPrimary }]}>
            {currentXP.toLocaleString()}
          </Text>
          <Text style={[styles.xpSeparator, { color: colors.textSecondary }]}>
            {" / "}
          </Text>
          <Text style={[styles.targetXP, { color: colors.textSecondary }]}>
            {xpToNextLevel.toLocaleString()} XP
          </Text>
        </View>

        <ProgressBar
          progress={progressPercentage}
          height={12}
          backgroundColor={colors.textSecondary + "20"}
          progressColor={colors.primary}
          borderRadius={6}
        />

        <View style={styles.progressFooter}>
          <Text style={[styles.remainingXP, { color: colors.textSecondary }]}>
            {xpRemaining.toLocaleString()} XP to Level {currentLevel + 1}
          </Text>
          <View style={styles.nextLevelPreview}>
            <Text style={[styles.nextLevelText, { color: colors.accent }]}>
              Next: {getLevelIcon(currentLevel + 1)}{" "}
              {getLevelTitle(currentLevel + 1)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.milestonesSection}>
        <Text style={[styles.milestonesTitle, { color: colors.textPrimary }]}>
          Recent Milestones
        </Text>
        <View style={styles.milestones}>
          <View
            style={[
              styles.milestone,
              { backgroundColor: colors.success + "20" },
            ]}
          >
            <Text style={styles.milestoneIcon}>🏆</Text>
            <Text
              style={[styles.milestoneText, { color: colors.textSecondary }]}
            >
              Reached Level {currentLevel}
            </Text>
          </View>
          {totalXP >= 1000 && (
            <View
              style={[
                styles.milestone,
                { backgroundColor: colors.warning + "20" },
              ]}
            >
              <Text style={styles.milestoneIcon}>⭐</Text>
              <Text
                style={[styles.milestoneText, { color: colors.textSecondary }]}
              >
                1K+ Total XP
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: DesignTokens.borderRadius,
    marginBottom: DesignTokens.spacing.lg,
    overflow: "hidden",
    ...DesignTokens.shadows.md,
  },
  headerGradient: {
    padding: DesignTokens.spacing.lg,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelIcon: {
    fontSize: 32,
    marginRight: DesignTokens.spacing.md,
  },
  levelText: {
    flex: 1,
  },
  levelTitle: {
    fontSize: DesignTokens.fontSize.xxl,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  levelSubtitle: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  totalXPContainer: {
    alignItems: "flex-end",
  },
  totalXPLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    marginBottom: DesignTokens.spacing.xs,
  },
  totalXPValue: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  progressSection: {
    padding: DesignTokens.spacing.lg,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.sm,
  },
  progressTitle: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  progressPercentage: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  xpDisplay: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: DesignTokens.spacing.md,
  },
  currentXP: {
    fontSize: DesignTokens.fontSize.xxl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  xpSeparator: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  targetXP: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  progressFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: DesignTokens.spacing.md,
  },
  remainingXP: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  nextLevelPreview: {
    alignItems: "flex-end",
  },
  nextLevelText: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  milestonesSection: {
    padding: DesignTokens.spacing.lg,
    paddingTop: 0,
  },
  milestonesTitle: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
    marginBottom: DesignTokens.spacing.sm,
  },
  milestones: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  milestone: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: DesignTokens.spacing.sm,
    paddingVertical: DesignTokens.spacing.xs,
    borderRadius: 12,
    marginRight: DesignTokens.spacing.sm,
    marginBottom: DesignTokens.spacing.xs,
  },
  milestoneIcon: {
    fontSize: 14,
    marginRight: DesignTokens.spacing.xs,
  },
  milestoneText: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
});
