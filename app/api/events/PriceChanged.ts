import {Event} from "@event-driven-io/emmett"

export type PriceChangedEvent = Event<"PriceChanged", {
    productId: string
    price: number
}>