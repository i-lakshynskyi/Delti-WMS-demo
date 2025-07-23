import {create} from 'zustand'




const getInitialRackSummary = () => ({
    rackID: null,
    location: null,
    maxCapacity: 0,
    statusOfFilling: null,
    typeRack: null,
    totalItems: 0,
    totalSKUs: 0,
    earliestDOT: '',
    SKUs: [],
});

const getFillingStatus = (totalItems, maxCapacity) => {
    if (!totalItems || totalItems === 0) return "Empty";
    if (totalItems >= maxCapacity) return "Full";
    return "Partially";
};

// STORE
const useStore = create((set) => ({
    isShowSpinner: false,
    setIsShowSpinner: (status) => set({isShowSpinner: status}),

    user: null,
    setUser: (user) => set({user}),

    currentPage: 'login', // 'login' 'jobs', 'overview', 'scanRackQR', 'rackSummary', 'articleSummary', 'scanArticle', 'jobSummary', 'completedJob'
    setCurrentPage: (page) => set({currentPage: page}),

    isLoggedIn: false,
    setIsLoggedIn: (status) => set({isLoggedIn: status}),

    articleSummary: {},
    setArticleSummary: (summary) => set({articleSummary: summary}),

    rackSummary: getInitialRackSummary(),
    setRackSummary: (update) =>
        set((state) => {
            const partial = update === 'reset' ? getInitialRackSummary() : update;

            const updatedSKUs = partial.SKUs ?? state.rackSummary.SKUs;
            const totalItems = partial.totalItems ?? state.rackSummary.totalItems;
            const maxCapacity = partial.maxCapacity ?? state.rackSummary.maxCapacity;

            const statusOfFilling = update === 'reset' ? "" : getFillingStatus(totalItems, maxCapacity);

            return {
                rackSummary: {
                    ...state.rackSummary,
                    ...partial,
                    totalSKUs: updatedSKUs.length,
                    statusOfFilling,
                },
            };
        }),


    jobSummary: {
        currentJob: null,
        completeArticles: {
            totalIQuantity: 0,
            scannedArticles: [],
        },
        completeTimeJob: '',
        timeTaken: '',
        startTimeJob: '',
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
