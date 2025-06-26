import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlassCard } from "../ui/GlassCard";

interface DayData {
  date: Date;
  workoutCount: number;
  intensity: "none" | "light" | "medium" | "high";
}

interface ConsistencyHeatmapProps {
  data?: DayData[];
  weeks?: number;
}

export function ConsistencyHeatmap({
  data = [],
  weeks = 12,
}: ConsistencyHeatmapProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Generate mock data for the last 12 weeks (84 days)
  const generateMockData = (): DayData[] => {
    const mockData: DayData[] = [];
    const today = new Date();

    for (let i = weeks * 7 - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      // Mock workout pattern - more likely to workout on weekdays
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const workoutProbability = isWeekend ? 0.3 : 0.7;

      const hasWorkout = Math.random() < workoutProbability;
      const workoutCount = hasWorkout ? Math.floor(Math.random() * 3) + 1 : 0;

      let intensity: DayData["intensity"] = "none";
      if (workoutCount === 1) intensity = "light";
      else if (workoutCount === 2) intensity = "medium";
      else if (workoutCount >= 3) intensity = "high";

      mockData.push({
        date,
        workoutCount,
        intensity,
      });
    }

    return mockData;
  };

  const heatmapData = data.length > 0 ? data : generateMockData();

  const getIntensityColor = (intensity: DayData["intensity"]) => {
    switch (intensity) {
      case "none":
        return "rgba(255, 255, 255, 0.1)";
      case "light":
        return `${colors.primary}40`; // 25% opacity
      case "medium":
        return `${colors.primary}80`; // 50% opacity
      case "high":
        return colors.primary;
      default:
        return "rgba(255, 255, 255, 0.1)";
    }
  };

  const getDayName = (dayIndex: number) => {
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    return days[dayIndex];
  };

  const getMonthName = (date: Date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[date.getMonth()];
  };

  // Group data by weeks
  const weeklyData: DayData[][] = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeklyData.push(heatmapData.slice(i, i + 7));
  }

  // Calculate stats
  const totalWorkouts = heatmapData.reduce(
    (sum, day) => sum + day.workoutCount,
    0
  );
  const activeDays = heatmapData.filter((day) => day.workoutCount > 0).length;
  const consistencyPercentage = Math.round(
    (activeDays / heatmapData.length) * 100
  );
  const averageWorkoutsPerWeek = (totalWorkouts / weeks).toFixed(1);

  // Get month labels for the timeline
  const getMonthLabels = () => {
    const labels: { month: string; weekIndex: number }[] = [];
    weeklyData.forEach((week, index) => {
      const firstDay = week[0];
      if (firstDay && (index === 0 || firstDay.date.getDate() <= 7)) {
        labels.push({
          month: getMonthName(firstDay.date),
          weekIndex: index,
        });
      }
    });
    return labels;
  };

  const monthLabels = getMonthLabels();

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Consistency Heatmap
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Last {weeks} weeks
        </Text>
      </View>

      {/* Month labels */}
      <View style={styles.monthLabels}>
        {monthLabels.map((label, index) => (
          <Text
            key={index}
            style={[
              styles.monthLabel,
              { color: colors.textSecondary, left: label.weekIndex * 16 },
            ]}
          >
            {label.month}
          </Text>
        ))}
      </View>

      {/* Day labels */}
      <View style={styles.dayLabels}>
        {[1, 3, 5].map((dayIndex) => (
          <Text
            key={dayIndex}
            style={[
              styles.dayLabel,
              { color: colors.textSecondary, top: dayIndex * 14 },
            ]}
          >
            {getDayName(dayIndex)}
          </Text>
        ))}
      </View>

      {/* Heatmap grid */}
      <View style={styles.heatmapContainer}>
        <View style={styles.heatmap}>
          {weeklyData.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.week}>
              {week.map((day, dayIndex) => (
                <View
                  key={`${weekIndex}-${dayIndex}`}
                  style={[
                    styles.day,
                    {
                      backgroundColor: getIntensityColor(day.intensity),
                    },
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>
          Less
        </Text>
        <View style={styles.legendDots}>
          {(["none", "light", "medium", "high"] as const).map((intensity) => (
            <View
              key={intensity}
              style={[
                styles.legendDot,
                { backgroundColor: getIntensityColor(intensity) },
              ]}
            />
          ))}
        </View>
        <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>
          More
        </Text>
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {consistencyPercentage}%
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Consistency
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: colors.accent }]}>
            {activeDays}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Active Days
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: colors.warning }]}>
            {averageWorkoutsPerWeek}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Avg/Week
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
  monthLabels: {
    position: "relative",
    height: 20,
    marginBottom: DesignTokens.spacing.sm,
    marginLeft: 20,
  },
  monthLabel: {
    position: "absolute",
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  dayLabels: {
    position: "absolute",
    left: DesignTokens.spacing.lg,
    top: 80,
    height: 98, // 7 days * 14px
  },
  dayLabel: {
    position: "absolute",
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
    width: 12,
  },
  heatmapContainer: {
    marginLeft: 20,
    marginBottom: DesignTokens.spacing.lg,
  },
  heatmap: {
    flexDirection: "row",
    gap: 2,
  },
  week: {
    flexDirection: "column",
    gap: 2,
  },
  day: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: DesignTokens.spacing.lg,
  },
  legendLabel: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  legendDots: {
    flexDirection: "row",
    marginHorizontal: DesignTokens.spacing.md,
    gap: 2,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: DesignTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  statLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    marginTop: DesignTokens.spacing.xs,
  },
});
