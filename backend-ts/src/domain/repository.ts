import {Transaction} from "./types";

export interface TransactionRecord extends Transaction {
  cachedAmount: number
}

export interface Repository {
  put: (transaction: Transaction) => Promise<void>,
  get: (clientId: number, calendarMonth: string) => Promise<TransactionRecord[]>,
}

// trans 1 -- details - user id 1 - calendarMonth - currentTotalAmount
// trans 2 -- details - user id 1 - calendarMonth - currentTotalAmount
// trans 3 -- details - user id 1 - calendarMonth - currentTotalAmount
// trans 4 -- details - user id 2 - calendarMonth - currentTotalAmount
// trans 5 -- details - user id 3 - calendarMonth - currentTotalAmount
// trans 6 -- details - user id 4 - calendarMonth - currentTotalAmount
// trans 7 -- details - user id 1 - calendarMonth - currentTotalAmount
// trans 8 -- details - user id 1 - calendarMonth - currentTotalAmount

// composite index on user_id + calendarMonth
// select * from transactions where user_id === 1 AND (date < "X" AND date > "Y");
// compute the sum based on the select
