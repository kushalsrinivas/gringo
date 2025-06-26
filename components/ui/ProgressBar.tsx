import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
  progress: number; // 0-100
  height?: number;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
  label?: string;
}

export function ProgressBar({
  progress,
  height = 8,
  showPercentage = false,
  color,
  backgroundColor,
  label,
}: ProgressBarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const progressColor = color || colors.primary;
  const bgColor = backgroundColor || colors.backgroundCard;
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            {label}
          </Text>
          {showPercentage && (
            <Text style={[styles.percentage, { color: colors.textSecondary }]}>
              {Math.round(clampedProgress)}%
            </Text>
          )}
        </View>
      )}
      <View
        style={[
          styles.track,
          {
            height,
            backgroundColor: bgColor,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: progressColor,
              height,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.xs,
  },
  label: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  percentage: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  track: {
    borderRadius: DesignTokens.borderRadius / 2,
    overflow: "hidden",
  },
  fill: {
    borderRadius: DesignTokens.borderRadius / 2,
  },
});
