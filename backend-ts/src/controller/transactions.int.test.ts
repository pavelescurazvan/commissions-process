import needle from "needle";
import {expect} from "chai";
import {CURRENCY} from "../domain";
import {createWebServer} from "../create-web-server";

describe('transaction handler', () => {
  const server = createWebServer();

  describe('GIVEN a valid payload', () => {

    before(() => {
      server.start();
    });

    after( () => {
      server.stop();
    })

    describe("WHEN making POST to the transaction endpoint", () => {
        it ("THEN should return a valid response", async () => {
          const {body} = await needle("post", `${server.uri}/transaction`, {
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