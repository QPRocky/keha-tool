import { create } from 'zustand';

type ConnectionStatus = 'connected' | 'disconnected'

interface State {
  connectionStatus: ConnectionStatus
  database: string
  setAsConnected: (database: string) => void
  setAsDisconnected: () => void
}

const useConnectionStatusStore = create<State>()(set => ({
  connectionStatus: "disconnected",
  database: "",

  setAsConnected: (database: string) => set({
    connectionStatus: "connected",
    database
  }),

  setAsDisconnected: () => set({
    connectionStatus: "disconnected",
    database: ""
  })

}));

export default useConnectionStatusStore;
