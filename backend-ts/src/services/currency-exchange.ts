import * as axios from "axios";
import {CURRENCY} from "../domain";

export type Convert = ({amountInCents, sourceCurrency}: {
  amountInCents: number
  date: string
  sourceCurrency: CURRENCY
  destinationCurrency: CURRENCY.EURO
}) => Promise<{
  amountInCents: number
  date: string
  sourceCurrency: CURRENCY.EURO
}>;

/**
 * Converts amouts from a number of currencies to EURO.
 */
export interface CurrencyExchangeService {
  convert: Convert
}

/**
 * Works only in cents.
 * Exchanges the foreign currency into euros.
 */
export const createCurrencyExchangeService = (): CurrencyExchangeService => {
  const exchangeURL = "https://api.exchangerate.host/";

  return {
    convert: async ({amountInCents, date, sourceCurrency}: { // TODO: maybe use Date and then format whoever is needed
      amountInCents: number
      date: string,
      sourceCurrency: CURRENCY
    }) => {

      // TODO: cache the request for the day
      const {data} = await axios.default.get(`${exchangeURL}/${date}`);
      const {rates} = data;
      const exchangeRate = rates[sourceCurrency];
      const exchangeRateInCents = exchangeRate * 100;

      return {
        amountInCents: amountInCents * exchangeRateInCents,
        date,
        sourceCurrency: CURRENCY.EURO
      }
    }
  }
}