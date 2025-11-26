/**
 * Color palette for Uangku Personal Finance App
 * Featuring purple-pink gradients and glassmorphism effects
 */

export const colors = {
  // Primary gradient colors (purple → blue → pink)
  primary: {
    purple: '#8B5CF6',
    purpleLight: '#A78BFA',
    purpleDark: '#7C3AED',
    blue: '#3B82F6',
    blueLight: '#60A5FA',
    blueDark: '#2563EB',
    pink: '#EC4899',
    pinkLight: '#F472B6',
    pinkDark: '#DB2777',
  },

  // Gradient definitions
  gradients: {
    primary: ['#8B5CF6', '#3B82F6', '#EC4899'],
    purpleBlue: ['#8B5CF6', '#3B82F6'],
    bluePink: ['#3B82F6', '#EC4899'],
    purplePink: ['#8B5CF6', '#EC4899'],
    card: ['rgba(139, 92, 246, 0.1)', 'rgba(59, 130, 246, 0.1)'],
  },

  // Light mode colors
  light: {
    background: '#F8F9FA',
    backgroundSecondary: '#FFFFFF',
    text: '#1F2937',
    textSecondary: '#6B7280',
    textTertiary: '#9CA3AF',
    border: '#E5E7EB',
    card: '#FFFFFF',
    cardGlass: 'rgba(255, 255, 255, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },

  // Dark mode colors
  dark: {
    background: '#0F172A',
    backgroundSecondary: '#1E293B',
    text: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textTertiary: '#94A3B8',
    border: '#334155',
    card: '#1E293B',
    cardGlass: 'rgba(30, 41, 59, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.3)',
  },

  // Semantic colors
  success: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
    background: 'rgba(16, 185, 129, 0.1)',
  },

  error: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
    background: 'rgba(239, 68, 68, 0.1)',
  },

  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
    background: 'rgba(245, 158, 11, 0.1)',
  },

  info: {
    main: '#3B82F6',
    light: '#60A5FA',
    dark: '#2563EB',
    background: 'rgba(59, 130, 246, 0.1)',
  },

  // Category colors (for expense/income categories)
  categories: {
    food: '#F59E0B',
    transport: '#3B82F6',
    entertainment: '#EC4899',
    shopping: '#8B5CF6',
    health: '#10B981',
    education: '#6366F1',
    bills: '#EF4444',
    salary: '#10B981',
    investment: '#8B5CF6',
    other: '#6B7280',
  },

  // Chart colors
  chart: {
    income: '#10B981',
    expense: '#EF4444',
    bar1: '#8B5CF6',
    bar2: '#3B82F6',
    bar3: '#EC4899',
    bar4: '#F59E0B',
    line1: '#8B5CF6',
    line2: '#3B82F6',
  },
};

export type ColorScheme = 'light' | 'dark';

export const getThemeColors = (scheme: ColorScheme) => {
  return scheme === 'light' ? colors.light : colors.dark;
};
