import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { GlassCard } from "../ui/GlassCard";

const { width: screenWidth } = Dimensions.get("window");
const chartWidth = screenWidth - DesignTokens.spacing.lg * 2;

interface WorkoutSplit {
  name: string;
  percentage: number;
  sessions: number;
  color: string;
  description: string;
}

interface WorkoutSplitDistributionProps {
  splits?: WorkoutSplit[];
}

export function WorkoutSplitDistribution({
  splits,
}: WorkoutSplitDistributionProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const defaultSplits: WorkoutSplit[] = [
    {
      name: "Push/Pull/Legs",
      percentage: 45,
      sessions: 36,
      color: colors.primary,
      description: "Upper body push, pull, and leg days",
    },
    {
      name: "Full Body",
      percentage: 25,
      sessions: 20,
      color: colors.accent,
      description: "Complete body workouts",
    },
    {
      name: "Upper/Lower",
      percentage: 20,
      sessions: 16,
      color: colors.warning,
      description: "Upper body and lower body split",
    },
    {
      name: "Cardio",
      percentage: 10,
      sessions: 8,
      color: colors.success,
      description: "Cardiovascular training sessions",
    },
  ];

  const splitData = splits || defaultSplits;
  const totalSessions = splitData.reduce(
    (sum, split) => sum + split.sessions,
    0
  );

  // Format data for PieChart
  const chartData = splitData.map((split) => ({
    name: split.name,
    percentage: split.percentage,
    color: split.color,
    legendFontColor: colors.textSecondary,
    legendFontSize: 12,
  }));

  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.textSecondary,
    style: {
      borderRadius: DesignTokens.borderRadius,
    },
  };

  const SplitCard = ({ split }: { split: WorkoutSplit }) => (
    <View
      style={[styles.splitCard, { backgroundColor: colors.backgroundCard }]}
    >
      <View style={styles.splitHeader}>
        <View style={styles.splitInfo}>
          <View
            style={[styles.colorIndicator, { backgroundColor: split.color }]}
          />
          <View style={styles.splitDetails}>
            <Text style={[styles.splitName, { color: colors.textPrimary }]}>
              {split.name}
            </Text>
            <Text
              style={[styles.splitDescription, { color: colors.textSecondary }]}
            >
              {split.description}
            </Text>
          </View>
        </View>
        <View style={styles.splitStats}>
          <Text style={[styles.splitPercentage, { color: split.color }]}>
            {split.percentage}%
          </Text>
          <Text style={[styles.splitSessions, { color: colors.textSecondary }]}>
            {split.sessions} sessions
          </Text>
        </View>
      </View>
    </View>
  );

  const getPreferredSplit = () => {
    return splitData.reduce((prev, current) =>
      prev.percentage > current.percentage ? prev : current
    );
  };

  const getConsistencyScore = () => {
    // Calculate how evenly distributed the workouts are
    const idealPercentage = 100 / splitData.length;
    const variance =
      splitData.reduce((sum, split) => {
        return sum + Math.pow(split.percentage - idealPercentage, 2);
      }, 0) / splitData.length;

    // Convert variance to a consistency score (0-100)
    const maxVariance = Math.pow(100 - idealPercentage, 2);
    const consistencyScore = Math.max(0, 100 - (variance / maxVariance) * 100);
    return Math.round(consistencyScore);
  };

  const preferredSplit = getPreferredSplit();
  const consistencyScore = getConsistencyScore();

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Workout Split Distribution
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          How you structure your training
        </Text>
      </View>

      {/* Summary Stats */}
      <View style={styles.summaryStats}>
        <View style={styles.summaryStat}>
          <Text style={[styles.summaryValue, { color: colors.primary }]}>
            {totalSessions}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Total Sessions
          </Text>
        </View>
        <View style={styles.summaryStat}>
          <Text style={[styles.summaryValue, { color: preferredSplit.color }]}>
            {preferredSplit.name}
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Preferred Split
          </Text>
        </View>
        <View style={styles.summaryStat}>
          <Text style={[styles.summaryValue, { color: colors.success }]}>
            {consistencyScore}%
          </Text>
          <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
            Balance Score
          </Text>
        </View>
      </View>

      {/* Pie Chart */}
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={chartWidth - DesignTokens.spacing.lg * 2}
          height={200}
          chartConfig={chartConfig}
          accessor="percentage"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 10]}
          absolute
        />
      </View>

      {/* Split Details */}
      <View style={styles.splitsContainer}>
        {splitData.map((split, index) => (
          <SplitCard key={index} split={split} />
        ))}
      </View>

      {/* Insights */}
      <View style={styles.insights}>
        <Text style={[styles.insightsTitle, { color: colors.textPrimary }]}>
          Training Insights
        </Text>
        <View style={styles.insightsList}>
          <Text style={[styles.insightText, { color: colors.textSecondary }]}>
            • Your preferred training style is{" "}
            {preferredSplit.name.toLowerCase()}
          </Text>
          <Text style={[styles.insightText, { color: colors.textSecondary }]}>
            • Balance score of {consistencyScore}% indicates{" "}
            {consistencyScore > 70 ? "well-rounded" : "focused"} training
          </Text>
          <Text style={[styles.insightText, { color: colors.textSecondary }]}>
            • You've completed {totalSessions} total training sessions
          </Text>
        </View>
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
    flex: 1,
  },
  summaryValue: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.bold,
    textAlign: "center",
  },
  summaryLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    marginTop: DesignTokens.spacing.xs,
    textAlign: "center",
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: DesignTokens.spacing.lg,
  },
  splitsContainer: {
    marginBottom: DesignTokens.spacing.lg,
    gap: DesignTokens.spacing.sm,
  },
  splitCard: {
    borderRadius: DesignTokens.borderRadius,
    padding: DesignTokens.spacing.md,
    ...DesignTokens.shadows.sm,
  },
  splitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  splitInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  colorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: DesignTokens.spacing.sm,
  },
  splitDetails: {
    flex: 1,
  },
  splitName: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  splitDescription: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  splitStats: {
    alignItems: "flex-end",
  },
  splitPercentage: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  splitSessions: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  insights: {
    paddingTop: DesignTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  insightsTitle: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
    marginBottom: DesignTokens.spacing.sm,
  },
  insightsList: {
    gap: DesignTokens.spacing.xs,
  },
  insightText: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
    lineHeight: 20,
  },
});
