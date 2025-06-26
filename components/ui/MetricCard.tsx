import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlassCard } from "./GlassCard";

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  chartComponent?: React.ReactNode;
}

export function MetricCard({
  label,
  value,
  unit,
  icon,
  trend,
  trendValue,
  chartComponent,
}: MetricCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return colors.success;
      case "down":
        return colors.error;
      default:
        return colors.textSecondary;
    }
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <View style={styles.labelContainer}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            {label}
          </Text>
        </View>
        {trend && trendValue && (
          <Text style={[styles.trend, { color: getTrendColor() }]}>
            {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"} {trendValue}
          </Text>
        )}
      </View>

      <View style={styles.valueContainer}>
        <Text style={[styles.value, { color: colors.textPrimary }]}>
          {value}
        </Text>
        {unit && (
          <Text style={[styles.unit, { color: colors.textSecondary }]}>
            {unit}
          </Text>
        )}
      </View>

      {chartComponent && (
        <View style={styles.chartContainer}>{chartComponent}</View>
      )}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 120,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.sm,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: DesignTokens.spacing.xs,
  },
  label: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  trend: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  valueContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: DesignTokens.spacing.sm,
  },
  value: {
    fontSize: DesignTokens.fontSize.xxl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  unit: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
    marginLeft: DesignTokens.spacing.xs,
  },
  chartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
