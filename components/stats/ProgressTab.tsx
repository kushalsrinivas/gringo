import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { GlassCard } from "../ui/GlassCard";
import { ProgressBar } from "../ui/ProgressBar";

const { width: screenWidth } = Dimensions.get("window");
const chartWidth = screenWidth - DesignTokens.spacing.lg * 2;

interface ExerciseProgress {
  name: string;
  current1RM: number;
  previous1RM: number;
  gain: number;
  gainPercentage: number;
  icon: string;
  frequency: number; // workouts per week
}

export function ProgressTab() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [selectedExercise, setSelectedExercise] =
    useState<string>("Bench Press");

  const exerciseProgressData: ExerciseProgress[] = [
    {
      name: "Bench Press",
      current1RM: 120,
      previous1RM: 110,
      gain: 10,
      gainPercentage: 9.1,
      icon: "🏋️",
      frequency: 2.5,
    },
    {
      name: "Squat",
      current1RM: 150,
      previous1RM: 140,
      gain: 10,
      gainPercentage: 7.1,
      icon: "🦵",
      frequency: 2.0,
    },
    {
      name: "Deadlift",
      current1RM: 180,
      previous1RM: 170,
      gain: 10,
      gainPercentage: 5.9,
      icon: "💪",
      frequency: 1.5,
    },
  ];

  const getVolumeProgressionData = (exerciseName: string) => {
    // Mock data for volume progression
    const baseData = {
      "Bench Press": [8500, 9200, 9800, 10500, 11200, 11800],
      Squat: [12000, 12800, 13500, 14200, 15000, 15800],
      Deadlift: [10000, 10600, 11200, 11800, 12500, 13200],
    };

    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          data:
            baseData[exerciseName as keyof typeof baseData] ||
            baseData["Bench Press"],
          color: (opacity = 1) => colors.primary,
          strokeWidth: 3,
        },
      ],
    };
  };

  const frequencyData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [3, 2, 4, 3], // Bench Press frequency
        color: (opacity = 1) => colors.primary,
      },
      {
        data: [2, 2, 3, 2], // Squat frequency
        color: (opacity = 1) => colors.accent,
      },
      {
        data: [1, 2, 1, 2], // Deadlift frequency
        color: (opacity = 1) => colors.warning,
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
  };

  const ExerciseProgressCard = ({
    exercise,
  }: {
    exercise: ExerciseProgress;
  }) => (
    <GlassCard style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseIcon}>{exercise.icon}</Text>
          <View>
            <Text style={[styles.exerciseName, { color: colors.textPrimary }]}>
              {exercise.name}
            </Text>
            <Text
              style={[styles.exerciseFreq, { color: colors.textSecondary }]}
            >
              {exercise.frequency}x/week
            </Text>
          </View>
        </View>
        <View style={styles.exerciseStats}>
          <Text style={[styles.current1RM, { color: colors.primary }]}>
            {exercise.current1RM}kg
          </Text>
          <Text style={[styles.gain, { color: colors.success }]}>
            +{exercise.gain}kg ({exercise.gainPercentage.toFixed(1)}%)
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={[styles.progressLabel, { color: colors.textSecondary }]}>
          Progress to goal
        </Text>
        <ProgressBar
          progress={75}
          height={6}
          color={colors.primary}
          backgroundColor={colors.backgroundCard}
        />
        <Text style={[styles.progressText, { color: colors.textSecondary }]}>
          75% to next milestone
        </Text>
      </View>
    </GlassCard>
  );

  const VolumeProgressionChart = () => (
    <GlassCard style={styles.chartCard}>
      <View style={styles.chartHeader}>
        <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>
          Volume Progression
        </Text>
        <View style={styles.exerciseSelector}>
          {exerciseProgressData.map((exercise) => (
            <TouchableOpacity
              key={exercise.name}
              style={[
                styles.selectorButton,
                selectedExercise === exercise.name && {
                  backgroundColor: colors.primary,
                },
              ]}
              onPress={() => setSelectedExercise(exercise.name)}
            >
              <Text
                style={[
                  styles.selectorText,
                  {
                    color:
                      selectedExercise === exercise.name
                        ? "#FFFFFF"
                        : colors.textSecondary,
                  },
                ]}
              >
                {exercise.name.split(" ")[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={getVolumeProgressionData(selectedExercise)}
          width={chartWidth - DesignTokens.spacing.lg * 2}
          height={200}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withDots={true}
          withShadow={false}
        />
      </View>

      <View style={styles.volumeStats}>
        <View style={styles.volumeStat}>
          <Text style={[styles.volumeValue, { color: colors.primary }]}>
            11.8K
          </Text>
          <Text style={[styles.volumeLabel, { color: colors.textSecondary }]}>
            This Month
          </Text>
        </View>
        <View style={styles.volumeStat}>
          <Text style={[styles.volumeValue, { color: colors.success }]}>
            +5.2%
          </Text>
          <Text style={[styles.volumeLabel, { color: colors.textSecondary }]}>
            vs Last Month
          </Text>
        </View>
      </View>
    </GlassCard>
  );

  const FrequencyAnalysisChart = () => (
    <GlassCard style={styles.chartCard}>
      <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>
        Frequency Analysis
      </Text>
      <Text style={[styles.chartSubtitle, { color: colors.textSecondary }]}>
        Weekly training frequency by exercise
      </Text>

      <View style={styles.chartContainer}>
        <BarChart
          data={frequencyData}
          width={chartWidth - DesignTokens.spacing.lg * 2}
          height={200}
          chartConfig={{
            ...chartConfig,
            barPercentage: 0.6,
          }}
          style={styles.chart}
          showValuesOnTopOfBars={false}
        />
      </View>

      <View style={styles.frequencyLegend}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: colors.primary }]}
          />
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>
            Bench Press
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: colors.accent }]}
          />
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>
            Squat
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: colors.warning }]}
          />
          <Text style={[styles.legendText, { color: colors.textSecondary }]}>
            Deadlift
          </Text>
        </View>
      </View>
    </GlassCard>
  );

  return (
    <View style={styles.container}>
      {/* Exercise Progress Cards */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Exercise Progress
      </Text>
      {exerciseProgressData.map((exercise, index) => (
        <ExerciseProgressCard key={index} exercise={exercise} />
      ))}

      {/* Volume Progression Chart */}
      <VolumeProgressionChart />

      {/* Frequency Analysis */}
      <FrequencyAnalysisChart />
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
  exerciseCard: {
    marginBottom: DesignTokens.spacing.md,
    padding: DesignTokens.spacing.lg,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.md,
  },
  exerciseInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseIcon: {
    fontSize: 24,
    marginRight: DesignTokens.spacing.sm,
  },
  exerciseName: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  exerciseFreq: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  exerciseStats: {
    alignItems: "flex-end",
  },
  current1RM: {
    fontSize: DesignTokens.fontSize.xl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  gain: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  progressContainer: {
    marginTop: DesignTokens.spacing.sm,
  },
  progressLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    marginBottom: DesignTokens.spacing.xs,
  },
  progressText: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.regular,
    marginTop: DesignTokens.spacing.xs,
  },
  chartCard: {
    marginBottom: DesignTokens.spacing.lg,
    padding: DesignTokens.spacing.lg,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.md,
  },
  chartTitle: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  chartSubtitle: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
    marginBottom: DesignTokens.spacing.md,
  },
  exerciseSelector: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: 2,
  },
  selectorButton: {
    paddingHorizontal: DesignTokens.spacing.sm,
    paddingVertical: DesignTokens.spacing.xs,
    borderRadius: 6,
  },
  selectorText: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  chartContainer: {
    alignItems: "center",
    marginVertical: DesignTokens.spacing.md,
  },
  chart: {
    borderRadius: DesignTokens.borderRadius,
  },
  volumeStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: DesignTokens.spacing.md,
    paddingTop: DesignTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  volumeStat: {
    alignItems: "center",
  },
  volumeValue: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  volumeLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  frequencyLegend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: DesignTokens.spacing.md,
    paddingTop: DesignTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: DesignTokens.spacing.xs,
  },
  legendText: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
  },
});
