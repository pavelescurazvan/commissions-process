import {ProviderStrategy, Transaction} from "../domain";

// Example of another approach with additional abstraction from the codeside
const australiaBankStrategy1 = (): ProviderStrategy => {
  // All the strategy dependencies are hardcoded here, or fetched from external parties (eg bank fo austarlia)
  const percentage = "0.05";

  return {
    applyStrategy: (transaction: Transaction) => {
      return transaction.amountInCents * parseFloat(percentage);
    }
  }
}
