import {CURRENCY} from "../domain";

/**
 * Converts amouts from a number of currencies to EURO.
 */
export interface CurrencyExchangeService {
  convert: ({amount, sourceCurrency}: {
    amount: string
    sourceCurrency: CURRENCY
  }) => {
    amount: string
    sourceCurrency: CURRENCY.EURO
  }
}

export const createCurrencyExchangeService = (): CurrencyExchangeService => {
  return {
    convert: ({amount, sourceCurrency}: {
      amount: string
      sourceCurrency: CURRENCY
    }) => {


      return {
        amount: "1",
        sourceCurrency: CURRENCY.EURO
      }
    }
  }
}