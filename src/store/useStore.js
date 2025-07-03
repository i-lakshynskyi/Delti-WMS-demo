import { create } from 'zustand'

const useStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),

    currentPage: 'login', // 'login' 'jobs', 'overview', 'scanning', etc
    setCurrentPage: (page) => set({ currentPage: page }),

    isLoggedIn: false,
    setIsLoggedIn: (status) => set({ isLoggedIn: status }),

    currentJob: null,
    setCurrentJob: (job) => set({ currentJob: job }),
}))

export default useStore
