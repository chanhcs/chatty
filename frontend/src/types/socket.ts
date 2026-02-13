import type { Socket } from "socket.io-client";

export interface SocketState {
  socket: Socket | null;
  onlineUsers: string[];
  showOnline?: boolean;
  setShowOnline?: (visible: boolean) => void;
  connectSocket: () => void;
  disconnectSocket: () => void;
}