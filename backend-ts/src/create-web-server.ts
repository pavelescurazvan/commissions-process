import express from "express";
import {Server} from "http";
import {createTransactionRequestHandler, createCommissionRuleRequestHandler} from "./controller";
import {createProcessCommission} from "./domain/process-commission";
import {Repository, Transaction} from "./domain";
import {createCurrencyExchangeService} from "./services/currency-exchange";
import {createCommissionRules} from "./domain/commission-rules-loader";

const inMemoryRepository: Repository = {
  get: (transaction: Transaction) => {

  },
  put: (clientId: number, calendarMonth: string) => {

  }
}

/**
 * Creates the web server.
 */
export const createWebServer = () => {
  const port = 8080;

  const app = express();

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
    }
  }
}