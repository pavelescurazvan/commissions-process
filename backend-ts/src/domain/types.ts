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
  minimumFeeInCents: number,
  clientId?: number,
  clientFeeInCents?: number,
  turnoverThresholdInCents?: number,
  turnoverFee?: string
}

export type ProcessCommission = ({ transaction }: {
  transaction: Transaction,
}) => Promise<Commission>

export type CreateProcessCommission = ({ repository, commissionRulesLoader }: {
  repository: Repository, commissionRulesLoader: CommissionRulesLoader
}) => {
  processCommission: ProcessCommission
}

export type CommissionRulesLoader = () => Promise<CommissionRule[]>
export type DefineCommissionRule = (commissionRule: CommissionRule) => Promise<void>

export type CreateCommissionRules = ({ repository }: {
  repository: Repository
}) => {
  commissionRulesLoader: CommissionRulesLoader
  defineCommissionRule: DefineCommissionRule
}