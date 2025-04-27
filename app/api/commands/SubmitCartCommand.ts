import {Command} from "@event-driven-io/emmett"

export type SubmitCartCommand = Command<'SubmitCart', {

    aggregateId: string
    inventories: { productId: string, quantity: number }[]

}>