import {RequestHandler} from "express";
import express from "express";
import needle from "needle";
import {expect} from "chai";
import {createTransactionRequestHandler} from "./transactions";
import {CURRENCY} from "../domain";
import * as bodyParser from "body-parser";

describe('transaction handler', () => {

  let transactionRequestHandler: RequestHandler;

  describe('GIVEN the commission rules return a 1 EURO fee', () => {

    before(() => {
      transactionRequestHandler = createTransactionRequestHandler({
        processCommission: async () => {
          return Promise.resolve({amountInCents: 100, currency: CURRENCY.EURO});
        },
        convert: async () => {
          return Promise.resolve({
            amountInCents: 10000,
            date: 'x',
            sourceCurrency: CURRENCY.EURO
          });
        }
      });

      const app = express();
      app.use(bodyParser.urlencoded({ extended: false }))
      app.use(bodyParser.json())

      const router = express.Router();
      app.use("/", router);

      router.post("/transaction", transactionRequestHandler);

      app.listen(80);
    });

    describe("WHEN calling request handler with transaction", () => {
        it ("THEN should return a valid response", async () => {

          const {body} = await needle("post", "/transaction", {
            date: "2021-01-01",
            amount: "100.00",
            currency: "EUR",
            clientId: 42
          }, {
            json: true,
          });

          expect(body.amount).to.equal("1");
          expect(body.currency).to.equal(CURRENCY.EURO);
        });
    });
  });

})