import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GlassCard } from "../ui/GlassCard";

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
  color?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export function QuickActions({ actions }: QuickActionsProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <GlassCard style={styles.container}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Quick Actions
      </Text>

      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[
              styles.actionButton,
              { backgroundColor: action.color || colors.backgroundCard },
            ]}
            onPress={action.onPress}
            activeOpacity={0.8}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={[styles.actionTitle, { color: colors.textPrimary }]}>
              {action.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </GlassCard>
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
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    aspectRatio: 1.2,
    borderRadius: DesignTokens.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.md,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: DesignTokens.spacing.sm,
  },
  actionTitle: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    textAlign: "center",
  },
});
