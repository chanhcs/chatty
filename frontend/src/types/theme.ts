export interface ThemeState {
    isDark: boolean
    toggleTheme: () => void;
    setTheme: (data: boolean) => void;
}