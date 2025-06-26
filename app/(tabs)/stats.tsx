import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Import components for different tabs
import { OverviewTab } from "@/components/stats/OverviewTab";
import { ProgressTab } from "@/components/stats/ProgressTab";
import { RecordsTab } from "@/components/stats/RecordsTab";

export default function StatsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [activeTab, setActiveTab] = useState<
    "overview" | "progress" | "records"
  >("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "progress", label: "Progress", icon: "📈" },
    { id: "records", label: "Records", icon: "🏆" },
  ] as const;

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "progress":
        return <ProgressTab />;
      case "records":
        return <RecordsTab />;
      default:
        return <OverviewTab />;
    }
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

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.textPrimary }]}>
          Statistics
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Track your fitness journey
        </Text>
      </View>

      {/* Tab Navigation */}
      <View
        style={[
          styles.tabContainer,
          { backgroundColor: colors.backgroundCard },
        ]}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              activeTab === tab.id && {
                backgroundColor: colors.primary,
              },
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                {
                  color:
                    activeTab === tab.id ? "#FFFFFF" : colors.textSecondary,
                  fontWeight:
                    activeTab === tab.id
                      ? DesignTokens.fontWeight.semibold
                      : DesignTokens.fontWeight.medium,
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderTabContent()}
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
  header: {
    paddingHorizontal: DesignTokens.spacing.lg,
    paddingTop: DesignTokens.spacing.xl,
    paddingBottom: DesignTokens.spacing.md,
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
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: DesignTokens.spacing.lg,
    marginBottom: DesignTokens.spacing.lg,
    borderRadius: DesignTokens.borderRadius,
    padding: DesignTokens.spacing.xs,
    ...DesignTokens.shadows.sm,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: DesignTokens.spacing.sm,
    paddingHorizontal: DesignTokens.spacing.md,
    borderRadius: DesignTokens.borderRadius - 4,
  },
  tabIcon: {
    fontSize: 16,
    marginRight: DesignTokens.spacing.xs,
  },
  tabLabel: {
    fontSize: DesignTokens.fontSize.sm,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: DesignTokens.spacing.lg,
    paddingBottom: DesignTokens.spacing.xxl,
  },
});
