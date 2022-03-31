import {RequestHandler} from "express";
import {DefineCommissionRule} from "../domain/types";
import {convertInCents} from "./helpers";


/**
 * Creates the commission-rule request handler
 */
export const createCommissionRuleRequestHandler = ({ defineCommissionRule }: {
  defineCommissionRule: DefineCommissionRule
}): RequestHandler  => {

  return async (req, res) => {
    const {percentage,  minimumFee, clientId, clientFee, turnoverThreshold, turnoverFee} = req.body;

    const minimumFeeInCents = convertInCents(minimumFee);

    // TODO: Do validation on the commission rule. Basically a rule could have multiple fields undefined, but not all of them

    const client = {
      clientId,
      clientFeeInCents: convertInCents(clientFee)
    }

    const turnover = {
      turnoverThresholdInCents: convertInCents(turnoverThreshold),
      turnoverFeeInCents: convertInCents(turnoverFee)
    }

    await defineCommissionRule({ percentage,  minimumFeeInCents, client, turnover });

    res.send({
      success: true
    });
  }
}
