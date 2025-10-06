import { AddItemCommand } from '@/app/api/commands/AddItemCommand';
import { CartEvents } from '@/app/api/events/CartEvents';
import { ItemAddedEvent } from '@/app/api/events/ItemAddedEvent';

export const addItemCommandHandler = async (
    events: CartEvents[],
    command: AddItemCommand,
): Promise<CartEvents[]> => {
    const itemsInCart = events.reduce((acc, event) => {
        if (event.type === 'ItemAdded') {
            acc.push(event);
        } else if (event.type === 'ItemArchived') {
            acc = acc.filter((item) => item.data.itemId !== event.data.itemId);
        } else if (event.type === 'ItemRemoved') {
            acc = acc.filter((item) => item.data.itemId !== event.data.itemId);
        } else if (event.type === 'CartCleared') {
            acc = [];
        }
        return acc;
    }, [] as ItemAddedEvent[]);

    if (itemsInCart.length >= 3) {
        throw new Error('Cannot add more than 3 items');
    }
    // business rule: cannot add same product twice
    const itemAlreadyInCart = itemsInCart.find(
        (item) =>
            item.data.productId === command.data.productId &&
            item.data.aggregateId === command.data.aggregateId,
    );
    if (itemAlreadyInCart) {
        throw new Error('Item already in cart');
    }

    return [
        {
            type: 'ItemAdded',
            data: {
                name: command.data.name,
                itemId: command.data.itemId,
                price: command.data.price,
                description: command.data.description,
                productId: command.data.productId,
                aggregateId: command.data.aggregateId,
            },
        },
    ];
};
