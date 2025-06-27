import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { GlassCard } from "../ui/GlassCard";
import { WorkoutSplitDistribution } from "./WorkoutSplitDistribution";

const { width: screenWidth } = Dimensions.get("window");
const chartWidth = screenWidth - DesignTokens.spacing.lg * 2;

interface PersonalRecord {
  exercise: string;
  weight: number;
  date: string;
  improvement: number;
  icon: string;
}

interface Achievement {
  title: string;
  description: string;
  date: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export function RecordsTab() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const personalRecords: PersonalRecord[] = [
    {
      exercise: "Bench Press",
      weight: 120,
      date: "2024-01-15",
      improvement: 10,
      icon: "🏋️",
    },
    {
      exercise: "Squat",
      weight: 150,
      date: "2024-01-10",
      improvement: 15,
      icon: "🦵",
    },
    {
      exercise: "Deadlift",
      weight: 180,
      date: "2024-01-08",
      improvement: 20,
      icon: "💪",
    },
    {
      exercise: "Overhead Press",
      weight: 80,
      date: "2024-01-05",
      improvement: 5,
      icon: "🏋️‍♀️",
    },
    {
      exercise: "Pull-ups",
      weight: 25, // weighted
      date: "2024-01-03",
      improvement: 10,
      icon: "💪",
    },
  ];

  const achievements: Achievement[] = [
    {
      title: "Consistency King",
      description: "Worked out 30 days in a row",
      date: "2024-01-20",
      icon: "👑",
      rarity: "legendary",
    },
    {
      title: "Strength Milestone",
      description: "Benched 100kg for the first time",
      date: "2024-01-15",
      icon: "🎯",
      rarity: "epic",
    },
    {
      title: "Volume Beast",
      description: "Completed 50,000kg total volume",
      date: "2024-01-12",
      icon: "🔥",
      rarity: "rare",
    },
    {
      title: "Early Bird",
      description: "10 morning workouts completed",
      date: "2024-01-10",
      icon: "🌅",
      rarity: "common",
    },
  ];

  const muscleGroupData = [
    {
      name: "Chest",
      percentage: 25,
      color: colors.primary,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    },
    {
      name: "Back",
      percentage: 20,
      color: colors.accent,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    },
    {
      name: "Legs",
      percentage: 30,
      color: colors.warning,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    },
    {
      name: "Shoulders",
      percentage: 15,
      color: colors.success,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    },
    {
      name: "Arms",
      percentage: 10,
      color: colors.error,
      legendFontColor: colors.textSecondary,
      legendFontSize: 12,
    },
  ];

