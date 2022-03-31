import {Repository} from "./repository";

export enum CURRENCY {
  "EURO" = "EURO",
}

export type Transaction = {
  date: string, // TODO: write custom type that uses regex to validate the date format
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
  client?: {
    clientId: number,
    clientFeeInCents: number,
  }
  turnover?: {
    turnoverThresholdInCents: number,
    turnoverFeeInCents: number
  }
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