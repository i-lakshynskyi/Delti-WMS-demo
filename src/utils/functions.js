export function getEarliestDot(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return "..";

    const dotsWithDates = arr.map(item => {
        const dot = item.dot;
        const week = parseInt(dot.slice(0, 2), 10);
        const year = 2000 + parseInt(dot.slice(2), 10);

        const jan4 = new Date(year, 0, 4);
        const dayOfWeek = jan4.getDay() || 7;
        const firstWeekStart = new Date(jan4);
        firstWeekStart.setDate(jan4.getDate() - dayOfWeek + 1);
        const dotDate = new Date(firstWeekStart);
        dotDate.setDate(firstWeekStart.getDate() + (week - 1) * 7);

        return { dot, date: dotDate };
    });

    const earliest = dotsWithDates.reduce((prev, curr) =>
        curr.date < prev.date ? curr : prev
    );

    return earliest.dot;
}

export function sumTotalQuantities(arr) {
    return arr.reduce((sum, item) => sum + (item.totalQuantity || 0), 0);
}


export function getTotalUniqueUsedRacks(scannedArticles) {
    const allRackIDs = scannedArticles.flatMap(article =>
        Array.isArray(article.racksUsed)
            ? article.racksUsed.map(rack => rack.rackID)
            : []
    );

    const uniqueRackIDs = new Set(allRackIDs);
    return uniqueRackIDs.size;
}

// Preload Image
const imageCache = new Map();

// Removed function delay after get real IMG-url from server
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Preloads an image by its URL.
 * Caches the Promise to avoid redundant network requests.
 * @param {string} url - The image URL
 * @returns {Promise<string>} - A Promise that resolves when the image is loaded
 */
export function preloadImage(url) {
    if (!url) {
        return Promise.reject(new Error('Image URL is required'));
    }

    // Return cached Promise if available
    if (imageCache.has(url)) {
        return imageCache.get(url);
    }

    // Create a new Promise to load image
    const promise = new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;

        // Simulate loading delay for local paths !!!Removed img.onload after get real IMG-url from server
        img.onload = async () => {
            if (url.startsWith('/assets/')) {
                await delay(1000);
            }
            resolve(url);
        };

        /*img.onload = () => resolve(url);*/
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    });

    // Cache the Promise
    imageCache.set(url, promise);

    return promise;
}

// STATUSES of articles
export function isOldDot(dot) {
    if (!dot || dot.length !== 4) return false;

    const week = parseInt(dot.slice(0, 2), 10);
    const year = 2000 + parseInt(dot.slice(2), 10);

    const jan4 = new Date(year, 0, 4);
    const dayOfWeek = jan4.getDay() || 7;
    const firstWeekStart = new Date(jan4);
    firstWeekStart.setDate(jan4.getDate() - dayOfWeek + 1);
    const dotDate = new Date(firstWeekStart);
    dotDate.setDate(firstWeekStart.getDate() + (week - 1) * 7);

    const threshold = new Date();
    threshold.setMonth(threshold.getMonth() - 24);

    return dotDate < threshold;
}

export function generateInitialStatuses(dotsArray) {
    const dots = Array.isArray(dotsArray) ? dotsArray : [dotsArray];
    const statuses = ['Quantity_Mismatch'];

    if (dots.some(isOldDot)) {
        statuses.push('Old_DOT');
    }

    return statuses;
}



export function recalculateStatuses(article) {
    const { expectedQuantity, placedQuantity, dotsUsed = [] } = article;
    const statuses = [];

    if (placedQuantity < expectedQuantity) {
        statuses.push('Quantity_Mismatch');
    }

    const hasOldDot = dotsUsed.some(dot => isOldDot(dot));
    if (hasOldDot) {
        statuses.push('Old_DOT');
    }

    if (statuses.length === 0) {
        statuses.push('OK');
    }

    return statuses;
}


