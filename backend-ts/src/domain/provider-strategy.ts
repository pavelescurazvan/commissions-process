import {Transaction} from "./types";

// Example of another approach with additional abstraction from the codeside
export interface ProviderStrategy {
  applyStrategy: (transaction: Transaction) => {
    feeAmount: number
  }
}