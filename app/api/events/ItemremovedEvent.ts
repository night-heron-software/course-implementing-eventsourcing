import {Event} from "@event-driven-io/emmett"

export type ItemRemovedEvent = Event<"ItemRemoved", {

    itemId: string
    aggregateId: string
    productId: string

}>