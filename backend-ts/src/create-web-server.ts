import express from "express";
import {Server} from "http";
import {createTransactionRequestHandler, createCommissionRuleRequestHandler} from "./controller";
import {CommissionRule, createProcessCommission} from "./domain";
import {Repository, Transaction} from "./domain";
import {createCurrencyExchangeService} from "./services/currency-exchange";
import {createCommissionRules} from "./domain/commission-rules";

// TODO implement in-memory repository
const inMemoryRepository: Repository = {
  putTransaction: (transaction: Transaction) => {

  },
  getLastTransaction: (clientId: number, calendarMonth: string) => {

  },
  putCommissionRule: (commissionRule: CommissionRule) => {


  },
  getCommissionRules: () => {

  },
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