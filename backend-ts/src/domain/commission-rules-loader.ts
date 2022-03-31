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
      return await repository.getCommissionRules();
    },
    defineCommissionRule: async (commissionRule: CommissionRule): Promise<void> => {
      await repository.putCommissionRule(commissionRule);
    }
  }
}
