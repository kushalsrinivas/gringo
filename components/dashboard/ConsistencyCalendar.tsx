import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

interface DayData {
  date: Date;
  workoutCount: number;
  isToday?: boolean;
}

interface ConsistencyCalendarProps {
  days?: DayData[];
  onDayPress?: (day: DayData) => void;
}

export function ConsistencyCalendar({
  days = [],
  onDayPress,
}: ConsistencyCalendarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Generate last 28 days if no data provided
  const generateLast28Days = (): DayData[] => {
    const today = new Date();
    const result: DayData[] = [];

    for (let i = 27; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      result.push({
        date,
        workoutCount: Math.floor(Math.random() * 3), // Mock data
        isToday: i === 0,
      });
    }

    return result;
  };

  const calendarDays = days.length > 0 ? days : generateLast28Days();

  const getIntensityColor = (workoutCount: number) => {
    if (workoutCount === 0) {
      return colors.textSecondary + "20";
    } else if (workoutCount === 1) {
      return colors.primary + "40";
    } else if (workoutCount === 2) {
      return colors.primary + "70";
    } else {
      return colors.primary;
    }
  };

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const getDateNumber = (date: Date) => {
    return date.getDate();
  };

  const renderDay = (dayData: DayData, index: number) => {
    const isToday = dayData.isToday;
    const intensity = getIntensityColor(dayData.workoutCount);

    return (
      <View key={index} style={styles.dayContainer}>
        <Text style={[styles.dayName, { color: colors.textSecondary }]}>
          {getDayName(dayData.date)}
        </Text>
        <View
          style={[
            styles.dayCell,
            {
              backgroundColor: intensity,
              borderColor: isToday ? colors.primary : "transparent",
              borderWidth: isToday ? 2 : 0,
            },
          ]}
        >
          <Text
            style={[
              styles.dayNumber,
              {
                color:
                  dayData.workoutCount > 0
                    ? colors.textPrimary
                    : colors.textSecondary,
                fontWeight: isToday
                  ? DesignTokens.fontWeight.bold
                  : DesignTokens.fontWeight.medium,
              },
            ]}
          >
            {getDateNumber(dayData.date)}
          </Text>
        </View>
        {dayData.workoutCount > 0 && (
          <View style={styles.workoutIndicator}>
            <Text style={[styles.workoutCount, { color: colors.primary }]}>
              {dayData.workoutCount}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const totalWorkouts = calendarDays.reduce(
    (sum, day) => sum + day.workoutCount,
    0
  );
  const activeDays = calendarDays.filter((day) => day.workoutCount > 0).length;
  const consistencyPercentage = Math.round(
    (activeDays / calendarDays.length) * 100
  );

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundCard }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Consistency Calendar
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Last 28 days
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.calendarContainer}
      >
        {calendarDays.map((day, index) => renderDay(day, index))}
      </ScrollView>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.textPrimary }]}>
            {activeDays}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Active Days
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.textPrimary }]}>
            {totalWorkouts}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Total Workouts
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {consistencyPercentage}%
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Consistency
          </Text>
        </View>
      </View>

      <View style={styles.legend}>
        <Text style={[styles.legendTitle, { color: colors.textSecondary }]}>
          Less
        </Text>
        <View style={styles.legendDots}>
          {[0, 1, 2, 3].map((level) => (
            <View
              key={level}
              style={[
                styles.legendDot,
                { backgroundColor: getIntensityColor(level) },
              ]}
            />
          ))}
        </View>
        <Text style={[styles.legendTitle, { color: colors.textSecondary }]}>
          More
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: DesignTokens.borderRadius,
    padding: DesignTokens.spacing.lg,
    marginBottom: DesignTokens.spacing.lg,
    ...DesignTokens.shadows.sm,
  },
  header: {
    marginBottom: DesignTokens.spacing.md,
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
  calendarContainer: {
    paddingVertical: DesignTokens.spacing.sm,
  },
  dayContainer: {
    alignItems: "center",
    marginRight: DesignTokens.spacing.sm,
    width: 32,
  },
  dayName: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
    marginBottom: DesignTokens.spacing.xs,
  },
  dayCell: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.xs,
  },
  dayNumber: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  workoutIndicator: {
    position: "absolute",
    top: 40,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "rgba(163, 230, 54, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  workoutCount: {
    fontSize: 8,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: DesignTokens.spacing.md,
    marginTop: DesignTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  statLabel: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  legend: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: DesignTokens.spacing.md,
  },
  legendTitle: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  legendDots: {
    flexDirection: "row",
    marginHorizontal: DesignTokens.spacing.sm,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
    marginHorizontal: 1,
  },
});
