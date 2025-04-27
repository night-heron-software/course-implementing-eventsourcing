import {InventoryUpdatedEvent} from "@/app/api/events/InventoryChanged";

export type CartSubmitInventory = { productId: string, inventory: number }

export const cartSubmissionInventoryStateView =
    (state: CartSubmitInventory[], events: InventoryUpdatedEvent[]): CartSubmitInventory[] => {
        return events.reduce((acc: CartSubmitInventory[], event) => {
            acc.push({
                productId: event.data.productId,
                inventory: event.data.inventory
            })
            return acc
        }, [])
    }