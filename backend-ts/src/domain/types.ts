export enum CURRENCY {
  "EURO" = "EURO",
}

export type Transaction = {
  date: Date,
  amountInCents: number,
  currency: CURRENCY.EURO,
  clientId: number
}

export type Commission = {
  amountInCents: number,
  currency: CURRENCY.EURO,
}

export type CommissionRule = {
  percentage?: string,
  minimumFee: string,
  clientId?: number, // Applies only to a specific client ID
  turnoverThreshold?: string,
  turnoverFee?: string
}

export type ProcessCommission = ({ transaction, commissionRules }: {
  transaction: Transaction,
  commissionRules: CommissionRule[]
}) => Promise<{
  amountInCents: number,
  currency: CURRENCY.EURO
}>

export interface CreateProcessCommission {
  processCommission: ProcessCommission
}