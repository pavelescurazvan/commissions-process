import {
  CommissionRule, CreateCommissionRules,
} from "./types";
import {Repository} from "./repository";


export const createCommissionRules: CreateCommissionRules = ({ repository }: {
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
