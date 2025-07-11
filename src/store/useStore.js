import {create} from 'zustand'

const useStore = create((set) => ({
    user: null,
    setUser: (user) => set({user}),

    currentPage: 'login', // 'login' 'jobs', 'overview', 'scanRackQR', etc
    setCurrentPage: (page) => set({currentPage: page}),

    isLoggedIn: false,
    setIsLoggedIn: (status) => set({isLoggedIn: status}),

    currentArticle: {},
    setCurrentArticle: (article) => set({currentArticle: article}),


    rackSummary: {
        totalSKUs: 0,
        earliestDOT: '',
        SKUs: [],
    },
    setRackSummary: (rack) =>
        set((state) => ({
            rackSummary: {
                ...state.rackSummary,
                ...rack,
                totalSKUs: (rack.SKUs ?? state.rackSummary?.SKUs).length,
            },
        })),


    jobSummary: {
        currentJob: null,
        scannedRacks: [],
        skusList: [],
    },
    setJobSummary: (job) =>
        set(state => ({
            jobSummary: {
                ...state.jobSummary,
                ...job,
            }
        })),
}))

export default useStore
