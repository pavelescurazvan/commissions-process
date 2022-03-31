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
  "USD" = "USD",
  "EURO" = "EURO",
}

type Transaction = {
  date: Date,
  amount: string,
  currency: CURRENCY,
  clientId: number
}

type Commission = {
  amount: string,
  currency: CURRENCY
}

type CommissionRule = {
  percentage?: string,
  minimumFee: string,
  clientId?: number, // Applies only to a specific client ID
  turnoverThreshold?: string,
  turnoverFee?: string
}

