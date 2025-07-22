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


export function getTotalUniqueUsedRacks(jobSummary) {
    const scannedArticles = jobSummary?.completeArticles?.scannedArticles || [];

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
