/**
 *
 */
export interface CurrencyExchangeService {
  convert: ({amount, sourceCurrency}: {
    amount: string
    sourceCurrency:
  }) => void
}