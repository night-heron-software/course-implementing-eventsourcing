import {Command} from "@event-driven-io/emmett"

export type RequestToArchiveItem = Command<'RequestToArchiveItem', {

    aggregateId: string,
    productId: string,
    itemId: string

}>