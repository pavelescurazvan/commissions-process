import express from "express";
import {Server} from "http";
import {createTransactionRequestHandler} from "./controller";
import {createProcessCommission} from "./domain/process-commission";
import {Repository, Transaction} from "./domain";
import {createCurrencyExchangeService} from "./services/currency-exchange";
import {createCommissionRulesLoader} from "./domain/commission-rules-loader";

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

  const commissionRulesLoader = createCommissionRulesLoader({
    repository: inMemoryRepository,
  });

  const {processCommission} = createProcessCommission({
    repository: inMemoryRepository,
    commissionRulesLoader
  });

  const {convert} = createCurrencyExchangeService();

  const transactionRequestHandler = createTransactionRequestHandler({
    processCommission,
    convert
  });

  router.post('/transaction', transactionRequestHandler);

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