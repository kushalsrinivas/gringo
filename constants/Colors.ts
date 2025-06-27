/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Fitness Tracker App Colors - Minimalistic Design
 * Clean white background with specific pastel accents
 */

export const Colors = {
  light: {
    // Main background colors
    background: '#FFFFFF',           // Pure white background
    backgroundSecondary: '#FAFAFA',  // Off-white for subtle variation
    
    // Challenge card colors
    challengeBackground: '#D6FFE8',  // Light mint background
    challengeBorder: '#C6F6D5',      // Mint green border
    
    // Progress and accent colors
    progressFill: '#A3E635',         // Pastel green for progress bars
    progressTrack: '#F3F4F6',        // Light gray track
    mintGreen: '#C6F6D5',            // Mint green for active states
    
    // Text colors
    textPrimary: '#000000',          // Pure black for headings
    textSecondary: '#555555',        // Medium gray for body text
    textLight: '#777777',            // Light gray for subtext
    textMuted: '#9CA3AF',            // Very light gray for muted text
    
    // Card backgrounds
    cardBackground: '#FFFFFF',       // White cards
    cardBorder: '#E5E7EB',          // Light gray borders
    
    // Stats card backgrounds (pastel)
    statsBlush: '#FEF3F2',          // Soft blush
    statsSkyBlue: '#F0F9FF',        // Soft sky blue
    statsMint: '#F0FDF4',           // Soft mint
    
    // Streak and calendar colors
    streakActive: '#000000',         // Black for active streak dots
    streakFlame: '#FB923C',          // Pastel orange for flame
    
    // Calendar intensity colors
    calendarInactive: '#F3F4F6',     // Light gray for inactive
    calendarLow: '#DFFFE2',          // Light mint for low activity
    calendarMid: '#A3E635',          // Leaf green for mid activity
    calendarHigh: '#65A30D',         // Dark green for high activity
    
    // Date strip colors
    dateInactive: '#F3F4F6',         // Light gray background
    dateActive: '#C6F6D5',           // Mint green for today
    
    // Standard colors
    primary: '#A3E635',
    accent: '#C6F6D5',
    text: '#000000',
    tint: '#A3E635',
    icon: '#555555',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#A3E635',
    
    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Chart colors
    chartPrimary: '#A3E635',
    chartSecondary: '#C6F6D5',
    chartTertiary: '#FB923C',
    chartQuaternary: '#F0F9FF',
  },
  dark: {
    // Adapted for dark mode
    background: '#000000',
    backgroundSecondary: '#1F2937',
    
    challengeBackground: '#065F46',
    challengeBorder: '#047857',
    
    progressFill: '#A3E635',
    progressTrack: '#374151',
    mintGreen: '#065F46',
    
    textPrimary: '#F9FAFB',
    textSecondary: '#D1D5DB',
    textLight: '#9CA3AF',
    textMuted: '#6B7280',
    
    cardBackground: 'rgba(31, 41, 55, 0.8)',
    cardBorder: '#374151',
    
    statsBlush: '#7C2D12',
    statsSkyBlue: '#0C4A6E',
    statsMint: '#065F46',
    
    streakActive: '#F9FAFB',
    streakFlame: '#FB923C',
    
    calendarInactive: '#374151',
    calendarLow: '#065F46',
    calendarMid: '#A3E635',
    calendarHigh: '#65A30D',
    
    dateInactive: '#374151',
    dateActive: '#065F46',
    
    primary: '#A3E635',
    accent: '#065F46',
    text: '#F9FAFB',
    tint: '#A3E635',
    icon: '#D1D5DB',
    tabIconDefault: '#6B7280',
    tabIconSelected: '#A3E635',
    
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    chartPrimary: '#A3E635',
    chartSecondary: '#065F46',
    chartTertiary: '#FB923C',
    chartQuaternary: '#0C4A6E',
  },
};

// Design system constants
export const DesignTokens = {
  borderRadius: 16,
  borderRadiusLarge: 24,
  borderRadiusSmall: 8,
  borderRadiusXSmall: 4,
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,  // Minimum 20px for major sections
    xxl: 24,
    xxxl: 32,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    xxxxl: 30,
  },
  fontWeight: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    sm: {
      shadowColor: 'rgba(0, 0, 0, 0.05)',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: 'rgba(0, 0, 0, 0.08)',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 2,
    },
    lg: {
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};
