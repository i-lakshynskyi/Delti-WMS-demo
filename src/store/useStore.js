import { create } from 'zustand'

const useStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),

    isLoggedIn: false,
    setIsLoggedIn: (status) => set({ isLoggedIn: status }),

    currentJob: null,
    setCurrentJob: (job) => set({ currentJob: job }),
}))

export default useStore
