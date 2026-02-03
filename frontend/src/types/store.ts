export interface ThemeState {
    isDark: boolean
    toggleTheme: () => void;
    setTheme: (data: boolean) => void;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FriendState {
  loading: boolean;
  searchByUsername: (username: string) => Promise<User | null>;
  addFriend: (to: string, message?: string) => Promise<string>;
}
