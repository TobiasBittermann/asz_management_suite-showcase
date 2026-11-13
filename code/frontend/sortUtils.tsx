export function sortBy<T>(items: T[], getSortValue: (item: T) => string | number | null | undefined, sortAsc: boolean): T[] {
    return [...items].sort((a, b) => {
        const valueA = getSortValue(a);
        const valueB = getSortValue(b);

        if (valueA == null) return 1;
        if (valueB == null) return -1;

        const result = typeof valueA === "number" && typeof valueB === "number" ? valueA - valueB : String(valueA).localeCompare(String(valueB), "de");

        return sortAsc ? result : -result
    })
}