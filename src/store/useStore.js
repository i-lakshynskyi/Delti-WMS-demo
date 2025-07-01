import { create } from 'zustand'

const useStore = create((set) => ({
    user: null, // { username, token, etc }
    currentJob: null, // поточний GR job
    racks: [], // масив просканованих стелажів
    articles: [], // масив отриманих шин
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
    setCurrentJob: (job) => set({ currentJob: job }),
    addRack: (rack) => set((state) => ({ racks: [...state.racks, rack] })),
    addArticle: (article) => set((state) => ({ articles: [...state.articles, article] }))
}))

export default useStore
