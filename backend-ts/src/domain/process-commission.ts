import {
  Commission,
  CommissionRulesLoader,
  CreateProcessCommission,
  CURRENCY,
  Transaction
} from "./types";
import {Repository} from "./repository";

/**
 * It computes the commission, based on a list of commission rules
 * that might or not might apply to the current transaction (based on UserId, maybe)
 * Only one commission rule can apply for a transaction, and it's always the one that has the lowest fee.
 * Returns only amounts in EUROS.
 * @param repository
 */
export const createProcessCommission: CreateProcessCommission = ({repository, commissionRulesLoader}: {
  repository: Repository,
  commissionRulesLoader: CommissionRulesLoader
}) => {
  const commissionRules = commissionRulesLoader();

  return {
    processCommission: async ({ transaction }: {
      transaction: Transaction
    }): Promise<Commission> => {
      // Compute all commissions for the current transaction, maybe store the results in an array

      // Order the array based on the fee amount and return the smallest result

      return {amountInCents: 1, currency: CURRENCY.EURO};
    }
  }
}
