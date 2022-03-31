import { RequestHandler } from "express";
import {Repository} from "../domain";
import {CurrencyExchangeService} from "../services/currency-exchange";


/**
 * Creates the transaction request handler
 * @param repository
 * @param currencyExchangeService
 */
export const createTransactionRequestHandler = ({ repository, currencyExchangeService }: {
  repository: Repository,
  currencyExchangeService: CurrencyExchangeService
}): RequestHandler  => {

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  return (req, res, next) => {
    const {date, amount, currency, clientId} = req.body;

    if (!date) throw new Error("Date is undefined"); // TODO: validate that it's actual date in the correct format
    if (!amount) throw new Error("Amount is undefined"); // TODO: validate that it's an actual float with 2 digits precision
    if (!currency) throw new Error("Currency is undefined"); // TODO: validate that it's an actual valid currency
    if (!clientId || isNaN(clientId)) throw new Error("Client Id is undefined or not a number");

    const exchangedAmount = currencyExchangeService.convert({
      amountInCents: convertInCents(amount),
      sourceCurrency: currency,
      date
    });

    // Call domain to do stuff

    res.send({
      success: true
    });
  }

}

const convertInCents = (amount: string) => parseFloat(amount) * 100