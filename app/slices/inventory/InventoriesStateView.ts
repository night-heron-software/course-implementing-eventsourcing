import {InventoryUpdatedEvent} from "@/app/api/events/InventoryChanged";


export const inventoriesStateView =
    (state: number, events: InventoryUpdatedEvent[], query: { productId: string }): number => {
        let result: number = state

        events.forEach(event => {
            switch (event.type) {
                case "InventoryUpdated":
                    if (event.data.productId == query.productId) {
                        result = event.data.inventory
                    }
                    break
            }
        })
        return result
    }