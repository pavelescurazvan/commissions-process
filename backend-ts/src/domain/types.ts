export enum CURRENCY {
  "EURO" = "EURO",
}

export type Transaction = {
  date: Date,
  amount: string,
  currency: CURRENCY.EURO,
  clientId: number
}

export type Commission = {
  amount: string,
  currency: CURRENCY.EURO,
}

export type CommissionRule = {
  percentage?: string,
  minimumFee: string,
  clientId?: number, // Applies only to a specific client ID
  turnoverThreshold?: string,
  turnoverFee?: string
}