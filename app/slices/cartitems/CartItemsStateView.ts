import { CartEvents } from '@/app/api/events/CartEvents';

export type CartItem = {
    name: string;
    price: number;
    itemId: string;
    aggregateId: string;
};

export const cartItemsStateView = async (
    state: CartItem[],
    event: CartEvents[],
): Promise<CartItem[]> => {
    let result: CartItem[] = [...state];

    event.forEach((event) => {
        switch (event.type) {
            case 'ItemAdded':
                result.push({
                    name: event.data.name,
                    price: event.data.price,
                    itemId: event.data.itemId,
                    aggregateId: event.data.aggregateId,
                });
                break;
            case 'ItemRemoved':
                result = result.filter((item) => item.itemId !== event.data.itemId);
                break;
            case 'ItemArchived':
                result = result.filter((item) => item.itemId !== event.data.itemId);
                break;
            case 'CartCleared':
                result = [];
                break;
        }
    });
    return result;
};
