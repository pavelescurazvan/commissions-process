export const convertInCents = (amount: string) => parseFloat(amount) * 100;
export const convertFromCents = (amount: number) => String((amount / 100).toFixed(2));
export const convertDateToDomainFormat = (date: Date) => date.toISOString().slice(0, 10)
