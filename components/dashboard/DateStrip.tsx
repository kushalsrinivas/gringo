import { Colors, DesignTokens } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface DateStripProps {
  date?: Date;
}

export function DateStrip({ date = new Date() }: DateStripProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const formatDayMonth = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleDateString("en-US", { month: "short" });
    return `${day} ${month}`;
  };

  return (
    <View
      style={[styles.container, { backgroundColor: colors.backgroundCard }]}
    >
      <View style={styles.content}>
        <View style={styles.mainDate}>
          <Text style={[styles.todayLabel, { color: colors.textSecondary }]}>
            Today
          </Text>
          <Text style={[styles.dateText, { color: colors.textPrimary }]}>
            {formatDayMonth(date)}
          </Text>
        </View>
        <Text style={[styles.fullDate, { color: colors.textSecondary }]}>
          {formatDate(date)}
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
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainDate: {
    alignItems: "flex-start",
  },
  todayLabel: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.medium,
    marginBottom: DesignTokens.spacing.xs,
  },
  dateText: {
    fontSize: DesignTokens.fontSize.xxl,
    fontWeight: DesignTokens.fontWeight.bold,
  },
  fullDate: {
    fontSize: DesignTokens.fontSize.sm,
    fontWeight: DesignTokens.fontWeight.regular,
    maxWidth: "60%",
    textAlign: "right",
  },
});
