// app/utils/helpers.ts
export const calculateDateDiff = (startDate: string) => {
    const start = new Date(startDate);
    const today = new Date();
    let diff = today.getFullYear() - start.getFullYear();
    const m = today.getMonth() - start.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < start.getDate())) diff--;
    return diff;
};