  const timeDistributionData = {
    labels: ["Strength", "Cardio", "Flexibility", "Recovery"],
    datasets: [
      {
        data: [60, 25, 10, 5],
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

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "legendary":
        return "#FFD700"; // Gold
      case "epic":
        return "#9C27B0"; // Purple
      case "rare":
        return "#2196F3"; // Blue
      case "common":
        return "#4CAF50"; // Green
      default:
        return colors.textSecondary;
    }
  };

  const PersonalRecordCard = ({ record }: { record: PersonalRecord }) => (
    <View
      style={[styles.recordCard, { backgroundColor: colors.backgroundCard }]}
    >
      <View style={styles.recordHeader}>
        <View style={styles.recordInfo}>
          <Text style={styles.recordIcon}>{record.icon}</Text>
          <View>
            <Text
              style={[styles.recordExercise, { color: colors.textPrimary }]}
            >
              {record.exercise}
            </Text>
            <Text style={[styles.recordDate, { color: colors.textSecondary }]}>
              {new Date(record.date).toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View style={styles.recordStats}>
          <Text style={[styles.recordWeight, { color: colors.primary }]}>
            {record.weight}kg
          </Text>
          <Text style={[styles.recordImprovement, { color: colors.success }]}>
            +{record.improvement}kg
          </Text>
        </View>
      </View>
    </View>
  );

  const AchievementBadge = ({ achievement }: { achievement: Achievement }) => (
    <View
      style={[
        styles.achievementCard,
        { backgroundColor: colors.backgroundCard },
      ]}
    >
      <View
        style={[
          styles.achievementHeader,
          { borderColor: getRarityColor(achievement.rarity) },
        ]}
      >
        <Text style={styles.achievementIcon}>{achievement.icon}</Text>
        <View
          style={[
            styles.rarityBadge,
            { backgroundColor: getRarityColor(achievement.rarity) },
          ]}
        >
          <Text style={styles.rarityText}>
            {achievement.rarity.toUpperCase()}
          </Text>
        </View>
      </View>
      <Text style={[styles.achievementTitle, { color: colors.textPrimary }]}>
        {achievement.title}
      </Text>
      <Text
        style={[styles.achievementDescription, { color: colors.textSecondary }]}
      >
        {achievement.description}
      </Text>
      <Text style={[styles.achievementDate, { color: colors.textSecondary }]}>
        {new Date(achievement.date).toLocaleDateString()}
      </Text>
    </View>
  );

  const MuscleGroupAnalysis = () => (
    <GlassCard style={styles.chartCard}>
      <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>
        Muscle Group Targeting
      </Text>
      <Text style={[styles.chartSubtitle, { color: colors.textSecondary }]}>
        Training distribution across muscle groups
      </Text>

      <View style={styles.chartContainer}>
        <PieChart
          data={muscleGroupData}
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

      <View style={styles.muscleGroupLegend}>
        {muscleGroupData.map((group, index) => (
          <View key={index} style={styles.legendItem}>
            <View
              style={[styles.legendDot, { backgroundColor: group.color }]}
            />
            <Text style={[styles.legendText, { color: colors.textSecondary }]}>
              {group.name}: {group.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </GlassCard>
  );

  const TimeDistributionChart = () => (
    <GlassCard style={styles.chartCard}>
      <Text style={[styles.chartTitle, { color: colors.textPrimary }]}>
        Time Distribution
      </Text>
      <Text style={[styles.chartSubtitle, { color: colors.textSecondary }]}>
        Workout time allocation by type
      </Text>

      <View style={styles.chartContainer}>
        <BarChart
          data={timeDistributionData}
          width={chartWidth - DesignTokens.spacing.lg * 2}
          height={200}
          chartConfig={{
            ...chartConfig,
            barPercentage: 0.7,
          }}
          style={styles.chart}
          showValuesOnTopOfBars={true}
          fromZero={true}
        />
      </View>
    </GlassCard>
  );

  return (
    <View style={styles.container}>
      {/* Personal Records */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Personal Records
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.recordsScroll}
        contentContainerStyle={styles.recordsContainer}
      >
        {personalRecords.map((record, index) => (
          <PersonalRecordCard key={index} record={record} />
        ))}
      </ScrollView>

      {/* Achievement Badges */}
      <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
        Achievement Badges
      </Text>
      <View style={styles.achievementsGrid}>
        {achievements.map((achievement, index) => (
          <AchievementBadge key={index} achievement={achievement} />
        ))}
      </View>

      {/* Muscle Group Analysis */}
      <MuscleGroupAnalysis />

      {/* Time Distribution */}
      <TimeDistributionChart />

      {/* Workout Split Distribution */}
      <WorkoutSplitDistribution />
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
  recordsScroll: {
    marginBottom: DesignTokens.spacing.xl,
  },
  recordsContainer: {
    paddingRight: DesignTokens.spacing.lg,
  },
  recordCard: {
    width: 200,
    marginRight: DesignTokens.spacing.md,
    borderRadius: DesignTokens.borderRadius,
    padding: DesignTokens.spacing.md,
    ...DesignTokens.shadows.sm,
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recordInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  recordIcon: {
    fontSize: 24,
    marginRight: DesignTokens.spacing.sm,
  },
  recordExercise: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  recordDate: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  recordStats: {
    alignItems: "flex-end",
  },
  recordWeight: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  recordImprovement: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: DesignTokens.spacing.xl,
  },
  achievementCard: {
    width: "48%",
    marginBottom: DesignTokens.spacing.md,
    borderRadius: DesignTokens.borderRadius,
    padding: DesignTokens.spacing.md,
    ...DesignTokens.shadows.sm,
  },
  achievementHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.sm,
    borderBottomWidth: 2,
    paddingBottom: DesignTokens.spacing.xs,
  },
  achievementIcon: {
    fontSize: 24,
  },
  rarityBadge: {
    paddingHorizontal: DesignTokens.spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rarityText: {
    fontSize: 8,
    fontWeight: DesignTokens.fontWeight.bold,
    color: "#FFFFFF",
  },
  achievementTitle: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  achievementDescription: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
    marginBottom: DesignTokens.spacing.xs,
  },
  achievementDate: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.regular,
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
  muscleGroupLegend: {
    flexDirection: "column",
    marginTop: DesignTokens.spacing.md,
    paddingTop: DesignTokens.spacing.md,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.xs,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: DesignTokens.spacing.sm,
  },
  legendText: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
});
