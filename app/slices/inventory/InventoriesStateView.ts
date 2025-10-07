import { InventoryUpdatedEvent } from '@/app/api/events/InventoryChanged';

export const inventoriesStateView = (
    state: number,
    events: InventoryUpdatedEvent[],
    query: { productId: string },
): number => {
    return events.reduce((acc, event) => {
        if (event.data.productId === query.productId) {
            acc = event.data.inventory;
        }
        return acc;
    }, state);
};
