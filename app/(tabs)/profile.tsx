import { GlassCard } from "@/components/ui/GlassCard";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SettingsItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  showArrow?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  showArrow = true,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <TouchableOpacity
      style={[styles.settingsItem, { backgroundColor: colors.backgroundCard }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingsItemLeft}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.primary + "20" },
          ]}
        >
          <Text style={styles.settingsIcon}>{icon}</Text>
        </View>
        <View style={styles.settingsTextContainer}>
          <Text style={[styles.settingsTitle, { color: colors.textPrimary }]}>
            {title}
          </Text>
          {subtitle && (
            <Text
              style={[styles.settingsSubtitle, { color: colors.textSecondary }]}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      <View style={styles.settingsItemRight}>
        {rightElement}
        {showArrow && !rightElement && (
          <IconSymbol
            name="chevron.right"
            size={20}
            color={colors.textSecondary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Mock user data - in a real app, this would come from your user context/database
  const [user] = useState({
    name: "Alex Johnson",
    email: "alex.j@example.com",
    avatar: "A", // Using initials as avatar
    level: 12,
    totalXP: 15420,
    joinDate: "Jan 2024",
  });

  // Settings state
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");

  const handlePersonalInfo = () => {
    Alert.alert(
      "Personal Information",
      "This would open a screen to edit profile details like name, email, and avatar.",
      [{ text: "OK" }]
    );
  };

  const handleSettings = () => {
    Alert.alert(
      "App Settings",
      "This would open app preferences like units, language, and other general settings.",
      [{ text: "OK" }]
    );
  };

  const handleAbout = () => {
    Alert.alert(
      "About GetJacked",
      "Version 1.0.0\n\nYour ultimate fitness companion for tracking workouts, progress, and achieving your fitness goals.\n\nDeveloped with ❤️ for fitness enthusiasts.",
      [{ text: "OK" }]
    );
  };

  const handleNotificationToggle = (value: boolean) => {
    setNotificationsEnabled(value);
    Alert.alert(
      "Notifications",
      value ? "Notifications enabled" : "Notifications disabled",
      [{ text: "OK" }]
    );
  };

  const handleWorkoutReminderToggle = (value: boolean) => {
    setWorkoutReminders(value);
    Alert.alert(
      "Workout Reminders",
      value ? "Workout reminders enabled" : "Workout reminders disabled",
      [{ text: "OK" }]
    );
  };

  const handleDarkModeToggle = (value: boolean) => {
    setIsDarkMode(value);
    Alert.alert("Theme", value ? "Dark mode enabled" : "Light mode enabled", [
      { text: "OK" },
    ]);
  };

  const getLevelTitle = (level: number) => {
    if (level < 5) return "Beginner";
    if (level < 10) return "Intermediate";
    if (level < 20) return "Advanced";
    if (level < 30) return "Expert";
    return "Master";
  };

  const getLevelIcon = (level: number) => {
    if (level < 5) return "🌱";
    if (level < 10) return "💪";
    if (level < 20) return "🔥";
    if (level < 30) return "⚡";
    return "👑";
  };

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
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Profile
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Manage your account and preferences
          </Text>
        </View>

        {/* User Profile Card */}
        <GlassCard style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
              <Text style={styles.avatarText}>{user.avatar}</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.userName, { color: colors.textPrimary }]}>
                {user.name}
              </Text>
              <Text style={[styles.userEmail, { color: colors.textSecondary }]}>
                {user.email}
              </Text>
              <View style={styles.userStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>
                    {getLevelIcon(user.level)}
                  </Text>
                  <Text
                    style={[styles.statText, { color: colors.textSecondary }]}
                  >
                    Level {user.level} • {getLevelTitle(user.level)}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>⭐</Text>
                  <Text
                    style={[styles.statText, { color: colors.textSecondary }]}
                  >
                    {user.totalXP.toLocaleString()} XP
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statIcon}>📅</Text>
                  <Text
                    style={[styles.statText, { color: colors.textSecondary }]}
                  >
                    Joined {user.joinDate}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </GlassCard>

        {/* Settings Menu */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Account Settings
          </Text>

          <SettingsItem
            icon="👤"
            title="Personal Information"
            subtitle="Update profile details"
            onPress={handlePersonalInfo}
          />

          <SettingsItem
            icon="⚙️"
            title="Settings"
            subtitle="App preferences"
            onPress={handleSettings}
          />
        </View>

        {/* Preferences */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Preferences
          </Text>

          <SettingsItem
            icon="🔔"
            title="Notifications"
            subtitle="General notifications"
            rightElement={
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationToggle}
                trackColor={{
                  false: colors.textSecondary + "30",
                  true: colors.primary + "50",
                }}
                thumbColor={
                  notificationsEnabled ? colors.primary : colors.textSecondary
                }
              />
            }
            showArrow={false}
            onPress={() => handleNotificationToggle(!notificationsEnabled)}
          />

          <SettingsItem
            icon="💪"
            title="Workout Reminders"
            subtitle="Daily workout notifications"
            rightElement={
              <Switch
                value={workoutReminders}
                onValueChange={handleWorkoutReminderToggle}
                trackColor={{
                  false: colors.textSecondary + "30",
                  true: colors.primary + "50",
                }}
                thumbColor={
                  workoutReminders ? colors.primary : colors.textSecondary
                }
              />
            }
            showArrow={false}
            onPress={() => handleWorkoutReminderToggle(!workoutReminders)}
          />

          <SettingsItem
            icon="🌙"
            title="Dark Mode"
            subtitle="Switch between light and dark theme"
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={handleDarkModeToggle}
                trackColor={{
                  false: colors.textSecondary + "30",
                  true: colors.primary + "50",
                }}
                thumbColor={isDarkMode ? colors.primary : colors.textSecondary}
              />
            }
            showArrow={false}
            onPress={() => handleDarkModeToggle(!isDarkMode)}
          />
        </View>

        {/* About */}
        <View style={styles.settingsSection}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Support
          </Text>

          <SettingsItem
            icon="ℹ️"
            title="About"
            subtitle="App information and help"
            onPress={handleAbout}
          />
        </View>

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
  header: {
    marginBottom: DesignTokens.spacing.xl,
    paddingTop: DesignTokens.spacing.md,
  },
  title: {
    fontSize: DesignTokens.fontSize.xxxl,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  subtitle: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  profileCard: {
    marginBottom: DesignTokens.spacing.xl,
    padding: DesignTokens.spacing.lg,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: DesignTokens.spacing.lg,
  },
  avatarText: {
    fontSize: DesignTokens.fontSize.xxl,
    fontWeight: DesignTokens.fontWeight.bold,
    color: "#FFFFFF",
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: DesignTokens.fontSize.xl,
    fontWeight: DesignTokens.fontWeight.bold,
    marginBottom: DesignTokens.spacing.xs,
  },
  userEmail: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.regular,
    marginBottom: DesignTokens.spacing.md,
  },
  userStats: {
    gap: DesignTokens.spacing.xs,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statIcon: {
    fontSize: 16,
    marginRight: DesignTokens.spacing.xs,
  },
  statText: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
  },
  settingsSection: {
    marginBottom: DesignTokens.spacing.xl,
  },
  sectionTitle: {
    fontSize: DesignTokens.fontSize.lg,
    fontWeight: DesignTokens.fontWeight.semibold,
    marginBottom: DesignTokens.spacing.md,
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: DesignTokens.spacing.lg,
    borderRadius: DesignTokens.borderRadius,
    marginBottom: DesignTokens.spacing.sm,
    ...DesignTokens.shadows.sm,
  },
  settingsItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: DesignTokens.spacing.md,
  },
  settingsIcon: {
    fontSize: 20,
  },
  settingsTextContainer: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.semibold,
    marginBottom: DesignTokens.spacing.xs,
  },
  settingsSubtitle: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
  },
  settingsItemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomSpacing: {
    height: DesignTokens.spacing.xxl,
  },
});
