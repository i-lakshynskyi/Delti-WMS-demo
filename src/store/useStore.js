import { create } from 'zustand'

const useStore = create((set) => ({
    user: null,
    setUser: (user) => set({ user }),

    currentPage: 'login', // 'login' 'jobs', 'overview', 'scanRackQR', etc
    setCurrentPage: (page) => set({ currentPage: page }),

    isLoggedIn: false,
    setIsLoggedIn: (status) => set({ isLoggedIn: status }),

    currentJob: null,
    setCurrentJob: (job) => set({ currentJob: job }),

    currentArticle: {},
    setCurrentArticle: (article) => set({ currentArticle: article }),

    rackSummary: {
        id: null,
        SKUs: [],
        totalItems: 0,
        totalSKUs: 0,
        earliestDOT: '',
    },
    setRackSummary: (rack) =>
        set((state) => ({
            rackSummary: {
                ...state.rackSummary,
                ...rack,
                totalSKUs: (rack.SKUs ?? state.rackSummary.SKUs).length,
            },
        })),
}))

export default useStore
