import {Repository} from "./repository";

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

export type ProcessCommission = ({ transaction }: {
  transaction: Transaction,
}) => Promise<Commission>

export type CreateProcessCommission = ({ repository, commissionRules }: {
  repository: Repository, commissionRules: CommissionRule[]
}) => {
  processCommission: ProcessCommission
}

export type CommissionRulesLoader = () => Promise<CommissionRule[]>

export type CreateCommissionRulesLoader = ({ repository }: {
  repository: Repository
}) => {
  commissionRulesLoader: CommissionRulesLoader
}