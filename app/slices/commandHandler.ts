import {AddItemCommand} from "../api/commands/AddItemCommand"
import {CartEvents} from "../api/events/CartEvents"

export const addItemCommandHandler =
    async (events: CartEvents[], command: AddItemCommand): Promise<CartEvents[]> => {
    // validation
    return [{
        type: 'ItemAdded',
        data: {
            aggregateId: command.data.name,
            description: command.data.description,
            itemId: command.data.itemId,
            name: command.data.name,
            productId: command.data.productId,
            price: command.data.price
        }
    }]

}

