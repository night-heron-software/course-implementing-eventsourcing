import {Event} from "@event-driven-io/emmett"

export type CartClearedEvent = Event<"CartCleared", {

    aggregateId: string

}>