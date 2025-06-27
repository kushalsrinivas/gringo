import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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

// Components
import {
  ConsistencyCalendar,
  type StreakData,
} from "@/components/dashboard/ConsistencyCalendar";

// Types
import type {
  DailyChallenge,
  HealthMetric,
  MotivationalQuote as Quote,
  User,
} from "@/db/schema";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors["light"];

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
        await updateUserWithDemoData();
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
      const userData = await getCurrentUser();
      setUser(userData);

      const quoteData = await getRandomQuote();
      setQuote(quoteData);

      const metricsData = await getTodaysMetrics();
      setMetrics(metricsData);

      const challengesData = await getTodaysChallenges();
      setChallenges(challengesData);

      if (userData) {
        const statsData = await getUserWorkoutStats(userData.id);
        setWorkoutStats(statsData);
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
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

  // Generate current week dates
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const weekDates = getCurrentWeekDates();
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        backgroundColor={colors.background}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Time Stamp */}
        <View style={styles.timeContainer}>
          <Text style={[styles.timeText, { color: colors.textPrimary }]}>
            9:41
          </Text>
        </View>

        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={[styles.welcomeText, { color: colors.textPrimary }]}>
            Welcome back, Jobayer 👋
          </Text>
          <Text style={[styles.subText, { color: colors.textLight }]}>
            Let&apos;s crush your goals today!
          </Text>
        </View>

        {/* Date Strip */}
        <View style={styles.dateStrip}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateStripContent}
          >
            {weekDates.map((date, index) => {
              const isToday = date.toDateString() === today.toDateString();
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.dateItem,
                    {
                      backgroundColor: isToday
                        ? colors.dateActive
                        : colors.dateInactive,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      {
                        color: isToday ? colors.textPrimary : colors.textMuted,
                      },
                    ]}
                  >
                    {dayNames[date.getDay()]}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      {
                        color: isToday
                          ? colors.textPrimary
                          : colors.textSecondary,
                      },
                    ]}
                  >
                    {date.getDate()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Today's Challenge Card */}
        <View
          style={[
            styles.challengeCard,
            { backgroundColor: colors.challengeBackground },
          ]}
        >
          <View style={styles.challengeContent}>
            <Text
              style={[styles.challengeTitle, { color: colors.textPrimary }]}
            >
              Today&apos;s Challenge
            </Text>
            <Text
              style={[styles.challengeText, { color: colors.textSecondary }]}
            >
              Take the stairs instead of the elevator 🏃‍♂️
            </Text>
          </View>
        </View>

        {/* Level Progress Card */}
        <View
          style={[
            styles.levelCard,
            {
              backgroundColor: colors.cardBackground,
              borderColor: colors.cardBorder,
            },
          ]}
        >
          <View style={styles.levelHeader}>
            <Text style={[styles.levelTitle, { color: colors.textPrimary }]}>
              Level Progress
            </Text>
            <Text style={[styles.levelNumber, { color: colors.textPrimary }]}>
              Level 12
            </Text>
          </View>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressTrack,
                { backgroundColor: colors.progressTrack },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: colors.progressFill,
                    width: "74%",
                  },
                ]}
              />
            </View>
            <Text style={[styles.xpText, { color: colors.textLight }]}>
              1850 / 2500 XP
            </Text>
          </View>
        </View>

        {/* Stats Overview Section */}
        <View style={styles.statsSection}>
          <View
            style={[styles.statCard, { backgroundColor: colors.statsMint }]}
          >
            <Text style={[styles.statIcon]}>💪</Text>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>
              53
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Workouts
            </Text>
          </View>

          <View
            style={[styles.statCard, { backgroundColor: colors.statsSkyBlue }]}
          >
            <Text style={[styles.statIcon]}>⏱️</Text>
            <Text style={[styles.statValue, { color: colors.textPrimary }]}>
              1260
            </Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Minutes
            </Text>
          </View>

          <View
            style={[styles.statCard, { backgroundColor: colors.statsBlush }]}
          >
            <Text style={[styles.statIcon]}>🏋️</Text>
            <View style={styles.volumeContainer}>
              <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                23,540.5
              </Text>
              <Text
                style={[styles.volumeUnit, { color: colors.textSecondary }]}
              >
                kg
              </Text>
            </View>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
              Volume
            </Text>
          </View>
        </View>

        {/* Streak Tracker */}
        <View style={styles.streakSection}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Streak Tracker
          </Text>
          <View style={styles.streakContainer}>
            <View style={styles.streakDots}>
              {Array.from({ length: 8 }, (_, index) => (
                <View
                  key={index}
                  style={[
                    styles.streakDot,
                    { backgroundColor: colors.streakActive },
                  ]}
                />
              ))}
            </View>
            <Text style={[styles.flameIcon]}>🔥</Text>
          </View>
        </View>

        {/* Consistency Calendar */}
        <ConsistencyCalendar
          onDayPress={(data: StreakData) => {
            console.log("Day pressed:", data);
          }}
          showLegend={true}
          showStats={true}
          animateUpdates={true}
        />

        {/* Bottom spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: DesignTokens.spacing.xl,
    paddingTop: DesignTokens.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.medium,
  },

  // Time stamp
  timeContainer: {
    alignItems: "flex-start",
    marginBottom: DesignTokens.spacing.lg,
  },
  timeText: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.light,
  },

  // Header section
  headerSection: {
    marginBottom: DesignTokens.spacing.xl,
  },
  welcomeText: {
    fontSize: DesignTokens.fontSize.xxl,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  subText: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.regular,
  },

  // Date strip
  dateStrip: {
    marginBottom: DesignTokens.spacing.xl,
  },
  dateStripContent: {
    paddingRight: DesignTokens.spacing.lg,
  },
  dateItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: DesignTokens.spacing.sm,
  },
  dayText: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
    marginBottom: 2,
  },
  dateText: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.semibold,
  },

  // Challenge card
  challengeCard: {
    borderRadius: DesignTokens.borderRadius,
    padding: DesignTokens.spacing.xl,
    marginBottom: DesignTokens.spacing.xl,
  },
  challengeContent: {
    alignItems: "flex-start",
  },
  challengeTitle: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.sm,
  },
  challengeText: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.medium,
    lineHeight: 22,
  },

  // Level progress card
  levelCard: {
    borderRadius: DesignTokens.borderRadius,
    borderWidth: 1,
    padding: DesignTokens.spacing.xl,
    marginBottom: DesignTokens.spacing.xl,
    ...DesignTokens.shadows.sm,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.lg,
  },
  levelTitle: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  levelNumber: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
  },
  progressContainer: {
    alignItems: "center",
  },
  progressTrack: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    marginBottom: DesignTokens.spacing.sm,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  xpText: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },

  // Stats section
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: DesignTokens.spacing.xl,
    gap: DesignTokens.spacing.sm,
  },
  statCard: {
    width: 110,
    height: 80,
    borderRadius: DesignTokens.borderRadiusSmall,
    padding: DesignTokens.spacing.sm,
    justifyContent: "center",
    alignItems: "center",
    ...DesignTokens.shadows.sm,
  },
  statIcon: {
    fontSize: 16,
    marginBottom: DesignTokens.spacing.xs,
  },
  statValue: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    textAlign: "center",
  },
  volumeContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  volumeUnit: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
    marginLeft: 2,
  },
  statLabel: {
    fontSize: DesignTokens.fontSize.xs,
    fontWeight: DesignTokens.fontWeight.medium,
    marginTop: DesignTokens.spacing.xs,
    textAlign: "center",
  },

  // Streak section
  streakSection: {
    marginBottom: DesignTokens.spacing.xl,
  },
  sectionTitle: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.md,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  streakDots: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    paddingRight: DesignTokens.spacing.md,
  },
  streakDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  flameIcon: {
    fontSize: 20,
  },

  // Bottom spacing
  bottomSpacing: {
    height: DesignTokens.spacing.xxxl,
  },
});
