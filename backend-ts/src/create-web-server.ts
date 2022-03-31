import express from "express";
import {Server} from "http";
import {createTransactionRequestHandler} from "./controller";
import {createProcessCommission} from "./domain/process-commission";
import {ProcessCommission, Repository, Transaction} from "./domain";

const inMemoryRepository: Repository = {
  get: (transaction: Transaction) => {

  },
  put: (clientId: number, calendarMonth: string) => {

  }
}

/**
 * Creates the web server.
 */
const createWebServer = () => {
  const port = 8080;

  const app = express();

  const router = express.Router();

  app.use("/", router);

  const {processCommission} = createProcessCommission(inMemoryRepository);

  const transactionRequestHandler = createTransactionRequestHandler({
    processCommission,
    currencyExchangeService
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