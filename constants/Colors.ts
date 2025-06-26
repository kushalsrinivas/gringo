/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Fitness Tracker App Colors - Glassmorphism Theme
 * Based on the design rules with gradient backgrounds and glassmorphism effects
 */

export const Colors = {
  light: {
    // Primary colors from design rules
    primary: '#A3E636',
    accent: '#6B72FF',
    textPrimary: '#000000',
    textSecondary: '#666666',
    backgroundCard: 'rgba(255, 255, 255, 0.65)',
    shadow: 'rgba(0, 0, 0, 0.1)',
    
    // Gradient background colors
    gradientStart: '#DFF3FF',
    gradientMiddle: '#E5F0E0',
    gradientEnd: '#F9EAE2',
    
    // Additional functional colors
    background: '#F8FAFC',
    text: '#000000',
    tint: '#A3E636',
    icon: '#666666',
    tabIconDefault: '#666666',
    tabIconSelected: '#A3E636',
    
    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Chart colors
    chartPrimary: '#A3E636',
    chartSecondary: '#6B72FF',
    chartTertiary: '#F59E0B',
  },
  dark: {
    // Primary colors adapted for dark mode
    primary: '#A3E636',
    accent: '#6B72FF',
    textPrimary: '#FFFFFF',
    textSecondary: '#A1A1AA',
    backgroundCard: 'rgba(255, 255, 255, 0.1)',
    shadow: 'rgba(0, 0, 0, 0.3)',
    
    // Gradient background colors for dark mode
    gradientStart: '#1F2937',
    gradientMiddle: '#374151',
    gradientEnd: '#4B5563',
    
    // Additional functional colors
    background: '#111827',
    text: '#FFFFFF',
    tint: '#A3E636',
    icon: '#9CA3AF',
    tabIconDefault: '#9CA3AF',
    tabIconSelected: '#A3E636',
    
    // Status colors
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    info: '#3B82F6',
    
    // Chart colors
    chartPrimary: '#A3E636',
    chartSecondary: '#6B72FF',
    chartTertiary: '#F59E0B',
  },
};

// Design system constants
export const DesignTokens = {
  borderRadius: 16,
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 22,
    xxxl: 24,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  shadows: {
    sm: {
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: 'rgba(0, 0, 0, 0.1)',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 1,
      shadowRadius: 12,
      elevation: 8,
    },
  },
};
