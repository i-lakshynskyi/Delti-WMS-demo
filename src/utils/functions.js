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