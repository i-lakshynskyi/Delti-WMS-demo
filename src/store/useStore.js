import {create} from 'zustand'
import {isOldDot, recalculateStatuses} from "../utils/functions.js";




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
const useStore = create((set, get) => ({
    isShowSpinner: false,
    setIsShowSpinner: (status) => set({isShowSpinner: status}),

    user: null,
    setUser: (user) => set({user}),

    currentPage: {page : 'login', params: null}, // 'login' 'jobs', 'overview', 'scanRackQR', 'rackSummary', 'articleSummary', 'scanArticle', 'jobSummary', 'completedJob'
    setCurrentPage: (page, params = null) => set({
        currentPage: {page, params}
    }),

    isLoggedIn: false,
    setIsLoggedIn: (status) => set({isLoggedIn: status}),

    articleSummary: {},
    setArticleSummary: (summary) => set({articleSummary: summary}),
    setAddDamageReportToArticleSummary: ({ comment, galleryList }) => set(state => {
        const currentArticle = state.articleSummary || {};

        const damageReports = Array.isArray(currentArticle.damageReports)
            ? [...currentArticle.damageReports]
            : [];

        damageReports.push({
            comment,
            galleryList,
            timestamp: new Date().toISOString()
        });

        const statusesSet = new Set(currentArticle.statuses || []);
        statusesSet.add("Damaged");

        const updatedArticle = {
            ...currentArticle,
            damageReports,
            statuses: Array.from(statusesSet)
        };

        return { articleSummary: updatedArticle };
    }),

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

    scannedRacksHistory: [],
    setUpdateScannedRacksHistory: (updateRack) =>
        set((state) => {
            const updateRackIndex = state.scannedRacksHistory.findIndex(rack => rack.rackID === updateRack.rackID);
            const maxCapacity = updateRack.maxCapacity ?? (updateRackIndex !== -1 ? state.scannedRacksHistory[updateRackIndex].maxCapacity : 0);
            const totalItems = updateRack.totalItems;
            const statusOfFilling = getFillingStatus(totalItems, maxCapacity);

            if (updateRackIndex === -1) {
                return { scannedRacksHistory: [...state.scannedRacksHistory, {...updateRack, statusOfFilling}] };
            } else {
                const updatedRack = {
                    ...state.scannedRacksHistory[updateRackIndex],
                    SKUs: updateRack.SKUs,
                    totalItems: updateRack.totalItems,
                    statusOfFilling
                };

                const updatedHistory = [...state.scannedRacksHistory];
                updatedHistory[updateRackIndex] = updatedRack;

                return { scannedRacksHistory: updatedHistory };
            }
        }),

    scannedArticlesHistory: [],
    setUpdateScannedArticlesHistory: (article, quantityToAdd, rack) =>
        set(state => {
            const updatedHistory = [...state.scannedArticlesHistory];
            const index = updatedHistory.findIndex(a => a.ean === article.ean);

            const rackUsed = {
                rackID: rack.rackID,
                quantity: quantityToAdd,
                dot: article.dot,
                location: rack.location,
                typeRack: rack.typeRack
            };

            if (index !== -1) {
                const existing = { ...updatedHistory[index] };
                const updatedRacks = [...existing.racksUsed];

                const rackIndex = updatedRacks.findIndex(
                    r => r.rackID === rack.rackID && r.dot === article.dot
                );

                if (rackIndex !== -1) {
                    updatedRacks[rackIndex] = {
                        ...updatedRacks[rackIndex],
                        quantity: updatedRacks[rackIndex].quantity + quantityToAdd
                    };
                } else {
                    updatedRacks.push(rackUsed);
                }

                const placedQuantity = updatedRacks.reduce((sum, r) => sum + r.quantity, 0);
                const dotsUsed = Array.from(new Set(updatedRacks.map(r => r.dot)));

                let recalculatedStatuses = recalculateStatuses({
                    expectedQuantity: existing.expectedQuantity,
                    placedQuantity,
                    dotsUsed
                });

                if (article.statuses && article.statuses.includes("Damaged")) {
                    recalculatedStatuses = Array.from(new Set([...recalculatedStatuses, "Damaged"]));
                }

                updatedHistory[index] = {
                    ...existing,
                    placedQuantity,
                    racksUsed: updatedRacks,
                    dotsUsed,
                    statuses: recalculatedStatuses,
                    damageReports: article.damageReports ?? []

            };

            } else {
                const placedQuantity = quantityToAdd;
                const originalArticle = state.jobSummary.currentJob?.skuTires?.find(sku => sku.ean === article.ean);
                const expectedQuantity = originalArticle?.quantity ?? article.quantity;

                let recalculatedStatuses = recalculateStatuses({
                    expectedQuantity,
                    placedQuantity,
                    dotsUsed: [article.dot]
                });

                if (article.statuses && article.statuses.includes("Damaged")) {
                    recalculatedStatuses = Array.from(new Set([...recalculatedStatuses, "Damaged"]));
                }

                updatedHistory.push({
                    ean: article.ean,
                    name: article.name,
                    size: article.size,
                    expectedQuantity,
                    placedQuantity,
                    racksUsed: [rackUsed],
                    dotsUsed: [article.dot],
                    statuses: recalculatedStatuses,
                    damageReports: Array.isArray(article.damageReports) ? article.damageReports : []
                });
            }

            return { scannedArticlesHistory: updatedHistory };
        }),

    setFixDotQuantityForArticle: ({ rackID, originalDot, newQuantity, newDot, ean }) =>
        set((state) => {
            const articles = [...state.scannedArticlesHistory];
            const articleIndex = articles.findIndex(a => a.ean === ean);
            if (articleIndex === -1) return {};

            const article = { ...articles[articleIndex] };
            const updatedRacks = [...article.racksUsed];

            const rackIndex = updatedRacks.findIndex(
                r => r.rackID === rackID && r.dot === originalDot
            );
            if (rackIndex === -1) return {};

            updatedRacks[rackIndex] = {
                ...updatedRacks[rackIndex],
                quantity: Number(newQuantity),
                dot: newDot
            };

            const placedQuantity = updatedRacks.reduce((sum, r) => sum + r.quantity, 0);

            const dotsUsed = [...new Set(updatedRacks.map(r => r.dot))];

            const expectedQuantity = article.expectedQuantity;
            const previousStatuses = article.statuses || [];

            const statuses = [];
            if(previousStatuses.includes("Damaged")) statuses.push("Damaged");
            if (placedQuantity < expectedQuantity) statuses.push("Quantity_Mismatch");
            if (dotsUsed.some(dot => isOldDot(dot))) statuses.push("Old_DOT");
            if (statuses.length === 0) statuses.push("OK");

            articles[articleIndex] = {
                ...article,
                racksUsed: updatedRacks,
                placedQuantity,
                dotsUsed,
                statuses
            };

            return {
                scannedArticlesHistory: articles
            };
        }),

    jobSummary: {
        currentJob: null,
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

    resetAppState: () =>
        set(() => ({
            isShowSpinner: false,
            user: null,
            isLoggedIn: true,
            currentPage: { page: 'jobs', params: null },
            articleSummary: {},
            rackSummary: getInitialRackSummary(),
            scannedRacksHistory: [],
            scannedArticlesHistory: [],
            jobSummary: {
                currentJob: null,
                completeTimeJob: '',
                timeTaken: '',
                startTimeJob: '',
            }
        })),
}))

export default useStore
