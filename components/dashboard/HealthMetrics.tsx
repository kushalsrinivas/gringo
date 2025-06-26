import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { MetricCard } from "../ui/MetricCard";

interface HealthMetric {
  type: string;
  value: number;
  unit: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}

interface HealthMetricsProps {
  metrics: HealthMetric[];
}

export function HealthMetrics({ metrics }: HealthMetricsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getMetricIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "steps":
        return "👟";
      case "water_intake":
        return "💧";
      case "weight":
        return "⚖️";
      case "sleep":
        return "😴";
      case "heart_rate":
        return "❤️";
      case "calories":
        return "🔥";
      default:
        return "📊";
    }
  };

  const formatMetricLabel = (type: string) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatValue = (value: number, type: string) => {
    if (type === "steps") {
      return value.toLocaleString();
    }
    if (type === "water_intake" && value >= 1000) {
      return (value / 1000).toFixed(1);
    }
    return value.toString();
  };

  const formatUnit = (unit: string, type: string) => {
    if (type === "water_intake" && unit === "ml") {
      return "L";
    }
    return unit;
  };

  // Simple chart component placeholder
  const SimpleChart = ({ type, value }: { type: string; value: number }) => {
    const getChartData = () => {
      // Generate simple mock data for demonstration
      const baseValue = value;
      return Array.from({ length: 7 }, (_, i) => {
        const variation = (Math.random() - 0.5) * 0.3;
        return Math.max(0, baseValue * (1 + variation));
      });
    };

    const data = getChartData();
    const maxValue = Math.max(...data);

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartBars}>
          {data.map((val, index) => (
            <View
              key={index}
              style={[
                styles.chartBar,
                {
                  height: `${(val / maxValue) * 100}%`,
                  backgroundColor:
                    index === data.length - 1
                      ? colors.primary
                      : colors.backgroundCard,
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Health Metrics
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metricsContainer}
      >
        {metrics.map((metric, index) => (
          <View key={index} style={styles.metricWrapper}>
            <MetricCard
              label={formatMetricLabel(metric.type)}
              value={formatValue(metric.value, metric.type)}
              unit={formatUnit(metric.unit, metric.type)}
              icon={
                <Text style={styles.metricIcon}>
                  {getMetricIcon(metric.type)}
                </Text>
              }
              trend={metric.trend}
              trendValue={metric.trendValue}
              chartComponent={
                <SimpleChart type={metric.type} value={metric.value} />
              }
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DesignTokens.spacing.lg,
  },
  title: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.md,
    paddingHorizontal: DesignTokens.spacing.lg,
  },
  metricsContainer: {
    paddingHorizontal: DesignTokens.spacing.lg,
  },
  metricWrapper: {
    width: 160,
    marginRight: DesignTokens.spacing.md,
  },
  metricIcon: {
    fontSize: 20,
  },
  chartContainer: {
    height: 40,
    justifyContent: "flex-end",
    paddingHorizontal: DesignTokens.spacing.xs,
  },
  chartBars: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100%",
  },
  chartBar: {
    width: 4,
    borderRadius: 2,
    minHeight: 4,
  },
});
