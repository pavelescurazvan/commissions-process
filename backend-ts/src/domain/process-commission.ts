import {
  Commission,
  CommissionRulesLoader,
  CreateProcessCommission,
  CURRENCY,
  Transaction
} from "./types";
import {Repository} from "./repository";

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

      const feesOfRules = await Promise.all(commissionRules.map(async (commissionRule) => {
        const { percentage, minimumFeeInCents, client, turnover } = commissionRule;

        const feesOfThisRule = await Promise.all(Object.keys(commissionRule).map(async (objectKey) => {

          if (objectKey === "percentage" && percentage) {
            return transaction.amountInCents * parseFloat(percentage);
          }

          if (objectKey === 'client' && client && client.clientId === transaction.clientId) {
            return client.clientFeeInCents;
          }

          if (objectKey === 'turnover' && turnover) {
            const clientTransactionsTurnover = await getClientTransactionsTurnover({
              repository,
              clientId: transaction.clientId,
              calendarMonth: transaction.date
            });

            if (clientTransactionsTurnover > turnover.turnoverThresholdInCents) {
              return turnover.turnoverFeeInCents;
            }
          }

          // Simplest case
          return minimumFeeInCents;

        }));

        feesOfThisRule.sort((a, b) => {
          return a < b ? a : b;
        })

        return feesOfThisRule[0];

      }))

      feesOfRules.sort((a, b) => {
        return a < b ? a : b;
      })

      return {amountInCents: feesOfRules[0], currency: CURRENCY.EURO};
    }
  }
}
