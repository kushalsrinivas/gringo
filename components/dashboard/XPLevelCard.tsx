import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlassCard } from "../ui/GlassCard";
import { ProgressBar } from "../ui/ProgressBar";

interface XPLevelCardProps {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
}

export function XPLevelCard({
  currentLevel,
  currentXP,
  xpToNextLevel,
  totalXP,
}: XPLevelCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const progressPercentage = (currentXP / xpToNextLevel) * 100;

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <View style={styles.levelContainer}>
          <Text style={[styles.levelLabel, { color: colors.textSecondary }]}>
            Level
          </Text>
          <Text style={[styles.levelValue, { color: colors.primary }]}>
            {currentLevel}
          </Text>
        </View>

        <View style={styles.xpContainer}>
          <Text style={[styles.xpLabel, { color: colors.textSecondary }]}>
            Total XP
          </Text>
          <Text style={[styles.xpValue, { color: colors.textPrimary }]}>
            {totalXP.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={[styles.progressLabel, { color: colors.textPrimary }]}>
            Progress to Level {currentLevel + 1}
          </Text>
          <Text style={[styles.progressText, { color: colors.textSecondary }]}>
            {currentXP} / {xpToNextLevel} XP
          </Text>
        </View>

        <ProgressBar
          progress={progressPercentage}
          height={10}
          color={colors.primary}
        />
      </View>

      <View style={styles.footer}>
        <Text style={[styles.motivationText, { color: colors.textSecondary }]}>
          {xpToNextLevel - currentXP} XP to next level!
        </Text>
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
    marginBottom: DesignTokens.spacing.lg,
  },
  levelContainer: {
    alignItems: "center",
  },
  levelLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    marginBottom: DesignTokens.spacing.xs,
  },
  levelValue: {
    fontSize: DesignTokens.fontSize.xxxl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  xpContainer: {
    alignItems: "flex-end",
  },
  xpLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    marginBottom: DesignTokens.spacing.xs,
  },
  xpValue: {
    fontSize: DesignTokens.fontSize.xl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  progressSection: {
    marginBottom: DesignTokens.spacing.md,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.sm,
  },
  progressLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  progressText: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  footer: {
    alignItems: "center",
  },
  motivationText: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    fontStyle: "italic",
  },
});
