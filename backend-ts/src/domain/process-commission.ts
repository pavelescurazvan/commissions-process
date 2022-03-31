import {
  Commission,
  CommissionRulesLoader,
  CreateProcessCommission,
  CURRENCY,
  Transaction
} from "./types";
import {Repository} from "./repository";
import {convertDateToDomainFormat} from "./helpers";

const getClientTransactionsTurnover = async ({ repository, clientId, calendarMonth }: {
  repository: Repository,
  clientId: number,
  calendarMonth: string
}) => {
  const {transactionsTurnover} = await repository.getLastTransaction(clientId, calendarMonth);

  return transactionsTurnover;
};

/**
 * It computes the commission, based on a list of commission rules
 * that might or not might apply to the current transaction (based on UserId, maybe)
 * Only one commission rule can apply for a transaction, and it's always the one that has the lowest fee.
 * Returns only amounts in EUROS.
 * @param repository
 * @param commissionRulesLoader
 */
export const createProcessCommission: CreateProcessCommission = ({repository, commissionRulesLoader}: {
  repository: Repository,
  commissionRulesLoader: CommissionRulesLoader
}) => {

  return {
    processCommission: async ({ transaction }: {
      transaction: Transaction
    }): Promise<Commission> => {
      const commissionRules = await commissionRulesLoader();

      // Compute all commissions for the current transaction, maybe store the results in an array

      const results = commissionRules.map(async (commissionRule) => {
        const { percentage, minimumFeeInCents, clientId, turnoverThresholdInCents, turnoverFee } = commissionRule;

        if (percentage) {
          return transaction.amountInCents * parseFloat(percentage);
        }

        if (clientId && clientId === transaction.clientId) {
          return commissionRule.clientFeeInCents
        }

        if (turnoverThresholdInCents && turnoverFee) {
          const clientTransactionsTurnover = await getClientTransactionsTurnover({
            repository,
            clientId: transaction.clientId,
            calendarMonth: convertDateToDomainFormat(transaction.date)
          });

          if (clientTransactionsTurnover > turnoverThresholdInCents) {
            return commissionRule.turnoverFee;
          }
        }

        // Simplest case
        return minimumFeeInCents;
      });

      // Order the array based on the fee amount and return the smallest result

      return {amountInCents: 1, currency: CURRENCY.EURO};
    }
  }
}
