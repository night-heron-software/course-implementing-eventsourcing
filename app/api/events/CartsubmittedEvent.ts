import {Event} from "@event-driven-io/emmett"

export type CartsubmittedEvent = Event<"CartSubmitted", {

    aggregateId: string

}>