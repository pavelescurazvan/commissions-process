import {
  CommissionRule,
  CreateCommissionRulesLoader,
} from "./types";
import {Repository} from "./repository";


export const createCommissionRulesLoader: CreateCommissionRulesLoader = ({ repository }: {
  repository: Repository
}) => {

  return {
    commissionRulesLoader: async (): Promise<CommissionRule[]> => {
      // Compute all commissions for the current transaction, maybe store the results in an array

      // Order the array based on the fee amount and return the smallest result

      return [{}];
    }
  }
}
