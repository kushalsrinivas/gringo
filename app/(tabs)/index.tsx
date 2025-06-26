import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Database imports
import {
  getCurrentUser,
  getRandomQuote,
  getTodaysChallenges,
  getTodaysMetrics,
  getUserWorkoutStats,
  initializeDatabase,
  updateUserWithDemoData,
} from "@/db/database";

// Component imports
import { ConsistencyCalendar } from "@/components/dashboard/ConsistencyCalendar";
import { DateStrip } from "@/components/dashboard/DateStrip";
import { EnhancedLevelProgress } from "@/components/dashboard/EnhancedLevelProgress";
import { HealthMetrics } from "@/components/dashboard/HealthMetrics";
import { MotivationalQuote } from "@/components/dashboard/MotivationalQuote";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { StreakIndicator } from "@/components/dashboard/StreakIndicator";
import { TodaysChallengeCard } from "@/components/dashboard/TodaysChallengeCard";

// Types
import type {
  DailyChallenge,
  HealthMetric,
  MotivationalQuote as Quote,
  User,
} from "@/db/schema";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // State
  const [user, setUser] = useState<User | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [metrics, setMetrics] = useState<HealthMetric[]>([]);
  const [challenges, setChallenges] = useState<DailyChallenge[]>([]);
  const [workoutStats, setWorkoutStats] = useState({
    totalWorkouts: 53,
    totalMinutes: 1260,
    totalVolume: 23540.5,
  });
  const [loading, setLoading] = useState(true);

  // Initialize database and load data
  useEffect(() => {
    async function initializeApp() {
      try {
        await initializeDatabase();
        await updateUserWithDemoData(); // Add demo data for showcase
        await loadDashboardData();
      } catch (error) {
        console.error("Failed to initialize app:", error);
        Alert.alert("Error", "Failed to initialize the app. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    initializeApp();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load user data
      const userData = await getCurrentUser();
      setUser(userData);

      // Load random quote
      const quoteData = await getRandomQuote();
      setQuote(quoteData);

      // Load today's metrics
      const metricsData = await getTodaysMetrics();
      setMetrics(metricsData);

      // Load today's challenges
      const challengesData = await getTodaysChallenges();
      setChallenges(challengesData);

      // Load workout statistics
      if (userData) {
        const statsData = await getUserWorkoutStats(userData.id);
        setWorkoutStats(statsData);
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  // Calculate XP for next level (simple formula)
  const calculateXPToNextLevel = (level: number) => {
    return level * 1000; // 1000 XP per level
  };

  const calculateCurrentLevelXP = (totalXP: number, level: number) => {
    const previousLevelXP = (level - 1) * 1000;
    return totalXP - previousLevelXP;
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: colors.textPrimary }]}>
            Loading your fitness dashboard...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      {/* Gradient Background */}
      <LinearGradient
        colors={[
          colors.gradientStart,
          colors.gradientMiddle,
          colors.gradientEnd,
        ]}
        style={styles.gradientBackground}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={[styles.welcomeText, { color: colors.textSecondary }]}>
              Welcome back 👋
            </Text>
            <Text style={[styles.nameText, { color: colors.textPrimary }]}>
              {user?.name || "Fitness Enthusiast"}
            </Text>
          </View>
          <View style={styles.notificationIcon}>
            <Text style={styles.bellIcon}>🔔</Text>
          </View>
        </View>

        {/* Date Strip */}
        <DateStrip />

        {/* Today's Challenge Card */}
        {challenges.length > 0 && (
          <TodaysChallengeCard
            challenge={{
              id: challenges[0].id,
              title: challenges[0].title,
              description: challenges[0].description,
              progress: Math.floor(Math.random() * challenges[0].target), // Mock progress
              target: challenges[0].target,
              xpReward: challenges[0].xpReward,
              type: challenges[0].type,
            }}
            onPress={() =>
              Alert.alert(
                "Challenge Details",
                `${challenges[0].title}: ${challenges[0].description}`
              )
            }
          />
        )}

        {/* Enhanced Level Progress */}
        {user && (
          <EnhancedLevelProgress
            currentLevel={user.level}
            currentXP={calculateCurrentLevelXP(user.totalXP, user.level)}
            xpToNextLevel={calculateXPToNextLevel(user.level)}
            totalXP={user.totalXP}
          />
        )}

        {/* Stats Overview */}
        <StatsOverview
          totalWorkouts={workoutStats.totalWorkouts}
          totalMinutes={workoutStats.totalMinutes}
          totalVolume={workoutStats.totalVolume}
        />

        {/* Streak Indicator */}
        {user && (
          <StreakIndicator
            currentStreak={user.currentStreak}
            longestStreak={user.longestStreak}
            streakGoal={30}
          />
        )}

        {/* Consistency Calendar */}
        <ConsistencyCalendar />

        {/* Health Metrics */}
        {metrics.length > 0 && (
          <HealthMetrics
            metrics={metrics.map((metric) => ({
              type: metric.type,
              value: metric.value,
              unit: metric.unit,
              trend: "neutral" as const,
            }))}
          />
        )}

        {/* Motivational Quote */}
        {quote && (
          <MotivationalQuote
            quote={quote.text}
            author={quote.author || undefined}
            category={quote.category || undefined}
          />
        )}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: DesignTokens.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.xl,
    paddingTop: DesignTokens.spacing.md,
  },
  welcomeText: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.regular,
    marginBottom: DesignTokens.spacing.xs,
  },
  nameText: {
    fontSize: DesignTokens.fontSize.xl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  bellIcon: {
    fontSize: 20,
  },
  bottomSpacing: {
    height: DesignTokens.spacing.xxl,
  },
});
