const convertInCents = (amount: string) => parseFloat(amount) * 100;
const convertFromCents = (amount: number) => String(amount / 100);
const convertDateToDomainFormat = (date: Date) => date.toISOString().slice(0, 10)
