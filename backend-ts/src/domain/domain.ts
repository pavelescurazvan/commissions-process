/*

client_id,date,amount,currency,commission_amount,commission_currency
42,2021-01-02,2000.00,EUR,0.05,EUR
1,2021-01-03,500.00,EUR,2.50,EUR
1,2021-01-04,499.00,EUR,2.50,EUR
1,2021-01-05,100.00,EUR,0.50,EUR
1,2021-01-06,1.00,EUR,0.03,EUR
1,2021-02-01,500.00,EUR,2.50,EUR

 */

enum CURRENCY {
  "EURO" = "EURO",
}

export type Transaction = {
  date: Date,
  amount: string,
  currency: CURRENCY.EURO,
  clientId: number
}

type Commission = {
  amount: string,
  currency: CURRENCY.EURO,
}

type CommissionRule = {
  percentage?: string,
  minimumFee: string,
  clientId?: number, // Applies only to a specific client ID
  turnoverThreshold?: string,
  turnoverFee?: string
}

/**
 * It computes the commission, based on a list of commission rules
 * that might or not might apply to the current transaction (based on UserId, maybe)
 * Only one commission rule can apply for a transaction, and it's always the one that has the lowest fee.
 * Returns only amounts in EUROS.
 * @param transaction
 * @param commisionRules
 */
export const processCommission = (transaction: Transaction, commisionRules: CommissionRule[]): Commission => {
  // Compute all commissions for the current transaction, maybe store the results in an array

  // Order the array based on the fee amount and return the smallest result

  return {amount: "1", currency: CURRENCY.EURO};
}
