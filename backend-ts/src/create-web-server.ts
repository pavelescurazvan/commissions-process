import express from "express";
import * as bodyParser from "body-parser";
import {Server} from "http";
import {createCommissionRuleRequestHandler, createTransactionRequestHandler} from "./controller";
import {CommissionRule, createProcessCommission, CURRENCY, Repository, Transaction, TransactionRecord} from "./domain";
import {createCurrencyExchangeService} from "./services/currency-exchange";
import {createCommissionRules} from "./domain/commission-rules";

const transactionsDict = new Map<string, TransactionRecord>();
const commissionRules = new Array<CommissionRule>();

// TODO implement in-memory repository
const inMemoryRepository: Repository = {
  putTransaction: (transaction: Transaction) => {
    let lastTransactionRecord = transactionsDict.get(`${transaction.clientId}-${transaction.date}`);

    if (!lastTransactionRecord) {
      lastTransactionRecord = {
        transactionsTurnover: 0,
        amountInCents: 0,
        clientId: 0,
        date: '',
        currency: CURRENCY.EURO
      }
    }

    transactionsDict.set(`${transaction.clientId}-${transaction.date}`, {
      transactionsTurnover: transaction.amountInCents + lastTransactionRecord.transactionsTurnover,
      ...transaction
    })

    return Promise.resolve();
  },
  getLastTransaction: (clientId: number, calendarMonth: string) => {
    let lastTransaction = transactionsDict.get(`${clientId}-${calendarMonth}`);

    if (!lastTransaction) lastTransaction = {
      date: "",
      amountInCents: 0,
      currency: CURRENCY.EURO,
      clientId,
      transactionsTurnover: 0
    }

    return Promise.resolve(lastTransaction);
  },
  putCommissionRule: (commissionRule: CommissionRule) => {
    commissionRules.push(commissionRule);

    return Promise.resolve();
  },
  getCommissionRules: () => {
    return Promise.resolve(commissionRules);
  },
}

/**
 * Creates the web server.
 */
export const createWebServer = () => {
  const port = 8080;

  const app = express();

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  const router = express.Router();

  app.use("/", router);

  // Services
  const {convert} = createCurrencyExchangeService();

  // Domain
  const {commissionRulesLoader, defineCommissionRule} = createCommissionRules({
    repository: inMemoryRepository,
  });

  const {processCommission} = createProcessCommission({
    repository: inMemoryRepository,
    commissionRulesLoader
  });

  // Request handlers
  const transactionRequestHandler = createTransactionRequestHandler({
    processCommission,
    convert
  });

  router.post('/transaction', transactionRequestHandler);

  const commissionRuleRequestHandler = createCommissionRuleRequestHandler({
    defineCommissionRule
  });

  router.post('/commission-rule', commissionRuleRequestHandler);

  let server: Server;
  return {
    start: () => {
      server = app.listen(port,() => {
        console.log(`API running on port: ${port}`)
      })
    },
    stop: () => {
      server.close();
    },
    uri: `http://localhost:${port}`
  }
}