import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface StreakData {
  date: Date;
  workoutCount: number;
  intensity?: "none" | "low" | "medium" | "high";
}

export interface ConsistencyCalendarProps {
  /**
   * Array of streak data for each day. If not provided, generates demo data.
   */
  streakData?: StreakData[];

  /**
   * Starting date for the 28-day window. Defaults to 27 days ago from today.
   */
  startDate?: Date;

  /**
   * Callback when a day is pressed
   */
  onDayPress?: (data: StreakData) => void;

  /**
   * Whether to show the legend. Defaults to true.
   */
  showLegend?: boolean;

  /**
   * Whether to show statistics row. Defaults to true.
   */
  showStats?: boolean;

  /**
   * Custom title for the calendar
   */
  title?: string;

  /**
   * Whether to animate newly updated days
   */
  animateUpdates?: boolean;
}

export function ConsistencyCalendar({
  streakData,
  startDate,
  onDayPress,
  showLegend = true,
  showStats = true,
  title = "Consistency Calendar",
  animateUpdates = true,
}: ConsistencyCalendarProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const animatedValues = useRef<{ [key: string]: Animated.Value }>({});

  // Generate 28 days of data
  const generateCalendarData = (): StreakData[] => {
    const endDate = new Date();
    const start =
      startDate || new Date(endDate.getTime() - 27 * 24 * 60 * 60 * 1000);
    const data: StreakData[] = [];

    for (let i = 0; i < 28; i++) {
      const date = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
      const existing = streakData?.find(
        (item) => item.date.toDateString() === date.toDateString()
      );

      if (existing) {
        data.push(existing);
      } else {
        // Generate demo data if no streak data provided
        const workoutCount =
          Math.random() > 0.3 ? Math.floor(Math.random() * 3) + 1 : 0;
        data.push({
          date,
          workoutCount,
          intensity: getIntensityLevel(workoutCount),
        });
      }
    }

    return data;
  };

  const calendarData = generateCalendarData();

  // Initialize animated values for new days
  useEffect(() => {
    if (animateUpdates) {
      calendarData.forEach((day, index) => {
        const key = day.date.toDateString();
        if (!animatedValues.current[key]) {
          animatedValues.current[key] = new Animated.Value(0);
          // Animate in with slight delay for wave effect
          Animated.timing(animatedValues.current[key], {
            toValue: 1,
            duration: 300,
            delay: index * 20,
            useNativeDriver: true,
          }).start();
        }
      });
    }
  }, [calendarData, animateUpdates]);

  const getIntensityLevel = (
    workoutCount: number
  ): "none" | "low" | "medium" | "high" => {
    if (workoutCount === 0) return "none";
    if (workoutCount === 1) return "low";
    if (workoutCount === 2) return "medium";
    return "high";
  };

  const getIntensityColor = (intensity: "none" | "low" | "medium" | "high") => {
    const baseColors = {
      none: colorScheme === "dark" ? "#1a1a1a" : "#f0f0f0",
      low: colorScheme === "dark" ? "#2d4a2d" : "#c6f7c6",
      medium: colorScheme === "dark" ? "#4a6b2d" : "#8fdf8f",
      high: colorScheme === "dark" ? "#6b8b2d" : "#4caf50",
    };
    return baseColors[intensity];
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getDayNames = () => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const renderCalendarGrid = () => {
    const dayNames = getDayNames();
    const weeks: StreakData[][] = [];

    // Group days into weeks (7 days each)
    for (let i = 0; i < calendarData.length; i += 7) {
      weeks.push(calendarData.slice(i, i + 7));
    }

    return (
      <View style={styles.calendarContainer}>
        {/* Day headers */}
        <View style={styles.dayHeaderRow}>
          {dayNames.map((dayName) => (
            <Text
              key={dayName}
              style={[styles.dayHeader, { color: colors.textSecondary }]}
            >
              {dayName}
            </Text>
          ))}
        </View>

        {/* Calendar grid */}
        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((day, dayIndex) => {
              const animatedValue =
                animatedValues.current[day.date.toDateString()];
              const todayIndicator = isToday(day.date);

              return (
                <TouchableOpacity
                  key={dayIndex}
                  style={styles.dayContainer}
                  onPress={() => onDayPress?.(day)}
                  activeOpacity={0.7}
                >
                  <Animated.View
                    style={[
                      styles.dayCell,
                      {
                        backgroundColor: getIntensityColor(
                          day.intensity || getIntensityLevel(day.workoutCount)
                        ),
                        borderColor: todayIndicator
                          ? colors.primary
                          : "transparent",
                        borderWidth: todayIndicator ? 2 : 0,
                        transform:
                          animateUpdates && animatedValue
                            ? [
                                {
                                  scale: animatedValue.interpolate({
                                    inputRange: [0, 0.5, 1],
                                    outputRange: [0.8, 1.1, 1],
                                  }),
                                },
                              ]
                            : [],
                        opacity:
                          animateUpdates && animatedValue ? animatedValue : 1,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.dayNumber,
                        {
                          color:
                            day.workoutCount > 0
                              ? colorScheme === "dark"
                                ? "#ffffff"
                                : "#000000"
                              : colors.textSecondary,
                          fontWeight: todayIndicator
                            ? DesignTokens.fontWeight.bold
                            : DesignTokens.fontWeight.medium,
                        },
                      ]}
                    >
                      {day.date.getDate()}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    );
  };

  const renderStats = () => {
    if (!showStats) return null;

    const totalWorkouts = calendarData.reduce(
      (sum, day) => sum + day.workoutCount,
      0
    );
    const activeDays = calendarData.filter(
      (day) => day.workoutCount > 0
    ).length;
    const consistencyPercentage = Math.round(
      (activeDays / calendarData.length) * 100
    );
    const currentStreak = calculateCurrentStreak();

    return (
      <View style={styles.statsContainer}>
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
        <View style={styles.statItem}>
          <Text
            style={[
              styles.statValue,
              { color: colors.accent || colors.primary },
            ]}
          >
            {currentStreak}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Current Streak
          </Text>
        </View>
      </View>
    );
  };

  const calculateCurrentStreak = (): number => {
    let streak = 0;
    const sortedData = [...calendarData].reverse(); // Start from most recent

    for (const day of sortedData) {
      if (day.workoutCount > 0) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const renderLegend = () => {
    if (!showLegend) return null;

    const intensityLevels: Array<"none" | "low" | "medium" | "high"> = [
      "none",
      "low",
      "medium",
      "high",
    ];

    return (
      <View style={styles.legendContainer}>
        <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>
          Less
        </Text>
        <View style={styles.legendDots}>
          {intensityLevels.map((level) => (
            <View
              key={level}
              style={[
                styles.legendDot,
                { backgroundColor: getIntensityColor(level) },
              ]}
            />
          ))}
        </View>
        <Text style={[styles.legendLabel, { color: colors.textSecondary }]}>
          More
        </Text>
      </View>
    );
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.cardBackground }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          {title}
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          28 days • {calendarData.filter((d) => d.workoutCount > 0).length}{" "}
          active days
        </Text>
      </View>

      {/* Calendar Grid */}
      {renderCalendarGrid()}

      {/* Statistics */}
      {renderStats()}

      {/* Legend */}
      {renderLegend()}
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
  calendarContainer: {
    marginBottom: DesignTokens.spacing.lg,
  },
  dayHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: DesignTokens.spacing.sm,
  },
  dayHeader: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
    textAlign: "center",
    width: 32,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: DesignTokens.spacing.xs,
  },
  dayContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  dayCell: {
    width: 28,
    height: 28,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  dayNumber: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: DesignTokens.spacing.md,
    marginTop: DesignTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 128, 128, 0.2)",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  statLabel: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
    textAlign: "center",
  },
  legendContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: DesignTokens.spacing.md,
  },
  legendLabel: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  legendDots: {
    flexDirection: "row",
    marginHorizontal: DesignTokens.spacing.sm,
    gap: 2,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 2,
  },
});
