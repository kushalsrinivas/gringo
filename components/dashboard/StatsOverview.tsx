import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface Stat {
  label: string;
  value: string;
  unit?: string;
  icon: string;
  color?: string;
}

interface StatsOverviewProps {
  totalWorkouts: number;
  totalMinutes: number;
  totalVolume: number;
  additionalStats?: Stat[];
}

export function StatsOverview({
  totalWorkouts,
  totalMinutes,
  totalVolume,
  additionalStats = [],
}: StatsOverviewProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const mainStats: Stat[] = [
    {
      label: "Total Workouts",
      value: totalWorkouts.toString(),
      icon: "🏋️",
      color: colors.primary,
    },
    {
      label: "Total Minutes",
      value: formatNumber(totalMinutes),
      icon: "⏱️",
      color: colors.accent,
    },
    {
      label: "Total Volume",
      value: formatNumber(totalVolume),
      unit: "kg",
      icon: "📊",
      color: colors.warning,
    },
  ];

  const allStats = [...mainStats, ...additionalStats];

  const renderStatCard = (stat: Stat, index: number) => (
    <View
      key={`${stat.label}-${index}`}
      style={[styles.statCard, { backgroundColor: colors.backgroundCard }]}
    >
      <View style={styles.statHeader}>
        <Text style={styles.statIcon}>{stat.icon}</Text>
        <View
          style={[
            styles.statIndicator,
            { backgroundColor: stat.color || colors.primary },
          ]}
        />
      </View>
      <Text style={[styles.statValue, { color: colors.textPrimary }]}>
        {stat.value}
        {stat.unit && (
          <Text style={[styles.statUnit, { color: colors.textSecondary }]}>
            {" "}
            {stat.unit}
          </Text>
        )}
      </Text>
      <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
        {stat.label}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Stats Overview
      </Text>
      <View style={styles.statsGrid}>
        {allStats.map((stat, index) => renderStatCard(stat, index))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DesignTokens.spacing.lg,
  },
  sectionTitle: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.md,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    borderRadius: DesignTokens.borderRadius,
    padding: DesignTokens.spacing.md,
    marginBottom: DesignTokens.spacing.md,
    ...DesignTokens.shadows.sm,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.sm,
  },
  statIcon: {
    fontSize: 20,
  },
  statIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statValue: {
    fontSize: DesignTokens.fontSize.xxl,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  statUnit: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  statLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
});
