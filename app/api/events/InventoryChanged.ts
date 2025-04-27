import {Event} from "@event-driven-io/emmett"

export type InventoryUpdatedEvent = Event<"InventoryUpdated", {
    productId: string
    inventory: number
}>