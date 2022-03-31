import {RequestHandler} from "express";
import {DefineCommissionRule} from "../domain/types";


/**
 * Creates the commission-rule request handler
 */
export const createCommissionRuleRequestHandler = ({ defineCommissionRule }: {
  defineCommissionRule: DefineCommissionRule
}): RequestHandler  => {

  return async (req, res) => {
    const {percentage,  minimumFee, clientId, turnoverThreshold, turnoverFee} = req.body;

    const minimumFeeInCents = convertInCents(minimumFee);

    // TODO: Do validation on the commission rule. Basically a rule could have multiple fields undefined, but not all of them

    await defineCommissionRule({ percentage,  minimumFeeInCents, clientId, turnoverThreshold, turnoverFee });

    res.send({
      success: true
    });
  }
}
