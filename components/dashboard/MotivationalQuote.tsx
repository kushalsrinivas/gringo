import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlassCard } from "../ui/GlassCard";

interface MotivationalQuoteProps {
  quote: string;
  author?: string;
  category?: string;
}

export function MotivationalQuote({
  quote,
  author,
  category,
}: MotivationalQuoteProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getCategoryEmoji = (cat?: string) => {
    switch (cat?.toLowerCase()) {
      case "fitness":
        return "💪";
      case "motivation":
        return "🔥";
      case "success":
        return "🏆";
      case "strength":
        return "⚡";
      default:
        return "✨";
    }
  };

  return (
    <GlassCard style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.emoji}>{getCategoryEmoji(category)}</Text>
        <Text style={[styles.categoryLabel, { color: colors.textSecondary }]}>
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "Inspiration"}
        </Text>
      </View>

      <Text style={[styles.quote, { color: colors.textPrimary }]}>
        "{quote}"
      </Text>

      {author && (
        <Text style={[styles.author, { color: colors.textSecondary }]}>
          — {author}
        </Text>
      )}
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: DesignTokens.spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: DesignTokens.spacing.md,
  },
  emoji: {
    fontSize: 20,
    marginRight: DesignTokens.spacing.sm,
  },
  categoryLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  quote: {
    fontSize: DesignTokens.fontSize.base,
    fontWeight: DesignTokens.fontWeight.medium,
    lineHeight: DesignTokens.fontSize.base * 1.5,
    fontStyle: "italic",
    marginBottom: DesignTokens.spacing.md,
    textAlign: "center",
  },
  author: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
    textAlign: "right",
  },
});
