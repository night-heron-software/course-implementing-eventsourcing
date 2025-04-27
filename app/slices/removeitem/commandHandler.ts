import {CartEvents} from "@/app/api/events/CartEvents";
import {RemoveItemCommand} from "@/app/api/commands/RemoveItemCommand";

export const removeItemCommandHandler =
    async (events: CartEvents[], command: RemoveItemCommand): Promise<CartEvents[]> => {

        let itemsInCart: string[] = []

        for (const event of events) {
            if (event.type === 'ItemAdded') {
                itemsInCart.push(event.data.itemId);
            } else if (event.type === 'ItemRemoved') {
                itemsInCart = itemsInCart.filter(itemId => itemId !== event.data.itemId);
            } else if (event.type === 'ItemArchived') {
                itemsInCart = itemsInCart.filter(itemId => itemId !== event.data.itemId);
            } else if (event.type == "CartCleared") {
                itemsInCart = []
            }
        }

        if (itemsInCart.indexOf(command.data.itemId) == -1) {
            throw new Error("Item is not in cart");
        }

        return [{
            type: 'ItemRemoved',
            data: {
                aggregateId: command.data.aggregateId,
                itemId: command.data.itemId,
                productId: command.data.productId
            }
        }]

    }