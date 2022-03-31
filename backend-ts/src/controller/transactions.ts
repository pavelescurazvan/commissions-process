import {RequestHandler} from "express";
import {CURRENCY, ProcessCommission} from "../domain";
import {Convert} from "../services";
import {convertDateToDomainFormat, convertFromCents, convertInCents} from "./helpers";


/**
 * Creates the transaction request handler
 * @param repository
 */
export const createTransactionRequestHandler = ({ processCommission, convert }: {
  processCommission: ProcessCommission,
  convert: Convert
}): RequestHandler  => {

  return async (req, res) => {
    const {date, amount, currency: transactionCurrency, clientId} = req.body;

    if (!date) throw new Error("Date is undefined"); // TODO: validate that it's actual date in the correct format
    if (!amount) throw new Error("Amount is undefined"); // TODO: validate that it's an actual float with 2 digits precision
    if (!transactionCurrency) throw new Error("Currency is undefined"); // TODO: validate that it's an actual valid currency
    if (!clientId || isNaN(clientId)) throw new Error("Client Id is undefined or not a number");

    const {amountInCents: convertedAmountInCents} = await convert({
      amountInCents: convertInCents(amount),
      sourceCurrency: transactionCurrency,
      destinationCurrency: CURRENCY.EURO,
      date
    });

    // Call domain to do stuff
    const {
      amountInCents: commissionAmountInCents,
      currency: commissionCurrency
    } = await processCommission({
      transaction:  {
        date: convertDateToDomainFormat(new Date(date)),
        amountInCents: convertedAmountInCents,
        currency: CURRENCY.EURO,
        clientId
      }
    });

    res.send({
      amount: convertFromCents(commissionAmountInCents),
      currency: commissionCurrency
    });
  }

}
