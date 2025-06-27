import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { GlassCard } from "../ui/GlassCard";
import { MetricCard } from "../ui/MetricCard";
import { ConsistencyHeatmap } from "./ConsistencyHeatmap";
import { TopExercises } from "./TopExercises";

const { width: screenWidth } = Dimensions.get("window");
const chartWidth = screenWidth - DesignTokens.spacing.lg * 2;

export function OverviewTab() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Mock data - in real app, this would come from database
  const performanceMetrics = [
    {
      label: "Workouts",
      value: "32",
      icon: "🏋️",
      trend: "up",
      trendValue: "+4",
    },
    { label: "Time", value: "42h", icon: "⏱️", trend: "up", trendValue: "+6h" },
    {
      label: "Volume",
      value: "12.5K",
      unit: "kg",
      icon: "📊",
      trend: "up",
      trendValue: "+2.1K",
    },
    { label: "PRs", value: "8", icon: "🎯", trend: "up", trendValue: "+3" },
  ];

  const weeklyVolumeData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [1200, 1500, 1800, 1100, 2000, 1600, 1400],
        color: (opacity = 1) => colors.primary,
        strokeWidth: 3,
      },
    ],
  };

  const strengthIndexData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [65, 72, 78, 82, 88, 92],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "transparent",
    backgroundGradientFrom: "transparent",
    backgroundGradientTo: "transparent",
    decimalPlaces: 0,
    color: (opacity = 1) => colors.primary,
    labelColor: (opacity = 1) => colors.textSecondary,
    style: {
      borderRadius: DesignTokens.borderRadius,
    },
    propsForLabels: {
      fontSize: DesignTokens.fontSize.xs,
    },
    propsForVerticalLabels: {
      fontSize: DesignTokens.fontSize.xs,
    },
    propsForHorizontalLabels: {
      fontSize: DesignTokens.fontSize.xs,
    },
  };

  const FocusScoreCard = () => (
    <GlassCard style={styles.focusCard}>
      <View style={styles.focusHeader}>
        <Text style={[styles.focusTitle, { color: colors.textPrimary }]}>
          Focus Score
        </Text>
        <Text style={[styles.focusScore, { color: colors.primary }]}>85%</Text>
      </View>
      <Text style={[styles.focusSubtitle, { color: colors.textSecondary }]}>
        Excellent consistency this week
      </Text>
      <View style={styles.focusBreakdown}>
        <View style={styles.focusItem}>
          <View
            style={[styles.focusDot, { backgroundColor: colors.primary }]}
          />
          <Text style={[styles.focusLabel, { color: colors.textSecondary }]}>
            Strength: 90%
          </Text>
        </View>
        <View style={styles.focusItem}>
          <View style={[styles.focusDot, { backgroundColor: colors.accent }]} />
          <Text style={[styles.focusLabel, { color: colors.textSecondary }]}>
            Cardio: 75%
          </Text>
        </View>
        <View style={styles.focusItem}>
          <View
            style={[styles.focusDot, { backgroundColor: colors.warning }]}
          />
          <Text style={[styles.focusLabel, { color: colors.textSecondary }]}>
            Recovery: 90%
          </Text>
        </View>
      </View>
    </GlassCard>
  );

  const StrengthIndexCard = () => (
    <GlassCard style={styles.chartCard}>
      <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>
        Strength Index
      </Text>
      <Text style={[styles.chartSubtitle, { color: colors.textSecondary }]}>
        6-month progression
      </Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={strengthIndexData}
          width={chartWidth - DesignTokens.spacing.lg * 2}
          height={180}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withDots={true}
          withShadow={false}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          fromZero={false}
        />
      </View>
      <View style={styles.indexSummary}>
        <Text style={[styles.indexValue, { color: colors.primary }]}>92</Text>
        <Text style={[styles.indexLabel, { color: colors.textSecondary }]}>
          Current Index
        </Text>
        <Text style={[styles.indexChange, { color: colors.success }]}>
          +4 this month
        </Text>
      </View>
    </GlassCard>
  );

  return (
    <View style={styles.container}>
      {/* Performance Metrics Grid */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Performance Overview
      </Text>
      <View style={styles.metricsGrid}>
        {performanceMetrics.map((metric, index) => (
          <View key={index} style={styles.metricWrapper}>
            <MetricCard
              label={metric.label}
              value={metric.value}
              unit={metric.unit}
              icon={<Text style={styles.metricIcon}>{metric.icon}</Text>}
              trend={metric.trend as "up" | "down" | "neutral"}
              trendValue={metric.trendValue}
            />
          </View>
        ))}
      </View>

      {/* Weekly Volume Chart */}
      <GlassCard style={styles.chartCard}>
        <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>
          Weekly Volume
        </Text>
        <Text style={[styles.chartSubtitle, { color: colors.textSecondary }]}>
          Last 7 days training volume
        </Text>
        <View style={styles.chartContainer}>
          <BarChart
            data={weeklyVolumeData}
            width={chartWidth - DesignTokens.spacing.lg * 2}
            height={200}
            yAxisLabel=""
            yAxisSuffix="kg"
            chartConfig={{
              ...chartConfig,
              barPercentage: 0.7,
            }}
            style={styles.chart}
            showValuesOnTopOfBars={false}
            fromZero={true}
          />
        </View>
      </GlassCard>

      {/* Strength Index */}
      <StrengthIndexCard />

      {/* Focus Score */}
      <FocusScoreCard />

      {/* Consistency Heatmap */}
      <ConsistencyHeatmap />

      {/* Top Exercises */}
      <TopExercises />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.md,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: DesignTokens.spacing.xl,
  },
  metricWrapper: {
    width: "48%",
    marginBottom: DesignTokens.spacing.md,
  },
  metricIcon: {
    fontSize: 20,
  },
  chartCard: {
    marginBottom: DesignTokens.spacing.lg,
    padding: DesignTokens.spacing.lg,
  },
  chartTitle: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  chartSubtitle: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
    marginBottom: DesignTokens.spacing.md,
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: DesignTokens.spacing.md,
  },
  chart: {
    borderRadius: DesignTokens.borderRadius,
  },
  indexSummary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: DesignTokens.spacing.md,
    paddingTop: DesignTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  indexValue: {
    fontSize: DesignTokens.fontSize.xxl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  indexLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  indexChange: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  focusCard: {
    marginBottom: DesignTokens.spacing.lg,
    padding: DesignTokens.spacing.lg,
  },
  focusHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.xs,
  },
  focusTitle: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  focusScore: {
    fontSize: DesignTokens.fontSize.xxl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  focusSubtitle: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
    marginBottom: DesignTokens.spacing.md,
  },
  focusBreakdown: {
    flexDirection: "column",
    gap: DesignTokens.spacing.sm,
  },
  focusItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  focusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: DesignTokens.spacing.sm,
  },
  focusLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
});
